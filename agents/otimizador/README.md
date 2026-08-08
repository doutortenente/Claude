# otimizador — documentação

## O que faz
Único agente da frota que mede **velocidade** (tempo, memória, tamanho de resposta), não correção. Aplica método
científico: mede o estado atual (baseline), formula uma hipótese, muda o mínimo, mede de novo e reporta o delta real
— nunca entrega "otimizei" sem número antes/depois no mesmo cenário.

## Quando despachar

| Situação | Por que este agente e não o vizinho |
|---|---|
| Tela do SASI arrastando, query do Supabase pesada, build lento, RAM estourando | É o único que mede desempenho com baseline; ninguém mais na frota prova "ficou mais rápido" |
| Resultado errado ou faltando dado | `fiscal` — otimizador não confere correção, só velocidade |
| Feature nova ainda não escrita | `residente` — otimizador não implementa, só acelera código que já existe |
| Suspeita de vulnerabilidade ou vazamento | `segurador` — foco de segurança, não performance |
| Reorganizar código sem mudar comportamento nem medir tempo | `refatorador` — estrutura, não desempenho |

## Ferramentas e por quê

| Ferramenta | Para que serve aqui |
|---|---|
| Read | Ler o trecho suspeito antes de mexer |
| Grep | Achar padrão de código (ex.: onde uma query é montada) fora de `sasi/`, `claude/`, `celebro/` |
| Glob | Localizar arquivo por nome/padrão fora dos 3 repos com MCP de índice |
| Bash | Rodar o cenário real (`npm run build`, `time`, `EXPLAIN ANALYZE`) para medir baseline e resultado |
| Write | Registrar a proposta de migration de índice (SQL) — ele não aplica, só escreve |
| Edit | Aplicar a mudança mínima de código que a hipótese exige (ex.: memoizar componente, ajustar query) |

**Ausentes de propósito**: nenhuma ferramenta de rede/deploy/banco (não há acesso MCP a Supabase nem push). O
`disallowedTools: Agent` bloqueia despachar subagente — mesmo a plataforma permitindo até 3 camadas, este agente é
proibido de abrir uma quarta; a otimização tem que ficar sob a mão de quem está medindo, sem diluir a atribuição do
ganho entre execuções paralelas.

## Dependências
- Comando de build/medição do projeto (ex.: `npm run build`, `time`) — nativo do repo, não é script próprio.
- `EXPLAIN ANALYZE` do Postgres para gargalo de query (via Bash/psql, não MCP dedicado citado no arquivo).
- Arquivo `docs/contrato-de-relatorio.md` — formato de fechamento obrigatório do relatório.
- Em `sasi/`, `claude/` e `celebro/`: MCP `jetbrains-index` (`ide_find_file`, `ide_search_text`,
  `ide_find_references`) — reconhecimento começa por ali, não por Glob/Grep em massa, porque o Tijolão não tem RAM
  sobrando para varredura pesada.

## Skills relacionadas
Nenhuma identificada no corpo do agente.

## Contexto que ele precisa receber
O gerente precisa entregar: o cenário exato a medir (comando, rota, tela), o repo/arquivo suspeito, e o volume de
dados de referência (para o "mesmo cenário" da remedição fazer sentido). Sem isso o otimizador para no passo 1 e só
reporta falta de medição.

```
Despacho: SASI, tela EixoTempo/HPMA do leito UTI2-L05 demora >4s pra carregar.
Cenário de medição: abrir a tela com npm run dev, cronometrar do clique ao render.
Suspeito: query de séries temporais em frontend/src/features/eixo-tempo/.
Critério de aceite: tabela antes/depois com delta ≥10%, ou "sem ganho mensurável" + proposta de reverter.
```

## Armadilhas conhecidas
- Medir em cenário diferente do baseline (máquina, volume de dado, comando) invalida a comparação inteira — o delta
  reportado vira ruído disfarçado de ganho.
- Empilhar duas mudanças na mesma rodada mata a atribuição: se subiu 30%, não dá pra saber qual das duas causou.
- Ganho dentro do ruído normal de execução (variação entre rodadas) sendo reportado como "otimizei" — a trava exige
  declarar "sem ganho mensurável" abaixo de 10%.

## Como saber se ele fez um bom trabalho
A tabela `métrica | antes | depois | delta` está preenchida com números brutos (não adjetivo), a mudança aponta
`arquivo:linha`, existe uma hipótese escrita ("acredito que X custa N ms porque Y") e a suíte de teste segue verde
depois da mudança. Se o resultado mudou, não foi otimização — foi bug novo, e ele deveria ter sinalizado isso, não
fechado como entrega.
