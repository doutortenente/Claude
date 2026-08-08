# testador — documentação

## O que faz
Escreve e roda teste para código que outra pessoa implementou. Deriva casos a partir da spec (não da
implementação), prioriza borda exata, ausência de dado e formato pt-BR, e reporta a saída real do comando
de teste — nunca resume o resultado por conta própria.

## Quando despachar

| Situação | Por que este agente e não o vizinho |
|---|---|
| Mudança já implementada precisa de "cobre isso com teste" | `residente` implementa e testa o próprio código — quem escreve testa o que pensou, não o que esqueceu. `testador` nunca viu a implementação nascer, só a spec |
| Levantar quais casos-limite faltam numa suíte existente | `fiscal` refuta a ENTREGA como um todo (claims, texto, raciocínio); `testador` mira especificamente em teste ausente ou fraco |
| Validar fórmula clínica nova (SOFA, balanço hídrico, dose) antes de aceitar | `clinical-data-auditor` audita dado clínico sem fonte no paciente real; `testador` escreve teste automatizado que trava a fórmula no código |
| Refatoração terminou, precisa garantir que comportamento não mudou | `refatorador` só reestrutura, não valida; `testador` escreve/roda o teste que prova a equivalência |

## Ferramentas e por quê

| Ferramenta | Para que serve aqui |
|---|---|
| Read | Ler a spec/missão e a implementação já pronta |
| Grep | Localizar padrão de código ou teste existente por texto |
| Glob | Localizar arquivo de teste por nome/caminho |
| Bash | Rodar o comando de teste (`pnpm test`, Vitest) e colar a saída real |
| Write | Criar arquivo de teste novo |
| Edit | Alterar arquivo de teste existente |

`disallowedTools: Agent` bloqueia despacho de subagente — o próprio arquivo do agente declara que essa é a trava que
impede um 3º nível de aninhamento (a plataforma permite até 3 camadas; sem o campo a regra de 2 níveis viraria só
combinado). Não há bloqueio a Write/Edit sobre código de produção na ferramenta em si — a proibição é de conduta,
listada nas Travas: só escreve arquivo de teste, nunca conserta a implementação para o próprio teste passar.

## Dependências
Comando de teste do módulo, lido do `package.json` antes de rodar — SASI v3 usa `pnpm test` (Vitest); `sasi-v2` não
tem script de teste, segundo o próprio arquivo do agente. Em `sasi`, `claude` e `celebro`, depende do servidor MCP
`jetbrains-index` (`ide_find_file`, `ide_search_text`, `ide_find_references`) para reconhecimento — só cai em
Glob/Grep fora desses repos ou se o MCP estiver fora do ar.

## Skills relacionadas
Nenhuma identificada no corpo do agente.

## Contexto que ele precisa receber
A spec/missão em palavras (o que a mudança deve fazer), o caminho do arquivo implementado, e o módulo/repo (para
achar o comando de teste certo). Sem a spec ele não tem o que derivar — vai ler o código e testar o que ele faz, que
é exatamente o viés que o método dele existe para evitar.

```
Módulo: sasi/frontend/src/lib/sofa.ts
Spec: cálculo de SOFA respiratório — PaO2/FiO2 em 4 faixas (>400, 300-400, 200-300, <200),
  pontua 0-4, null se PaO2 ou FiO2 ausente.
Escopo: só a função calcSofaResp, não a suíte inteira do módulo.
Critério de aceite: cobre as 4 faixas, os 2 valores de corte exatos (300, 200) e o caso PaO2 null.
```

## Armadilhas conhecidas
Maior risco é o agente ler a implementação antes da spec e acabar testando o comportamento atual em vez do
comportamento correto — isso zera o valor do teste sem que ninguém perceba, porque a suíte fica verde do mesmo jeito.
Segundo risco: spec omissa sobre um caso-limite vira convite a chutar o esperado; a regra do agente é marcar
`[SEM_FONTE]` e perguntar, não inventar.

## Como saber se ele fez um bom trabalho
A tabela de saída traz `caso | por que importa | resultado` com valor esperado × obtido em cada linha, o bloco de
saída do comando de teste é colado sem edição (não resumido), e nenhum teste novo usa `toBeTruthy`, tolerância solta
ou `skip` para fechar verde.
