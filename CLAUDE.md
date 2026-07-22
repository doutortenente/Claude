# CLAUDE.md — Claude (config & skills)

## DIRETRIZ MÁXIMA Nº 0 — INTERLOCUTOR É MÉDICO, NÃO PROGRAMADOR
**O Dr. Tenente (Nicolas Nagaita) é MÉDICO INTENSIVISTA, não programador.** É TERMINANTEMENTE PROIBIDO comunicar pressupondo que ele domina linguagem, jargão ou gíria de programação. Esta regra tem PRECEDÊNCIA sobre qualquer outra regra de tom ou formato.
- Todo termo de dev (build, deploy, merge, branch, commit, MCP, RLS, env, porta, cache, endpoint, repo, runtime, log…) leva tradução em 1 linha, em português comum, na 1ª vez que aparece na resposta.
- Explicar como a um colega médico inteligente que nunca programou: analogia clínica ou do cotidiano antes do jargão.
- Proibido: sigla crua sem expandir, jargão solto, "é só rodar X" sem dizer em palavras o que X faz e por quê.

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
├── scripts/             ⭐ CASA ÚNICA dos scripts de infra do repo
│   ├── build_claude_index.py    Regenera índice + MAPA + SKILLS-CATALOGO
│   └── query_claude_index.py    Consulta o índice
├── settings/
│   └── settings.json    Config VIVA do Claude Code (~/.claude/settings.json é symlink daqui)
├── rules/               Regras path-scoped (~/dev/.claude/rules é symlink daqui)
├── agents/              11 subagentes (~/.claude/agents é symlink daqui)
├── memory/              Índice gerado: claude_index.db, MAPA-CLAUDE.md, SKILLS-CATALOGO.md
└── skills/              (~/.claude/skills é symlink daqui)
    ├── VENDOR.md        ⭐ Procedência: upstreams, SHAs fixados, licenças, regras de re-sync
    ├── <119 skills>/    Skills top-level achatadas, cada uma com SKILL.md
    ├── _vendor/         Licenças soltas (ex.: superpowers-LICENSE)
    ├── _design/         Arsenal de design auditado (~20 sub-skills, tree do upstream preservado)
    └── _anthropic/      Snapshot das skills do ambiente Claude Code (licença PROPRIETÁRIA)
        ├── public/      8 skills: docx, pdf, pptx, xlsx, file-reading, pdf-reading,
        │                frontend-design, product-self-knowledge
        └── examples/    24 skills (catálogo completo, sem curadoria): mcp-builder,
                         doc-coauthoring, theme-factory, web-artifacts-builder, skill-creator…
```

### Onde mora script (regra da casa única)

| Tipo de script | Casa |
|---|---|
| Infra deste repo (índice, build) | `claude/scripts/` |
| Corpo de uma skill (a skill chama ele) | `skills/<nome>/scripts/` — **não mover daqui, quebra a skill** |
| Manutenção do PC (fora deste repo) | `~/dev/scripts/` |

Nunca enterrar script em `memory/` — `memory/` guarda só índice gerado.

### Skills top-level (119, achatadas em `skills/<nome>/`)

O número real está no índice, não nesta lista: `python3 scripts/query_claude_index.py skills`.
Custo: cada skill instalada injeta `name` + `description` no prompt em **toda** mensagem
(~42.600 caracteres hoje). Skill que não é usada é pedágio — desativar movendo para
`skills/_off/` (o prefixo `_` tira da descoberta sem apagar nada).

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

## Navegação rápida (obrigatório — repo é pesado)

Este repo tem **1.414 arquivos** versionados e **45 MB** em `skills/`.
**Não varrer** `skills/` com Glob nem Read em massa — é lento e queima contexto.
Antes de grep, use o grafo: `graphify query "<pergunta>"` rodado de dentro do repo.

| Precisa de | Use primeiro |
|---|---|
| Qual skill existe? | `memory/SKILLS-CATALOGO.md` |
| Path de uma skill | `python3 scripts/query_claude_index.py skill <nome>` |
| Scripts (.py/.sh) | `python3 scripts/query_claude_index.py scripts` |
| Subagentes | `python3 scripts/query_claude_index.py agents` |
| Busca no repo | `python3 scripts/query_claude_index.py search <termo>` |
| Inventário | `memory/MAPA-CLAUDE.md` |

Regenerar índice: `python3 scripts/build_claude_index.py`.

`_design/` e `_anthropic/` são **sob demanda** — só abrir quando a skill for acionada.

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

### settings.json — é a config VIVA, não um template

`~/.claude/settings.json` é **symlink** para `settings/settings.json` daqui. Editar um
edita o outro. Isso completa o padrão que `agents/` e `skills/` já seguiam: o repo é a
fonte, o `~/.claude/` só aponta.

| Onde | O quê | Versionado? |
|---|---|---|
| `claude/settings/settings.json` | config global (modelo, tema, plugins, idioma) | sim |
| `~/dev/.claude/settings.json` | hooks do workspace (graphify, reindex no Stop) | não (fora deste repo) |
| `**/settings.local.json` | scratch de sessão (permissões pontuais) | **não** — no `.gitignore` |

Os 3 hooks do **prompt-improver** foram removidos (22-jul-2026): apontavam para
`.claude/skills/prompt-improver/scripts/engine.py`, caminho que não existe — a skill
mora em `skills/prompt-improver/`. Cobravam ~189 tokens por prompt sem nunca rodar.
A skill continua no repo, invocável à mão.

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

SASI (produto) · **Claude** (este) · JARVIS · `~/dev/memory` (índice workspace).
