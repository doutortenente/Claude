---
name: split-to-prs
description: Quebra o trabalho atual em PRs pequenos e revisáveis. Use quando o usuário pedir pra dividir um chat, conjunto de mudanças, branch ou PR em pedaços menores.
---

# Split to PRs

Transforme uma pilha de trabalho em alguns PRs pequenos.

## Regras rígidas

- Não crie branches, não faça commit/push, não abra PR até o usuário aprovar o plano de divisão.
- Nunca descarte trabalho do usuário. Sem comandos git destrutivos (`reset --hard`, `clean -fdx`, deletar branch,
  force-push, reescrever histórico) sem aprovação explícita.
- Sempre salve um snapshot recuperável antes de mover trabalho. Isso muitas vezes começa com trabalho sujo na `main`,
  então não assuma que já existe um branch seguro.
- Faça stage só de arquivos ou hunks nomeados. Nada de `git add .` / `git add -A`.

## 1. Cheque o estado

Compare o trabalho atual com o branch default do repo, incluindo mudanças commitadas e não commitadas. Resuma as fatias
reais que você vê e use o histórico do chat pra recuperar a intenção.

Antes de propor fatias, procure sinais de ownership nos caminhos tocados (`CODEOWNERS` ou equivalentes) pra identificar
fronteiras naturais de revisor.

## 2. Proponha a divisão

Use bom senso no nível de detalhe. Em geral o título do PR basta. Adicione uma nota de escopo de uma linha só quando o
título não for claro. Mostre um diagrama Mermaid quando houver várias fatias.

Otimize pra PRs alinhados ao revisor com mínimo de diff não relacionado: separe owners ou preocupações independentes,
mantenha juntas as mudanças fortemente acopladas e, quando for preciso empilhar, ordene fundações antes dos
consumidores.

Por padrão, PRs independentes a partir do branch default. Empilhe PRs só quando a dependência for real.

Peça aprovação antes de começar.

## 3. Execute a divisão

- Se houver trabalho não commitado, salve um snapshot recuperável sem alterar a working tree:

  ```bash
  SHA=$(git stash create "pre-split")
  if [ -n "$SHA" ]; then
    git update-ref "refs/backup/pre-split-$(date +%s)" "$SHA"
  fi
  ```

- Pra cada fatia aprovada, crie um branch a partir da base certa, faça stage e commit só dos arquivos/hunks planejados,
  depois push e abra o PR (`gh pr create`).

## 4. Reporte de volta

Curto: títulos e URLs dos PRs, mais o que ficou no branch inicial ou na working tree. Não delete o ref de backup nem o
branch original a menos que o usuário peça.
