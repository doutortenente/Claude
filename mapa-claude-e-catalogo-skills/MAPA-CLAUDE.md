# MAPA — repo Claude

> Gerado 07-aug-2026 por `~/projetos/scripts/indices/build_claude_index.py`

**Total:** 860 arquivos · 19.1 MB · 98,286 linhas · 469,905 tokens indexados · **60 skills**

## Por categoria

| Categoria | Arq | Tokens | O que é |
|---|---:|---:|---|
| `other` | 471 | 355,950 | Revisar |
| `skill_dev` | 67 | 104,507 | Superpowers + engenharia (TDD, plans, debugging…) |
| `agent` | 11 | 4,850 | Subagentes — `agents/*.md` |
| `mapa-claude-e-catalogo-skills` | 2 | 3,119 | Este índice |
| `root` | 5 | 1,479 | CLAUDE.md, README, VENDOR.md |
| `vendor_blob` | 304 | 0 | Binários/pesados (só path, sem FTS) |

## Maiores arquivos (exceto vendor_blob)

- `skills-que-prestam/03-pacote-skills-claude-nativas/skill-creator/SKILL.md` — 10,154 tok (`skill_dev`)
- `skills-que-prestam/03-pacote-skills-claude-nativas/skill-creator/workflows/wrapper-skill/patterns.md` — 6,462 tok (`other`)
- `skills-que-prestam/03-pacote-skills-claude-nativas/writing-skills/anthropic-best-practices.md` — 5,764 tok (`other`)
- `skills-que-prestam/03-pacote-skills-claude-nativas/_anthropic/examples/skill-creator/SKILL.md` — 5,205 tok (`skill_dev`)
- `skills-que-prestam/01-pacote-skills-medicas/controles-vitais-janela/references/amostras/prescricao-uti2-2026-06-21.md` — 4,600 tok (`other`)
- `skills-que-prestam/03-pacote-skills-claude-nativas/humanizer/SKILL.md` — 4,516 tok (`skill_dev`)
- `skills-que-prestam/02-pacote-skills-workspace/book-to-skill/SKILL.md` — 4,299 tok (`skill_dev`)
- `skills-que-prestam/00-pacote-ide-e-documentacao/ide-index-mcp/references/tools-reference.md` — 4,295 tok (`other`)
- `skills-que-prestam/03-pacote-skills-claude-nativas/_anthropic/examples/setup-writing-style/SKILL.md` — 4,289 tok (`skill_dev`)
- `skills-que-prestam/03-pacote-skills-claude-nativas/_anthropic/examples/skill-creator/eval-viewer/viewer.html` — 4,213 tok (`other`)
- `skills-que-prestam/03-pacote-skills-claude-nativas/skill-creator/eval-viewer/viewer.html` — 4,197 tok (`other`)
- `skills-que-prestam/02-pacote-skills-workspace/pptx/scripts/html2pptx.js` — 3,920 tok (`other`)

## Navegação rápida (obrigatório para agentes)

1. **Skills** → `mapa-claude-e-catalogo-skills/SKILLS-CATALOGO.md` ou `query_claude_index.py skills`
2. **Scripts** → `query_claude_index.py scripts`
3. **Busca** → `query_claude_index.py search <termo>` (FTS5)
4. **Só então** → `Read` no path exato retornado

Não usar `Glob **/skills/**` nem ler `_design/`/`_anthropic/` sem necessidade.

```bash
python3 ~/projetos/scripts/indices/query_claude_index.py skills --clinical
python3 ~/projetos/scripts/indices/query_claude_index.py find engine.py
python3 ~/projetos/scripts/indices/query_claude_index.py agents
```
