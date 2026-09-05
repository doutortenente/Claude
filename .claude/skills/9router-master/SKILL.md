---
name: 9router-master
description: Operar, diagnosticar e corrigir o 9router — o roteador local de IA na porta 20128 do Tijolão, por onde passam Claude Code, Hermes, Codex e n8n. Aciona quando o operador disser "o 9router caiu", "deu 404 no modelo", "qual modelo eu uso", "tá caindo no fallback", "não responde na porta 20128", "adiciona um provedor", "cria um combo", "quanto de quota sobrou", ou quando qualquer ferramenta que aponta pra localhost:20128 falhar. Traz a tabela real de prefixos, o procedimento de diagnóstico em ordem e as armadilhas medidas nesta máquina.
---

# 9router — o roteador local de IA

O 9router é um **entreposto**: as ferramentas de IA não falam direto com OpenAI, Anthropic ou Google — falam com ele, em `localhost:20128`, e ele decide para qual provedor mandar. Serve para usar a cota que já foi paga antes de gastar dinheiro novo, e para não parar de trabalhar quando um provedor cai.

Termos que aparecem aqui, traduzidos na primeira vez: **provedor** = a empresa que roda o modelo (OpenAI, Google…). **prefixo/alias** = as duas ou três letras antes da barra no nome do modelo, que dizem por qual provedor passar. **fallback** = o próximo da fila quando o primeiro falha. **quota** = o quanto da assinatura já foi usado.

## A regra que quebra tudo: o prefixo

O 9router divide o nome do modelo **na primeira barra**. O que vem antes é o apelido do provedor; o que vem depois é o nome do modelo repassado adiante. Está no código, em `open-sse/services/model.js`, função `parseModel`.

```
cx/gpt-5.6-sol
│  └── modelo repassado ao provedor
└───── apelido: codex (OpenAI Codex)
```

**Modelo sem prefixo = 404.** O roteador não adivinha o provedor; ele procura um chamado `gpt-5.6-sol`, não acha, e devolve erro. Foi exatamente esse o defeito que degradou a rota principal do Tijolão entre 03 e 05-set-2026: o Hermes pedia `gpt-5.6-sol`, tomava 404, caía no fallback gratuito da OpenRouter e o operador via respostas piores sem saber por quê.

## Prefixos que importam aqui

Extraído do registro em `open-sse/providers/registry/*.js` (05-set-2026). São **121 provedores** no total; estes são os que existem conectados nesta máquina ou que valem lembrar:

| Prefixo | Provedor | Como autentica | Grátis |
|---|---|---|---|
| `cx` | OpenAI Codex | OAuth | — |
| `cc` | Claude Code | OAuth | — |
| `ag` | Antigravity | OAuth | — |
| `gc` | Gemini CLI | OAuth | sim |
| `gemini` | Gemini (API) | chave | sim |
| `cf` | Cloudflare Workers AI | chave | sim |
| `ps` | Poolside | chave | sim |
| `gh` | GitHub Copilot | OAuth | — |
| `kr` | Kiro AI | — | sim |
| `openrouter` | OpenRouter | chave | sim |
| `groq` | Groq | chave | sim |
| `nvidia` | NVIDIA NIM | chave | sim |
| `cerebras` | Cerebras | chave | — |
| `mistral` | Mistral | chave | — |
| `ollama` | Ollama Cloud | chave | sim |
| `glm` | GLM Coding | chave | — |
| `ds` | DeepSeek | chave | — |
| `cu` | Cursor IDE | OAuth | — |
| `ws` | Windsurf | OAuth | — |

Para a lista viva, **não confie nesta tabela — pergunte à máquina**:

```bash
K=$(grep -m1 '^NINEROUTER_KEY=' ~/projetos/.env | cut -d= -f2-)
curl -s -H "Authorization: Bearer $K" http://127.0.0.1:20128/v1/models \
  | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{
      const m=JSON.parse(d).data||[];console.log(m.length,"modelos");
      m.forEach(x=>console.log(x.id))})'
```

