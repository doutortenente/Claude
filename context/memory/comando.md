# MEMÓRIA MANUAL — COMANDO  (~/.claude/memory/comando.md)
<!-- Carrega em TODA mensagem via @memory/comando.md. Alvo: <15.000 chars. -->
<!-- Histórico e detalhe de débito NÃO moram aqui. Ver ARQUIVOS IRMÃOS no fim. -->

## OPERADOR
- Nícholas Nagaita ("Dr. Tenente"). Médico, residente de Medicina Intensiva (R2). 2º Tenente da reserva, FAB.
- Mora em São José dos Campos/SP. Plantões: UTI 34 leitos em São Caetano do Sul/SP (UTI 2/3/4 = 13+13+8; a UTI 2 ganhou o L13 em ago-2026) + Beneficência Portuguesa. Noite e fim de semana.
- **Ele NÃO assume a unidade inteira: fica com 6–12 pacientes por plantão.** Contagem de tela e de passagem é do PLANTÃO dele, não dos 34 leitos do serviço.
- GitHub `doutortenente`. E-mail `Dr.tenente@nagaitaltda.com`.
- Doutrina inegociável: ZERO ALUCINAÇÃO. Campo sem fonte = null, nunca inventado.

## PERFIL & CONDUTA
- 26 anos. Dev iniciante (~mar/2026), aprende rápido — explicar engenharia sem assumir base prévia.
- Neurodivergente: TDAH + dislexia + AH/SD.
  - TDAH → default claro, não cardápio de opções.
  - Dislexia → visual e estruturado; tabela/lista curta > parágrafo denso.
  - AH/SD → canalizar pra ferramenta flexível, não espalhar em várias paralelas.
- Estilo: respostas curtíssimas ("2", "Manda Bala", "eae"). Autonomia total quando confia no plano. Quer entrega verificada e funcional, não relatório de processo.
- Perguntar só em decisão que muda o produto (escopo/UX), em múltipla escolha numerada. Em decisão técnica, tende ao mais simples.
- Commit e push são rotina — a `secretaria` sincroniza os repos sozinha. Não tratar merge como portão cerimonial.
- Executar, não devolver: missão executável = eu executo até a parede REAL. Nunca devolver comando pra ele digitar. `sudo` NÃO é mais parede: senha em `SUDO_TIJOLAO_PASSWORD` no `.env` §12 (ordem 23-jul-2026, "usar quando precisar") — usar via `printf '%s\n' "$SENHA" | sudo -S -p '' <cmd>`.
- GUI/navegador liberado por padrão (abrir página, navegar, ler console, screenshot de diagnóstico) sem pedir. Guardrail: ação destrutiva na GUI (deletar, publicar, pagar) ainda pede OK. Ele revoga dizendo "para".
- SEM BACKUP (ordem 10-jul-2026): não acumular `.bak` nem tarball de backup local.
- **Ele paga cada token.** Braçal vai pra subagente barato. Não refazer o que o subagente já fez. Pedido de PENSAR não é pedido de PRODUZIR.
- Proatividade é o esperado — o pecado é bola de neve: coisa meio-instalada, duplicada, sem uso ou sem prova. O que entra é ligado e provado na mesma sessão, ou removido nela.

## ARQUITETURA DE INFORMAÇÃO — 6 CAMADAS (travada 02-jul-2026)
Uma casa por tipo de coisa; nada mora em 2 lugares. Antes de salvar/mover QUALQUER arquivo, decidir a camada.

| Camada | Casa | O que mora aqui |
|---|---|---|
| Código | GitHub `doutortenente/*` | fonte canônica dos repos |
| PC local | `~/projetos` (disco Tijolão) | arquivo-CHAVE em uso; cópia de trabalho dos repos |
| Downloads | `~/Downloads` | TEMPORÁRIO — entra, processa, limpa |
| Conhecimento | `~/vaults/celebro` | wiki-LLM: material médico, protocolo, referência (ler o `.md`, não vetorizar) |
| Documento | OneDrive | banco de documentos guardados e catalogados (`_INDEX.md`/`_index.json`) |
| Dado clínico | Supabase (SASI) | pacientes EFETIVAMENTE internados |

Abertos: protocolo clínico vai pro celebro (wiki), não RAG — só sobrevive como RAG se for o APP consultando à beira-leito. Paciente com alta: destino de arquivamento indefinido.

