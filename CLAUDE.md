# `claude` — Constituição do repositório

> Constituição curta. Detalhe mora em `docs/` (manual humano).

## 1. Prioridade máxima

O interlocutor é **médico intensivista**, não programador. Esta regra tem precedência sobre qualquer outra.

- Responder em **português**.
- Todo termo de dev (build, deploy, commit, branch, hook, symlink, cache, runtime, RLS, MCP…) leva **tradução de 1
  linha em português comum, na 1ª aparição da resposta**.
- Analogia clínica ou do cotidiano **antes** do jargão. Proibido sigla crua e "é só rodar X".
- Isto é vocabulário, não postura: a linguagem é acessível, a cobrança é brutal.


## 2. O que é este repositório

**É** a fonte canônica da configuração do Claude Code do Dr. Tenente: 41 skills (38 em pacotes + 3 locais),
18 subagentes e as regras que governam os dois. O runtime (`~/.claude/`) lê daqui por **symlink** (atalho de arquivo:
um apontador que faz a pasta parecer existir em dois lugares sem duplicar nada). O contexto do operador
(persona, memória, configs sanitizadas) mora em `context/` e é sincronizado para `~/.claude/` pelo script
`scripts/sync-claude-config.py`.

**NÃO é** um aplicativo. Não tem build, teste, runtime nem dependência instalável. Nada aqui "roda" — tudo aqui é lido
por um agente.

**Prioridade aqui:** que todo caminho citado em documento **exista de verdade**. Documento que mente sobre a própria
estrutura é o defeito nº 1 deste repo, e já aconteceu duas vezes.

## 3. Regras de comunicação

| Regra | Verificável |
| --- | --- |
| Abrir pela conclusão | Contexto, se existir, é 1 frase — nunca antes da resposta |
| Número medido, não adjetivo | "16.430 caracteres", não "bem menor". Sem fonte → `[SEM_FONTE]` |
| Tabela com ≥3 itens comparáveis · lista para sequência | Parágrafo só para argumento, máx. 3 linhas |
| Zero bajulação, zero preâmbulo, zero emoji | Máx. 1 frase de contexto antes de agir |
| Pergunta só quando muda o produto | Múltipla escolha numerada |

**ZERO ALUCINAÇÃO:** campo sem fonte legível é `null` + `[SEM_FONTE]`. Nunca estimar dose, lab, sinal vital ou ID.
Se ele afirma um fato, é fato — não gastar token confirmando.

## 4. Regras de trabalho

**Buscar antes de varrer.** O repo tem 925 arquivos versionados (`git ls-files`) / 31 MB sem histórico — medido
30-ago-2026. Varrer com `Glob` ou `Read` em massa queima contexto e é lento.

| Precisa de | Use primeiro |
| --- | --- |
| Onde mora X, quem chama X | `Grep` / `Glob` (o MCP JetBrains foi removido em 04-set-2026 — 3 portas mortas) |
| Qual skill existe | `memory/SKILLS-CATALOGO.md` |
| Inventário e números | `docs/REPOSITORY-INVENTORY.md` |
| Busca textual no índice | `query_claude_index.py search <termo>` |


**Evitar:** varredura cega de `skills-que-prestam/`; abrir `_anthropic/` sem a skill ter sido acionada; criar arquivo
novo antes de conferir se já existe equivalente.

## 5. Segurança

- **Segredo**: o cofre é `~/projetos/.env` (arquivo real, permissão 600). Nada de chave neste repo.
- **`ide/`**: os `.lock` da IDE contêm `authToken` em texto puro. Estão no `.gitignore` **e** fora do indexador.
- **Licença**: `_anthropic/` mora em `skills-que-prestam/03-pacote-skills-claude-nativas/`, **não na raiz**, e mistura
  duas licenças (medido 11-ago-2026). `examples/` — 24 pastas, todas Apache 2.0, redistribuir é permitido.
  `public/` — 8 pastas: 6 são `© 2025 Anthropic, PBC. All rights reserved.` (`docx`, `xlsx`, `pptx`, `pdf`,
  `pdf-reading`, `file-reading`), e essa licença veda reter cópia fora dos serviços da Anthropic e distribuir a
  terceiros; `frontend-design` é Apache 2.0; `product-self-knowledge` não tem `LICENSE.txt` — ausência de arquivo não
  é permissão.
- **Git**: commit direto em `main` é proibido. Fluxo é branch → PR → merge, e o merge não pede confirmação.


## 6. Operações do repo

| Mecanismo | Onde mora | Regra |
| --- | --- | --- |
| Skill ativa | `skills-que-prestam/<pacote>/<nome>/SKILL.md` | 1 symlink individual em `~/.claude/skills/` |
| Skill local do repo | `.claude/skills/<nome>/SKILL.md` | `add-skill`, `audit-repository`, `verify-before-finish` — carregam só aqui, sem symlink |
| Subagente | `agents/<nome>/<nome>.md` + `README.md` | `~/.claude/agents` é symlink pra cá |
| Config do repo | `.claude/settings.json` | Config global fica em `~/.claude/settings.json` |
| Contexto do operador | `context/` | Persona, memória, configs sanitizadas. Sincroniza pra `~/.claude/` via `scripts/sync-claude-config.py` |
| Hook | `.claude/hooks/*.sh` | Hook que não roda é pedágio — provar na sessão ou remover |
| Índice | `memory/` | Regerar: `python3 ~/projetos/scripts/indices/build_claude_index.py` |
| Script de infra | `~/projetos/scripts/` | **Não** existe `scripts/` neste repo — exceto `scripts/sync-claude-config.py` |

**Casa única:** config mora onde o Claude Code lê, sem cópia no repo. Cópia num segundo lugar apodrece — foi o que
matou `settings/` e `rules/` em 22-jul-2026. Contexto do operador (persona, memória, configs sanitizadas) é a
exceção: vive versionado em `context/` e é **pushado** para `~/.claude/` pelo sync script — o runtime continua a única
fonte viva de secrets (`ANTHROPIC_AUTH_TOKEN`), que não entram no repo.

**Custo de skill:** cada skill ativa injeta `name` + `description` em **toda** mensagem — hoje ~19.000 caracteres para
41 skills (medido 30-ago-2026, após a importação de `ai-agent-workspace` e `vercel-react-best-practices`). Skill que
não é usada é pedágio: desligar removendo o symlink, a pasta fica no repo.

## 7. Referências

| Documento | Para quê |
| --- | --- |
| `README.md` | Explicação humana, entrada do repo |
| `docs/OPERATING-MANUAL.md` | Manual operacional detalhado |
| `docs/REPOSITORY-INVENTORY.md` | Inventário medido (mutável) |
| `docs/DECISIONS.md` | Decisões arquiteturais e o porquê |
| `docs/RUNBOOK.md` | Procedimentos passo a passo |
| `agents/README.md` | Mapa e roteamento dos 18 subagentes |
| `memory/MAPA-CLAUDE.md` | Inventário gerado pelo indexador |
