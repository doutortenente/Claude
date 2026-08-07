# Roteamento — qual agente para qual missão

Árvore de decisão do gerente. A pergunta é sempre a mesma: **o que a missão produz?**

## Decisão em 1 pergunta

| A missão produz… | Agente |
|---|---|
| …um resumo do terreno (onde mora X, o que tem nessa pasta, o que o log diz) | `batedor` |
| …a saída de um script que já existe | `caco` |
| …um boletim de saúde da máquina com checklist fixo | `zelador` |
| …um mapa do repositório inteiro pra quem chega nele | `onboarder` |
| …a explicação de UM arquivo ou UM diff | `code-explainer` |
| …uma sequência de despachos (quem chamar, em que ordem) | `arquiteto` |
| …código de produto novo ou alterado | `residente` |
| …um script de infra em `~/projetos/scripts` | `chefe` |
| …a mesma função com estrutura melhor e comportamento igual | `refatorador` |
| …um ganho de velocidade medido antes e depois | `otimizador` |
| …teste para código que outro escreveu | `testador` |
| …uma tentativa de derrubar as afirmações de uma entrega | `fiscal` |
| …achados de segurança priorizados | `segurador` |
| …um veredito de "pode mergear?" | `deploy-sentinel` |
| …doc de repositório atualizada | `documentador` |
| …memória do operador atualizada | `secretaria` |
| …a lista de campos clínicos sem fonte | `clinical-data-auditor` |
| …a validação de uma afirmação clínica com PMID | `pubmed-evidence-checker` |

## Confusões que custam caro

| Você ia chamar | Mas o certo é | Porque |
|---|---|---|
| `batedor` pra mapear um repo inteiro | `onboarder` | `batedor` responde 1 pergunta; `onboarder` entrega o mapa completo, uma vez |
| `residente` pra escrever teste do que ele acabou de implementar | `testador` | Teste do autor cobre o que o autor pensou, não o que esqueceu |
| `residente` pra "limpar esse código" | `refatorador` | `refatorador` congela comportamento e exige teste verde antes; é isso que torna a mudança revisável |
| `fiscal` pra saber se está lento | `otimizador` | `fiscal` verifica corretude, não desempenho |
| `deploy-sentinel` pra auditar segurança | `segurador` | `deploy-sentinel` confere build/typecheck/lint/RLS, não vazamento de segredo nem PHI em log |
| `secretaria` pra atualizar o README | `documentador` | `secretaria` cuida da memória do operador em `~/.claude/memory`; README é doc de repo |
| `Plan` nativo pra decidir quantos agentes usar | `arquiteto` | `Plan` desenha a implementação; `arquiteto` desenha a fila de despachos |
| `caco` pra criar um script | `chefe` | `caco` só roda o que já existe; quem projeta é o `chefe` |

## Quando NÃO despachar ninguém

- A resposta cabe em 1 comando que você mesmo roda. Subagente custa contexto de ida e volta.
- Você já tem a informação na conversa. Re-medir o que já foi medido é o desperdício mais comum.
- A tarefa é uma edição pequena e já decidida. Despachar `residente` pra trocar 3 linhas custa mais
  que fazer.

## Fan-out: quantos ao mesmo tempo

Máximo **3 simultâneos**. A máquina tem 4 núcleos e 7,6 GiB de RAM — acima disso os agentes entram em
fila e o ganho vira espera. Para coordenar mais que isso, use a ferramenta **Workflow**: ela é roteiro
determinístico (faz laço, pipeline e fan-out) e cada etapa roda no modelo certo.

**Nunca** dois agentes de escrita no mesmo arquivo ao mesmo tempo. Se precisar, use
`isolation: worktree` — cada um recebe uma cópia isolada do repositório.

## Portão de verificação

Todo achado de agente de leitura que vá disparar merge, deleção, gravação em banco ou push passa pelo
gerente antes. Conferência simples: 1 comando direto. Entrega substantiva: despache o `fiscal`.
