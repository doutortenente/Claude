# Runtime Map — quem usa o quê no PC

> **Runtime** = arquivos no disco do PC (`~/.claude/`, `~/.codex/`, `~/.hermes/`) que as ferramentas leem em
> **tempo de execução** — não são versionados no repo, mas são gerados a partir dele.
> Fonte canônica do repo: `~/projetos/claude/context/`.

## Ferramentas e suas pastas

| Ferramenta | Config (runtime) | Dados | Memória | Origem (repo) |
|---|---|---|---|---|
| **Claude Code (CLI)** | `~/.claude/settings.json` | `~/.claude/skills/` (symlinks), `~/.claude/agents/` (symlink) | `~/.claude/memory/*.md` | `context/claude/settings.example.json`, `context/memory/` |
| **Claude Code (desktop)** | `~/.claude.json` | — | — | N/A (desktop app config) |
| **Codex** | `~/.codex/config.toml`, `~/.codex/AGENTS.md`, `~/.codex/hooks.json` | — | — | `context/codex/` |
| **Hermes** | `~/.hermes/config.yaml`, `~/.hermes/SOUL.md` | `~/.hermes/memories/USER.md`, `MEMORY.md` | — | `tijolao-ai/hermes/` (não versionado aqui) |
| **Obsidian bridge** | `~/.claude/hooks/prefer-ide-tools.sh` | — | — | `.claude/hooks/` |
| **Tokentracker** | `~/.tokentracker/` | — | — | N/A |

## Fluxo de sincronização (repo → runtime)

```
context/ (versionado) → scripts/sync-claude-config.py --apply → ~/.claude/ (runtime)
```

1. `sync-claude-config.py` lê `context/global-claude-persona.md` → `~/.claude/CLAUDE.md`
2. Copia `context/memory/*.md` → `~/.claude/memory/`
3. Gera `~/.claude/settings.json` a partir de `context/claude/settings.example.json`, injetando `ANTHROPIC_AUTH_TOKEN` do runtime existente (preservado, nunca escrito no repo)
4. Verifica/cria symlinks em `~/.claude/skills/` → `skills-que-prestam/` + `.claude/skills/`
5. Verifica hooks referenciados existam

## Pasta única de secrets

`~/projetos/.env` (permissão 600, fora do git) — contém `ANTHROPIC_AUTH_TOKEN`, `OBSIDIAN_API_KEY`,
`GEMINI_API_KEY`, `EXA_API_KEY`, etc. Nenhum secret mora no repo ou em `context/`.

## O que NÃO está no repo

- `~/.hermes/` (34 MB — bases SQLite, não versionáveis)
- `~/.codex/` (estado local, mas `context/codex/` tem templates)
- `~/.claude/.credentials.json` (credenciais OAuth do Supabase)
- `~/.tokentracker/` (estado local de contagem de tokens)
- `using-superpowers/` plugin (copia do marketplace, não é skill do repo)

## Verificação rápida

```bash
# 1. Symlinks todos OK?
find ~/.claude/skills/ -xtype l                               # vazio = saudável

# 2. CLAUDE.md sincronizado?
diff ~/.claude/CLAUDE.md ~/projetos/claude/context/global-claude-persona.md

# 3. Token preservado no runtime?
python3 -c "import json; s=json.load(open('/home/dr/.claude/settings.json')); print(s['env']['ANTHROPIC_AUTH_TOKEN'][:10])"

# 4. Nada de secret no repo?
grep -r 'sk-' ~/projetos/claude/context/                     # vazio
```
