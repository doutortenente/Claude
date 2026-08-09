# Manual operacional

> Este é o único documento longo do repo. A regra curta mora em [`CLAUDE.md`](../CLAUDE.md); aqui está **como** se faz,
> **por que** é assim e **onde** costuma quebrar. Números medidos: [`REPOSITORY-INVENTORY.md`](REPOSITORY-INVENTORY.md).

---

## 1. O que é este repositório

É o **prontuário da configuração do Claude Code**: 36 skills ativas, 18 subagentes e as regras que governam os dois.
O sistema lê deste repo por atalho de arquivo, não por cópia. Editar aqui é editar o que o agente usa amanhã de manhã.

**Não é um aplicativo.** Não há build (compilação), teste automatizado, runtime (programa em execução) nem dependência
para instalar. Nada aqui "roda": tudo aqui é **lido** por um agente antes de ele agir.

O defeito nº 1 deste repo não é código quebrado — é **documento que mente sobre a própria estrutura**. Já aconteceu duas
vezes. Por isso todo caminho citado em qualquer página daqui tem de existir no disco, e isso é auditável.

---

## 2. Mapa mental — qual mecanismo serve pra quê

Oito mecanismos, oito funções distintas. A pergunta certa não é "onde eu escrevo isso?", é **"quem precisa ler isso, e
quando?"**.

| Mecanismo | Quem lê | Quando escrever AQUI e não em outro lugar |
| --- | --- | --- |
| `CLAUDE.md` | o agente, em **toda** sessão dentro do repo | A regra vale sempre e cabe em 1 linha. Se precisa de exemplo ou caso de borda, não é aqui. |
| `.claude/rules/*.md` | o agente, dentro deste repo, por assunto | A regra é de **um assunto só** (comunicação, git, segurança, navegação, vendorização) e precisa de detalhe. |
| `SKILL.md` | o agente, **só quando acionado** pela descrição | É um **procedimento** que o agente executa sob demanda. Custa contexto o tempo todo, então tem de valer o pedágio. |
| `agents/<nome>/` | o agente principal, ao delegar | É **trabalho braçal ou adversarial** que não deve queimar contexto da sessão principal. |
| `settings.json` | o programa Claude Code, na inicialização | É **configuração de máquina** (permissão, modelo, idioma), não instrução em português. |
| `.claude/hooks/*.sh` | o programa Claude Code, num evento | Algo tem de acontecer **automaticamente** num gatilho (antes de escrever arquivo, ao encerrar sessão). Hoje: **1 hook em serviço** neste repo. |
| `docs/*.md` | **humano** | O Dr. Tenente vai ler com os próprios olhos. Agente não carrega `docs/` sozinho. |
| `memory/` | ambos, sob consulta | É **inventário gerado por máquina**. Nunca editar na mão — o gerador sobrescreve. |

**Teste de 1 pergunta:** se apagar este arquivo, quem sente falta?
Agente sempre → `CLAUDE.md` · agente às vezes → `rules/` ou `SKILL.md` · humano → `docs/` · ninguém percebe → não escrever.

### Hook: dois em serviço, os dois provados rodando

**Hook** = gatilho automático. Analogia: o alarme do monitor que dispara sozinho quando a saturação cai — ninguém precisa
olhar a tela.

Estado medido em 09-ago-2026, **2 hooks em serviço**, os dois no mesmo arquivo de script deste repo:

| Script | Registrado em | Evento · matcher | O que faz |
| --- | --- | --- | --- |
| `.claude/hooks/block-sensitive-files.sh` | `.claude/settings.json` (só neste repo) | `PreToolUse` · `Write\|Edit` | barra escrita em `.env`, `settings.local.json`, `*.log`, `ide/**`, `.agentbridge/**` |
| `.claude/hooks/prefer-ide-tools.sh` | `~/.claude/settings.json` (**global**) | `SessionStart` + `PreToolUse` · `Grep\|Glob\|Bash` | com a IDE viva, empurra busca e troca em massa para o MCP `jetbrains-index` |

O segundo é global de propósito: o operador trabalha na WebStorm em vários repos, e a regra vale em todos. Ele se
desliga sozinho quando não há IDE viva com o projeto aberto, então sessão de terminal puro não paga nada.

**Provas rodadas na sessão em que cada um nasceu.** `block-sensitive-files.sh`: entrada com `file_path` de `.env`
devolve **exit code** (código de saída: 0 = liberado, ≠0 = barrado) **2**; `README.md` devolve **0** — 7 casos, 7 certos.
`prefer-ide-tools.sh`: 10 casos, 10 certos — Grep barra na 1ª e libera na 2ª, Glob barra, `sed -i` com `xargs` barra,
`sed -i` num arquivo só libera, `ls` libera, projeto sem IDE libera, `Write` passa direto, `IDE_HOOK=off` desliga e o
`SessionStart` devolve JSON válido.

