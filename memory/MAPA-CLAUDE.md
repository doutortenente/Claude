# MAPA — repo Claude

> Gerado 24-jun-2026 por `memory/scripts/build_claude_index.py`

**Total:** 927 arquivos · 31.4 MB · 119,497 linhas · 542,903 tokens indexados · **76 skills**

## Por categoria

| Categoria | Arq | Tokens | O que é |
|---|---:|---:|---|
| `skill_design` | 263 | 234,980 | Arsenal `_design/` (ui-ux-pro-max, taste-skill…) |
| `skill_anthropic` | 199 | 175,509 | Snapshot `_anthropic/` (docx, pdf, examples…) |
| `other` | 65 | 66,352 | Revisar |
| `skill_dev` | 21 | 30,059 | Superpowers + engenharia (TDD, plans, debugging…) |
| `script` | 22 | 18,547 | Scripts executáveis em skills/ |
| `skill_clinical` | 3 | 6,301 | Skills UTI (admissao, sasi-ingest, controles-vitais) |
| `docs` | 1 | 3,698 | `docs/` |
| `template` | 9 | 2,507 | Scaffolding — `templates/` |
| `root` | 5 | 1,984 | CLAUDE.md, README, VENDOR.md |
| `memory` | 2 | 1,703 | Este índice |
| `agent` | 5 | 971 | Subagentes — `agents/*.md` |
| `settings` | 2 | 292 | `settings/` + rules |
| `vendor_blob` | 330 | 0 | Binários/pesados (só path, sem FTS) |

## Maiores arquivos (exceto vendor_blob)

- `skills/_design/taste-skill/skills/taste-skill/SKILL.md` — 12,853 tok (`skill_design`)
- `skills/skill-creator/SKILL.md` — 10,121 tok (`skill_dev`)
- `skills/_design/taste-skill/skills/imagegen-frontend-mobile/SKILL.md` — 6,552 tok (`skill_design`)
- `skills/_design/ui-ux-pro-max/.claude/skills/ui-ux-pro-max/SKILL.md` — 6,466 tok (`skill_design`)
- `skills/skill-creator/workflows/wrapper-skill/patterns.md` — 6,455 tok (`other`)
- `skills/_design/taste-skill/skills/image-to-code-skill/SKILL.md` — 5,820 tok (`skill_design`)
- `skills/_design/taste-skill/skills/imagegen-frontend-web/SKILL.md` — 5,819 tok (`skill_design`)
- `skills/writing-skills/anthropic-best-practices.md` — 5,764 tok (`other`)
- `skills/_anthropic/examples/skill-creator/SKILL.md` — 5,205 tok (`skill_anthropic`)
- `skills/_anthropic/examples/setup-writing-style/SKILL.md` — 4,289 tok (`skill_anthropic`)
- `skills/_anthropic/examples/skill-creator/eval-viewer/viewer.html` — 4,213 tok (`skill_anthropic`)
- `skills/skill-creator/eval-viewer/viewer.html` — 4,213 tok (`other`)

## Navegação rápida (obrigatório para agentes)

1. **Skills** → `memory/SKILLS-CATALOGO.md` ou `query_claude_index.py skills`
2. **Scripts** → `query_claude_index.py scripts`
3. **Busca** → `query_claude_index.py search <termo>` (FTS5)
4. **Só então** → `Read` no path exato retornado

Não usar `Glob **/skills/**` nem ler `_design/`/`_anthropic/` sem necessidade.

```bash
python3 memory/scripts/query_claude_index.py skills --clinical
python3 memory/scripts/query_claude_index.py find engine.py
python3 memory/scripts/query_claude_index.py agents
```
