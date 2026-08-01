# Catálogo de Skills — Claude

> Gerado 28-jul-2026 · **leia isto antes de varrer `skills/` com Read/Glob.**
> Regenerar: `python3 ~/projetos/scripts/indices/build_claude_index.py`

## Clínicas (UTI)

- **admissao-uti** — `skills/admissao-uti/SKILL.md`
  Gera nota de admissão de UTI no formato fixo do Comando Tático UCI (Dr. Nicolas Nagaita) a partir de input livre —
  texto, foto de prontuário, transferência de PS/enfermaria, laudos. Use SEMPRE que Dr.…
- **controles-vitais-janela** — `skills/controles-vitais-janela/SKILL.md`
- **sasi-ingest-export** — `skills/sasi-ingest-export/SKILL.md`
  Extrai dados clínicos estruturados a partir de fotos de folhas de enfermagem, PDFs/imagens de laboratório, laudos de
  imagem e texto livre para o sistema SASI (Comando UTI Alpha — 33 leitos UTI 2/3/4) …

## Desenvolvimento (superpowers)

- **a11y-debugging** — `skills/a11y-debugging/SKILL.md`
  Uses Chrome DevTools MCP for accessibility (a11y) debugging and auditing based on web.dev guidelines. Use when testing
  semantic HTML, ARIA labels, focus states,…
- **analise-ecott** — `skills/analise-ecott/SKILL.md`
  Interpreta ecocardiograma para paciente de UTI adulto a partir de DOIS tipos de fonte — (A) POCUS/ultrassom
  point-of-care à beira-leito feito pelo próprio inten…
- **architecture** — `skills/architecture/SKILL.md`
  Architecture design skill with ADR records, system design checklists, scalability assessment, and architecture
  patterns
- **artifacts-builder** — `skills/artifacts-builder/SKILL.md`
  Suite of tools for creating elaborate, multi-component claude.ai HTML artifacts using modern frontend web technologies
  (React, Tailwind CSS, shadcn/ui). Use for…
- **babysit** — `skills/babysit/SKILL.md`
  Mantém um PR pronto pra merge — tria comentários, resolve conflitos claros e conserta o CI num loop. Use quando o
  usuário pedir pra "cuidar", "babá", deixar um …
- **book-to-skill** — `skills/book-to-skill/SKILL.md`
  Converts books and documents (PDF, EPUB, DOCX, HTML, Markdown, plain text, RTF, MOBI/AZW with Calibre) into structured
  agent skills, extracting frameworks, ment…
- **brainstorming** — `skills/brainstorming/SKILL.md`
  You MUST use this before any creative work - creating features, building components, adding functionality, or
  modifying behavior. Explores user intent, requirem…
- **canvas-design** — `skills/canvas-design/SKILL.md`
  Create beautiful visual art in .png and .pdf documents using design philosophy. You should use this skill when the
  user asks to create a poster, piece of art, d…
- **changelog-generator** — `skills/changelog-generator/SKILL.md`
  Automatically creates user-facing changelogs from git commits by analyzing commit history, categorizing changes, and
  transforming technical commits into clear, …
- **chrome-devtools-cli** — `skills/chrome-devtools-cli/SKILL.md`
  Use this skill to write shell scripts or run shell commands to automate tasks in the browser or otherwise use Chrome
  DevTools via CLI.
- **code-health** — `skills/code-health/SKILL.md`
  Scans the codebase for dead code, tech debt, outdated dependencies, and code quality issues. Delegates to the
  Centinela (QA) agent.
- **coding-agent-pm** — `skills/coding-agent-pm/SKILL.md`
  Plan, delegate, review, and recover coding-agent implementation work with tight scope control, acceptance criteria,
  and validation.
- **content-research-writer** — `skills/content-research-writer/SKILL.md`
  Assists in writing high-quality content by conducting research, adding citations, improving hooks, iterating on
  outlines, and providing real-time feedback on ea…
- **context7-cli** — `skills/context7-cli/SKILL.md`
  Use the ctx7 CLI to fetch library documentation, manage AI coding skills, and configure Context7 MCP. Activate when
  the user mentions "ctx7" or "context7", need…
