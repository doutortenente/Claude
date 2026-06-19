# CLAUDE.md — Claude (config & skills)

> Repo de config reutilizável do Claude Code do Dr. Tenente. Não é um app.

## O que é

Fonte canônica de **skills** e **settings** do Claude Code, sincronizada para o
`.claude/` de cada projeto.

```text
Claude/
├── skills/          Skills vendor (~17): superpowers, TDD, brainstorming, code-review…
│   ├── _design/     Arsenal de design auditado: taste-skill, frontend-design-pro,
│   │                ui-ux-pro-max, bencium (ver skills/VENDOR.md)
│   └── _anthropic/  Skills do ambiente Claude Code (snapshot /mnt/skills):
│       ├── public/    8 skills proprietárias: docx, pdf, pptx, xlsx, file-reading,
│       │              pdf-reading, frontend-design, product-self-knowledge
│       └── examples/  3 skills curadas: mcp-builder, doc-coauthoring, theme-factory
└── settings/        settings.json (permissões + hooks do prompt-improver)
```

> `_anthropic/` é licença **proprietária da Anthropic** (ver `skills/VENDOR.md`) —
> não redistribuir fora deste repo privado.

## Como usar

- Skills daqui são copiadas/symlinkadas para `.claude/skills/` de cada repo.
- `settings/settings.json` é o template de permissões/hooks.
- **Sem segredos** aqui (`.env` no `.gitignore`).

## Família de repos (`~/WebstormProjects/`)

SASI (produto) · **Claude** (este) · Cursor · GROK · JARVIS · comando-uti (GERAL/índice).
