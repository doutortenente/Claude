# Catálogo de Skills — Claude

> Gerado 24-jun-2026 · **leia isto antes de varrer `skills/` com Read/Glob.**
> Regenerar: `python3 memory/scripts/build_claude_index.py`

## Clínicas (UTI)

- **admissao-uti** — `skills/admissao-uti/SKILL.md`
  Gera nota de admissão de UTI no formato fixo do Comando Tático UCI (Dr. Nicolas Nagaita) a partir de input livre — texto, foto de prontuário, transferência de PS/enfermaria, laudos. Use SEMPRE que Dr.…
- **controles-vitais-janela** — `skills/controles-vitais-janela/SKILL.md`
- **sasi-ingest-export** — `skills/sasi-ingest-export/SKILL.md`
  Extrai dados clínicos estruturados a partir de fotos de folhas de enfermagem, PDFs/imagens de laboratório, laudos de imagem e texto livre para o sistema SASI (Comando UTI Alpha — 33 leitos UTI 2/3/4) …

## Desenvolvimento (superpowers)

- **babysit** — `skills/babysit/SKILL.md`
  Mantém um PR pronto pra merge — tria comentários, resolve conflitos claros e conserta o CI num loop. Use quando o usuário pedir pra "cuidar", "babá", deixar um …
- **brainstorming** — `skills/brainstorming/SKILL.md`
  You MUST use this before any creative work - creating features, building components, adding functionality, or modifying behavior. Explores user intent, requirem…
- **create-skill** — `skills/create-skill/SKILL.md`
  Cria Agent Skills pro Claude Code. Use ao criar uma skill nova ou ao perguntar sobre a estrutura do SKILL.md.
