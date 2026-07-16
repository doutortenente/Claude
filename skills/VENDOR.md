# Skills vendoradas (terceiros)

Estas skills foram **copiadas de repositórios de terceiros** para dentro do projeto, em vez de
instaladas via `git clone ~/.claude/skills` ou `/plugin install`, porque o ambiente Claude Code on
the web é **efêmero** — instalações fora do repo não persistem entre sessões. Versões **fixadas** no
commit upstream abaixo para rastreabilidade e auditoria (o repo toca credenciais Supabase / dados de
paciente, então mudanças de upstream devem ser revisadas antes de re-sincronizar).

| Skill(s) | Upstream | Commit fixado | Licença | O que foi copiado |
|---|---|---|---|---|
| `skill-creator/` | https://github.com/daymade/claude-code-skills | `96b14eb2cea2ea4f6a15e3e8182c89879e0137fc` | ver `skill-creator/LICENSE.txt` | `daymade-skill/skill-creator/` (completo) |
| 14 skills do superpowers (`brainstorming/`, `systematic-debugging/`, `test-driven-development/`, `requesting-code-review/`, `receiving-code-review/`, `writing-plans/`, `executing-plans/`, `verification-before-completion/`, `using-superpowers/`, `writing-skills/`, `dispatching-parallel-agents/`, `subagent-driven-development/`, `executing-plans/`, `finishing-a-development-branch/`, `using-git-worktrees/`) | https://github.com/obra/superpowers | `6fd4507659784c351abbd2bc264c7162cfd386dc` | MIT — `_vendor/superpowers-LICENSE` | conteúdo de `skills/*` achatado para `.claude/skills/<nome>/` |
| `prompt-improver/` | https://github.com/severity1/claude-code-prompt-improver | `306c325b7c152b537ede6a95ad1a8fc199f637eb` | MIT — `prompt-improver/LICENSE` | `skills/prompt-improver/` + `scripts/` + `nudges/` |
| `supabase/` (v0.1.2) + `supabase-postgres-best-practices/` (v1.1.1) | https://github.com/supabase/agent-skills (oficial Supabase) | sem SHA — instaladas 03-jul-2026 pelo operador via `npx skills add` (caíram em `~/.agents/skills/`, sem `.git`); versões fixadas no frontmatter de cada SKILL.md | MIT (declarada no frontmatter da `supabase-postgres-best-practices`; `supabase` mesmo autor oficial) | tree completo das 2 skills (SKILL.md + `references/` + `assets/`) |
| `book-to-skill/` (v1.2.0) | https://github.com/virgiliojr94/book-to-skill | zip GitHub `master` de ~03-jul-2026, sem SHA | MIT — `book-to-skill/LICENSE.md` | Converte livro/documento (PDF, EPUB, DOCX, HTML, Markdown, texto, RTF, MOBI/AZW via Calibre) em skill de agente estruturada, extraindo frameworks/modelos mentais/princípios/técnicas/anti-padrões — 100% local, sem API; deps opcionais via pip conforme formato (`epub`→ebooklib+beautifulsoup4, `pdf`→pypdf+pdfminer.six, `docx`→python-docx, `rtf`→striprtf, `technical`→docling). Copiado: `SKILL.md`, `README.md`, `LICENSE.md`, `book_to_skill/` (pacote Python completo), `tools/` (discovery_tax.py, validate_skill.py), `scripts/` (extract.py + banner.txt, sem `__pycache__`). Excluído: `tests/`, `.github/`, `docs/`, `mkdocs.yml`, `.gitignore`, `BACKERS.md`, `CHANGELOG.md`, `CONTRIBUTING.md`, `SECURITY.md`, `.git/`. |

### Arsenal de design (`_design/`) — vendorado 19-Jun-2026

Os 3 plugins de design da comunidade + Bencium, **auditados e aprovados** (parecer de segurança em
`~/.claude/.../memory/audit-plugins-comunidade-design.md`). Vivem sob `skills/_design/<plugin>/` com o
tree do upstream preservado (provenance + re-sync trivial); excluídos `.git`/`node_modules`.

