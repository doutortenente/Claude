---
description: Vale sempre que for procurar qualquer coisa dentro deste repositório — arquivo, skill, subagente, trecho de texto, "onde mora X" ou "quem chama X" — antes de abrir arquivo.
---

# Como navegar num repo pesado

Aprofunda a seção 4 do `CLAUDE.md`.

## A regra

**Buscar antes de varrer.** 901 arquivos indexados, 30 MB. Varredura cega — `Glob` em `skills-que-prestam/**` ou `Read`
em massa — é o exame de corpo inteiro pedido antes da anamnese: demora, custa caro, devolve ruído. Localizar primeiro,
abrir só o alvo.

**Vocabulário:** **índice** = catálogo do que existe e onde, como a lista de leitos na porta da UTI. **MCP** = ponte
que deixa o Claude falar com outro programa — aqui, a IDE aberta.

## Ordem de preferência

| # | Pergunta | Ferramenta |
| --- | --- | --- |
| 1 | Onde mora X · quem chama X | MCP `jetbrains-index`: `ide_find_file`, `ide_search_text`, `ide_find_references` |
| 2 | Que skill existe pra isso | `memory/SKILLS-CATALOGO.md` |
| 3 | Busca textual, IDE fechada | `query_claude_index.py search <termo>` |
| 4 | Ler o conteúdo | `Read` — **só no caminho exato** dos passos 1-3 |

Pular do 1 pro 4 é o erro: `Read` sem caminho confirmado vira tentativa e erro.

## Por que o MCP ganha do grep

O **grep** (busca por texto cru) vê letras. O índice da IDE entende estrutura.

Exemplo real: procurar `plantao`. O grep acerta a descrição da skill, a menção dela dentro de `sasi-ingest-export`, o
`SKILLS-CATALOGO.md` e o `CLAUDE.md` — nenhum responde "onde mora a skill". `ide_find_file plantao` devolve um caminho
só, o certo. E `ide_find_references` responde o que o grep nem sabe perguntar: *quem quebra se eu apagar isto?*

## Pré-voo obrigatório do MCP

Antes da primeira chamada de navegação: `ide_index_status`.

- `isDumbMode: false` → índice pronto, pode buscar.
- `isDumbMode: true` → a IDE ainda está montando o catálogo; a resposta vem incompleta, **mentindo por omissão**.
  Esperar e repetir.

**Nunca cair pro grep por impaciência** — resultado parcial que parece completo é pior que esperar.

## Comandos do índice

Todos: `python3 ~/projetos/scripts/indices/query_claude_index.py <comando>`

| Comando | Devolve |
| --- | --- |
| `skills` | toda skill: nome + caminho |
| `skill <nome>` | detalhe de uma skill |
| `agents` | os 18 subagentes |
| `scripts` | executáveis `.py`/`.sh` do índice |
| `find <pedaço-do-caminho>` | caminhos com esse pedaço |
| `search <termo>` | busca full-text no conteúdo |
| `categorias` · `cat <categoria>` | resumo por categoria · arquivos de uma categoria |
| `top` | maiores arquivos por token |

## O que não abrir sem necessidade

| Alvo | Regra |
| --- | --- |
| `_anthropic/` | só quando a skill for acionada. É coleção, não skill ativável. `public/` é `All rights reserved`, `examples/` é Apache 2.0 |
| Binários (304 arquivos) | indexados **só por caminho**. `search` não acha nada dentro — usar `find` |
| `skills-que-prestam/` inteira | nunca com `Glob`. Ir pelo catálogo ou por `skill <nome>` |
| `ide/` | fora do git e fora do indexador (token em texto puro). Não abrir |

## Quando regerar o índice

Depois de **adicionar ou remover skill ou subagente**, e depois de mover pasta — índice velho aponta caminho morto.
`python3 ~/projetos/scripts/indices/build_claude_index.py` regera `claude_index.db`, `memory/MAPA-CLAUDE.md` e
`memory/SKILLS-CATALOGO.md` de uma vez. Editar esses dois `.md` na mão é trabalho perdido: a regeração sobrescreve.

## Quero saber X → comando exato

| Quero saber | Comando exato |
| --- | --- |
| Onde mora a skill `plantao` | `query_claude_index.py skill plantao` |
| Que arquivo fala de "SOFA" | `query_claude_index.py search SOFA` |
| Todo caminho com "hemodinamica" | `query_claude_index.py find hemodinamica` |
| Arquivo chamado `BRIEFING.md` | MCP `ide_find_file` → `BRIEFING.md` |
| Quem cita `sasi_deploy_ingest` | MCP `ide_find_references` |
| O índice da IDE está pronto? | MCP `ide_index_status` |