O rigor vem de 22-jul-2026, quando três hooks do `prompt-improver` foram removidos porque apontavam para caminho
inexistente e cobravam ~189 tokens por prompt sem nunca executar. **Hook que não roda é pedágio.** Hook novo só entra se
for provado rodando na mesma sessão em que foi criado — foi exatamente o que os dois passaram.

---

## 3. Como o repo se liga ao sistema — os symlinks

**Symlink** = atalho de arquivo. Analogia: é a mesma ficha do paciente pendurada em dois lugares — no leito e no posto de
enfermagem. Não são duas fichas. É **uma**, vista de dois corredores. Rabiscar numa aparece na outra na mesma hora.

Isso resolve o problema de fundo: o Claude Code lê de `~/.claude/`, mas o histórico de versões (git) mora em
`~/projetos/claude/`. Sem atalho, seriam duas cópias — e cópia num segundo lugar apodrece.

| Atalho em `~/.claude/` | Aponta para | Granularidade |
| --- | --- | --- |
| `agents` | `/home/dr/projetos/claude/agents` | **1 atalho para a pasta inteira** — os 18 subagentes entram juntos |
| `skills/<nome>` | `skills-que-prestam/<pacote>/<nome>` | **36 atalhos individuais**, um por skill |

### Por que agentes vão em bloco e skills vão uma a uma

Subagente **não custa nada** enquanto não é chamado — o texto dele só é lido no momento da delegação. Então liga-se a
pasta toda e pronto.

Skill **custa em toda mensagem**: o `name` e a `description` de cada skill ativa são injetados no prompt sempre,
somando **11.173 caracteres** hoje. Como o custo é por skill, o controle tem de ser por skill. Um atalho individual é o
interruptor de cada uma: tirar o atalho desliga aquela skill sem apagar nada do repo.

### Como conferir se a ligação está de pé

```bash
ls -la ~/.claude/ | grep -E "skills|agents"     # o atalho de agents deve mostrar "-> /home/dr/projetos/claude/agents"
ls ~/.claude/skills/ | wc -l                    # deve dar 36
find ~/.claude/skills/ -maxdepth 1 -xtype l     # atalho quebrado (aponta pro vazio); saída vazia = tudo certo
```

Medido em 09-ago-2026: 36 atalhos, **0 quebrados**.

---

## 4. Ciclo de vida de uma skill

Cinco fases. A quinta (desligar) é a que ninguém faz — e é ela que segura o custo.

| # | Fase | O que acontece | Prova de que passou |
| --- | --- | --- | --- |
| 1 | **Nasce** | Pasta com um `SKILL.md` na raiz: cabeçalho `name` + `description`, corpo em Markdown | O arquivo existe e o cabeçalho é válido |
| 2 | **Entra em serviço** | Vai para o pacote temático certo e ganha o atalho em `~/.claude/skills/` | `ls ~/.claude/skills/<nome>` responde |
| 3 | **É usada** | O agente lê a `description` e decide sozinho acionar | A skill de fato disparou numa sessão real |
| 4 | **Vira pedágio** | Meses sem disparar, mas cobrando caracteres em toda mensagem | Não aparece em nenhuma sessão recente |
| 5 | **É desligada** | Remove-se **só o atalho**. A pasta continua no repo, versionada | `ls ~/.claude/skills/` cai de 36 para 35 |

**A `description` é o mecanismo inteiro.** Ela não descreve o que a skill faz — ela diz **quando acionar**, com as
palavras que o Dr. Tenente usaria de verdade ("controles", "sobe o plantão", "analisa o eco"). Descrição vaga = skill que
nunca dispara = pedágio puro. Descrição boa cita gatilho literal e diz explicitamente o que **não** é caso dela.

**Fase 5 não é derrota.** Desligar é reversível em 1 comando (recriar o atalho) e nada se perde: a pasta fica no
histórico. Procedimento executável passo a passo: skill `add-skill` em `.claude/skills/add-skill/`.