Medido em 05-set-2026: **97 modelos** em 14 prefixos ativos.

## Onde as coisas moram

| O quê | Caminho |
|---|---|
| Estado (provedores, chaves, uso) | `~/.9router/db/data.sqlite` |
| Catálogo de modelos | `~/.9router/model-catalog.json` |
| Logs | `~/.9router/logs/` |
| Segredo do login e ID da máquina | `~/.9router/jwt-secret`, `~/.9router/machine-id` (ambos 600) |
| Código instalado | `~/.local/lib/node_modules/9router/` |
| Repositório de desenvolvimento | Ausente no estado medido em 05-set-2026; o runtime não depende de clone local |
| Credenciais de acesso | `~/projetos/.env`, variáveis `NINEROUTER_*` |
| Painel | `http://localhost:20128/dashboard` |
| Endpoint da API | `http://localhost:20128/v1` |

O banco é SQLite com as tabelas `providerConnections`, `providerNodes`, `apiKeys`, `combos`, `usageDaily`, `usageHistory`, `requestDetails`, `settings`, `proxyPools`, `kv`, `_meta`. A documentação pública ainda fala em `db.json` — **está desatualizada**; nesta versão é SQLite.

### Instalação ativa

No estado medido em 05-set-2026 há uma única instalação operacional:

| Caminho | Papel | Versão medida |
|---|---|---|
| `~/.local/lib/node_modules/9router` | programa que responde na porta 20128 | 0.5.69 |

Não existe `~/projetos/9router`, e `skills.external_dirs` aponta somente para `~/.claude/skills`. Não invente dependência de clone local. Confira sempre a versão realmente executada:

```bash
node -e 'console.log(require(process.env.HOME+"/.local/lib/node_modules/9router/package.json").version)'
```

## Diagnóstico, na ordem

Sempre nesta sequência. Cada passo elimina uma causa; pular passo faz perder tempo com a causa errada.

**1. O processo está de pé?**
```bash
ss -tlnp | grep 20128
```
Nada aparece → o 9router não está rodando. Suba com `9router --no-browser`.

**2. Responde sem chave?**
```bash
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:20128/v1/models
```
Em localhost, `200` é o esperado: **listar** o catálogo é liberado para quem já está na máquina. Isso **não** é falha — o que gasta cota continua fechado (ver tabela abaixo).

**3. Responde com chave?**
```bash
K=$(grep -m1 '^NINEROUTER_KEY=' ~/projetos/.env | cut -d= -f2-)
curl -s -o /dev/null -w "%{http_code}\n" -H "Authorization: Bearer $K" \
  http://127.0.0.1:20128/v1/models
```
`200` = chave boa. `401` = chave errada ou revogada; emita outra no painel.

**4. O modelo existe e responde?**
```bash
curl -s -m 90 -X POST http://127.0.0.1:20128/v1/chat/completions \
  -H "Authorization: Bearer $K" -H "Content-Type: application/json" \
  -d '{"model":"cx/gpt-5.6-sol","messages":[{"role":"user","content":"Responda apenas: PONG"}],"max_tokens":20}'
```
Este é o teste que **prova** a rota. Repare no campo `model` da resposta: ele diz quem realmente respondeu. Se você pediu `cx/` e voltou outro provedor, houve fallback silencioso — a rota principal está quebrada mesmo que a resposta pareça boa.

**5. Só então olhe o painel.** `http://localhost:20128/dashboard`, aba Providers: conexão sem status verde é provedor caído ou token OAuth vencido.

## Tabela de erros

