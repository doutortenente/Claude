# documentador — documentação

## O que faz
Corrige documentação de repositório (README, CLAUDE.md do repo, changelog) depois que o código já mudou e o
texto ficou mentiroso. Lê o **diff** (a diferença entre duas versões do código) real do commit, acha toda
referência que a mudança tornou falsa e conserta só isso — não reescreve o arquivo inteiro.

## Quando despachar

| Situação | Por que este agente e não o vizinho |
|---|---|
| "atualiza a doc", "o README não bate com o código", mudança já commitada | Ele é o único com `Write`/`Edit` liberado para arquivo de doc de repositório |
| Memória pessoal do operador (preferência, débito, contexto de longo prazo) | Vai para `secretaria` — território dela, `documentador` nunca toca em `~/.claude/memory` |
| Mapa de repositório inteiro do zero, sem partir de uma mudança específica | Vai para `onboarder` — `documentador` só corrige o que uma mudança já feita invalidou |
| Só explicar um arquivo ou diff, sem escrever nada | Vai para `code-explainer` — não grava, só explica |

## Ferramentas e por quê

| Ferramenta | Para que serve aqui |
|---|---|
| `Read` | Ler o conteúdo atual de README/CLAUDE.md/changelog antes de mexer |
| `Grep` | Buscar referência ao que mudou (nome de arquivo, comando, caminho) espalhada pela doc |
| `Glob` | Localizar quais arquivos de doc existem no repo |
| `Bash` | Rodar `git diff`/`git log -p` para ver a mudança real, e `wc`/`find`/`git log --oneline \| wc -l` para medir número antes de escrevê-lo |
| `Write` | Criar changelog ou arquivo de doc novo quando necessário |
| `Edit` | Corrigir só o trecho que ficou falso, sem reescrever o arquivo inteiro |

`disallowedTools: Agent` bloqueia despacho de outro subagente — a trava está explícita no frontmatter, não é
combinado de boa-fé; o próprio arquivo do agente repete isso na seção "Travas". Não há ferramenta de rede, de
banco (Supabase) nem de push/merge no campo `tools` — coerente com a trava textual "nunca faz push, merge,
deleção ou gravação em banco".

## Dependências
`git` (para `diff`/`log`), `wc` e `find` (para medir número antes de citar). O fechamento de saída exige que
`docs/contrato-de-relatorio.md` exista no repo — sem ele o agente não tem o bloco padrão para fechar o
relatório.

## Skills relacionadas
`docs-update` (gera ou atualiza documentação de projeto verificada contra o código) — mesmo objetivo, cotejar
antes de decidir se o trabalho já cabe na skill ou precisa do agente. Nenhuma outra identificada com certeza.

## Contexto que ele precisa receber
Precisa do commit, branch ou intervalo exato da mudança — sem isso ele não tem o que diffar. Precisa também
saber que arquivos de doc existem no repo (ou deixar ele achar via Glob) e qual é o critério de "atualizado o
bastante" (só a doc que a mudança invalidou, não passar por reescrita geral).

```
Despacho: repo sasi, branch feature/ficha-adapter, commits d0c06c3..HEAD.
Escopo: README do repo e CLAUDE.md do repo (não mexer em ~/.claude/memory).
Critério de aceite: toda referência a arquivo/comando/contagem citada na doc bate com o estado atual do código.
Saída: tabela arquivo | o que estava desatualizado | o que virou, fechada com o bloco de
docs/contrato-de-relatorio.md.
```

## Armadilhas conhecidas
O texto do método manda começar por `ide_find_file`/`ide_search_text`/`ide_find_references` do MCP
`jetbrains-index` em `sasi/`, `claude/`, `celebro/` — mas o campo `tools` do frontmatter não lista nenhuma
ferramenta desse MCP. Sem o servidor liberado no despacho, o agente não tem como cumprir essa instrução e cai
de volta em `Grep`/`Glob` em massa, o que o próprio arquivo instrui a evitar. Verificar se o MCP está
acessível antes de cobrar essa ordem específica do método.

## Como saber se ele fez um bom trabalho
A tabela de saída lista arquivo, o que estava desatualizado e o que virou — cada linha tem que corresponder a
uma referência real encontrada no diff, não a suposição. Todo número na doc final tem, atrás, um comando
(`wc`, `find`, `git log --oneline | wc -l`) que o gerente consegue rodar de novo e bater o mesmo valor.
