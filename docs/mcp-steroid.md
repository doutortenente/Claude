# MCP jetbrains-steroid — guia de uso

**MCP** (ponte que dá ferramentas extras ao Claude) que roda **dentro** do processo da IDE JetBrains viva.
Diferença dos irmãos: `jetbrains` e `jetbrains-index` chamam endpoints prontos (menu fixo de ações);
o steroid executa **código Kotlin arbitrário** com a API completa da plataforma IntelliJ, e ainda
enxerga a tela (screenshot) e controla teclado/mouse. É o único dos três que alcança estado que só
existe dentro do processo da IDE.

Provado em 22-jul-2026: `steroid_execute_code` rodou no WebStorm 2026.2 (projeto `dev`) e devolveu
nome da IDE, projeto e estado do índice em 1 chamada.

## Quando usar (gatilhos de decisão)

| Situação | Ferramenta | Por quê |
|---|---|---|
| Edição igual em ≥2 arquivos (mesmo padrão) | `steroid_execute_code`, 1 script | 1 chamada, pré-checa cada âncora antes de gravar; `Edit` nativo = 1 chamada por arquivo, sem validação |
| Refactor semântico (rename, extract, move) | `steroid_execute_code` | a IDE atualiza TODAS as referências; sed/replace quebra o que não vê |
| Rodar inspeções da IDE + quick-fix | `steroid_execute_code` | centenas de inspeções já configuradas no projeto |
| Achar código duplicado / clone | receita `mcp-steroid://ide/find-duplicates` | comparação por estrutura (PSI), não por texto |
| Diálogo modal travou a IDE | `steroid_take_screenshot` + `steroid_input` | única forma de ver e clicar no diálogo |
| Abrir projeto sem tocar no mouse | `steroid_open_project` | assíncrono; poll em `steroid_list_windows` até `projectInitialized: true` |
| Debug com breakpoint programático | receita `mcp-steroid://prompt/debugger-skill` | sessão de debug controlada por script |

**Quando NÃO usar:** edição trivial de 1 arquivo (Edit nativo resolve) · busca de estrutura
(`graphify query` primeiro) · IDE fechada (NÃO subir IDE só pra isso — RAM 8GB é o gargalo do Tijolão;
sem IDE viva o MCP simplesmente não responde).

## Liturgia mínima (sempre nesta ordem)

1. `steroid_list_projects` → pegar o **`project_name`** (chave opaca tipo `dev-2f3jl0m1`; NÃO é o nome da pasta — o campo `name` é só informativo).
2. Chamada de trabalho (`steroid_execute_code` etc.) passando esse `project_name` + `task_id` (mesmo valor em chamadas relacionadas) + `reason` (descrição completa da intenção).
3. `steroid_execute_feedback` com o `execution_id` devolvido, nota 0.00–1.00 e explicação.

## As 8 ferramentas

| Ferramenta | Faz o quê | Peso |
|---|---|---|
| `steroid_list_projects` | lista projetos abertos + `project_name` de roteamento | leve |
| `steroid_list_windows` | janelas + `window_id` + estado (modal? indexando? pronto?) | leve |
| `steroid_execute_code` | roda Kotlin dentro da IDE, API completa | **principal** |
| `steroid_fetch_resource` | busca receita pronta por URI `mcp-steroid://` | leve |
| `steroid_execute_feedback` | registra nota da execução | leve |
| `steroid_open_project` | abre projeto (assíncrono, poll depois) | médio |
| `steroid_take_screenshot` | foto da janela da IDE + árvore de componentes | PESADO, só debug |
| `steroid_input` | teclado/mouse na janela (`press:`, `type:`, `click:@x,y`) | PESADO, só debug |

## Regras críticas do `steroid_execute_code`

- O corpo do script é uma função **suspend** Kotlin. **NUNCA** usar `runBlocking` (trava a IDE).
- **PSI** (a árvore semântica que a IDE mantém do código): ler → `readAction { }` ou `smartReadAction { }` (se depende de índice); modificar → `writeAction { }`. Violação estoura na hora.
- Saída só aparece via `println()` / `printJson()` / `printCsv()` / `printToon()`. Script mudo = resultado invisível.
- Erro: envolver em `try/catch` com `printException("contexto", e)` pra ver o stack trace.
- Edição multi-arquivo: ler + `replace` cada arquivo, `check` de âncora única ANTES de gravar, todas as gravações num único `writeAction { }`, salvar com `VfsUtil.saveText`.
- `modal` default `smart_non_modal` serve pra quase tudo; `unleashed` só pra mexer de propósito em diálogo aberto.
- Timeout default 600s. Imports são opcionais (defaults já carregados); se precisar, no topo do script.
- Errar 2–3 tentativas de compilação é normal — a API é vasta. Ajustar e repetir, não desistir pro grep.

## Receitas prontas (buscar com `steroid_fetch_resource` antes de escrever Kotlin do zero)

| Tarefa | URI |
|---|---|
| Índice geral (começar aqui) | `mcp-steroid://prompt/skill` |
| Guia completo de código IntelliJ | `mcp-steroid://skill/coding-with-intellij` |
| Threading (read/write actions) | `mcp-steroid://skill/coding-with-intellij-threading` |
| Find usages / referências | `mcp-steroid://lsp/find-references` |
| Duplicatas | `mcp-steroid://ide/find-duplicates` |
| Inspeção nomeada + quick-fix | `mcp-steroid://ide/inspect-and-fix` |
| Rodar/debugar teste | `mcp-steroid://prompt/test-skill` · `mcp-steroid://debugger/overview` |
| Diff unificado (arquivos com drift) | `mcp-steroid://ide/apply-unified-diff` |
| Git blame/history via IDE | `mcp-steroid://vcs/overview` |

## Armadilhas conhecidas

| Armadilha | Consequência | Antídoto |
|---|---|---|
| Passar `name` em vez de `project_name` | "Project not found" | sempre rotear pela chave opaca de `steroid_list_projects` |
| IDE fechada | MCP não responde | conferir com `steroid_list_projects`; não subir IDE só por isso |
| Porta anotada em memória | quebra no próximo reinício | porta é transitória; systemd `fix-ide-mcp` conserta sozinho |
| Coordenada de screenshot no `xdotool` | clique fora do alvo (escala) | coordenada lógica só serve pro `steroid_input` |
| `ProblemDescriptor` lido fora de `readAction` | `ReadAccessException` | consumir dentro da mesma read action |
| Script sem `println` | saída vazia, parece falha | sempre imprimir o resultado |
| Saída gigante (teste, log) | estouro de limite de token do MCP | `take(30) + takeLast(30)` |

## Divisão de trabalho entre os MCPs de IDE

| MCP | Papel | Exemplo |
|---|---|---|
| `jetbrains` | endpoints prontos de controle: SQL, terminal, run config, lint | `execute_sql_query`, `execute_terminal_command` |
| `jetbrains-index` | navegação pelo índice: achar símbolo, referência, hierarquia | `ide_find_references`, `ide_call_hierarchy` |
| `jetbrains-steroid` | código arbitrário DENTRO do processo + GUI (screenshot/input) | refactor multi-arquivo em 1 chamada, fechar modal |

Regra prática: existe endpoint pronto no `jetbrains`/`jetbrains-index` que resolve? Use-o.
Não existe, ou a tarefa exige estado interno da IDE ou interação de tela? Steroid, sem workaround.
