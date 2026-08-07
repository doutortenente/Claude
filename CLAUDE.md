# CLAUDE.md — Claude (config & skills)

## DIRETRIZ MÁXIMA Nº 0 — INTERLOCUTOR É MÉDICO, NÃO PROGRAMADOR

**O Dr. Tenente (Nicolas Nagaita) é MÉDICO INTENSIVISTA, não programador.** É TERMINANTEMENTE PROIBIDO comunicar
pressupondo que ele domina linguagem, jargão ou gíria de programação. Esta regra tem PRECEDÊNCIA sobre qualquer outra
regra de tom ou formato.

- Todo termo de dev (build, deploy, merge, branch, commit, MCP, RLS, env, porta, cache, endpoint, repo, runtime, log…)
  leva tradução em 1 linha, em português comum, na 1ª vez que aparece na resposta.
- Explicar como a um colega médico inteligente que nunca programou: analogia clínica ou do cotidiano antes do jargão.
- Proibido: sigla crua sem expandir, jargão solto, "é só rodar X" sem dizer em palavras o que X faz e por quê.

> Repo de **config reutilizável do Claude Code** do Dr. Tenente. **Não é um app**:
> não há build, testes, runtime nem dependências instaláveis. É uma biblioteca
> versionada de **skills** (vendoradas) e **settings** (permissões + hooks),
> sincronizada para o `.claude/` de cada projeto da família.

## O que é

Fonte canônica de **skills** e **settings** do Claude Code. O ambiente Claude Code on the web é **efêmero** (instalações
fora do repo não persistem entre sessões), então tudo o que precisa sobreviver vive *dentro* deste repo, com versões
fixadas no commit upstream para rastreabilidade/auditoria.

