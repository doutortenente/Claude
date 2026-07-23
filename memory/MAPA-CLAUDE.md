# MAPA — repo Claude

> Gerado 22-jul-2026 por `~/projetos/scripts/indices/build_claude_index.py`

**Total:** 1819 arquivos · 61.6 MB · 189,647 linhas · 1,042,482 tokens indexados · **158 skills**

## Por categoria

| Categoria | Arq | Tokens | O que é |
|---|---:|---:|---|
| `other` | 672 | 436,265 | Revisar |
| `skill_design` | 263 | 234,980 | Arsenal `_design/` (ui-ux-pro-max, taste-skill…) |
| `skill_anthropic` | 199 | 175,509 | Snapshot `_anthropic/` (docx, pdf, examples…) |
| `skill_dev` | 116 | 107,164 | Superpowers + engenharia (TDD, plans, debugging…) |
| `script` | 85 | 68,541 | Scripts executáveis em skills/ |
| `skill_clinical` | 3 | 7,977 | Skills UTI (admissao, sasi-ingest, controles-vitais) |
| `agent` | 11 | 4,767 | Subagentes — `agents/*.md` |
| `root` | 5 | 4,182 | CLAUDE.md, README, VENDOR.md |
| `memory` | 2 | 3,097 | Este índice |
| `vendor_blob` | 463 | 0 | Binários/pesados (só path, sem FTS) |

## Maiores arquivos (exceto vendor_blob)

- `graphify-out/2026-07-22/GRAPH_REPORT.md` — 14,798 tok (`other`)
- `graphify-out/GRAPH_REPORT.md` — 14,569 tok (`other`)
- `skills/_design/taste-skill/skills/taste-skill/SKILL.md` — 12,853 tok (`skill_design`)
- `skills/skill-creator/SKILL.md` — 10,121 tok (`skill_dev`)
- `graphify-out/2026-07-11/GRAPH_REPORT.md` — 7,788 tok (`other`)
- `graphify-out/2026-07-10/GRAPH_REPORT.md` — 7,755 tok (`other`)
- `graphify-out/2026-07-06/GRAPH_REPORT.md` — 7,746 tok (`other`)
- `graphify-out/2026-07-16/GRAPH_REPORT.md` — 7,715 tok (`other`)
- `skills/_design/taste-skill/skills/imagegen-frontend-mobile/SKILL.md` — 6,552 tok (`skill_design`)
- `skills/_design/ui-ux-pro-max/.claude/skills/ui-ux-pro-max/SKILL.md` — 6,466 tok (`skill_design`)
- `skills/skill-creator/workflows/wrapper-skill/patterns.md` — 6,455 tok (`other`)
- `graphify-out/cache/ast/v0.9.24/56da2ca3d0a12457a33e7265307a39f54f6e6ef6a3205c57b8f1fdbd0f8492a7.json` — 6,274 tok (`other`)

## Navegação rápida (obrigatório para agentes)

1. **Skills** → `memory/SKILLS-CATALOGO.md` ou `query_claude_index.py skills`
2. **Scripts** → `query_claude_index.py scripts`
3. **Busca** → `query_claude_index.py search <termo>` (FTS5)
4. **Só então** → `Read` no path exato retornado

Não usar `Glob **/skills/**` nem ler `_design/`/`_anthropic/` sem necessidade.

```bash
python3 ~/projetos/scripts/indices/query_claude_index.py skills --clinical
python3 ~/projetos/scripts/indices/query_claude_index.py find engine.py
python3 ~/projetos/scripts/indices/query_claude_index.py agents
```
