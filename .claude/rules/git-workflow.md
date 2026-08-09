---
description: Vale quando a tarefa terminar em mudança de arquivo neste repositório — criar branch, commitar, pushar, abrir PR, mesclar ou desfazer commit errado.
---

# Branch, commit, push, merge

## Vocabulário

| Termo | Tradução |
| --- | --- |
| **branch** (ramo) | cópia paralela pra mexer sem sujar a versão boa — rascunhar a conduta antes de assinar |
| **commit** | fotografia salva dos arquivos, com nome dizendo o que mudou — a evolução datada |
| **push** (empurrar) | mandar os commits do PC pro GitHub |
| **PR** / *pull request* | pedido de juntar o ramo na versão boa, com as mudanças à vista |
| **merge** (mesclar) | juntar de fato o ramo na `main`, o ramo oficial |
| **remote** | o espelho na nuvem — aqui, `origin` = `github.com/doutortenente/Claude` |

## Ordem permanente de 28-jul-2026

Ao concluir um trabalho: **push do branch → abre o PR → mescla em seguida, sem pedir confirmação.** Não perguntar "posso mesclar?" — a aprovação já foi dada, em caráter permanente.

**Continua proibido**: commitar direto em `main`. É sempre branch → PR → merge; só a etapa de pedir OK caiu.

## Nome de branch

`tipo/assunto-curto`, minúsculas, hífen no lugar de espaço, sem acento: `docs/regras-do-repo`, `fix/symlink-quebrado`. O `tipo` é o da tabela abaixo. Ramo criado pelo Claude Code na web vem com sufixo aleatório (`claude/add-humanizer-repo-7uvgi5`) — normal, não renomear.

## Mensagem de commit — Conventional Commits em pt-BR

`tipo(escopo): o que mudou, minúscula, sem ponto final`

| Tipo | Quando | Exemplo real deste repo |
| --- | --- | --- |
| `feat` | coisa nova | `feat(skills): aula-turbo no pacote medico + 10 skills superpowers` |
| `fix` | conserto | `fix(skills): superpowers vira plugin oficial, nao copia achatada` |
| `refactor` | reorganiza sem mudar o que faz | `refactor(agents): uma pasta por agente, com documentacao propria` |
| `docs` | só documentação | `docs(agents): gate de deploy SASI aponta para Vercel e Node 24` |
| `chore` | manutenção, índice, config | `chore: regenera MAPA-CLAUDE pos-extracao do pacotao` |

O escopo entre parênteses é opcional e nomeia a área tocada (`skills`, `agents`).

## O que NUNCA entra num commit

Chave, `.env`, `ide/*.lock`. As 5 conferências obrigatórias estão em [`security-and-secrets.md`](./security-and-secrets.md) — rodar aquela lista, não improvisar.

## SEM BACKUP

Não criar `.bak`, cópia `arquivo-v2.md`, nem tarball. **O git já é o backup**: cada commit é uma versão guardada pra sempre e recuperável — o `.bak` é cópia que ninguém atualiza e envelhece mentindo.

## Sequência de uma entrega completa

```bash
cd ~/projetos/claude
git switch -c docs/regras-do-repo      # 1. cria e entra no ramo novo
git add .claude/rules/git-workflow.md  # 2. escolhe o que entra (nunca `git add .` cego)
git status                             # 3. confere a lista antes de fotografar
git commit -m "docs: regra de git — branch, commit, push, merge"
git push -u origin docs/regras-do-repo # 4. sobe o ramo pro GitHub
gh pr create --fill                    # 5. abre o PR
gh pr merge --squash --delete-branch   # 6. mescla e apaga o ramo — SEM perguntar
git switch main && git pull            # 7. volta pra main já atualizada
```

`--squash` funde os commits do ramo num só: 1 entrega = 1 linha de histórico na `main`.

## Como desfazer

| Cenário | Comando | O que acontece |
| --- | --- | --- |
| Commitou errado, **não pushou** | `git commit --amend` (só a mensagem) ou `git reset --soft HEAD~1` (desfaz o commit, guarda o trabalho) | ninguém viu, sem cicatriz |
| **Pushou**, ainda não mesclou | corrige e `git push --force-with-lease` | reescreve o ramo; aborta sozinho se alguém mexeu lá — nunca `--force` puro |
| Já **mesclou** na `main` | `git revert <hash> -m 1` num ramo novo → PR → merge | novo commit que **anula** o anterior. Reescrever a história da `main` é proibido |

Achar o hash: `git log --oneline -10`.