- **context7-docs** — `skills/context7-docs/SKILL.md`
  -
- **context7-mcp** — `skills/context7-mcp/SKILL.md`
  This skill should be used when the user asks about libraries, frameworks, API references, or needs code examples.
  Activates for setup questions, code generation…
- **create-skill** — `skills/create-skill/SKILL.md`
  Cria Agent Skills pro Claude Code. Use ao criar uma skill nova ou ao perguntar sobre a estrutura do SKILL.md.
- **create-subagent** — `skills/create-subagent/SKILL.md`
  Cria subagentes customizados pro Claude Code. Use quando o usuário quiser criar um novo tipo de subagente, montar
  agentes pra tarefas específicas (revisor de có…
- **debug-optimize-lcp** — `skills/debug-optimize-lcp/SKILL.md`
  Guides debugging and optimizing Largest Contentful Paint (LCP) using Chrome DevTools MCP tools. Use this skill
  whenever the user asks about LCP performance, slo…
- **developer-growth-analysis** — `skills/developer-growth-analysis/SKILL.md`
  Analyzes your recent Claude Code chat history to identify coding patterns, development gaps, and areas for
  improvement, curates relevant learning resources from…
- **dispatching-parallel-agents** — `skills/dispatching-parallel-agents/SKILL.md`
  Use when facing 2+ independent tasks that can be worked on without shared state or sequential dependencies
- **docx** — `skills/docx/SKILL.md`
  Comprehensive document creation, editing, and analysis with support for tracked changes, comments, formatting
  preservation, and text extraction. When Claude nee…
- **drill-me** — `skills/drill-me/SKILL.md`
  Teach the user a topic as an adaptive tutor — retrieval practice, spaced repetition with decay, and persistent memory
  in ~/.drill-me/. Use when the user wants t…
- **drill-status** — `skills/drill-status/SKILL.md`
  Show drill-me learning progress — topics studied, cards due for review, weakest concepts, and what to study next. Use
  when the user asks what's due, how their l…
- **envelope-team** — `skills/envelope-team/SKILL.md`
  Design and generate .envelope.json AI agent team definitions — the open standard for multi-agent teams with hierarchy,
  access policies, human-in-the-loop gates,…
- **executing-plans** — `skills/executing-plans/SKILL.md`
  Use when you have a written implementation plan to execute in a separate session with review checkpoints
- **feature-spec** — `skills/feature-spec/SKILL.md`
  Creates a complete product feature specification with acceptance criteria, scope, dependencies, and risks. Delegates
  to the Prometeo (PM) agent.
- **file-organizer** — `skills/file-organizer/SKILL.md`
  Intelligently organizes your files and folders across your computer by understanding context, finding duplicates,
  suggesting better structures, and automating c…
- **find-docs** — `skills/find-docs/SKILL.md`
  -
- **finishing-a-development-branch** — `skills/finishing-a-development-branch/SKILL.md`
  Use when implementation is complete, all tests pass, and you need to decide how to integrate the work - guides
  completion of development work by presenting stru…
- **github-automation** — `skills/github-automation/SKILL.md`
  Automate GitHub repositories, issues, pull requests, branches, CI/CD, and permissions via Rube MCP (Composio). Manage
  code workflows, review PRs, search code, a…
- **gsd-graphify** — `skills/gsd-graphify/SKILL.md`
  Build, query, and inspect the project knowledge graph in .planning/graphs/
- **gsd:add-phase** — `skills/add-phase/SKILL.md`
  Add phase to end of current milestone in roadmap
- **gsd:add-tests** — `skills/add-tests/SKILL.md`
  Generate tests for a completed phase based on UAT criteria and implementation
- **gsd:analyze-dependencies** — `skills/analyze-dependencies/SKILL.md`
  Analyze phase dependencies and suggest Depends on entries for ROADMAP.md
- **gsd:audit-fix** — `skills/audit-fix/SKILL.md`
  Autonomous audit-to-fix pipeline — find issues, classify, fix, test, commit
- **gsd:audit-milestone** — `skills/audit-milestone/SKILL.md`
  Audit milestone completion against original intent before archiving
- **gsd:audit-uat** — `skills/audit-uat/SKILL.md`
  Cross-phase audit of all outstanding UAT and verification items
- **gsd:code-review** — `skills/code-review/SKILL.md`
  Review source files changed during a phase for bugs, security issues, and code quality problems
- **gsd:debug** — `skills/debug/SKILL.md`
  Systematic debugging with persistent state across context resets
- **gsd:docs-update** — `skills/docs-update/SKILL.md`
  Generate or update project documentation verified against the codebase
- **gsd:execute-phase** — `skills/execute-phase/SKILL.md`
  Execute all plans in a phase with wave-based parallelization
- **gsd:explore** — `skills/explore/SKILL.md`
  Socratic ideation and idea routing — think through ideas before committing to plans
- **gsd:inbox** — `skills/inbox/SKILL.md`
  Triage and review all open GitHub issues and PRs against project templates and contribution guidelines
- **gsd:map-codebase** — `skills/map-codebase/SKILL.md`
  Analyze codebase with parallel mapper agents to produce .planning/codebase/ documents
- **gsd:new-milestone** — `skills/new-milestone/SKILL.md`
  Start a new milestone cycle — update PROJECT.md and route to requirements
- **gsd:note** — `skills/note/SKILL.md`
  Zero-friction idea capture. Append, list, or promote notes to todos.
- **gsd:plan-phase** — `skills/plan-phase/SKILL.md`
  Create detailed phase plan (PLAN.md) with verification loop
- **gsd:plant-seed** — `skills/plant-seed/SKILL.md`
  Capture a forward-looking idea with trigger conditions — surfaces automatically at the right milestone
- **gsd:pr-branch** — `skills/pr-branch/SKILL.md`
  Create a clean PR branch by filtering out .planning/ commits — ready for code review
- **gsd:resume-at** — `skills/resume-at/SKILL.md`
  Schedule a future resume of work - e.g. '/gsd:resume-at 09:00', '/gsd:resume-at +2h', or '/gsd:resume-at 04:00 --cmd
  /gsd:execute-phase 9
- **gsd:scan** — `skills/scan/SKILL.md`
  Rapid codebase assessment — lightweight alternative to /gsd:map-codebase
- **gsd:session-report** — `skills/session-report/SKILL.md`
  Generate a session report with token usage estimates, work summary, and outcomes
- **gsd:ship** — `skills/ship/SKILL.md`
  Create PR, run review, and prepare for merge after verification passes
- **gsd:thread** — `skills/thread/SKILL.md`
  Manage persistent context threads for cross-session work
- **gsd:ui-review** — `skills/ui-review/SKILL.md`
  Retroactive 6-pillar visual audit of implemented frontend code
- **hemodinamica-calculada** — `skills/hemodinamica-calculada/SKILL.md`
  Calculadora hemodinâmica determinística por ecocardiografia para UTI adulto. Recebe parâmetros do eco (diâmetro e VTI
  da VSVE, FC, PAM, PVC, VCI, jato tricúspid…
- **humanizer** — `skills/humanizer/SKILL.md`
  |
- **image-enhancer** — `skills/image-enhancer/SKILL.md`
  Improves the quality of images, especially screenshots, by enhancing resolution, sharpness, and clarity. Perfect for
  preparing images for presentations, documen…
- **implement-feature** — `skills/implement-feature/SKILL.md`
  Implements a feature from its specification. Reads the spec, designs architecture, writes code and tests. Delegates to
  the Forja (Dev) agent.
- **internal-comms** — `skills/internal-comms/SKILL.md`
  A set of resources to help me write all kinds of internal communications, using the formats that my company likes to
  use. Claude should use this skill whenever …
- **invoice-organizer** — `skills/invoice-organizer/SKILL.md`
  Automatically organizes invoices and receipts for tax preparation by reading messy files, extracting key information,
  renaming them consistently, and sorting th…
- **json-canvas** — `skills/json-canvas/SKILL.md`
  Create and edit JSON Canvas files (.canvas) with nodes, edges, groups, and connections. Use when working with .canvas
  files, creating visual canvases, mind maps…
- **link-workspace-packages** — `skills/link-workspace-packages/SKILL.md`
  Link workspace packages in monorepos (npm, yarn, pnpm, bun). USE WHEN: (1) you just created or generated new packages
  and need to wire up their dependencies, (2…
- **mcp-builder** — `skills/mcp-builder/SKILL.md`
  Guide for creating high-quality MCP (Model Context Protocol) servers that enable LLMs to interact with external
  services through well-designed tools. Use when b…
- **meeting** — `skills/meeting/SKILL.md`
  Convene a meeting of AI personas (3 to 10 participants) who debate a subject and reach a synthesis. Teams adapt to the
  theme (dev, design, product, business, li…
- **meeting-insights-analyzer** — `skills/meeting-insights-analyzer/SKILL.md`
  Analyzes meeting transcripts and recordings to uncover behavioral patterns, communication insights, and actionable
  feedback. Identifies when you avoid conflict,…
- **morning-ai** — `skills/morning-ai/SKILL.md`
  AI news tracking skill that monitors 80+ entities across 6 free sources (Reddit, HN, GitHub, HuggingFace, arXiv,
  X/Twitter). Generates scored daily reports with…
- **obsidian-bases** — `skills/obsidian-bases/SKILL.md`
  Create and edit Obsidian Bases (.base files) with views, filters, formulas, and summaries. Use when working with .base
  files, creating database-like views of no…
- **obsidian-markdown** — `skills/obsidian-markdown/SKILL.md`
  Create and edit Obsidian Flavored Markdown with wikilinks, embeds, callouts, properties, and other Obsidian-specific
  syntax. Use when working with .md files in …
- **obsidian-rest-api** — `skills/obsidian-rest-api/SKILL.md`
  Call the Obsidian Local REST API directly (over HTTP) for vault operations the mcp__obsidian__* tools do NOT expose —
  move/rename a note, overwrite a whole file…
- **oiloil-ui-ux-guide** — `skills/oiloil-ui-ux-guide/SKILL.md`
  Modern, clean UI/UX guidance + review skill. Use when you need actionable UX/UI recommendations, design principles, or
  a design review checklist for new feature…
- **ops-integrate** — `skills/ops-integrate/SKILL.md`
  Add any SaaS API as a first-class integration. Provide the service name — ops-integrate discovers auth patterns, tests
  connectivity, and registers the API in yo…
- **ops-orchestrate** — `skills/ops-orchestrate/SKILL.md`
  Autonomous multi-project orchestration engine. Audits all registered projects, structures work into dependency-wired
  tasks, dispatches parallel agents (subagent…
- **ops-speedup** — `skills/ops-speedup/SKILL.md`
  Cross-platform, hardware-adaptive system optimizer. Auto-detects macOS / Linux / WSL / Windows (MINGW/Cygwin/MSYS2)
  and CPU/RAM/disk/GPU profile, then picks the…
- **pdf** — `skills/pdf/SKILL.md`
  Comprehensive PDF manipulation toolkit for extracting text and tables, creating new PDFs, merging/splitting documents,
  and handling forms. When Claude needs to …
- **plantao** — `skills/plantao/SKILL.md`
- **pptx** — `skills/pptx/SKILL.md`
  Presentation creation, editing, and analysis. When Claude needs to work with presentations (.pptx files) for: (1)
  Creating new presentations, (2) Modifying or e…
- **prompt-improver** — `skills/prompt-improver/SKILL.md`
  This skill enriches vague prompts with targeted research and clarification before execution. Should be used when a
  prompt is determined to be vague and requires…
- **public-plugin-builder** — `skills/public-plugin-builder/SKILL.md`
- **ralph-review-trio** — `skills/ralph-review-trio/SKILL.md`
  Run a sequential three-tier code review on a finished implementation branch — Haiku (surface) → Sonnet (logic) → Opus
  (deep). Restarts from Tier 1 on any tier f…
- **receiving-code-review** — `skills/receiving-code-review/SKILL.md`
  Use when receiving code review feedback, before implementing suggestions, especially if feedback seems unclear or
  technically questionable - requires technical …
- **release-check** — `skills/release-check/SKILL.md`
  Pre-release verification checklist. Validates features, tests, docs, security, and quality gates before shipping.
  Delegates to the Centinela (QA) agent.
- **requesting-code-review** — `skills/requesting-code-review/SKILL.md`
  Use when completing tasks, implementing major features, or before merging to verify work meets requirements
- **review-findings** — `skills/review-findings/SKILL.md`
  Addresses and fixes findings from a QA code review. Reads the review report, fixes critical and warning issues, and
  prepares for re-verification. Delegates to t…
- **security-audit** — `skills/security-audit/SKILL.md`
  Deep security audit covering OWASP Top 10, authentication, authorization, data protection, dependency vulnerabilities,
  and secrets scanning. Delegates to the Ce…
- **skill-creator** — `skills/skill-creator/SKILL.md`
  Create new skills, modify and improve existing skills, and measure skill performance. Use when users want to create a
  skill from scratch, edit, or optimize an e…
- **skyvern** — `skills/skyvern/SKILL.md`
  AI-powered browser automation — navigate sites, fill forms, extract structured data, log in with stored credentials,
  and build reusable multi-step workflows usi…
- **slack-message-formatter** — `skills/slack-message-formatter/SKILL.md`
  |
- **split-to-prs** — `skills/split-to-prs/SKILL.md`
  Quebra o trabalho atual em PRs pequenos e revisáveis. Use quando o usuário pedir pra dividir um chat, conjunto de
  mudanças, branch ou PR em pedaços menores.
- **startup-hook-skill** — `skills/session-start-hook/SKILL.md`
  Creating and developing startup hooks for Claude Code on the web. Use when the user wants to set up a repository for
  Claude Code on the web, create a SessionSta…
- **subagent-driven-development** — `skills/subagent-driven-development/SKILL.md`
  Use when executing implementation plans with independent tasks in the current session
- **supabase** — `skills/supabase/SKILL.md`
  Use when doing ANY task involving Supabase. Triggers: Supabase products (Database, Auth, Edge Functions, Realtime,
  Storage, Vectors, Cron, Queues); client libra…
- **supabase-automation** — `skills/supabase-automation/SKILL.md`
  Automate Supabase database queries, table management, project administration, storage, edge functions, and SQL
  execution via Rube MCP (Composio). Always search …
- **supabase-postgres-best-practices** — `skills/supabase-postgres-best-practices/SKILL.md`
  Postgres performance optimization and best practices from Supabase. Use this skill when writing, reviewing, or
  optimizing Postgres queries, schema designs, or d…
- **systematic-debugging** — `skills/systematic-debugging/SKILL.md`
  Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes
- **tailored-resume-generator** — `skills/tailored-resume-generator/SKILL.md`
  Analyzes job descriptions and generates tailored resumes that highlight relevant experience, skills, and achievements
  to maximize interview chances
- **test-driven-development** — `skills/test-driven-development/SKILL.md`
  Use when implementing any feature or bugfix, before writing implementation code
- **testing** — `skills/testing/SKILL.md`
  Testing strategies and methodologies including TDD, E2E testing, and multi-framework support
- **theme-factory** — `skills/theme-factory/SKILL.md`
  Toolkit for styling artifacts with a theme. These artifacts can be slides, docs, reportings, HTML landing pages, etc.
  There are 10 pre-set themes with colors/fo…
- **tracedocs** — `skills/tracedocs/SKILL.md`
  Turn any codebase into evidence-grounded Markdown docs plus a machine-readable index.json. Every claim cites its
  source; never invents deployment steps.
- **ultracost** — `skills/ultracost/SKILL.md`
  Quality-first per-stage model routing AND a pre-flight cost gate for Claude Code dynamic workflows. Use when authoring
  or running ultracode / dynamic-workflow s…
- **using-git-worktrees** — `skills/using-git-worktrees/SKILL.md`
  Use when starting feature work that needs isolation from current workspace or before executing implementation plans -
  ensures an isolated workspace exists via n…
- **using-superpowers** — `skills/using-superpowers/SKILL.md`
  Use when starting any conversation - establishes how to find and use skills, requiring Skill tool invocation before
  ANY response including clarifying questions
- **vercel-cli** — `skills/vercel-cli/SKILL.md`
  Deploy, manage, inspect, and troubleshoot Vercel projects from the command line. Use for Vercel deployments, projects
  and teams, environment variables, domains …
- **verification-before-completion** — `skills/verification-before-completion/SKILL.md`
  Use when about to claim work is complete, fixed, or passing, before committing or creating PRs - requires running
  verification commands and confirming output be…
- **video-downloader** — `skills/video-downloader/SKILL.md`
  Download YouTube videos with customizable quality and format options. Use this skill when the user asks to download,
  save, or grab YouTube videos. Supports vari…
- **webapp-testing** — `skills/webapp-testing/SKILL.md`
  Toolkit for interacting with and testing local web applications using Playwright. Supports verifying frontend
  functionality, debugging UI behavior, capturing br…
- **writing-plans** — `skills/writing-plans/SKILL.md`
  Use when you have a spec or requirements for a multi-step task, before touching code
- **writing-skills** — `skills/writing-skills/SKILL.md`
  Use when creating new skills, editing existing skills, or verifying skills work before deployment
- **xlsx** — `skills/xlsx/SKILL.md`
  Comprehensive spreadsheet creation, editing, and analysis with support for formulas, formatting, data analysis, and
  visualization. When Claude needs to work wit…
- **youtube-full** — `skills/youtube-full/SKILL.md`
  Use when YouTube is or could be relevant — video/channel/playlist links, video IDs, @handles, creator lookups,
  summaries, quotes, topic research, tutorials, tal…

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
- **doc-coauthoring** — `skills/_anthropic/examples/doc-coauthoring/SKILL.md`
- **event-planning** — `skills/_anthropic/examples/event-planning/SKILL.md`
- **file-expenses** — `skills/_anthropic/examples/file-expenses/SKILL.md`
- **file-form** — `skills/_anthropic/examples/file-form/SKILL.md`
- **file-reading** — `skills/_anthropic/public/file-reading/SKILL.md`
- **financial-calculator** — `skills/_anthropic/examples/financial-calculator/SKILL.md`
- **frontend-design** — `skills/_anthropic/public/frontend-design/SKILL.md`
- **grocery-shopping** — `skills/_anthropic/examples/grocery-shopping/SKILL.md`
- **hire-help** — `skills/_anthropic/examples/hire-help/SKILL.md`
- **learn** — `skills/_anthropic/examples/learn/SKILL.md`
- **meal-delivery** — `skills/_anthropic/examples/meal-delivery/SKILL.md`
- **pdf-reading** — `skills/_anthropic/public/pdf-reading/SKILL.md`
- **prescription-refill** — `skills/_anthropic/examples/prescription-refill/SKILL.md`
- **product-self-knowledge** — `skills/_anthropic/public/product-self-knowledge/SKILL.md`
- **return-refund** — `skills/_anthropic/examples/return-refund/SKILL.md`
- **setup-writing-style** — `skills/_anthropic/examples/setup-writing-style/SKILL.md`
- **slack-gif-creator** — `skills/_anthropic/examples/slack-gif-creator/SKILL.md`
- **web-artifacts-builder** — `skills/_anthropic/examples/web-artifacts-builder/SKILL.md`

## Consulta rápida

```bash
python3 ~/projetos/scripts/indices/query_claude_index.py pacotao-macaroca-de-skills
python3 ~/projetos/scripts/indices/query_claude_index.py skill sasi-ingest-export
python3 ~/projetos/scripts/indices/query_claude_index.py scripts
python3 ~/projetos/scripts/indices/query_claude_index.py search zero alucinação
```
