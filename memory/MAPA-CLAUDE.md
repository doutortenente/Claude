# MAPA — repo Claude

> Gerado 09-aug-2026 por `~/projetos/scripts/indices/build_claude_index.py`

**Total:** 918 arquivos · 19.4 MB · 103,527 linhas · 515,783 tokens indexados · **64 skills**

## Por categoria

| Categoria | Arq | Tokens | O que é |
|---|---:|---:|---|
| `skill_dev` | 194 | 228,513 | Pacote 03 — nativas do Claude (skill-creator, TDD…) |
| `script` | 185 | 114,064 | Scripts que são o corpo de uma skill |
| `skill_workspace` | 55 | 51,876 | Pacote 02 — workspace (docx, pdf, xlsx…) |
| `skill_clinical` | 35 | 40,781 | Pacote 01 — skills médicas (UTI) |
| `agent` | 45 | 27,088 | Subagentes — `agents/<nome>/` |
| `skill_backend` | 67 | 24,053 | Pacote 04 — Supabase e Vercel |
| `docs` | 4 | 8,824 | `docs/` — manual, inventário, decisões, runbook |
| `skill_ide` | 8 | 8,619 | Pacote 00 — IDE e documentação |
| `governance` | 13 | 7,934 | `.claude/` — rules, skills, agents, hooks, settings |
| `memory` | 2 | 1,696 | `memory/` — este índice |
| `root` | 5 | 1,573 | CLAUDE.md, README, .gitignore, .env.example |
| `extracao` | 1 | 762 | `EXTRACAO-CLINICA-SASI/` — briefing + atalhos |
| `vendor_blob` | 304 | 0 | Binários/pesados (só path, sem FTS) |

## Maiores arquivos (exceto vendor_blob)

- `skills-que-prestam/03-pacote-skills-claude-nativas/skill-creator/SKILL.md` — 10,154 tok (`skill_dev`)
- `skills-que-prestam/03-pacote-skills-claude-nativas/skill-creator/workflows/wrapper-skill/patterns.md` — 6,462 tok (`skill_dev`)
- `skills-que-prestam/03-pacote-skills-claude-nativas/writing-skills/anthropic-best-practices.md` — 5,764 tok (`skill_dev`)
- `skills-que-prestam/03-pacote-skills-claude-nativas/_anthropic/examples/skill-creator/SKILL.md` — 5,205 tok (`skill_dev`)
- `skills-que-prestam/01-pacote-skills-medicas/controles-vitais-janela/references/amostras/prescricao-uti2-2026-06-21.md` — 4,600 tok (`skill_clinical`)
- `skills-que-prestam/03-pacote-skills-claude-nativas/humanizer/SKILL.md` — 4,516 tok (`skill_dev`)
- `skills-que-prestam/02-pacote-skills-workspace/book-to-skill/SKILL.md` — 4,299 tok (`skill_workspace`)
- `skills-que-prestam/00-pacote-ide-e-documentacao/ide-index-mcp/references/tools-reference.md` — 4,295 tok (`skill_ide`)
- `skills-que-prestam/03-pacote-skills-claude-nativas/_anthropic/examples/setup-writing-style/SKILL.md` — 4,289 tok (`skill_dev`)
- `skills-que-prestam/03-pacote-skills-claude-nativas/_anthropic/examples/skill-creator/eval-viewer/viewer.html` — 4,213 tok (`skill_dev`)
- `skills-que-prestam/03-pacote-skills-claude-nativas/skill-creator/eval-viewer/viewer.html` — 4,197 tok (`skill_dev`)
- `skills-que-prestam/02-pacote-skills-workspace/pptx/scripts/html2pptx.js` — 3,920 tok (`script`)

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
