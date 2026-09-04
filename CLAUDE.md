# `claude` — constituição do repositório

> Curta de propósito. Detalhe mora em `.claude/rules/` (carrega só quando você toca no arquivo daquele assunto) e `docs/` (manual humano). Regra específica vence esta página.

## 1. O que é isto

Fonte canônica da configuração do Claude Code do Dr. Tenente: 41 skills (38 em pacotes + 3 locais), 18 subagentes e as regras que governam os dois. O runtime `~/.claude/` lê daqui por **symlink** (atalho: a pasta parece existir em dois lugares sem duplicar nada).

**NÃO é** aplicativo. Sem build, sem teste, sem runtime, sem dependência. Nada aqui roda — tudo aqui é lido por um agente.

**Defeito nº 1 deste repo:** documento que cita caminho inexistente. Já aconteceu duas vezes. Todo caminho citado tem de existir de verdade — é o que a skill `audit-repository` confere.

## 2. Comunicação

Tom, formato e zero-alucinação vivem no `~/.claude/CLAUDE.md` (global, carrega sempre). Não duplicar aqui.
Detalhe de tradução de jargão e exemplos: `.claude/rules/communication.md`.

## 3. Onde mora cada coisa

| Mecanismo | Onde | Regra |
|---|---|---|
| Skill em serviço | `skills-que-prestam/<pacote>/<nome>/SKILL.md` | 1 symlink individual em `~/.claude/skills/` |
| Skill local do repo | `.claude/skills/<nome>/SKILL.md` | `add-skill`, `audit-repository`, `verify-before-finish` — só aqui, sem symlink |
| Subagente | `agents/<nome>/<nome>.md` + `README.md` | `~/.claude/agents` é symlink pra cá |
| Regra por assunto | `.claude/rules/*.md` | Carrega sob demanda via `paths:` no cabeçalho |
| Hook | `.claude/hooks/` | Hook que não roda é pedágio — provar na sessão ou remover |
| Config do repo | `.claude/settings.json` | A global fica em `~/.claude/settings.json` |
| Contexto do operador | `context/` | Sincroniza pra `~/.claude/` via `scripts/sync-claude-config.py` |
| Índice | `memory/` | Regerar: `python3 ~/projetos/scripts/indices/build_claude_index.py` |
| Script de infra | `~/projetos/scripts/` | **Não** existe `scripts/` aqui — exceto `sync-claude-config.py` |

**Casa única:** config mora onde o Claude Code lê, sem cópia no repo. Cópia num segundo lugar apodrece — foi o que matou `settings/` e `rules/` em 22-jul-2026.

## 4. Custo de skill — o sistema de modos

Skill ligada injeta `name` + `description` em **toda** mensagem. Medido 03-set-2026: ligar as 38 custa **+4.659 tokens por mensagem**.

Por isso elas não ficam todas ligadas. O hook `.claude/hooks/modo-de-skills.sh` roda no início da sessão, lê a palavra em `~/.claude/modo` e deixa ligado só o grupo daquele modo; o resto vira `name-only` (o nome aparece, a descrição não é cobrada — invocar pelo nome carrega inteira na hora).

| Modo | Liga |
|---|---|
| `plantao` | pacote médico |
| `sasi` | médico + supabase |
| `codigo` | ide + nativas do Claude |
| `escritorio` | workspace (docx, pdf, xlsx, organizador) |
| `estudo` | aula-turbo, book-to-skill, find-docs |
| `tudo` / `nada` | todas / nenhuma |

Trocar: `.claude/hooks/modo <nome>`. As 3 skills locais só ligam quando o diretório de trabalho está dentro deste repo.

## 5. Busca

O MCP de IDE JetBrains saiu do `settings.json` em 04-set-2026 — as 3 portas (29172, 6315, 64542) estavam mortas e a regra mandava usar ferramenta inexistente. O hook `prefer-ide-tools.sh` que barrava `Grep`/`Glob` saiu junto.

| Precisa de | Use |
|---|---|
| Que skill existe | `memory/SKILLS-CATALOGO.md` |
| Inventário e números | `docs/REPOSITORY-INVENTORY.md` |
| Busca textual | `query_claude_index.py search <termo>` ou `Grep` |

**Não abrir sem necessidade:** `skills-que-prestam/` inteira com `Glob` · `_anthropic/` sem a skill ter sido acionada · `ide/` (token em texto puro, fora do git e do indexador).

## 6. Segurança e git — o essencial

- Cofre é `~/projetos/.env` (600). **Nada de chave neste repo** — só `.env.example`.
- Commit direto em `main` é proibido: branch → PR → merge, e o merge não pede confirmação (ordem de 28-jul-2026).
- Sem `.bak`, sem `arquivo-v2.md`, sem tarball. O git é o backup.

Detalhe: `.claude/rules/security-and-secrets.md` e `.claude/rules/git-workflow.md`.

## 7. Referências

| Documento | Para quê |
|---|---|
| `README.md` | Entrada humana do repo |
| `docs/OPERATING-MANUAL.md` | Manual operacional |
| `docs/REPOSITORY-INVENTORY.md` | Inventário medido |
| `docs/DECISIONS.md` | Decisões e o porquê |
| `docs/RUNBOOK.md` | Procedimentos passo a passo |
| `agents/README.md` | Mapa dos 18 subagentes |