- **create-subagent** — `skills/create-subagent/SKILL.md`
  Cria subagentes customizados pro Claude Code. Use quando o usuário quiser criar um novo tipo de subagente, montar agentes pra tarefas específicas (revisor de có…
- **dispatching-parallel-agents** — `skills/dispatching-parallel-agents/SKILL.md`
  Use when facing 2+ independent tasks that can be worked on without shared state or sequential dependencies
- **executing-plans** — `skills/executing-plans/SKILL.md`
  Use when you have a written implementation plan to execute in a separate session with review checkpoints
- **finishing-a-development-branch** — `skills/finishing-a-development-branch/SKILL.md`
  Use when implementation is complete, all tests pass, and you need to decide how to integrate the work - guides completion of development work by presenting stru…
- **prompt-improver** — `skills/prompt-improver/SKILL.md`
  This skill enriches vague prompts with targeted research and clarification before execution. Should be used when a prompt is determined to be vague and requires…
- **receiving-code-review** — `skills/receiving-code-review/SKILL.md`
  Use when receiving code review feedback, before implementing suggestions, especially if feedback seems unclear or technically questionable - requires technical …
- **requesting-code-review** — `skills/requesting-code-review/SKILL.md`
  Use when completing tasks, implementing major features, or before merging to verify work meets requirements
- **skill-creator** — `skills/skill-creator/SKILL.md`
  Create new skills, modify and improve existing skills, and measure skill performance. Use when users want to create a skill from scratch, edit, or optimize an e…
- **split-to-prs** — `skills/split-to-prs/SKILL.md`
  Quebra o trabalho atual em PRs pequenos e revisáveis. Use quando o usuário pedir pra dividir um chat, conjunto de mudanças, branch ou PR em pedaços menores.
- **startup-hook-skill** — `skills/session-start-hook/SKILL.md`
  Creating and developing startup hooks for Claude Code on the web. Use when the user wants to set up a repository for Claude Code on the web, create a SessionSta…
- **subagent-driven-development** — `skills/subagent-driven-development/SKILL.md`
  Use when executing implementation plans with independent tasks in the current session
- **systematic-debugging** — `skills/systematic-debugging/SKILL.md`
  Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes
- **test-driven-development** — `skills/test-driven-development/SKILL.md`
  Use when implementing any feature or bugfix, before writing implementation code
- **using-git-worktrees** — `skills/using-git-worktrees/SKILL.md`
  Use when starting feature work that needs isolation from current workspace or before executing implementation plans - ensures an isolated workspace exists via n…
- **using-superpowers** — `skills/using-superpowers/SKILL.md`
  Use when starting any conversation - establishes how to find and use skills, requiring Skill tool invocation before ANY response including clarifying questions
- **verification-before-completion** — `skills/verification-before-completion/SKILL.md`
  Use when about to claim work is complete, fixed, or passing, before committing or creating PRs - requires running verification commands and confirming output be…
- **writing-plans** — `skills/writing-plans/SKILL.md`
  Use when you have a spec or requirements for a multi-step task, before touching code
- **writing-skills** — `skills/writing-skills/SKILL.md`
  Use when creating new skills, editing existing skills, or verifying skills work before deployment

## Design (`_design/` — carregar sob demanda)

- **brandkit** — `skills/_design/taste-skill/skills/brandkit/SKILL.md`
- **ckm:banner-design** — `skills/_design/ui-ux-pro-max/.claude/skills/banner-design/SKILL.md`
- **ckm:brand** — `skills/_design/ui-ux-pro-max/.claude/skills/brand/SKILL.md`
- **ckm:design** — `skills/_design/ui-ux-pro-max/.claude/skills/design/SKILL.md`
- **ckm:design-system** — `skills/_design/ui-ux-pro-max/.claude/skills/design-system/SKILL.md`
- **ckm:slides** — `skills/_design/ui-ux-pro-max/.claude/skills/slides/SKILL.md`
- **ckm:ui-styling** — `skills/_design/ui-ux-pro-max/.claude/skills/ui-styling/SKILL.md`
- **design-taste-frontend** — `skills/_design/taste-skill/skills/taste-skill/SKILL.md`
- **design-taste-frontend-v1** — `skills/_design/taste-skill/skills/taste-skill-v1/SKILL.md`
- **frontend-design-pro** — `skills/_design/frontend-design-pro/skills/frontend-design-pro/SKILL.md`
- **full-output-enforcement** — `skills/_design/taste-skill/skills/output-skill/SKILL.md`
- **gpt-taste** — `skills/_design/taste-skill/skills/gpt-tasteskill/SKILL.md`
- **high-end-visual-design** — `skills/_design/taste-skill/skills/soft-skill/SKILL.md`
- **image-to-code** — `skills/_design/taste-skill/skills/image-to-code-skill/SKILL.md`
- **imagegen-frontend-mobile** — `skills/_design/taste-skill/skills/imagegen-frontend-mobile/SKILL.md`
- **imagegen-frontend-web** — `skills/_design/taste-skill/skills/imagegen-frontend-web/SKILL.md`
- **industrial-brutalist-ui** — `skills/_design/taste-skill/skills/brutalist-skill/SKILL.md`
- **minimalist-ui** — `skills/_design/taste-skill/skills/minimalist-skill/SKILL.md`
- **redesign-existing-projects** — `skills/_design/taste-skill/skills/redesign-skill/SKILL.md`
- **stitch-design-taste** — `skills/_design/taste-skill/skills/stitch-skill/SKILL.md`
- **ui-ux-pro-max** — `skills/_design/ui-ux-pro-max/.claude/skills/ui-ux-pro-max/SKILL.md`

## Anthropic (`_anthropic/` — sob demanda)

- **algorithmic-art** — `skills/_anthropic/examples/algorithmic-art/SKILL.md`
- **benepass-reimbursement** — `skills/_anthropic/examples/benepass-reimbursement/SKILL.md`
- **brand-guidelines** — `skills/_anthropic/examples/brand-guidelines/SKILL.md`
- **call-to-book** — `skills/_anthropic/examples/call-to-book/SKILL.md`
- **cancel-unsubscribe** — `skills/_anthropic/examples/cancel-unsubscribe/SKILL.md`
- **canvas-design** — `skills/_anthropic/examples/canvas-design/SKILL.md`
- **doc-coauthoring** — `skills/_anthropic/examples/doc-coauthoring/SKILL.md`
- **docx** — `skills/_anthropic/public/docx/SKILL.md`
- **event-planning** — `skills/_anthropic/examples/event-planning/SKILL.md`
- **file-expenses** — `skills/_anthropic/examples/file-expenses/SKILL.md`
- **file-form** — `skills/_anthropic/examples/file-form/SKILL.md`
- **file-reading** — `skills/_anthropic/public/file-reading/SKILL.md`
- **financial-calculator** — `skills/_anthropic/examples/financial-calculator/SKILL.md`
- **frontend-design** — `skills/_anthropic/public/frontend-design/SKILL.md`
- **grocery-shopping** — `skills/_anthropic/examples/grocery-shopping/SKILL.md`
- **hire-help** — `skills/_anthropic/examples/hire-help/SKILL.md`
- **internal-comms** — `skills/_anthropic/examples/internal-comms/SKILL.md`
- **learn** — `skills/_anthropic/examples/learn/SKILL.md`
- **mcp-builder** — `skills/_anthropic/examples/mcp-builder/SKILL.md`
- **meal-delivery** — `skills/_anthropic/examples/meal-delivery/SKILL.md`
- **pdf** — `skills/_anthropic/public/pdf/SKILL.md`
- **pdf-reading** — `skills/_anthropic/public/pdf-reading/SKILL.md`
- **pptx** — `skills/_anthropic/public/pptx/SKILL.md`
- **prescription-refill** — `skills/_anthropic/examples/prescription-refill/SKILL.md`
- **product-self-knowledge** — `skills/_anthropic/public/product-self-knowledge/SKILL.md`
- **return-refund** — `skills/_anthropic/examples/return-refund/SKILL.md`
- **setup-writing-style** — `skills/_anthropic/examples/setup-writing-style/SKILL.md`
- **slack-gif-creator** — `skills/_anthropic/examples/slack-gif-creator/SKILL.md`
- **theme-factory** — `skills/_anthropic/examples/theme-factory/SKILL.md`
- **web-artifacts-builder** — `skills/_anthropic/examples/web-artifacts-builder/SKILL.md`
- **xlsx** — `skills/_anthropic/public/xlsx/SKILL.md`

## Consulta rápida

```bash
python3 memory/scripts/query_claude_index.py skills
python3 memory/scripts/query_claude_index.py skill sasi-ingest-export
python3 memory/scripts/query_claude_index.py scripts
python3 memory/scripts/query_claude_index.py search zero alucinação
```
