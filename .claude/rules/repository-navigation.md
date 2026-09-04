---
description: Como achar coisa neste repo sem varrer — catálogo, índice, o que não abrir
paths:
  - "memory/**"
  - "docs/**"
  - "skills-que-prestam/**"
  - "agents/**"
---

# Como navegar num repo pesado

**Buscar antes de varrer.** 901 arquivos indexados, 30 MB. Varredura cega — `Glob` em `skills-que-prestam/**` ou `Read` em massa — é o exame de corpo inteiro pedido antes da anamnese: demora, custa caro, devolve ruído.

## Ordem de preferência

| # | Pergunta | Ferramenta |
|---|---|---|
| 1 | Que skill existe pra isso | `memory/SKILLS-CATALOGO.md` |
| 2 | Números do repo | `docs/REPOSITORY-INVENTORY.md` |
| 3 | Busca textual | `query_claude_index.py search <termo>` ou `Grep` |
| 4 | Ler o conteúdo | `Read` — **só no caminho exato** dos passos 1-3 |

Pular do 1 pro 4 é o erro: `Read` sem caminho confirmado vira tentativa e erro.

## MCP de IDE — removido em 04-set-2026

Esta regra mandava usar `jetbrains-index` como 1ª escolha pra tudo. As 3 portas (`29172`, `6315`, `64542`) foram medidas mortas e nenhuma IDE JetBrains estava rodando; os servidores saíram do `settings.json`, junto com o hook `prefer-ide-tools.sh` que barrava `Grep`/`Glob` pra empurrar pro MCP.

**Regra que aponta pra ferramenta que não existe é pior que regra nenhuma** — gasta tentativa, erra, e a queda pro grep vira improviso em vez de plano. Se uma IDE voltar a ser o padrão de trabalho, o MCP volta com ela e esta seção é reescrita; até lá, `Grep`/`Glob` são a ferramenta oficial, não o plano B.

## Comandos do índice

`python3 ~/projetos/scripts/indices/query_claude_index.py <comando>`

| Comando | Devolve |
|---|---|
| `skills` · `skill <nome>` | toda skill: nome + caminho · detalhe de uma |
| `agents` | os 18 subagentes |
| `find <pedaço-do-caminho>` | caminhos com esse pedaço |
| `search <termo>` | busca full-text no conteúdo |
| `top` | maiores arquivos por token |

## O que não abrir sem necessidade

| Alvo | Regra |
|---|---|
| `_anthropic/` | só quando a skill for acionada. É coleção, não skill ativável |
| Binários (304 arquivos) | indexados só por caminho. `search` não acha nada dentro — usar `find` |
| `skills-que-prestam/` inteira | nunca com `Glob`. Ir pelo catálogo ou por `skill <nome>` |
| `ide/` | fora do git e do indexador (token em texto puro). Não abrir |

## Quando regerar o índice

Depois de adicionar/remover skill ou subagente, e depois de mover pasta — índice velho aponta caminho morto.
`python3 ~/projetos/scripts/indices/build_claude_index.py` regera `claude_index.db`, `memory/MAPA-CLAUDE.md` e `memory/SKILLS-CATALOGO.md` de uma vez. Editar esses dois `.md` na mão é trabalho perdido: a regeração sobrescreve.