```text
Claude/
├── CLAUDE.md            Este arquivo (instruções para o agente)
├── README.md            Resumo curto do repo
├── .gitignore           Bloqueia segredos (.env), settings.local.json, logs
├── agents/              18 subagentes + docs/ + _template.md + CONTRIBUTING + CHANGELOG
├── memory/              Índice gerado: claude_index.db, MAPA-CLAUDE.md, SKILLS-CATALOGO.md
└── skills/              Skills
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

### Onde mora script (casa única, travada 22-jul-2026)

Este repo **não tem** pasta `scripts/`. Todo script de infra mora em `~/projetos/scripts/`, em gavetas por assunto. O
índice deste repo é gerado de fora:

```bash
python3 ~/projetos/scripts/indices/build_claude_index.py    # regenera índice + MAPA + CATÁLOGO
python3 ~/projetos/scripts/indices/query_claude_index.py    # consulta
```

Única exceção: script que **é o corpo de uma skill** fica em `skills-que-prestam/<pacote>/<nome>/scripts/`
— a skill chama ele por caminho relativo, tirar de lá quebra a skill.

### Skills ativas (35, em `skills-que-prestam/<pacote>/<nome>/`)

O número real está no índice, não nesta lista: `python3 ~/projetos/scripts/indices/query_claude_index.py skills`. Custo:
cada skill instalada injeta `name` + `description` no prompt em **toda** mensagem (~42.600 caracteres hoje). Skill que
não é usada é pedágio — desativar removendo o symlink em `~/.claude/skills/` (a pasta continua no repo).
Os 35 symlinks de `~/.claude/skills/` batem 1:1 com os 35 `SKILL.md` de `skills-que-prestam/`.

## Convenções

- **Anatomia de uma skill:** cada skill é uma pasta com um `SKILL.md` na raiz. O
  `SKILL.md` tem frontmatter YAML (`name`, `description` — a `description` indica *quando* acionar) seguido do corpo em
  Markdown. Pode trazer `scripts/`,
  `references/`, `assets/`, `examples/`.
- **Organização:** as skills ativas ficam em pacotes temáticos numerados sob `skills-que-prestam/`
  (`00-pacote-ide-e-documentacao`, `01-pacote-skills-medicas`, `02-pacote-skills-workspace`,
  `03-pacote-skills-claude-nativas`, `04-pacote-skills-supabase-e-vercel`). Cada skill é ligada individualmente
  por symlink em `~/.claude/skills/`.
- **Prefixo `_`:** diretórios `_anthropic/` não são skills ativáveis diretamente — são coleções/metadados.
  A reserva fria de skills vendorizadas foi extraída em 07-ago-2026 para o repo **`doutortenente/pacotao-macaroca-de-skills`**
  (privado); o `VENDOR.md` com procedência e licença de cada item mora lá, em `reference/VENDOR.md`.
- **Idioma:** respostas em **português** (`"language": "portuguese"` em
  `settings.json`). Mantenha docs/commits em pt-BR, consistentes com o repo.
- **Sem segredos:** nunca commitar `.env`, chaves ou dados de paciente. O
  `.gitignore` bloqueia `.env*`, `**/settings.local.json`, `*.log`. Este repo toca contexto clínico/Supabase — trate
  qualquer dado sensível com cuidado.

## Navegação rápida (obrigatório — repo é pesado)

Este repo tem **867 arquivos** versionados e **39 MB** em disco (a reserva de 24 MB / 572 arquivos saiu em
07-ago-2026 para `doutortenente/pacotao-macaroca-de-skills`). **Não varrer** `skills-que-prestam/` com Glob nem Read em
massa — é lento e queima contexto. Antes de grep, use `ide_find_file` / `ide_search_text` do MCP `jetbrains-index`.

| Precisa de         | Use primeiro                                                              |
| ------------------ | ------------------------------------------------------------------------- |
| Qual skill existe? | `memory/SKILLS-CATALOGO.md`                                               |
| Path de uma skill  | `python3 ~/projetos/scripts/indices/query_claude_index.py skill <nome>`   |
| Scripts (.py/.sh)  | `python3 ~/projetos/scripts/indices/query_claude_index.py scripts`        |
| Subagentes         | `python3 ~/projetos/scripts/indices/query_claude_index.py agents`         |
| Busca no repo      | `python3 ~/projetos/scripts/indices/query_claude_index.py search <termo>` |
| Inventário         | `memory/MAPA-CLAUDE.md`                                                   |

Regenerar índice: `python3 ~/projetos/scripts/indices/build_claude_index.py`.

`_design/` e `_anthropic/` são **sob demanda** — só abrir quando a skill for acionada.

## Workflows

### Adicionar / vendorar uma nova skill

1. Skill que vai entrar em serviço: copie para `skills-que-prestam/<pacote>/<nome>/` e ligue o symlink em
   `~/.claude/skills/`. Skill de reserva (não ligada): vai para o repo `doutortenente/pacotao-macaroca-de-skills`,
   em `plugins/pacotao/skills/<nome>/`. Exclua `.git/` e `node_modules/`.
2. Garanta um `SKILL.md` válido na raiz da pasta da skill.
3. **Registre em `reference/VENDOR.md` do repo `doutortenente/pacotao-macaroca-de-skills`:** upstream, commit SHA
   fixado, licença e o que foi copiado. Sem entrada em `VENDOR.md`, a skill não é rastreável/auditável.
4. Se a skill exigir hooks, fie-os em `~/.claude/settings.json` (ver abaixo).

### Re-sincronizar com o upstream

1. `git clone <upstream>` num diretório temporário.
2. Comparar mudanças desde o commit fixado em `VENDOR.md`; **revisar diffs de qualquer `scripts/`/hook** antes de
   aceitar (repo sensível).
3. Re-copiar os subtrees e **atualizar os SHAs** na tabela de `VENDOR.md`.

### Ativar uma skill num projeto consumidor

Skills daqui são **copiadas ou symlinkadas** para `.claude/skills/` do repo alvo. Para ativar uma sub-skill aninhada
(`_design/…`), copie/symlinke a pasta que contém o `SKILL.md` específico para o `.claude/skills/` daquele projeto.

### Onde mora config (uma casa só, sem cópia)

Config e regra moram **onde o Claude Code lê**, nunca duplicadas neste repo. Cópia num segundo lugar apodrece — foi o
que aconteceu até 22-jul-2026, quando
`claude/settings/` e `claude/rules/` eram cópias mortas que ninguém carregava.

| Onde                               | O quê                                                         |
| ---------------------------------- | ------------------------------------------------------------- |
| `~/.claude/settings.json`          | config global: modelo, tema, plugins, idioma                  |
| `~/projetos/.claude/settings.json` | hooks do workspace (reindex do índice no Stop)                |
| `<repo>/.claude/rules/*.md`        | regra path-scoped — só carrega dentro do repo que ela governa |
| `**/settings.local.json`           | scratch de sessão (permissões pontuais) — no `.gitignore`     |

Regra de Supabase do SASI mora em `sasi/.claude/rules/supabase.md`. Não replicar aqui.

Os 3 hooks do **prompt-improver** foram removidos (22-jul-2026): apontavam para
`.claude/skills/prompt-improver/scripts/engine.py`, caminho que não existe — a skill mora em `skills-que-prestam/03-pacote-skills-claude-nativas/prompt-improver/`.
Cobravam ~189 tokens por prompt sem nunca rodar. A skill continua no repo, invocável à mão.

## Licenças (⚠️ ler antes de redistribuir)

- `_anthropic/` → **PROPRIETÁRIO da Anthropic** (`© 2025 Anthropic, PBC`). Cada skill traz `LICENSE.txt`. **NÃO
  redistribuir** fora deste repo privado.
- superpowers → MIT (`_vendor/superpowers-LICENSE`); `prompt-improver`,
  `skill-creator`, `taste-skill`, `ui-ux-pro-max` → MIT (LICENSE própria).
- `frontend-design-pro` e `bencium-…` → sem LICENSE no upstream; rever antes de redistribuir.
- Detalhes completos (tabelas, SHAs, exceções) em **`reference/VENDOR.md`** do repo `doutortenente/pacotao-macaroca-de-skills`.

## Regra clínica (PHI)

Nunca colar dado de paciente em prompt de image-gen (`ui-ux-pro-max`,
`taste-skill/imagegen-*`); não acionar skills de foto stock (Pexels/Unsplash) sobre tela com dado real.

## Git / contribuição

- Commits em pt-BR, no estilo Conventional Commits (`feat(skills):`, `docs:`,
  `chore:`) — ver `git log`.
- Desenvolva em branch de feature; não faça push direto em `main` sem permissão.
- **Ordem permanente do operador (28-jul-2026): "Sempre dê push e merge."** Ao concluir um trabalho, faça push do branch
  de feature, abra o PR e **mescle em seguida, sem pedir confirmação**. (Commit direto em `main` continua proibido — o
  fluxo é sempre via branch + PR; só a etapa de aprovação foi dispensada.)

## Família de repos (`~/projetos/`)

SASI (produto) · **Claude** (este) · `~/projetos/memory` (índice workspace).