| Sintoma | Causa | O que fazer |
|---|---|---|
| `404` no modelo | Falta o prefixo, ou o provedor não está conectado | Conferir contra `/v1/models`; nunca escrever o modelo sem `xx/` |
| `401` na API | Chave errada, revogada ou ausente | Emitir nova em Settings → API Keys |
| `ECONNREFUSED` | Processo caído ou porta ocupada | `ss -tlnp \| grep 20128`; subir de novo |
| Resposta veio, mas ruim | Fallback silencioso | Comparar o `model` pedido com o `model` devolvido |
| "Language model did not provide messages" | Quota esgotada ou chave inválida | Painel → Quota; reconectar o provedor |
| `Unauthorized` intermitente | Token OAuth expirou (o refresh falhou) | Esperar 30s (tenta sozinho); senão Providers → Reconnect |
| Lento demais | Latência do provedor ou contexto grande | Trocar por modelo rápido; usar streaming |

## Combos — a fila de reserva

Combo é uma lista ordenada de modelos com um nome. O nome do combo entra **no lugar do modelo**:

```
Nome: producao-medica
  1. cx/gpt-5.6-sol      (assinatura — melhor qualidade)
  2. glm/glm-4.7         (barato — US$ 0,60/1M)
  3. gc/gemini-3-flash   (grátis — rede de segurança)
```
Usar: `{"model": "producao-medica", ...}`. O roteador tenta em ordem e pula para o próximo em 404, rate-limit, quota esgotada ou erro 5xx.

**Sempre feche o combo com um modelo grátis.** É o que impede a parada total quando a assinatura estoura.

## Ligar as ferramentas nele

**Claude Code** — `ANTHROPIC_BASE_URL=http://localhost:20128/v1`. É assim que este Tijolão está: a variável aponta para o roteador, não para a Anthropic. Consequência prática: **o modelo que responde pode não ser o que a interface mostra.**

**Codex** — exige `OPENAI_BASE_URL` **e** `OPENAI_API_KEY` (a chave do 9router). Diferente do Claude Code, que não precisa da chave.

**Hermes** — declarar como provedor nomeado no `~/.hermes/config.yaml`, nunca como bloco `custom` solto:
```yaml
model:
  default: "cx/gpt-5.6-sol"
  provider: "nine-router"
providers:
  nine-router:
    api: http://127.0.0.1:20128/v1
    key_env: NINEROUTER_KEY
    transport: chat_completions
    default_model: cx/gpt-5.6-sol
```
`key_env` aponta para o **nome** da variável no `.env`, não para o valor. Se a variável não existir, o provedor está morto e o Hermes cai em fallback sem avisar — foi o defeito encontrado em 05-set-2026, quando `key_env: NINEROUTER_KEY` apontava para uma variável inexistente.

## Armadilhas medidas nesta máquina

- **Bind em `0.0.0.0` não é buraco.** O relatório de 03-set-2026 marcou como exposição. Medido em 05-set: responde `401 — API key required for remote API access` a partir do IP da LAN. Há autenticação na frente. Só feche em `127.0.0.1` se ninguém acessar do celular.
- **`skills/` do repo estava com permissão 777** e essa pasta é lida pelo Hermes (`skills.external_dirs`). Pasta que o agente lê e o mundo escreve é via de injeção. Corrigido para 755 em 05-set-2026 — reconferir depois de cada `git pull`.
- **Trocar de modelo no `config.yaml` não basta** se o bloco `model` do topo tiver `api_key` e `base_url` próprios: o topo vence o provedor nomeado. Apague as duas linhas e deixe só `provider:`.
- **O painel abre em `20128/dashboard`**, não na porta 3000 que a documentação cita.

## Verificação

Uma mudança no 9router só está pronta quando estes três passam:

1. `/v1/models` devolve `200` com a chave e `401` sem ela.
2. Um `chat/completions` no modelo principal devolve `200` **e** o campo `model` da resposta bate com o que foi pedido.
3. Nenhuma linha de fallback nos logs durante o teste.

Se qualquer um falhar, a rota está degradada — mesmo que a resposta pareça correta.
