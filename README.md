# Claude — Config & Skills

Configuração reutilizável do Claude Code do Dr. Tenente: skills vendor + settings
(permissões, hooks). Fonte central para sincronizar entre projetos.

```text
Claude/
├── skills/      Skills (78 SKILL.md) + _design/ + _anthropic/
├── agents/      Subagentes (secretaria, clinical-auditor…)
├── settings/    settings.json (permissões + hooks)
├── templates/   Scaffolding de projetos
└── memory/      Índice FTS — SKILLS-CATALOGO.md, query_claude_index.py
```

**Navegação:** `python3 scripts/query_claude_index.py skills` — não varrer `skills/` à mão.

## Uso

Skills e settings daqui são copiados/symlinkados para `.claude/` de cada projeto.
Não contém segredos. Workspace: `~/dev/` · índice em `memory/MAPA-DEV.md`.