**Andar de cima (domínios da vida): ALPHA COUNCIL — WAR ROOM** (selado 28-jul-2026) — Gabinete no topo + S1 Pessoal / S2 Inteligência / S3 Operações / S4 Logística + fila de ação (Agora·Próximo·Aguardando·Arquivar·Descartar). As 6 camadas seguem mandando no endereço FÍSICO. Nome "estudo" VETADO (a função é S2 Inteligência). Doutrina completa: `~/.claude/memory/alpha-council.md` · implementação: `~/projetos/PRD-alpha-council-war-room.md` (Cowork online).

## AMBIENTE
- **SO/HW**: Linux Mint 22.3 Cinnamon (Ubuntu 24.04 noble), hostname "Tijolão". 4 núcleos / 3,5GHz · **RAM 7,6GiB = GARGALO físico** · SSD ADATA 111,8G · ZRAM ativo (swap total 5,8G).
- **Repos em `~/projetos/`** (NÃO `~/WebstormProjects`).
- **Node**: nvm default **v24.16.0**. Obrigatório — supabase-js exige WebSocket nativo (Node ≥22). `.bashrc` não faz `nvm use` automático.
- **Deno** `2.9.1` em `~/.deno` — **fora do PATH**, chamar por caminho completo (Edge Functions do SASI).
- **IDEs (2, nunca 2 abertas juntas — RAM)**: WebStorm 2026.2 (código SASI/TS, a IDE principal) · DataGrip 2026.2 (banco; instalada 22-jul-2026, ainda não aberta). PyCharm DELETADO pelo operador (29-jul-2026). Teto `-Xmx1489m` nas três. Config dislexia em toda IDE: fonte 16pt + espaçamento 1.4 + separadores de método ON. Plugins de IA embutidos da JetBrains desabilitados — comem RAM e duplicam o que já existe. Settings Sync mexe em plugin sozinho — editar config SEMPRE com IDE fechada.
- **MCP de IDE**: `jetbrains` (controle completo) + `jetbrains-index` (navegação) — nomes NEUTROS de propósito, qualquer IDE JetBrains viva atende a porta. Porta muda a cada reinício; conserto é automático por evento (systemd `fix-ide-mcp.path` → `~/projetos/scripts/pc/fix_ide_mcp.py`). **Porta é transitória — nunca vai pra memória.**
- **`~/projetos/.mcp.json`**: supabase · obsidian · webstorm. (A entrada `sasi` foi REMOVIDA em 11-ago-2026: o `mcp-server/` não existe em disco nenhum desde a troca do SASI v2 pelo v3 — o wrapper apontava para o vazio e falhava calado.) Os 3 MCP de IDE moram SÓ na global `~/.claude.json`: `jetbrains` e `jetbrains-index` (porta muda a cada reinício, `fix_ide_mcp.py` reaponta) e `jetbrains-steroid` — este em **HTTP na porta FIXA 6315**, sem o intermediário `devrig`. `~/projetos/.claude/settings.json` tem `enableAllProjectMcpServers: true`.
- **Navegador por MCP**: automação de navegador no Tijolão = servidor `playwright` (dirige o Chrome REAL dele, janela visível pra ele digitar credencial). Extensão `claude-in-chrome`: só pareia se o claude.ai estiver LOGADO no Chrome com a conta da sessão (`ntg.trabalho@gmail.com`) — 23-jul-2026 a sessão estava deslogada e a extensão nunca apareceu na lista. Caminho confiável é o playwright.
- **CASA ÚNICA DE SCRIPT (travada 22-jul-2026)**: TODO script de infra mora em `~/projetos/scripts/`, em 5 gavetas. Nenhum repo tem `scripts/` próprio. Exceção: script que É o corpo de uma skill fica em `skills/<nome>/scripts/`; tirar de lá quebra a skill.

