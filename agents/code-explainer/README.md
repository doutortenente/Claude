# code-explainer — documentação

## O que faz
Lê um arquivo de código ou um **diff** (as linhas que mudaram entre duas versões) e explica em português comum,
para quem está aprendendo a programar. Não escreve nem corrige código — só traduz o que já existe.

## Quando despachar

| situação | por que este agente e não o vizinho |
|---|---|
| PR grande, revisão antes de mergear | `onboarder` mapeia repo inteiro; `code-explainer` foca no diff pontual, sem varredura ampla |
| Arquivo legado que você não escreveu, dúvida "o que essa função faz" | `residente` implementa código prescrito, não explica o que já existe |
| Pedido literal "me explica esse código" | `documentador` gera doc permanente de repositório; este agente devolve explicação avulsa de leitura, sem produzir artefato persistente |
| Entender lógica antes de decidir alterar | `refatorador` já mexe na estrutura; aqui não há alteração nenhuma, só leitura |

## Ferramentas e por quê

| ferramenta | para que serve aqui |
|---|---|
| `Read` | ler o trecho de código relevante (não o arquivo inteiro) |
| `Grep` | achar padrão de texto quando precisa localizar onde algo é usado |
| `Glob` | localizar arquivo por nome/caminho quando o despacho não dá o caminho exato |
| `Bash` | rodar `git diff` (ou o range pedido) para isolar só o que mudou |

`disallowedTools: Agent` — este agente não pode lançar outro subagente (a hierarquia da frota é de 2 níveis; empilhar
agente é papel da ferramenta Workflow, não do subagente individual). Não tem `Write`/`Edit`: proposital — ele só lê e
explica, nunca altera arquivo. Se a tarefa pedir mudança de código, o despacho está errado para este agente.

## Dependências
`git` instalado e disponível via Bash (para `git diff`). Nenhuma outra dependência externa, script de
`~/projetos/scripts/` ou servidor MCP é citado no corpo do agente como obrigatório.

## Skills relacionadas
Nenhuma identificada no corpo do agente.

## Contexto que ele precisa receber
Caminho do arquivo ou range do diff (ex.: `git diff main..HEAD` ou `git diff HEAD~3`), e se é revisão de PR ou
leitura avulsa de arquivo legado. Sem isso ele não sabe se deve rodar `git diff` ou ler um arquivo estático.

Exemplo de despacho bom:

```
Explique o diff do PR #42 no repo sasi (branch feature/sofa-resp contra main).
Foque em frontend/src/lib/sofa.ts. Devolva no formato padrão: 1 frase + tabela + riscos.
```

## Armadilhas conhecidas
Sem `git diff` bem delimitado no despacho, o agente pode tentar ler o arquivo inteiro em vez de focar só na mudança
— indo contra a instrução própria dele ("Não despeje o arquivo inteiro"). Despacho vago (sem caminho nem range) o
força a adivinhar o escopo, gerando explicação genérica ou fora do trecho que interessa.

## Como saber se ele fez um bom trabalho
A saída tem as 3 partes fixas: 1 frase-resumo, tabela `trecho/arquivo · o que faz · por que importa`, e lista de
riscos. Todo termo técnico usado vem com explicação de até 4 palavras ao lado. Nenhum parágrafo denso — só
lista/tabela curta.
