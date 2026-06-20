# CLAUDE.md — Claude (config & skills)

> Repo de **config reutilizável do Claude Code** do Dr. Tenente. **Não é um app**:
> não há build, testes, runtime nem dependências instaláveis. É uma biblioteca
> versionada de **skills** (vendoradas) e **settings** (permissões + hooks),
> sincronizada para o `.claude/` de cada projeto da família.

## O que é

Fonte canônica de **skills** e **settings** do Claude Code. O ambiente Claude Code
on the web é **efêmero** (instalações fora do repo não persistem entre sessões),
então tudo o que precisa sobreviver vive *dentro* deste repo, com versões fixadas
no commit upstream para rastreabilidade/auditoria.

```text
Claude/
├── CLAUDE.md            Este arquivo (instruções para o agente)
├── README.md            Resumo curto do repo
├── .gitignore           Bloqueia segredos (.env), settings.local.json, logs
├── settings/
│   └── settings.json    Template de permissões + hooks do prompt-improver (+ language: pt)
└── skills/
    ├── VENDOR.md        ⭐ Procedência: upstreams, SHAs fixados, licenças, regras de re-sync
    ├── <17 skills>/     Skills top-level achatadas, cada uma com SKILL.md
    ├── _vendor/         Licenças soltas (ex.: superpowers-LICENSE)
    ├── _design/         Arsenal de design auditado (~20 sub-skills, tree do upstream preservado)
    └── _anthropic/      Snapshot das skills do ambiente Claude Code (licença PROPRIETÁRIA)
        ├── public/      8 skills: docx, pdf, pptx, xlsx, file-reading, pdf-reading,
        │                frontend-design, product-self-knowledge
        └── examples/    24 skills (catálogo completo, sem curadoria): mcp-builder,
                         doc-coauthoring, theme-factory, web-artifacts-builder, skill-creator…
```

### Skills top-level (17, achatadas em `.claude/skills/<nome>/`)

Fluxo de desenvolvimento (superpowers + daymade): `brainstorming`,
`systematic-debugging`, `test-driven-development`, `writing-plans`,
`executing-plans`, `requesting-code-review`, `receiving-code-review`,
`verification-before-completion`, `using-superpowers`, `writing-skills`,
`dispatching-parallel-agents`, `subagent-driven-development`,
`finishing-a-development-branch`, `using-git-worktrees`, `skill-creator`,
`prompt-improver` (com hooks ativos), `session-start-hook`.

## Convenções

- **Anatomia de uma skill:** cada skill é uma pasta com um `SKILL.md` na raiz. O
  `SKILL.md` tem frontmatter YAML (`name`, `description` — a `description` indica
  *quando* acionar) seguido do corpo em Markdown. Pode trazer `scripts/`,
  `references/`, `assets/`, `examples/`.
- **Achatar vs. aninhar:** skills de uso geral ficam **achatadas** no top-level
  (`skills/<nome>/`). Coleções com nomes genéricos que colidiriam (`design`,
  `brand`, `design-system`) ficam **aninhadas** sob um parent (`_design/<plugin>/`)
  com o tree do upstream preservado, facilitando re-sync.
- **Prefixo `_`:** diretórios `_design/`, `_anthropic/`, `_vendor/` não são skills
  ativáveis diretamente — são coleções/metadados. `VENDOR.md` é a fonte de verdade
  sobre procedência.
- **Idioma:** respostas em **português** (`"language": "portuguese"` em
  `settings.json`). Mantenha docs/commits em pt-BR, consistentes com o repo.
- **Sem segredos:** nunca commitar `.env`, chaves ou dados de paciente. O
  `.gitignore` bloqueia `.env*`, `**/settings.local.json`, `*.log`. Este repo toca
  contexto clínico/Supabase — trate qualquer dado sensível com cuidado.

## Workflows

### Adicionar / vendorar uma nova skill
1. Copie a skill para `skills/<nome>/` (achatada) ou `skills/_design/<plugin>/`
   (aninhada, preservando o tree do upstream). Exclua `.git/` e `node_modules/`.
2. Garanta um `SKILL.md` válido na raiz da pasta da skill.
3. **Registre em `skills/VENDOR.md`:** upstream, commit SHA fixado, licença e o que
   foi copiado. Sem entrada em `VENDOR.md`, a skill não é rastreável/auditável.
4. Se a skill exigir hooks, fie-os em `settings/settings.json` (ver abaixo).

### Re-sincronizar com o upstream
1. `git clone <upstream>` num diretório temporário.
2. Comparar mudanças desde o commit fixado em `VENDOR.md`; **revisar diffs de
   qualquer `scripts/`/hook** antes de aceitar (repo sensível).
3. Re-copiar os subtrees e **atualizar os SHAs** na tabela de `VENDOR.md`.

### Ativar uma skill num projeto consumidor
Skills daqui são **copiadas ou symlinkadas** para `.claude/skills/` do repo alvo.
Para ativar uma sub-skill aninhada (`_design/…`), copie/symlinke a pasta que contém
o `SKILL.md` específico para o `.claude/skills/` daquele projeto.

### settings.json (permissões + hooks)
`settings/settings.json` é o **template** copiado para `.claude/settings.json` dos
projetos. Hoje: `defaultMode: bypassPermissions` (allow Bash/Read/Write/Edit/Glob/
Grep), `language: portuguese`, e 3 hooks do **prompt-improver**:
- `UserPromptSubmit`, `PreToolUse` (matcher `EnterPlanMode|Bash`), `SubagentStart`
  → chamam `engine.py` (requer `python3` no PATH).
- **Overhead** ~189 tokens/prompt; `engine.py` sai sempre com código 0 (defensivo).
- **Bypass do nudge:** comece o prompt com `*`, `/` ou `#`.
- **Desativar:** remova o bloco `hooks` de `.claude/settings.json`.
- O `SessionStart` hook do superpowers **não** é religado (quebra ao achatar); as 14
  skills são descobertas automaticamente como project skills mesmo assim.

## Licenças (⚠️ ler antes de redistribuir)

- `_anthropic/` → **PROPRIETÁRIO da Anthropic** (`© 2025 Anthropic, PBC`). Cada
  skill traz `LICENSE.txt`. **NÃO redistribuir** fora deste repo privado.
- superpowers → MIT (`_vendor/superpowers-LICENSE`); `prompt-improver`,
  `skill-creator`, `taste-skill`, `ui-ux-pro-max` → MIT (LICENSE própria).
- `frontend-design-pro` e `bencium-…` → sem LICENSE no upstream; rever antes de
  redistribuir.
- Detalhes completos (tabelas, SHAs, exceções) em **`skills/VENDOR.md`**.

## Regra clínica (PHI)

Nunca colar dado de paciente em prompt de image-gen (`ui-ux-pro-max`,
`taste-skill/imagegen-*`); não acionar skills de foto stock (Pexels/Unsplash) sobre
tela com dado real.

## Git / contribuição

- Commits em pt-BR, no estilo Conventional Commits (`feat(skills):`, `docs:`,
  `chore:`) — ver `git log`.
- Desenvolva em branch de feature; não faça push direto em `main` sem permissão.

## Família de repos (`~/dev/`)

SASI (produto) · **Claude** (este) · Cursor · GROK · JARVIS · comando-uti
(GERAL/índice).