| Gaveta | Scripts |
|---|---|
| `scripts/indices/` | `build_`/`query_` de **claude**, **sasi** (ROOT reapontado para `SASI-V3` em 14-ago-2026, junto do rename da pasta) e **dev** + `push_repo_index_to_postgres.py`. Cada um tem o repo-alvo fixo no topo (`ROOT = DEV/"claude"`) — **renomear pasta de repo obriga a passar aqui**, senão o índice indexa o vazio calado |
| `scripts/pc/` | `pc_higiene.py` (limpeza, `--apply`) · `saude_pc.py` (boletim) · `faxina_dev.py` (boletim) · `fix_ide_mcp.py` (chamado pelo systemd) · `otimiza_notebook.sh` (sudo) |
| `scripts/nuvem/` | `arquivar.py` (OneDrive v2, dry-run default) · `onedrive-index/` (5 arq) · `mount-google-drive.sh` (legado) |
| `scripts/sasi/` | `mcp_sasi_wrapper.sh` **DESATIVADO 11-ago-2026** (sai com exit 1; o mcp-server que ele executava não existe mais) · `audit_eventos.py` |
| `scripts/obsidian/` | `check-obsidian-api.sh` |

  UM caminho é CABEADO fora do `~/projetos` — mover quebra em silêncio: systemd `fix-ide-mcp.service` → `scripts/pc/fix_ide_mcp.py`. (O segundo cabo, `.mcp.json` → `mcp_sasi_wrapper.sh`, foi cortado em 11-ago-2026 junto com o MCP `sasi`.)
- **Config mora onde o Claude Code lê, sem cópia no repo (ordem dele, 22-jul-2026: "symlink caga a organização")**: `~/.claude/settings.json` (global) · `~/projetos/.claude/settings.json` (hooks do workspace) · `<repo>/.claude/rules/*.md` (regra path-scoped, só carrega dentro do repo). As pastas `claude/settings/` e `claude/rules/` eram cópias mortas — apagadas. Symlink só onde já era antes: `~/.claude/skills` e `~/.claude/agents`.
- **Vault celebro** `~/vaults/celebro` — cérebro agente-first, repo git próprio. Âncoras: `CLAUDE.md` (porta) → `index.md` (catálogo) → `FATOS-CRITICOS.md`. Acesso padrão **file-based** (não exige Obsidian aberto). PHI só em `90-PHI-LOCAL/`, fora do git. MCP `obsidian` = REST em `127.0.0.1:27123`, só com app aberto. Catálogo `catalogo.base` (Bases nativo) linkado no `index.md`; 13 plugins ligados pós-faxina 23-jul-2026.
- **Nuvem**: rclone `~/.local/bin/rclone`. Remote `onedrive` ATIVO (Microsoft 365 Family, 1TB, conta `nicholas.teixeira@hotmail.com`) · remote `gdrive` só cópia de segurança.
- **Cofre `~/projetos/.env`** — arquivo REAL no nível do workspace (hierarquia invertida 23-jul-2026 por ordem dele; antes o real morava em `sasi/`, subitem). O symlink `sasi/.env` MORREU junto com a pasta `~/projetos/sasi`; o repo `SASI-V3` não tem `.env` próprio (conferido 11-ago-2026) — quem precisa carrega `~/projetos/.env` direto. 15 seções temáticas (moldura 1–15 travada 29-jul-2026, numeração preservada — memória referencia `§15 Vaultwarden`), 90 chaves ativas, permissão 600, no `.gitignore` do sasi. Segredo multilinha (chave RSA) mora em arquivo próprio (`~/.local/secrets/`, 600) com ponteiro `_FILE` no cofre — padrão pra qualquer credencial grande futura.
- **Jarvis/VPS EXPURGADO 28-jul-2026** (ordem dele): túnel wg0 apagado (config+chave destruídas ANTES da contra-ordem "deixa a VPN" — recriar exige VPS viva e par de chaves novo). Vaultwarden MANTIDO no cofre §15 por ordem dele. Repos jarvis e GROK deletados PELO OPERADOR no site (28-jul-2026). Retomada futura = projeto NOVO, sem herança. Caixa AgentMail mantém o nome antigo.
- **Contas**: AgentMail (`subcomandante-jarvis@agentmail.to`) · Superhuman Docs (workspace "Comando ICU - Alpha Concil") · Slack · Proton Mail `dr.nicholasguilherme@protonmail.com` (e-mail profissional do currículo 2026; kit em `~/.local/secrets/`; senha no `.env` §12).

## FROTA DE SUBAGENTES
Fonte única: `~/projetos/claude/agents/` (`~/.claude/agents` é symlink). Mesma doutrina em `~/projetos/claude/skills` (`~/.claude/skills` symlink). Editar = editar no repo, commitar, pushar. Mapa e roteamento em `agents/README.md`.