| Skill(s) | Upstream | Commit fixado | Licença | O que foi copiado |
|---|---|---|---|---|
| `_design/taste-skill/` (13 sub-skills: brandkit, brutalist, minimalist, soft, stitch, redesign, output, image-to-code, imagegen web/mobile, gpt-tasteskill, taste-skill v1/v2) | https://github.com/Leonxlnx/taste-skill | `5285855df6719b6efb95d5268359e752d3d79045` | MIT — `_design/taste-skill/LICENSE` | tree completo (`assets/`, `examples/`, `scripts/`, `skills/`) |
| `_design/frontend-design-pro/` | https://github.com/claudekit/frontend-design-pro-demo | `756b8d99618b2c4e8a90c89a99f678009468aae3` | sem LICENSE no upstream (público; rever antes de redistribuir) | tree completo (`skills/`, `demos-v01/v02/`, `plans/`) |
| `_design/ui-ux-pro-max/` (7 sub-skills: ui-ux-pro-max, design, design-system, ui-styling, brand, banner-design, slides) | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill | `b7e3af80f6e331f6fb456667b82b12cade7c9d35` (v2.5.0) | MIT — `_design/ui-ux-pro-max/LICENSE` | tree completo (`.claude/skills/`, `cli/`, `src/`, `docs/`, `preview/`) |
| `_design/bencium-controlled-ux-designer/` | https://github.com/bencium/bencium-claude-code-design-skill | clone `--depth 1` (sem SHA — `.git` removido pelo instalador; v1.0.0 do `.claude-plugin`) | sem LICENSE no upstream | `skills/bencium-controlled-ux-designer/` + `README.md` |

**Regra clínica (PHI):** nunca colar dado de paciente em prompt de image-gen (`ui-ux-pro-max`,
`taste-skill/imagegen-*`); não acionar skills de foto stock (Pexels/Unsplash) sobre tela com dado real.

**Por que `_design/` (aninhado) e não achatado:** são ~20 sub-skills com nomes genéricos
(`design`, `design-system`, `brand`) que colidiriam/poluiriam o top-level. Ficam agrupados sob um
parent. Para ativar uma como project-skill num repo, copie/symlinke a pasta com `SKILL.md` específica
para o `.claude/skills/` daquele projeto (vide §Como re-sincronizar). Originalmente instalados via
`claude plugin install` em `~/.claude/` (efêmero) — re-vendorados aqui por isso.

### Skills do ambiente Claude Code (`_anthropic/`) — snapshot 19-Jun-2026

Skills que vêm **pré-carregadas no ambiente Claude Code** (montadas em `/mnt/skills/`),
re-vendoradas aqui a pedido do Dr. Tenente. O ambiente web é efêmero, então capturamos um
snapshot dos diretórios **já extraídos** (não os arquivos `.skill`, que são só os zips
empacotados redundantes). A `session-start-hook/` (top-level) vem de `~/.claude/skills/`.

> ⚠️ **Licença proprietária Anthropic.** Cada skill traz `LICENSE.txt`: *"© 2025 Anthropic,
> PBC. All rights reserved. Use of these materials is governed by your agreement with
> Anthropic."* — **NÃO redistribuir** fora deste repo privado. Não há SHA de upstream
> público; proveniência = snapshot do ambiente em 19-Jun-2026.

| Grupo | Origem | Skills | Licença |
|---|---|---|---|
| `_anthropic/public/` (8) | `/mnt/skills/public/` | `docx`, `pdf`, `pptx`, `xlsx`, `file-reading`, `pdf-reading`, `frontend-design`, `product-self-knowledge` | Proprietary Anthropic (cada uma com `LICENSE.txt`, exceto `product-self-knowledge`) |
| `_anthropic/examples/` (24) | `/mnt/skills/examples/` | catálogo **completo** do `/mnt/skills/examples/` (sem curadoria — ver lista abaixo) | Proprietary Anthropic (`LICENSE.txt`; sem licença em `doc-coauthoring`/`setup-writing-style`) |
| `session-start-hook/` (top-level) | `~/.claude/skills/` | cria SessionStart hooks p/ Claude Code on the web | sem `LICENSE` no upstream |

