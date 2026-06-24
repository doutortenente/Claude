# Claude — Config & Skills

Configuração reutilizável do Claude Code do Dr. Tenente: skills vendor + settings
(permissões, hooks). Fonte central para sincronizar entre projetos.

```text
Claude/
├── skills/      Skills vendor (~17): superpowers, TDD, brainstorming, code-review…
└── settings/    settings.json (permissões + hooks do prompt-improver)
```

## Uso

Skills e settings daqui são copiados/symlinkados para `.claude/` de cada projeto.
Não contém segredos. Workspace: `~/dev/` · índice em `memory/MAPA-DEV.md`.
