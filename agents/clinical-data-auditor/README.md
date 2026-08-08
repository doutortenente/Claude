# clinical-data-auditor — documentação

## O que faz
Audita dado clínico já gravado (eventos_clinicos, vitais, doses, labs) atrás de campo sem fonte rastreável.
Marca `[SEM_FONTE]` quando o valor não tem origem legível no texto (`source_text`) e nunca completa por
plausibilidade — é a aplicação da doutrina ZERO ALUCINAÇÃO num lote de dado já ingerido.

## Quando despachar

| Situação | Por que este agente e não o vizinho |
|---|---|
| Ingest em lote acabou de gravar no SASI, antes de o dado ir pro dashboard | Ele é o único que valida rastreabilidade campo a campo contra `source_text`; `fiscal` refuta entrega de código/plano, não dado clínico |
| Operador pede "audita a tabela X" ou "confere esse plantão" | Função dedicada — `zelador` faz boletim de saúde de MÁQUINA com checklist fixo, não de dado clínico |
| Suspeita de valor inventado ou preenchido por estimativa (lab, vital, dose, ID) | Regra 2 do agente proíbe estimativa explicitamente; `batedor` apenas resume, não julga veredito de fonte |
| Validar se uma afirmação clínica tem respaldo em literatura (PMID) | Não é este agente — despachar `pubmed-evidence-checker` |

## Ferramentas e por quê

| Ferramenta | Para que serve aqui |
|---|---|
| Read | Ler os dados clínicos passados no prompt ou arquivo de export para auditar campo a campo |
| Grep | Localizar `source_text`, `confidence`, `requires_review` nos registros fornecidos |
| Glob | Encontrar arquivo de export/dump quando o gerente aponta uma pasta em vez de um arquivo |
| Bash | Rodar `~/projetos/scripts/sasi/audit_eventos.py` quando a auditoria for da tabela `eventos_clinicos` |

`disallowedTools: Agent` — este agente não pode despachar outro subagente (a frota é hierarquia de 2 níveis).
Sem **Write/Edit** (ferramentas que alteram arquivo): proposital — ele é auditor, não corretor. Achar erro e
consertar são papéis separados; ele só reporta veredito, quem corrige é o gerente ou outro agente prescrito
para a correção.

## Dependências
`~/projetos/scripts/sasi/audit_eventos.py` — único script externo que ele chama, e só quando a auditoria é da
tabela `eventos_clinicos`. Sem credencial nem conector de banco: se precisar de dado que não veio no prompt e
o script não cobre, ele devolve a query SQL pronta para o gerente executar, nunca tenta acessar o Supabase
direto.

## Skills relacionadas
Nenhuma identificada no corpo do agente.

## Contexto que ele precisa receber
Via preferida: o gerente já cola os registros a auditar no prompt (dado bruto, não resumo). Se a auditoria for
de `eventos_clinicos` sem dado colado, apontar isso e deixar o agente rodar o script. Informar sempre o
critério de aceite — "audita este lote" não basta; dizer se é ingest recém-gravado, plantão específico, ou
tabela inteira.

```
Audite estes registros de eventos_clinicos (lote do plantão 07-ago, leito UTI3-L05).
Cole abaixo o JSON exportado com source_text de cada campo.
Critério: reportar tabela registro|campo|valor|fonte|veredito, flag confidence<0.7.
```

## Armadilhas conhecidas
Maior risco é o gerente pedir auditoria sem colar o dado bruto — o agente então tenta o script
`audit_eventos.py`, que só cobre `eventos_clinicos`; para `evolucoes`, vitais soltos ou lab fora dessa tabela
ele fica sem fonte de dado e deve devolver a query SQL em vez de inventar acesso. Confundir "plausível" com
"rastreável" é o erro que a regra 6 do agente existe para prevenir — cobrar isso na leitura do veredito.

## Como saber se ele fez um bom trabalho
A saída é a tabela `registro | campo | valor | fonte (source_text) | veredito` completa, sem linha pulada.
Todo veredito `[SEM_FONTE]` tem, na coluna fonte, o texto original citado (ou ausência explícita dele) — nunca
um valor preenchido sem citação atrás. Nenhum registro com `confidence < 0.7` fica fora do relatório.