**`examples/` — catálogo completo (24, sem curadoria):** a pedido do Dr. Tenente, **todas** as 24
skills do `/mnt/skills/examples/` foram vendoradas, sem descarte:
`algorithmic-art`, `benepass-reimbursement`, `brand-guidelines`, `call-to-book`, `cancel-unsubscribe`,
`canvas-design`, `doc-coauthoring`, `event-planning`, `file-expenses`, `file-form`,
`financial-calculator`, `grocery-shopping`, `hire-help`, `internal-comms`, `learn`, `mcp-builder`,
`meal-delivery`, `prescription-refill`, `return-refund`, `setup-writing-style`, `skill-creator`,
`slack-gif-creator`, `theme-factory`, `web-artifacts-builder`.

> Nota: muitas são **demos de consumo** (`grocery-shopping`, `prescription-refill`, `meal-delivery`…)
> fora do escopo dev/clínico — guardadas como referência. `_anthropic/examples/skill-creator/` é a
> versão Anthropic, subconjunto do fork daymade em `skills/skill-creator/` (mantidas as duas).

**Notas:**
- Skills *built-in* invocáveis por `/` (`deep-research`, `verify`, `code-review`, `simplify`, `loop`,
  `claude-api`, `run`, `init`, `review`, `security-review`, `update-config`, `keybindings-help`,
  `fewer-permission-prompts`) **não foram vendoradas**: são embutidas no binário do Claude Code, não
  existem como `SKILL.md` em disco. Já acompanham o CLI em qualquer ambiente.

## Notas de instalação / fiação

### prompt-improver — hooks ATIVOS
Os 3 hooks foram religados em `.claude/settings.json`, apontando para
`${CLAUDE_PROJECT_DIR}/.claude/skills/prompt-improver/scripts/engine.py` (eventos `UserPromptSubmit`,
`PreToolUse` com matcher `EnterPlanMode|Bash`, `SubagentStart`). Requer `python3` no PATH.

- **Roda em todo prompt** (~189 tokens de overhead). O `engine.py` é defensivo: sempre sai com código 0.
- **Bypass**: comece o prompt com `*`, `/` ou `#` para pular a avaliação.
- **Para desativar**: remova o bloco `hooks` de `.claude/settings.json`.
- A resolução de `nudges/` é relativa ao próprio script (`scripts/../nudges`), então independe de
  `CLAUDE_PLUGIN_ROOT`.

### superpowers — sem SessionStart hook
O hook `SessionStart` original (injetava o dispatcher `using-superpowers`) **não** foi religado: ele
depende de um wrapper bash com path relativo de plugin que quebra ao achatar as skills. Não é
necessário — todas as 14 skills são descobertas automaticamente como project skills, incluindo
`using-superpowers`. Para religar manualmente, veja `hooks/hooks.json` no upstream.

### Descartadas na avaliação
`humanizer` (blader) e `fact-check` (petar-nauka) foram avaliadas e **não** incluídas: a primeira é
para prosa estilo marketing (saídas clínicas aqui são dados estruturados); a segunda é checagem de
desinformação de mídia (SIFT/CRAAP), não fato clínico — arriscada em contexto médico.

## Assimilação em massa dos zips — 16-jul-2026

Estas 99 skills vieram dos 13 zips baixados em `~/Downloads` em 03-jul-2026 (código-fonte de
ferramentas/CLIs de terceiros — não pacotes de "skill" isolados), extraídos e catalogados por um
workflow de leitura em 2 rodadas (batedores Haiku/Sonnet + fiscal), que levantou um censo de 359
`SKILL.md` únicas dentro deles. Destas, as skills abaixo foram lidas de fato e julgadas com
aplicabilidade real ao fluxo do operador (dev SASI/Claude Code, redução de dependência de conectores
MCP do claude.ai — critério do operador), sem duplicar o que já existe no arsenal, e foram vendoradas
achatadas no top-level (mesmo padrão das demais skills deste repo). `book-to-skill` e `skill-creator`
foram **PULADAS** de propósito: já existiam no arsenal antes desta assimilação (skill da casa vence,
não sobrescrita).

