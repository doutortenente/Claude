---
description: Branch, commit, push, merge — fluxo obrigatório deste repo
paths:
  - ".git/**"
  - "**/.gitignore"
  - "**/*.md"
---

# Branch, commit, push, merge

| Termo | Tradução |
|---|---|
| **branch** (ramo) | cópia paralela pra mexer sem sujar a versão boa — rascunhar a conduta antes de assinar |
| **commit** | fotografia salva dos arquivos, com nome dizendo o que mudou |
| **push** | mandar os commits do PC pro GitHub |
| **PR** | pedido de juntar o ramo na versão boa, com as mudanças à vista |
| **merge** | juntar de fato o ramo na `main` |
| **remote** | espelho na nuvem — aqui `origin` = `github.com/doutortenente/Claude` |

## Ordem permanente de 28-jul-2026

Ao concluir: **push do branch → abre o PR → mescla em seguida, sem pedir confirmação.** A aprovação já foi dada, em caráter permanente.
**Continua proibido:** commitar direto em `main`. Sempre branch → PR → merge; só a etapa de pedir OK caiu.

## Nome de branch e mensagem

`tipo/assunto-curto`, minúsculas, hífen, sem acento: `docs/regras-do-repo`, `fix/symlink-quebrado`.
Commit em Conventional Commits pt-BR: `tipo(escopo): o que mudou, minúscula, sem ponto final`.

| Tipo | Quando |
|---|---|
| `feat` | coisa nova |
| `fix` | conserto |
| `refactor` | reorganiza sem mudar o que faz |
| `docs` | só documentação |
| `chore` | manutenção, índice, config |

## Sequência de uma entrega

```bash
cd ~/projetos/claude
git switch -c docs/regras-do-repo      # 1. cria e entra no ramo novo
git add .claude/rules/git-workflow.md  # 2. escolhe o que entra (nunca `git add .` cego)
git status                             # 3. confere antes de fotografar
git commit -m "docs: regra de git — branch, commit, push, merge"
git push -u origin docs/regras-do-repo # 4. sobe o ramo
gh pr create --fill                    # 5. abre o PR
gh pr merge --squash --delete-branch   # 6. mescla e apaga o ramo — SEM perguntar
git switch main && git pull            # 7. volta pra main atualizada
```

`--squash` funde os commits num só: 1 entrega = 1 linha de histórico na `main`.

## SEM BACKUP

Não criar `.bak`, cópia `arquivo-v2.md`, nem tarball. **O git já é o backup** — o `.bak` é cópia que ninguém atualiza e envelhece mentindo.

## Como desfazer

| Cenário | Comando | O que acontece |
|---|---|---|
| Commitou errado, **não pushou** | `git commit --amend` ou `git reset --soft HEAD~1` | ninguém viu, sem cicatriz |
| **Pushou**, não mesclou | `git push --force-with-lease` | reescreve o ramo; aborta se alguém mexeu — nunca `--force` puro |
| Já **mesclou** na `main` | `git revert <hash> -m 1` num ramo novo → PR → merge | commit novo que anula o anterior. Reescrever a `main` é proibido |

Achar o hash: `git log --oneline -10`.
Antes de commitar, rodar as 5 conferências de `security-and-secrets.md` — não improvisar.