| Agente | Modelo | Função |
|---|---|---|
| `batedor` | haiku | Reconhecimento barato, leitura pura. Varre repo/doc/log, devolve resumo curto com arquivo:linha |
| `caco` | haiku | Executor puro: roda script existente, reporta exit code e números exatos. Não escreve |
| `residente` | sonnet | Implementa código de produto já prescrito. Roda typecheck/build/Vitest. Não decide arquitetura |
| `chefe` | opus | Engenheiro do arsenal `~/projetos/scripts/`. Cria/altera/revisa script. Não roda rotina |
| `fiscal` | sonnet | Verificador adversarial: tenta REFUTAR cada claim de uma entrega. Só aponta, não conserta |
| `deploy-sentinel` | — | Gate build/typecheck/lint/test + RLS antes de merge na main. Build do estado COMMITADO |
| `clinical-data-auditor` | opus | ZERO ALUCINAÇÃO nos dados clínicos. Marca `[SEM_FONTE]` |
| `pubmed-evidence-checker` | sonnet | Valida afirmação clínica com PMID via MCP PubMed. MCP fora do ar → declara e para |
| `code-explainer` | — | Lê código/diff, explica em tabela curta |
| `secretaria` | opus | Mantém esta memória + sincroniza repos com GitHub |

Subagente NÃO lança outro subagente (hierarquia = 2 níveis). Papel de "líder de squad" é a ferramenta Workflow, não empilhar Opus.

## FAMÍLIA DE REPOS (`~/projetos/`, GitHub `doutortenente`)
- **SASI-V3** — 🏥 produto principal, painel de plantão de UTI. REESCRITA: **Next.js 16 · React 19 · TypeScript 6 · Tailwind 4 · Supabase**, gerenciador **pnpm@11.20.0** (NÃO npm, NÃO Vite). Comandos: `pnpm dev` · `pnpm check` (typecheck+lint+testes) · `pnpm build` · `pnpm gen:types`. **RENOMEADO em 14-ago-2026 pelo OPERADOR**, dos dois lados de uma vez: pasta `~/projetos/SASI-V3-SEM_MIGUE` → `~/projetos/SASI-V3` e GitHub `SASI-V3-SEM_MIGUE-` (com o hífen sobrando) → `doutortenente/SASI-V3`. O `git remote` local foi reapontado no mesmo dia; o GitHub redireciona o nome velho, então clone antigo não quebra na hora — quebra calado depois. **Numeração**: o repo carrega a reconstrução **V4** (commit 23bd741 de 09-ago congela o V3 e reconstrói sobre templates Next.js) — `CLAUDE.md` diz V4, pasta e GitHub dizem V3, migrations mantêm sufixo `_v3` (aplicadas no banco, não se renomeiam). A pasta antiga `~/projetos/sasi` (v2, React+Vite) NÃO EXISTE MAIS.
- **claude** — ⚙️ config canônica do Claude Code (skills + agents + settings). `_anthropic/` é PROPRIETÁRIO, não redistribuir.
- **celebro** (em `~/vaults/`) — conhecimento.
- **sasi-import** — só no GitHub, fora de `~/projetos`. (`grok` e `dotfiles` deletados/mortos, constatado 28-jul-2026.)
- `comando-uti` descontinuado (24-jun-2026).

## SASI — DOUTRINA
- Supabase `idswehsvvqczzkiatuzu`, região `sa-east-1`. MCP `read_only=false` em produção (ordem dele, 22-jul-2026) — escrita só via migration revisada.
- 5 janelas (atalhos 1–5): Leitos · EixoTempo/HPMA · EixoEstado/Terapias · Problema→Ação · PassagemTurno.
- Ramo C: problema↔conduta **1:1** com meta numérica. Eixos ortogonais. Sinais vitais sempre Máx–Mín. Leito = `UTI#-L##`.
- Escrita: skill → JSON → MCP **`sasi_deploy_ingest`** (aceita `pendencias[] {tarefa, prioridade}`). Edge `ocr-ingest` = legado. Ficha grava `evolucoes`/`pacientes` direto. "Deploy" = MCP sem confirmação extra.
- Alerta só dispara com `confidence ≥ 0.7`; sem isso vira `requires_review` e morre calado.
- Granularidade de tempo = o **plantão** (`ts::date`), não a hora.
- Build: `cd frontend && npm run dev` (Vite :5173). `npm run build|typecheck|lint|format`.
- Memória do repo v2 (`~/projetos/sasi/memory/`) foi embora com a pasta. O v3 documenta em `CLAUDE.md` + `AGENTS.md` + `docs/` (`ARQUITETURA.md`, `AUDITORIA-E-PLANO.md`, `INVENTARIO-MATERIAL.md`) + `.claude/rules/`.
- **BRIEFING obrigatório** antes de compilar plantão: `~/projetos/claude/EXTRACAO-CLINICA-SASI/BRIEFING.md`.

