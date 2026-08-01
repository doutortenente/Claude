# Skills Commands

Manage AI coding skills from the Context7 registry. Skills are Markdown files that teach AI coding agents best
practices, patterns, and workflows for specific libraries or tasks.

## Install

Install skills from any GitHub repository. Repository format is always `/owner/repo`.

```bash
ctx7 pacotao-macaroca-de-skills install /anthropics/pacotao-macaroca-de-skills           # Interactive — pick from a list
ctx7 pacotao-macaroca-de-skills install /anthropics/pacotao-macaroca-de-skills pdf        # Install a specific skill by name
ctx7 pacotao-macaroca-de-skills install /anthropics/pacotao-macaroca-de-skills --all      # Install everything without prompting
```

Target a specific IDE with a flag:

```bash
ctx7 pacotao-macaroca-de-skills install /anthropics/pacotao-macaroca-de-skills pdf --claude     # Claude Code only
ctx7 pacotao-macaroca-de-skills install /anthropics/pacotao-macaroca-de-skills pdf --cursor     # Cursor only
ctx7 pacotao-macaroca-de-skills install /anthropics/pacotao-macaroca-de-skills pdf --universal  # Universal (.agents/pacotao-macaroca-de-skills/)
ctx7 pacotao-macaroca-de-skills install /anthropics/pacotao-macaroca-de-skills --all --global   # All pacotao-macaroca-de-skills, global install
```

Alias: `ctx7 si /anthropics/skills pdf`

## Search

Find skills across the entire registry by keyword. Shows an interactive list with install counts and trust scores.
Select to install.

```bash
ctx7 pacotao-macaroca-de-skills search pdf
ctx7 pacotao-macaroca-de-skills search typescript testing
ctx7 pacotao-macaroca-de-skills search react nextjs
```

Alias: `ctx7 ss pdf`

## Suggest

Auto-detects your project dependencies and recommends relevant skills from the registry.

```bash
ctx7 pacotao-macaroca-de-skills suggest           # Scan current project, install to project
ctx7 pacotao-macaroca-de-skills suggest --global  # Install suggestions globally
ctx7 pacotao-macaroca-de-skills suggest --claude  # Target Claude Code only
```

Reads `package.json`, `requirements.txt`, `pyproject.toml`, `Cargo.toml`, `go.mod`, `Gemfile`. Falls back to suggesting
`ctx7 skills search` if no dependencies are detected.

Alias: `ctx7 ssg`

## Generate (AI-powered)

Generate a custom skill tailored to your stack using AI. **Requires login.**

```bash
ctx7 pacotao-macaroca-de-skills generate
ctx7 pacotao-macaroca-de-skills generate --claude   # Install directly to Claude Code
ctx7 pacotao-macaroca-de-skills generate --global   # Install to global pacotao-macaroca-de-skills
```

Interactive flow:

1. Describe the expertise you want (e.g., "OAuth authentication with NextAuth.js")
2. Select relevant libraries from search results
3. Answer 3 clarifying questions to focus the skill
4. Review the generated skill, request changes if needed
5. Choose where to install it

**Limits:** Free accounts get 6 generations/week, Pro accounts get 10.

Aliases: `ctx7 skills gen`, `ctx7 skills g`

## List

Show all installed skills for the current project or globally.

```bash
ctx7 pacotao-macaroca-de-skills list                  # Current project (all detected IDEs)
ctx7 pacotao-macaroca-de-skills list --claude         # Claude Code only
ctx7 pacotao-macaroca-de-skills list --global         # Global pacotao-macaroca-de-skills
ctx7 pacotao-macaroca-de-skills list --global --claude # Global Claude Code pacotao-macaroca-de-skills
```

## Remove

Uninstall a skill by name.

```bash
ctx7 pacotao-macaroca-de-skills remove pdf
ctx7 pacotao-macaroca-de-skills remove pdf --claude   # From Claude Code only
ctx7 pacotao-macaroca-de-skills remove pdf --global   # From global pacotao-macaroca-de-skills
```

Aliases: `ctx7 skills rm`, `ctx7 skills delete`

## Info

Browse all skills in a repository without installing — useful for previewing what's available.

```bash
ctx7 pacotao-macaroca-de-skills info /anthropics/pacotao-macaroca-de-skills
```

Output shows each skill name, description, and URL, plus quick install commands.

## IDE Flags

All skills commands accept these flags to target a specific AI coding assistant:

| Flag            | Directory         | Used by                                          |
| --------------- | ----------------- | ------------------------------------------------ |
| `--universal`   | `.agents/skills/` | Amp, Codex, Gemini CLI, OpenCode, GitHub Copilot |
| `--claude`      | `.claude/skills/` | Claude Code                                      |
| `--cursor`      | `.cursor/skills/` | Cursor                                           |
| `--antigravity` | `.agent/skills/`  | Antigravity                                      |

Without a flag, the CLI prompts you to select one or more targets interactively.

Add `--global` to any flag to install in your home directory instead of the current project.