Regras de git da mudança: [`CLAUDE.md` §5](../CLAUDE.md#5-segurança) e `.claude/rules/git-workflow.md`.

---

## 5. Ciclo de vida de um subagente

**Subagente** = ajudante com contexto próprio. Analogia: o residente a quem você manda buscar os exames de 12 leitos.
Ele vai, varre, volta com uma folha. Você não leu os 12 prontuários — só a folha.

Existem **18**. A tabela completa está em [`REPOSITORY-INVENTORY.md`](REPOSITORY-INVENTORY.md#frota-de-subagentes-18);
o roteamento fica em `agents/README.md` e `agents/docs/roteamento.md`.

### Antes de criar o 19º — o teste de 4 perguntas

Responda nesta ordem. Um "sim" já mata a ideia.

| # | Pergunta | Se sim |
| --- | --- | --- |
| 1 | Algum dos 18 já cobre essa competência? | **Não crie.** Use o que existe, ou melhore o texto dele. |
| 2 | É trabalho de uma vez só? | **Não crie.** Faça direto, ou delegue ao `batedor`/`caco`. |
| 3 | Cabe como skill (procedimento) em vez de agente (papel)? | **Não crie agente.** Skill custa menos e é mais fácil de desligar. |
| 4 | Falta contexto isolado — só o motivo de "não quero sujar a sessão"? | **Não crie.** Isso é qualquer agente genérico, não um novo. |

Cria-se um novo **apenas** quando existe um trabalho recorrente, com critério de sucesso verificável, que nenhum dos 18
faz. Precedente registrado: em 08-ago-2026 três agentes foram propostos (`security-reviewer`, `documentation-reviewer`,
`repository-auditor`) e **os três foram recusados** — a frota já tinha `segurador`, `documentador`, `fiscal` e `zelador`.
Só `auditor-do-repo` sobreviveu, porque faz o que nenhum outro fazia: conferir se caminho citado em documento existe no
disco. Duplicar competência é o pecado da bola de neve.

### Escolha do modelo — o que decide o custo

| Modelo | Para quê | Exemplos na frota |
| --- | --- | --- |
| `haiku` | Ler, contar, rodar script pronto. Zero decisão | `batedor`, `caco`, `zelador` |
| `sonnet` | Executar plano já prescrito, verificar, documentar | `residente`, `fiscal`, `testador`, `documentador` |
| `opus` | Decidir arquitetura, auditar segurança, dado clínico | `arquiteto`, `chefe`, `segurador`, `clinical-data-auditor` |

Regra de teto: **subagente não lança outro subagente.** A hierarquia tem 2 níveis. Papel de "líder de esquadrão" é da
ferramenta Workflow, não de empilhar Opus dentro de Opus.

Molde e convenções: `agents/docs/template-de-agente.md` e `agents/docs/convencoes.md`.

---

## 6. Os 5 pacotes de skill e o critério de cada um

Pacote = gaveta temática dentro de `skills-que-prestam/`. Ele **não** liga nem desliga nada (isso é o atalho) — serve
para achar a skill e para decidir onde a próxima vai morar.

| Pacote | Skills | Critério de entrada | Fica de fora |
| --- | ---: | --- | --- |
| `00-pacote-ide-e-documentacao` | 4 | Skill que consulta ferramenta de código ou documentação externa | Qualquer coisa que produza texto clínico |
| `01-pacote-skills-medicas` | 7 | Skill que toca **paciente**: admissão, eco, hemodinâmica, plantão, ingest | Skill de formato de arquivo, mesmo usada na clínica |
| `02-pacote-skills-workspace` | 9 | Skill que manipula **arquivo e formato**: docx, pdf, xlsx, pptx, organização | Skill que decide conteúdo clínico |
| `03-pacote-skills-claude-nativas` | 12 | Skill sobre o **próprio ofício de construir com o Claude**: criar skill, TDD, brainstorm, humanizer | Skill que resolve problema do domínio dele |
| `04-pacote-skills-supabase-e-vercel` | 4 | Skill de **banco de dados e publicação** do SASI | Skill de código de tela |

Total: **36**. O critério real é a pergunta **"quando isso dispara?"** — o mesmo eixo da `description`. Skill médica
dispara quando há paciente na mesa; skill de workspace dispara quando há arquivo na mesa.

**Dentro do pacote 03 mora `_anthropic/`.** O prefixo `_` marca coleção, não skill ativável. Só abrir quando a skill
correspondente for de fato acionada. A licença não é uma só: `examples/` é Apache 2.0 (23 arquivos) e `public/` é
`All rights reserved` (6 skills) — ver `.claude/rules/security-and-secrets.md`.

**Reserva fria.** Skill que não entra em serviço não fica aqui — vai para `doutortenente/pacotao-macaroca-de-skills`
(privado, 85 skills, extraído em 07-ago-2026). A procedência de cada uma mora lá, em `reference/VENDOR.md`.
Não reclonar para este PC: o motivo da saída foi parar de pesar 24 MB / 572 arquivos.

---

## 7. O índice

**Índice** = banco de busca do repo. Analogia: o sumário do livro. Sem ele, achar algo é folhear página por página —
neste repo, 917 arquivos.

### O que ele gera

| Saída | O que é | Versionado |
| --- | --- | --- |
| `memory/claude_index.db` | Banco de busca (SQLite), consultado por comando | **não** — regenerável |
| `memory/MAPA-CLAUDE.md` | Inventário legível: contagem de arquivo, linha e token por área | sim |
| `memory/SKILLS-CATALOGO.md` | Catálogo de skill: nome, pacote, para que serve | sim |

### Comandos

O gerador **não** mora neste repo — todo script de infra fica na casa única `~/projetos/scripts/`.

```bash
python3 ~/projetos/scripts/indices/build_claude_index.py            # regera banco + MAPA + CATÁLOGO
python3 ~/projetos/scripts/indices/query_claude_index.py skills     # lista as skills
python3 ~/projetos/scripts/indices/query_claude_index.py agents     # lista os subagentes
python3 ~/projetos/scripts/indices/query_claude_index.py scripts    # lista scripts (.py/.sh)
python3 ~/projetos/scripts/indices/query_claude_index.py skill <n>  # caminho de uma skill
python3 ~/projetos/scripts/indices/query_claude_index.py search <t> # busca textual
python3 ~/projetos/scripts/indices/query_claude_index.py find <f>   # acha arquivo por nome
```

### Quando regerar

| Situação | Regerar? |
| --- | --- |
| Skill criada, movida, renomeada ou removida | **sim, na hora** |
| Subagente criado ou removido | **sim, na hora** |
| Reestruturação de pasta | **sim, antes de publicar número em doc** |
| Texto editado dentro de arquivo que já existia | só se for citar contagem |
| Só conferir onde algo mora | não — consulte, ou use o MCP `jetbrains-index` |

**MCP `jetbrains-index`** = ponte com a IDE (`ide_find_file`, `ide_search_text`, `ide_find_references`). É a **primeira**
escolha para "onde mora X" e "quem chama X", porque não copia arquivo nenhum para o contexto. O índice local entra
quando a IDE está fechada ou quando a pergunta é de **contagem**, não de localização.

Regra do número: o índice é a fonte, `docs/REPOSITORY-INVENTORY.md` é a publicação. Divergiu, corrige a publicação.
Número sem medição é `[SEM_FONTE]` — nunca estimado.

---

## 8. O que NÃO fazer neste repo

Seis itens. Cada um tem cicatriz.

| # | Não faça | Por quê |
| --- | --- | --- |
| 1 | **Duplicar config que já mora onde o Claude Code lê** | Cópia num segundo lugar apodrece: ninguém lembra qual é a viva. Em 22-jul-2026 as pastas `settings/` e `rules/` da raiz foram apagadas — eram cópias mortas que nenhum programa carregava. Config mora em `~/.claude/settings.json`, `~/projetos/.claude/settings.json` e `.claude/rules/`, e ponto. |
| 2 | **Criar pasta `scripts/` aqui** | A casa única de script de infra é `~/projetos/scripts/`, travada em 22-jul-2026. Única exceção: script que **é o corpo de uma skill** fica em `<skill>/scripts/` — tirar de lá quebra a skill, que o chama por caminho relativo. |
| 3 | **Varrer `skills-que-prestam/` com busca em massa** | São 848 arquivos só nessa pasta. Varredura cega é lenta e queima contexto que ele paga em toda mensagem. Use `jetbrains-index` ou o `query_claude_index.py`. |
| 4 | **Ligar hook sem provar que ele roda na mesma sessão** | Hook silencioso cobra token e não entrega nada. Os 3 hooks do `prompt-improver` cobravam ~189 tokens por prompt apontando para caminho que não existia. |
| 5 | **Citar caminho em documento sem conferir no disco** | É o defeito nº 1 deste repo. Em 08-ago-2026 o README citava `skills/`, `settings/`, `templates/` e `memory/` — **3 das 4 não existiam**. Confira com `ls` antes de escrever o caminho. |
| 6 | **Redistribuir `_anthropic/public/` ou versionar `ide/`** | As 6 skills de `public/` são `All rights reserved` da Anthropic (as 24 de `examples/` são Apache 2.0 e podem circular). Os `.lock` de `ide/` contêm `authToken` (senha de sessão da IDE) em texto puro — estão fora do git **e** fora do indexador desde 08-ago-2026, e assim ficam. |

Dois complementos que não cabem em tabela:

- **Sem backup.** Nada de `.bak` nem tarball local — ordem de 10-jul-2026. O histórico do git é o backup.
- **Sem commit direto em `main`.** O fluxo é ramo → PR → merge, e o merge **não** pede confirmação (ordem permanente de
  28-jul-2026). Detalhe em `.claude/rules/git-workflow.md`.

---

## 9. Para onde ir depois

| Precisa de | Documento |
| --- | --- |
| A regra em 1 linha | [`../CLAUDE.md`](../CLAUDE.md) |
| Número medido | [`REPOSITORY-INVENTORY.md`](REPOSITORY-INVENTORY.md) |
| Rotina passo a passo | `RUNBOOK.md` |
| Por que foi decidido assim | `DECISIONS.md` |
| Qual subagente chamar | `../agents/README.md` |
| Qual skill existe | `../memory/SKILLS-CATALOGO.md` |
