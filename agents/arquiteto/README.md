# arquiteto — documentação

## O que faz
Transforma uma missão grande demais para um agente só em uma sequência ordenada de despachos: decide quem da
frota entra, em que ordem, com qual modelo e onde fica o portão de verificação. Não implementa nada — devolve
tabela de plano, não código.

## Quando despachar

| Situação | Por que este agente e não o vizinho |
|---|---|
| Missão toca vários arquivos/repos e precisa de mais de um subagente coordenado | `Plan` nativo desenha COMO o código muda; `arquiteto` decide QUEM da frota faz cada pedaço — funções diferentes |
| "Monta o plano de ataque", "quem eu chamo pra isso", "dá pra paralelizar?" | Gatilho direto da `description` do agente |
| Precisa decidir se duas tarefas rodam em paralelo (fan-out) ou em sequência | `arquiteto` separa tarefa independente de acoplada antes de qualquer despacho acontecer |
| Missão é criar ou alterar script de infra em `~/projetos/scripts/` | Isso é do `chefe` direto — não passa pelo `arquiteto` |
| Só precisa desenhar a mudança técnica em si (qual função, qual linha) | Isso é do `Plan` nativo — se a saída do `arquiteto` virar isso, ele saiu da função |

## Ferramentas e por quê

| Ferramenta | Para que serve aqui |
|---|---|
| Read | Ler arquivo específico já localizado, pra confirmar escopo antes de planejar |
| Grep | Busca textual pontual quando o MCP `jetbrains-index` não está disponível |
| Glob | Listar arquivos por padrão, pra medir o tamanho da missão |

**Ausentes de propósito**: sem Write/Edit — o `arquiteto` não pode alterar arquivo de produto nem escrever o
diff; planejar e codar são estados mentais opostos, e quem escreve código vira `residente` de qualidade
inferior. `disallowedTools: Agent` no frontmatter (cabeçalho do arquivo) bloqueia o próprio `arquiteto` de
despachar subagente — ele desenha a fila, quem chama é o gerente. Isso trava a hierarquia em 2 camadas
(a plataforma permite até 3).

## Dependências
MCP `jetbrains-index` (busca por índice da IDE — `ide_find_file`, `ide_search_text`, `ide_find_references`)
para mapear o terreno em `sasi`/`claude`/`celebro` antes de planejar. Sem ele, o agente cai para Grep/Glob em
massa, que o próprio arquivo classifica como varredura cega que "devolve ruído e o plano nasce torto".

## Skills relacionadas
Nenhuma identificada no corpo do agente.

## Contexto que ele precisa receber
O gerente deve informar: o repo/pasta alvo, o objetivo final da missão (não a implementação), e qualquer
restrição já conhecida (arquivo que não pode mudar, prazo, ferramenta indisponível). Sem isso o `arquiteto`
não tem como separar tarefa independente de acoplada nem escolher o modelo certo por etapa.

Exemplo de despacho bom:

```
Missão: adicionar campo "diurese" na ficha de evolução do SASI e propagar até o alerta de oligúria.
Repo: sasi/ (frontend React+Vite+TS, MCP Node, Supabase).
Escopo: schema Supabase + tipo TS + componente de ficha + regra de alerta. NÃO mexer em outras regras de alerta.
Restrição: campo `bh_h` já existe e é diferente — não confundir.
Saída esperada: tabela de despachos (etapa | agente | modelo | entrada | portão de verificação) + riscos + reversão.
```

## Armadilhas conhecidas
Risco mais provável deste agente: planejar em cima de reconhecimento raso (pular o `jetbrains-index` e chutar
quantos arquivos a missão toca) — o próprio arquivo nomeia isso como "sem saber quantos arquivos a missão toca,
o plano é chute". Segundo risco: colocar tarefa acoplada em fan-out antes do contrato (formato de entrada/saída
entre etapas) estar fixado — gera dois agentes pisando no mesmo arquivo.

## Como saber se ele fez um bom trabalho
A tabela de saída tem etapa, agente, modelo, entrada e portão de verificação preenchidos em toda linha — nenhuma
etapa sem portão concreto (comando, teste, conferência de outro agente). Fan-out nunca excede 3 agentes
simultâneos. Toda etapa que altera algo tem passo de reversão listado. A saída não contém nome de função nem
número de linha — isso indicaria que o agente invadiu o papel do `Plan` nativo.
