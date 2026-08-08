# Procedência — skills de terceiros neste pacote

Registro de origem das skills que **não** foram escritas aqui. Serve pra saber o que pode ser
re-sincronizado com o upstream e sob qual licença.

| Skill(s) | Upstream | Commit fixado | Licença |
|---|---|---|---|
| `brainstorming`, `dispatching-parallel-agents`, `executing-plans`, `finishing-a-development-branch`, `receiving-code-review`, `requesting-code-review`, `subagent-driven-development`, `systematic-debugging`, `test-driven-development`, `using-git-worktrees`, `using-superpowers`, `verification-before-completion`, `writing-plans`, `writing-skills` | https://github.com/obra/superpowers | `6fd4507659784c351abbd2bc264c7162cfd386dc` | MIT — `_vendor/superpowers-LICENSE` |
| `skill-creator` | https://github.com/daymade/claude-code-skills | `96b14eb2cea2ea4f6a15e3e8182c89879e0137fc` | ver `skill-creator/LICENSE.txt` |
| `prompt-improver` | https://github.com/severity1/claude-code-prompt-improver | `306c325b7c152b537ede6a95ad1a8fc199f637eb` | MIT — `prompt-improver/LICENSE` |

## Estado da instalação (07-ago-2026)

As 10 skills do superpowers instaladas em 07-ago (`executing-plans`, `finishing-a-development-branch`,
`receiving-code-review`, `requesting-code-review`, `systematic-debugging`, `test-driven-development`,
`using-git-worktrees`, `using-superpowers`, `verification-before-completion`, `writing-plans`) vieram do
bundle `~/Downloads/using-superpowers`.

As 6 do mesmo bundle que **já existiam** aqui (`brainstorming`, `dispatching-parallel-agents`,
`prompt-improver`, `skill-creator`, `subagent-driven-development`, `writing-skills`) **não** foram
sobrescritas: as cópias locais estão mais completas que as do bundle (ex.: `skill-creator` local tem 34
arquivos contra 29, `writing-skills` local referencia `agentskills.io/specification`).

## Hooks — o que NÃO foi religado

O bundle trazia um `settings.json` com 3 hooks do `prompt-improver`
(`UserPromptSubmit`, `PreToolUse`, `SubagentStart`) apontando pra
`${CLAUDE_PROJECT_DIR}/.claude/skills/prompt-improver/scripts/engine.py`. **Não foi aplicado** — aquele
caminho não bate com a fiação daqui (skill mora no pacote, `~/.claude/skills` só guarda symlink) e ligar
hook global é mudança de comportamento em todo prompt (~189 tokens de overhead por mensagem). Se um dia
quiser ligar, corrija o caminho antes.

O `SessionStart` do upstream (que injeta o dispatcher `using-superpowers`) também não está ligado — não é
necessário, a skill é descoberta pelo symlink como qualquer outra.