## DECISÕES TRAVADAS
- **Backend Supabase**: RLS por `auth.uid()`, 4 policies separadas (não FOR ALL), claims em `app_metadata`. RLS sempre ON em toda tabela. Regenerar tipos TS após mudança de schema.
- **Migrations**: `YYYYMMDDHHmmss_desc.sql`, SQL lowercase, comentar comando destrutivo.
- **Funções PG**: sempre `set search_path to 'public','extensions','pg_catalog'` + volatilidade correta + schema explícito em extensão (`extensions.digest()`). Sem isso a função quebra em silêncio.
- **Deleção de pasta**: NUNCA `rm -rf` sem listagem COMPLETA primeiro (não `head -20` truncado). Incidente 30-jun-2026: doc apagado junto com instalador, irrecuperável.
- **Fluxo faseado**: extração/skill gera TEXTO revisável primeiro (humano revisa antes de gravar). Tabela SQL só na FASE 2, quando o frontend tiver consumidor ativo. Banco sem consumidor = over-engineering.
- **Modelo por tarefa**: doc/reindexação/organização mecânica → Sonnet. Memória do operador (este arquivo) → Opus. Decisão CLÍNICA ou de SCHEMA → Opus.
- **Automação só por evento, nunca por relógio.**
- **Conferência obrigatória** de achado que dispara ação (regra em `agents/README.md`).

## ARQUIVOS IRMÃOS — abrir sob demanda, NÃO carregam sozinhos
| Arquivo | Abrir quando |
|---|---|
| `~/.claude/memory/debitos.md` | for mexer no SASI, ou ele perguntar "o que está pendente" |
| `~/.claude/memory/log.md` | ele perguntar "o que eu fiz", ou a secretária for registrar sessão |
| `~/.claude/memory/alpha-council.md` | for classificar/organizar domínio da vida, ou ele citar War Room / Alpha Council |

## ÍNDICE DE DÉBITOS ABERTOS (detalhe em `debitos.md`)

**SASI — dados e schema**
1. `evolucoes` com 2 schemas convivendo (ingest `pa_sys_max` × ficha `pas1`); PAM invertida entre os dois; `impressao`/`conduta` são `text[]`, não jsonb; unificação P3 não finalizada
2. Pareamento problema⇄conduta é POSICIONAL, sem validação de tamanho no frontend — quebra em silêncio
3. Correção de evento clínico não propaga pro TEXTO da evolução
4. `source_text` guarda só o cabeçalho, não o valor — rastreabilidade frágil
5. `atbs`/`culturas` = 0 em produção — stewardship incompleto
6. `SASI_OPERATOR_USER_ID` nunca existiu no `.env` → `user_id` grava null em todo ingest

**SASI — alertas e clínica**
7. 7 regras de alerta sem `fonte`/DOI + faltam 3 regras inteiras (hipercalcemia, hipocalemia, acidose)
8. Oligúria não dispara — skill precisa capturar `diurese` (≠ `bh_h`)
9. SOFA: operador precisa validar cutoffs antes de uso à beira-leito; dados escassos travam o Motor v1
10. Ordenador de prescrição por sistema (modo D da skill) — em andamento
11. Backlog clínico em `sasi/docs/BACKLOG-CLINICO.md`

**SASI — infra e código**
12. RAG protocolos: migration `06` versionada mas NUNCA aplicada; tabelas e RPC não existem em prod
13. Check-up de segurança 03-jul não endereçado: 11 `dev_bypass`, extensões em `public`, leaked-password off, `memorias` sem policy, 180 policies permissivas, 10 índices sem uso
14. `gaso-atomica` travada pela constraint `eventos_clinicos_tipo_check`
15. `dispositivos`: upgrade estado+data exige coordenação com o frontend
16. INTERCONSULTAS não implementada — tabela não existe; spec em `CORRECTION.md`
17. Ficha de Evolução redundante ("20 formas de fazer a conduta")
18. Lint: 1 erro pré-existente `frontend/src/lib/exportPDF.ts:63` + 13 warnings
19. Edge Function `health` no repo sem deploy nem consumidor
20. CI ampliado DESTRAVÁVEL (29-jul: classic novo tem scope `workflow`) — falta só executar o push
21. Smoke plantão E2E — checklist em `docs/STATUS.md` §6
22. Apagão 18-jul: dados clínicos deletados em massa, autor desconhecido. **Sem backup no plano atual**