| Skill | Pacote de origem | Licença |
|---|---|---|
| `security-audit/` | `buildwithclaude-main/agent-triforce` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `artifacts-builder/` | `buildwithclaude-main/all-skills` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `work-pipeline/` | `buildwithclaude-main/agents-uc-taskmanager` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `code-health/` | `buildwithclaude-main/agent-triforce` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `feature-spec/` | `buildwithclaude-main/agent-triforce` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `implement-feature/` | `buildwithclaude-main/agent-triforce` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `release-check/` | `buildwithclaude-main/agent-triforce` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `review-findings/` | `buildwithclaude-main/agent-triforce` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `canvas-design/` | `buildwithclaude-main/all-skills` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `changelog-generator/` | `buildwithclaude-main/all-skills` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `coding-agent-pm/` | `buildwithclaude-main/all-skills` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `content-research-writer/` | `buildwithclaude-main/all-skills` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `envelope-team/` | `buildwithclaude-main/all-skills` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `file-organizer/` | `buildwithclaude-main/all-skills` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `github-automation/` | `buildwithclaude-main/all-skills` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `developer-growth-analysis/` | `buildwithclaude-main/all-skills` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `docx/` | `buildwithclaude-main/all-skills` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `image-enhancer/` | `buildwithclaude-main/all-skills` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `internal-comms/` | `buildwithclaude-main/all-skills` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `invoice-organizer/` | `buildwithclaude-main/all-skills` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `json-canvas/` | `buildwithclaude-main/all-skills` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `mcp-builder/` | `buildwithclaude-main/all-skills` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `meeting-insights-analyzer/` | `buildwithclaude-main/all-skills` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `pdf/` | `buildwithclaude-main/all-skills` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `pptx/` | `buildwithclaude-main/all-skills` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `skyvern/` | `buildwithclaude-main/all-skills` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `morning-ai/` | `buildwithclaude-main/all-skills` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `obsidian-bases/` | `buildwithclaude-main/all-skills` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `obsidian-markdown/` | `buildwithclaude-main/all-skills` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `obsidian-rest-api/` | `buildwithclaude-main/all-skills` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `oiloil-ui-ux-guide/` | `buildwithclaude-main/all-skills` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `supabase-automation/` | `buildwithclaude-main/all-skills` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `tailored-resume-generator/` | `buildwithclaude-main/all-skills` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `theme-factory/` | `buildwithclaude-main/all-skills` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `tracedocs/` | `buildwithclaude-main/all-skills` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `video-downloader/` | `buildwithclaude-main/all-skills` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `webapp-testing/` | `buildwithclaude-main/all-skills` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `xlsx/` | `buildwithclaude-main/all-skills` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `architecture/` | `buildwithclaude-main/plugins/cc-best` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `testing/` | `buildwithclaude-main/plugins/cc-best` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `ops-orchestrate/` | `buildwithclaude-main/plugins/claude-ops` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `ops-speedup/` | `buildwithclaude-main/plugins/claude-ops` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `ops-integrate/` | `buildwithclaude-main/plugins/claude-ops` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `color-curator/` | `buildwithclaude-main/plugins/frontend-design-pro` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `design-wizard/` | `buildwithclaude-main/plugins/frontend-design-pro` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `inspiration-analyzer/` | `buildwithclaude-main/plugins/frontend-design-pro` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `typography-selector/` | `buildwithclaude-main/plugins/frontend-design-pro` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `drill-me/` | `buildwithclaude-main/plugins/drill-me` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `drill-status/` | `buildwithclaude-main/plugins/drill-me` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `add-phase/` | `buildwithclaude-main/plugins/gsd` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `add-tests/` | `buildwithclaude-main/plugins/gsd` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `analyze-dependencies/` | `buildwithclaude-main/plugins/gsd` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `audit-fix/` | `buildwithclaude-main/plugins/gsd` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `audit-milestone/` | `buildwithclaude-main/plugins/gsd` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `audit-uat/` | `buildwithclaude-main/plugins/gsd` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `code-review/` | `buildwithclaude-main/plugins/gsd` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `debug/` | `buildwithclaude-main/plugins/gsd` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `docs-update/` | `buildwithclaude-main/plugins/gsd` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `execute-phase/` | `buildwithclaude-main/plugins/gsd/skills/execute-phase` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `explore/` | `buildwithclaude-main/plugins/gsd/skills/explore` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `graphify/` | `buildwithclaude-main/plugins/gsd/skills/graphify` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `inbox/` | `buildwithclaude-main/plugins/gsd/skills/inbox` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `new-milestone/` | `buildwithclaude-main/plugins/gsd/skills/new-milestone` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `note/` | `buildwithclaude-main/plugins/gsd/skills/note` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `plan-phase/` | `buildwithclaude-main/plugins/gsd/skills/plan-phase` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `plant-seed/` | `buildwithclaude-main/plugins/gsd/skills/plant-seed` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `pr-branch/` | `buildwithclaude-main/plugins/gsd/skills/pr-branch` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `map-codebase/` | `buildwithclaude-main/plugins/gsd/skills/map-codebase` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `resume-at/` | `buildwithclaude-main/plugins/gsd/skills/resume-at` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `thread/` | `buildwithclaude-main/plugins/gsd/skills/thread` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `ui-review/` | `buildwithclaude-main/plugins/gsd/skills/ui-review` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `scan/` | `buildwithclaude-main/plugins/gsd/skills/scan` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `session-report/` | `buildwithclaude-main/plugins/gsd/skills/session-report` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `ship/` | `buildwithclaude-main/plugins/gsd/skills/ship` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `brief/` | `buildwithclaude-main/plugins/origin/skills/brief` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `capture/` | `buildwithclaude-main/plugins/origin/skills/capture` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `debrief/` | `buildwithclaude-main/plugins/origin/skills/debrief` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `distill/` | `buildwithclaude-main/plugins/origin/skills/distill` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `meeting/` | `buildwithclaude-main/plugins/meeting-bots` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `thumbgate/` | `buildwithclaude-main/plugins/thumbgate` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `forget/` | `buildwithclaude-main/plugins/origin` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `handoff/` | `buildwithclaude-main/plugins/origin` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `read/` | `buildwithclaude-main/plugins/origin` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `recall/` | `buildwithclaude-main/plugins/origin` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `public-plugin-builder/` | `buildwithclaude-main/plugins/public-plugin-builder` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `ralph-review-trio/` | `buildwithclaude-main/plugins/ralph-review-trio` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `ultracost/` | `buildwithclaude-main/plugins/ultracost` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `youtube-full/` | `buildwithclaude-main/plugins/youtube-full` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |
| `a11y-debugging/` | `chrome-devtools-mcp-main` | Apache-2.0 (Google) |
| `chrome-devtools-cli/` | `chrome-devtools-mcp-main` | Apache-2.0 (Google) |
| `vercel-cli/` | `vercel-main` | Apache-2.0 |
| `debug-optimize-lcp/` | `chrome-devtools-mcp-main` | Apache-2.0 (Google) |
| `context7-docs/` | `context7-master/packages/pi` | MIT (Upstash) |
| `context7-cli/` | `context7-master` | MIT (Upstash) |
| `context7-mcp/` | `context7-master` | MIT (Upstash) |
| `find-docs/` | `context7-master` | MIT (Upstash) |
| `prompt/` | `mcp-steroid-main/prompts/src/main/prompts/prompt` | Apache-2.0 (JetBrains) |
| `link-workspace-packages/` | `supabase-js-master/.agents/skills` | MIT |
| `slack-message-formatter/` | `buildwithclaude-main/plugins/all-skills/skills/slack-message-formatter` | varia por skill (marketplace davepoon) — ver LICENSE.txt na pasta, quando presente |


**Notas:**
- Licença "varia por skill (marketplace davepoon)" = pacote `buildwithclaude-main` é um marketplace
  agregador de ~300 `SKILL.md` de autores distintos; algumas trazem `LICENSE.txt` próprio (inclusive
  de skills empacotadas pela própria Anthropic) — checar a pasta de cada skill antes de redistribuir.
- Zips-fonte permanecem intactos em `~/Downloads` (não fazem parte deste repo).

## Como re-sincronizar com o upstream
1. `git clone <upstream>` num diretório temporário.
2. Comparar mudanças desde o commit fixado acima; revisar diffs de qualquer `scripts/`/hook.
3. Re-copiar os subtrees, atualizar os SHAs nesta tabela.
