# `claude` — repositório

## 1. O que é

Fonte canônica da configuração do Claude Code: 41 skills (38 em pacotes + 3 locais), 18 subagentes. O runtime `~/.claude/` lê daqui por **symlink** (atalho: a pasta parece existir em dois lugares sem duplicar nada).

**Não é** aplicativo. Sem build, sem teste, sem runtime, sem dependência. Nada aqui roda — tudo aqui é lido por um agente.

**Defeito nº 1 deste repo:** documento que cita caminho inexistente. Já aconteceu duas vezes. É o que a skill `audit-repository` confere.

## 2. Onde mora cada coisa

| Mecanismo | Onde | Regra |
|---|---|---|
| Skill em serviço | `skills-que-prestam/<pacote>/<nome>/SKILL.md` | 1 symlink individual em `~/.claude/skills/` |
| Skill local do repo | `.claude/skills/<nome>/SKILL.md` | `add-skill`, `audit-repository`, `verify-before-finish` — só aqui, sem symlink |
| Subagente | `agents/<nome>/<nome>.md` + `README.md` | `~/.claude/agents` é symlink pra cá |
| Hook | `.claude/hooks/` | Hook que não roda é pedágio — provar na sessão ou remover |
| Config do repo | `.claude/settings.json` | A global fica em `~/.claude/settings.json` |
| Contexto do operador | `context/` | Sincroniza pra `~/.claude/` via `scripts/sync-claude-config.py` |
| Índice | `memory/` | Regerar: `python3 ~/projetos/scripts/indices/build_claude_index.py` |
| Script de infra | `~/projetos/scripts/` | Não existe `scripts/` aqui — exceto `sync-claude-config.py` |

**Casa única:** config mora onde o Claude Code lê, sem cópia no repo. Cópia num segundo lugar apodrece — foi o que matou `settings/` e `rules/` em 22-jul-2026, e de novo em 04-set-2026.

## 3. Custo de skill — o sistema de modos

Skill ligada injeta `name` + `description` em toda mensagem. Medido 03-set-2026: ligar as 38 custa **+4.659 tokens por mensagem**.

O hook `.claude/hooks/modo-de-skills.sh` roda no início da sessão, lê a palavra em `~/.claude/modo` e deixa ligado só o grupo daquele modo; o resto vira `off`.

| Modo | Liga |
|---|---|
| `plantao` | pacote médico |
| `sasi` | médico + supabase |
| `codigo` | ide + nativas do Claude |
| `escritorio` | workspace (docx, pdf, xlsx, organizador) |
| `estudo` | aula-turbo, book-to-skill, find-docs |
| `tudo` / `nada` | todas / nenhuma |

Trocar: `.claude/hooks/modo <nome>`. As 3 skills locais só ligam com o diretório de trabalho dentro deste repo.

## 4. Busca

`Grep`/`Glob`, ou `query_claude_index.py search <termo>` pra catálogo. Os 3 MCPs de IDE JetBrains foram desativados em 04-set-2026 (`disabledMcpServers`) — portas mortas, nenhuma IDE rodando; o hook `prefer-ide-tools.sh` que barrava `Grep`/`Glob` foi apagado.

**Não abrir sem necessidade:** `skills-que-prestam/` inteira com `Glob` · `_anthropic/` sem a skill ter sido acionada · `ide/` (token em texto puro, fora do git e do indexador).

## 5. Segurança

- Cofre é `~/projetos/.env` (permissão 600). **Nada de chave neste repo** — só `.env.example`.
- `_anthropic/public/` tem 6 skills sob `© 2025 Anthropic, PBC. All rights reserved.` (`docx`, `xlsx`, `pdf`, `pptx`, `file-reading`, `pdf-reading`); `examples/` é Apache 2.0. `doutortenente/Claude` é público — risco assumido pelo operador em 09-ago-2026, registrado em `docs/DECISIONS.md`.
- `ANTHROPIC_AUTH_TOKEN` fica em texto puro em `~/.claude/settings.json` (600, fora de todo repo git). Editar por script exige `mktemp` + `mv` — redirecionar direto pro original deixa o arquivo vazio se o `jq` falhar, e derruba a sessão.

**Antes de commitar:** `git status --short` · `git diff --cached --name-only` · `git diff --cached | grep -inE "sk-|api[_-]?key|secret|Bearer "` (tem de sair vazio) · `git check-ignore -v ide/ .agentbridge`.

## 6. Git

Commit direto em `main` é proibido: branch → PR → merge, e o merge não pede confirmação (ordem de 28-jul-2026).
Sem `.bak`, sem `arquivo-v2.md`, sem tarball — o git é o backup.
Mensagem: `tipo(escopo): o que mudou` — `feat`, `fix`, `refactor`, `docs`, `chore`.

## 7. Referências

`README.md` · `docs/OPERATING-MANUAL.md` · `docs/REPOSITORY-INVENTORY.md` · `docs/DECISIONS.md` · `docs/RUNBOOK.md` · `agents/README.md`
