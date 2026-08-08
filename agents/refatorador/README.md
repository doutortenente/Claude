# refatorador — documentação

## O que faz
Reestrutura código que já funciona sem alterar seu comportamento: extrai função, renomeia, achata condicional, quebra arquivo grande. Roda a suíte de teste (**test suite**, conjunto automatizado de testes) antes e depois de cada transformação para provar que nada mudou.

## Quando despachar

| Situação | Por que este agente e não o vizinho |
|---|---|
| "Refatora essa função", "limpa esse código", "quebra esse arquivo grande" | É o alvo dele. O `residente` implementa código prescrito, não reestrutura o que já existe |
| Pedido envolve corrigir bug ou mudar o que o código faz | Vai pro `residente` — refatorador só mexe em forma, nunca em comportamento (regra explícita na `description`) |
| Alvo não tem teste cobrindo | Refatorador PARA e pede o `testador` primeiro — não refatora no escuro |
| Precisa melhorar desempenho (tempo, memória) com medição de linha de base | Vai pro `otimizador` — refatorador não otimiza, só reestrutura |

## Ferramentas e por quê

| Ferramenta | Para que serve aqui |
|---|---|
| `Read` | Ler o arquivo-alvo e entender a estrutura antes de mexer |
| `Grep` | Localizar duplicação real (3+ ocorrências) e outros usos do trecho |
| `Glob` | Achar arquivos relacionados ao alvo dentro do escopo dado |
| `Bash` | Rodar a suíte de teste antes e depois de cada transformação |
| `Write` | Criar/reescrever arquivo quando a reestruturação exige (ex.: quebrar arquivo grande em vários) |
| `Edit` | Aplicar cada transformação (extrair função, renomear, achatar condicional) |

`disallowedTools: Agent` bloqueia o despacho de outro subagente — está explícito no corpo do agente ("a trava está no `disallowedTools: Agent` do frontmatter, não na plataforma"). Se o alvo não tem teste, ele PARA e devolve pro gerente pedir o `testador`; não invoca ninguém sozinho.

## Dependências
- Suíte de teste já existente cobrindo o alvo (Vitest no SASI v3; sasi-v2 não tem script de teste — nesse caso o agente não tem como cumprir o método e deve parar).
- Arquivo `docs/contrato-de-relatorio.md` — o formato de fechamento da saída vem de lá.
- Em repositórios sasi/claude/celebro, MCP `jetbrains-index` (`ide_find_file`, `ide_search_text`, `ide_find_references`) para reconhecimento — regra do próprio agente, substitui Glob/Grep em massa nesses três repos.

## Skills relacionadas
Nenhuma identificada no corpo do agente.

## Contexto que ele precisa receber
Caminho exato do arquivo/função-alvo, escopo da reestruturação (o que pode mexer, o que não pode) e confirmação de que existe suíte de teste cobrindo aquele trecho. Sem isso ele para na primeira trava.

Exemplo de despacho bom:
```
Alvo: sasi/frontend/src/lib/exportPDF.ts, função gerarRelatorio (linhas 40-120)
Escopo: só essa função. Não mexer na assinatura pública (outros arquivos chamam gerarRelatorio(paciente, opcoes)).
Teste: npm run test -- exportPDF (confirmar que roda e cobre a função antes de começar)
Critério de aceite: mesmo número de testes passando antes e depois, sem mudança de assinatura.
```

## Armadilhas conhecidas
- Confundir "sem teste visível" com "sem teste" — precisa checar se a suíte realmente cobre o alvo antes de prosseguir, não só se existe suíte no repo.
- Abstrair duplicação com apenas 2 ocorrências — o próprio agente marca isso como erro: só mexe com 3+.
- Empilhar duas transformações no mesmo passo, o que impede saber qual quebrou se a suíte falhar depois.
- sasi-v2 não tem script de teste — despachar refatorador lá sem primeiro resolver a lacuna de teste é mandar ele parar de cara.

## Como saber se ele fez um bom trabalho
A tabela de saída traz `alvo | transformação | antes → depois (linhas/complexidade)` linha por linha, e a suíte antes/depois aparece lado a lado com número de testes e passa/falha idênticos. Qualquer divergência de contagem ou resultado entre as duas rodadas é sinal de comportamento alterado — a entrega deve reportar reversão, não seguir adiante.
