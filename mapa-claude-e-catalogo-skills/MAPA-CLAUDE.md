# MAPA — repo Claude

> Gerado 28-jul-2026 por `~/projetos/scripts/indices/build_claude_index.py`

**Total:** 1871 arquivos · 74.1 MB · 204,818 linhas · 1,119,687 tokens indexados · **159 skills**

## Por categoria

| Categoria         | Arq |  Tokens | O que é                                              |
| ----------------- | --: | ------: | ---------------------------------------------------- |
| `other`           | 721 | 507,605 | Revisar                                              |
| `skill_design`    | 263 | 234,980 | Arsenal `_design/` (ui-ux-pro-max, taste-skill…)     |
| `skill_anthropic` | 199 | 175,509 | Snapshot `_anthropic/` (docx, pdf, examples…)        |
| `skill_dev`       | 117 | 111,638 | Superpowers + engenharia (TDD, plans, debugging…)    |
| `script`          |  86 |  68,727 | Scripts executáveis em skills/                       |
| `skill_clinical`  |   3 |   7,977 | Skills UTI (admissao, sasi-ingest, controles-vitais) |
| `agent`           |  11 |   4,820 | Subagentes — `agents/*.md`                           |
| `root`            |   5 |   4,374 | CLAUDE.md, README, VENDOR.md                         |
| `memory`          |   2 |   3,097 | Este índice                                          |
| `docs`            |   1 |     960 | `docs/`                                              |
| `vendor_blob`     | 463 |       0 | Binários/pesados (só path, sem FTS)                  |

## Maiores arquivos (exceto vendor_blob)

- `graphify-out/2026-07-24/GRAPH_REPORT.md` — 15,896 tok (`other`)
- `graphify-out/2026-07-23/GRAPH_REPORT.md` — 15,002 tok (`other`)
- `graphify-out/2026-07-28/GRAPH_REPORT.md` — 14,693 tok (`other`)
- `graphify-out/GRAPH_REPORT.md` — 14,691 tok (`other`)
- `graphify-out/2026-07-22/GRAPH_REPORT.md` — 14,583 tok (`other`)
- `skills/_design/taste-skill/skills/taste-skill/SKILL.md` — 12,853 tok (`skill_design`)
- `skills/skill-creator/SKILL.md` — 10,121 tok (`skill_dev`)
- `graphify-out/2026-07-11/GRAPH_REPORT.md` — 7,788 tok (`other`)
- `graphify-out/2026-07-10/GRAPH_REPORT.md` — 7,755 tok (`other`)
- `graphify-out/2026-07-06/GRAPH_REPORT.md` — 7,746 tok (`other`)
- `graphify-out/2026-07-16/GRAPH_REPORT.md` — 7,715 tok (`other`)
- `skills/_design/taste-skill/skills/imagegen-frontend-mobile/SKILL.md` — 6,552 tok (`skill_design`)

## Navegação rápida (obrigatório para agentes)

1. **Skills** → `memory/SKILLS-CATALOGO.md` ou `query_claude_index.py skills`
2. **Scripts** → `query_claude_index.py scripts`
3. **Busca** → `query_claude_index.py search <termo>` (FTS5)
4. **Só então** → `Read` no path exato retornado

Não usar `Glob **/skills/**` nem ler `_design/`/`_anthropic/` sem necessidade.

```bash
python3 ~/projetos/scripts/indices/query_claude_index.py pacotao-macaroca-de-skills --clinical
python3 ~/projetos/scripts/indices/query_claude_index.py find engine.py
python3 ~/projetos/scripts/indices/query_claude_index.py agents
```