**Fora do SASI**
23. MCP `supabase` com "Invalid ID" — fix só pelo operador: `/mcp` → supabase → Clear authentication → autenticar de novo
24. Chaves Google: conta/projeto bloqueado (403/429) — Gemini via API morto até ele resolver
25. iPad sem sync — LiveSync morto DE VEZ (projeto Jarvis/VPS expurgado 28-jul-2026); caminho vivo: Remotely Save→OneDrive, falta o login Microsoft dele
26. Conflito de rótulo no `.env`: `BEAR_NOTES_API_KEY` × `SASI_LABS_LICENSE`, mesmo valor
27. `uti-tracker`: arquivar, canibalizando 3 ideias antes (batch-import-modal, sedation-widget, clinical-alerts-widget)
28. Motor da passagem: paralelizar a extração de números pelo LLM
29. Drive→OneDrive: 1 doc no Adobe Cloud, `00_Duplicatas/` a revisar, ~12% não copiado
30. RAM 8GB é teto físico — upgrade de pente é o melhor ganho futuro
31. Exa MCP aguardando `EXA_API_KEY` (só ele cria, dashboard.exa.ai) — depois ligar nos dois Claudes e provar handshake
32. Operador: colar diretriz Goggins nas preferências pessoais do claude.ai (cobre chat/celular)
33. Operador: levar PRD Alpha Council pro Cowork online, criar projeto, disparar Bloco 0
34. Operador: reiniciar Claude Code — ativa `ULTRACOST_GATE=off` (+ `/mcp reconnect` jetbrains/jetbrains-index: IDE reiniciou 2× em 29-jul, porta mudou)
35. Operador: chrome://flags → desabilitar Gemini Nano on-device (senão 4,1G volta a baixar)
36. MCPs `basic-memory`+`grafana` órfãos do expurgo Claude Desktop — religar só sob missão (29-jul: entrada morta do basic-memory removida do `.mcp.json`; steroid consertado → `~/.local/jdk-25` restaurado)
37. `claude` (d35f820) + `celebro` (9741129) + `sasi` (b0c79af) sincronizados em 01-ago-2026. Grandes reestruturações de skills e domínios Alpha Council commitadas e pushadas.
38. Débito #20 (PR de CI) concluído e pushado.
39. Débito #36 (steroid consertado) verificado e ativo (jetbrains: 64542 / jetbrains-index: 29172).
40. Débito #37 (deleções órfãs) resolvido na sync de hoje.
41. 🔴 **celebro PÚBLICO com 7 arquivos de PHI versionados** (`PHI-LOCAL/` ≠ `90-PHI-LOCAL/` do `.gitignore`) — ação do OPERADOR: tornar privado + `git rm --cached` (11-ago-2026)
42. ~~`pnpm check` falha por `SystemPanel.tsx`~~ **MORTO 14-ago-2026**: o arquivo nunca entrou no repo — vive só no `stash@{0}`, junto de `ProblemRow.tsx`, `VitalStat.tsx` e `src/proxy.ts`. `pnpm check` = 303 testes, exit 0.
43. ~~Working tree sujo divergindo de `b82fa32`~~ **MORTO 14-ago-2026**: absorvido pelo merge `0c15203`; working tree limpo, `main` em dia com o GitHub.
44. Sobraram 2 stashes no SASI-V3, decisão do OPERADOR: `stash@{0}` (`pre-pull-14ago`) com `proxy.ts` + 3 componentes que ninguém importa · `stash@{1}` (`colisoes-ff-design-system`, 08-ago) com 472 linhas, 430 delas no `globals.css`, anteriores à reconstrução de 09-ago.
45. `~/.claude.json` guarda a chave de projeto no caminho VELHO (`…/SASI-V3-SEM_MIGUE`) — não foi editada porque a sessão viva reescreve o arquivo. Custo de deixar: rediz o diálogo de confiança uma vez no caminho novo. Nada de valor dentro (`allowedTools` e `mcpServers` estão vazios, conferido 14-ago).
