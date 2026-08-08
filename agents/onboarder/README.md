# onboarder — documentação

## O que faz
Entrega o mapa do repositório inteiro para quem está chegando nele — inclusive o operador voltando depois de
semanas sem mexer. Cobre estrutura de pastas, os arquivos que mais importam, comandos de execução conferidos
e armadilhas do projeto. Não entra em código linha a linha.

## Quando despachar

| Situação | Por que este agente e não o vizinho |
|---|---|
| "O que é esse projeto", "por onde eu começo", "mapa do repo inteiro" | É a missão dele. Cobre o repo inteiro, não um recorte |
| Explicar um arquivo específico ou um **diff** (comparação entre duas versões de código) | Usar `code-explainer` — onboarder mapeia o todo, não um arquivo isolado |
| "Onde mora a função X", pergunta pontual de localização | Usar `batedor` — reconhecimento rápido e barato, sem montar mapa completo |
| Operador voltando a um repo parado há semanas, sem lembrar a estrutura | onboarder — o próprio agente cita esse caso como gatilho central |

## Ferramentas e por quê

| Ferramenta | Para que serve aqui                                              |
| ---------- | ---------------------------------------------------------------- |
| Read       | Abrir README, CLAUDE.md, `package.json` /Makefile e os 5         |
|            | arquivos-chave antes de descrever o que fazem                    |
| Grep       | Buscar citação de arquivo em config, padrão de uso, texto dentro |
|            | do repo                                                          |
| Glob       | Mapear as pastas de nível 1 de forma rasa, sem descer recursivo  |
|            | demais                                                           |
| Bash       | Rodar `wc -l` (conta linhas) para medir tamanho de arquivo —     |
|            | critério objetivo, não achismo                                   |

**Ausentes de propósito**: sem Write/Edit — a missão é ler e mapear, nunca intervir no código (trava explícita
no corpo do agente: "não edita nada"). `disallowedTools: Agent` no frontmatter — o onboarder não despacha
subagente, hierarquia fica em 1 nível só.

## Dependências
- `package.json` ou Makefile do repo alvo — todo comando do "Como rodar" precisa aparecer ali literalmente.
- MCP `jetbrains-index` (**ferramenta de navegação de código da IDE**) — `ide_find_file`, `ide_search_text`,
  `ide_find_references` — obrigatório como primeiro recurso quando o repo é sasi, claude ou celebro; Glob/Grep
  em massa só fora desses três ou com o índice fora do ar.
- `docs/contrato-de-relatorio.md` — define o bloco de fechamento que o relatório final precisa usar.

## Skills relacionadas
Nenhuma identificada — o corpo do agente não referencia skill nenhuma.

## Contexto que ele precisa receber
Caminho do repo (ou confirmação de que é `sasi`/`claude`/`celebro`, pra saber se entra pelo MCP), e se o
objetivo é onboarding geral ou algo mais estreito (nesse caso o agente errado foi escolhido).

```
Mapeia o repo sasi-v2 pra mim. Nunca mexi nele.
Preciso: pastas de nível 1, os 5 arquivos que mais importam, como rodar (dev/test/build)
e as armadilhas (runtime travado, .env exigido). Repo é sasi-v2 → npm, sem script de teste.
```

## Armadilhas conhecidas
- Maior risco: citar um comando de "como rodar" que soa plausível mas não está no `package.json`/Makefile —
  o operador cola e roda sem checar de novo, e quebra na cara dele. O agente já se protege disso na trava 2.
- Em sasi/claude/celebro, cair no hábito de Grep/Glob em massa em vez de abrir o MCP `jetbrains-index`
  primeiro — mais lento e menos preciso nesses três repos especificamente.
- `sasi-v2` usa npm e não tem script de teste (SASI v3 usa pnpm + Vitest) — apontar "roda o teste com X" sem
  conferir a versão do repo é erro certo.

## Como saber se ele fez um bom trabalho
- Toda linha da tabela pasta/arquivo tem lastro em leitura real, nunca em suposição — o que não foi conferido
  aparece como `[SEM_FONTE]`, nunca como palpite disfarçado.
- Todo comando do bloco "Como rodar" está literalmente no `package.json`/Makefile citado — confira abrindo o
  arquivo apontado.
- Cada armadilha vem com `arquivo:linha`, não descrição vaga.
- Segredo aparece como `[SEGREDO]` e dado de paciente como `[PHI]` — nunca em texto puro.
- Relatório fecha com o bloco de `docs/contrato-de-relatorio.md`.
