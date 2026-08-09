# Procedimentos passo a passo

Receita de bolo para as 8 operações de rotina deste repo. Cada procedimento tem passos numerados, o comando exato e a
linha **como saber que deu certo** — se essa linha não bater, o procedimento não terminou.

Regra da casa: a doutrina (*o porquê*) mora em `../CLAUDE.md` e em `../.claude/rules/`. Aqui só tem o *como*.

| # | Procedimento | Quando |
| --- | --- | --- |
| 1 | [Adicionar uma skill nova ao serviço](#1-adicionar-uma-skill-nova-ao-serviço) | skill pronta precisa entrar em operação |
| 2 | [Desligar uma skill que virou pedágio](#2-desligar-uma-skill-que-virou-pedágio) | skill nunca é acionada e custa contexto |
| 3 | [Adicionar um subagente novo](#3-adicionar-um-subagente-novo) | tarefa braçal repetida sem dono na frota |
| 4 | [Regerar o índice](#4-regerar-o-índice-depois-de-mudar-skill-ou-agente) | depois de mexer em skill ou agente |
| 5 | [Entregar um trabalho: do branch ao merge](#5-entregar-um-trabalho-do-branch-ao-merge) | fim de qualquer trabalho |
| 6 | [Auditar o repo](#6-auditar-o-repo) | antes de fechar reestruturação grande |
| 7 | [Consertar atalho quebrado](#7-consertar-atalho-symlink-quebrado-em-claudeskills) | skill sumiu da lista |
| 8 | [FASE 2 — renomear para `claude-steroid`](#8-fase-2-pendente--renomear-projetosclaude-para-projetosclaude-steroid) | ainda **não executado** |

---

## 1. Adicionar uma skill nova ao serviço

Uma **skill** é uma pasta com um arquivo `SKILL.md` dentro — uma receita escrita que o Claude lê e passa a saber
executar. Colocar "em serviço" é fazer o Claude enxergá-la em toda sessão.

O caminho curto: peça ao Claude *"adiciona essa skill"* e a skill `add-skill`
(`../.claude/skills/add-skill/SKILL.md`) executa tudo isto sozinha. Abaixo, o mesmo procedimento na mão.

1. **Escolher o pacote.** As skills ativas moram em `skills-que-prestam/<pacote>/<nome>/`. São 5 gavetas temáticas:

   ```bash
   ls ~/projetos/claude/skills-que-prestam/
   ```

   `00-pacote-ide-e-documentacao` · `01-pacote-skills-medicas` · `02-pacote-skills-workspace` ·
   `03-pacote-skills-claude-nativas` · `04-pacote-skills-supabase-e-vercel`.

2. **Criar a pasta e escrever o `SKILL.md`.** O **frontmatter** (cabeçalho entre `---`, como o cabeçalho de um
   prontuário: identifica a peça antes do conteúdo) precisa de `name` e `description`. A `description` é o que dispara a
   skill — escreva *quando* usar, com as palavras que o operador usaria de verdade.

   ```bash
   mkdir -p ~/projetos/claude/skills-que-prestam/01-pacote-skills-medicas/<nome-da-skill>
   ```

   ```markdown
   ---
   name: <nome-da-skill>
   description: Use quando <gatilho em português, com as palavras reais do operador>. Não use para <o que NÃO é dela>.
   ---

   # <Título>

   ...corpo em Markdown...
   ```

3. **Ligar o atalho.** Um **symlink** é um atalho de arquivo — uma placa que diz "o conteúdo real está lá". O Claude só
   lê skills de `~/.claude/skills/`, então a pasta do repo precisa de uma placa lá dentro. Use caminho absoluto:

   ```bash
   ln -s ~/projetos/claude/skills-que-prestam/01-pacote-skills-medicas/<nome-da-skill> \
         ~/.claude/skills/<nome-da-skill>
   ```

4. **Provar que carregou.** Abra uma sessão nova do Claude Code e rode `/skills` — a skill tem que aparecer na lista
   pelo nome.

5. **Regerar o índice** (procedimento 4) e **fechar por branch e PR** (procedimento 5).

**Como saber que deu certo:** `ls -l ~/.claude/skills/<nome-da-skill>` mostra a seta apontando para a pasta no repo,
`/skills` lista a skill numa sessão nova, e a contagem de atalhos bate com a de skills:

```bash
ls ~/.claude/skills | wc -l
find ~/projetos/claude/skills-que-prestam -mindepth 3 -maxdepth 3 -name SKILL.md | wc -l
```

Os dois números têm que ser iguais.

---

## 2. Desligar uma skill que virou pedágio

Toda skill instalada injeta `name` + `description` no prompt em **toda** mensagem — 11.173 caracteres hoje, no total.
Skill que nunca é acionada é pedágio pago em cada frase. Desligar é remover o atalho; a pasta **continua no repo**, e
religar é um comando.

1. **Conferir para onde o atalho aponta antes de apagar** (nunca apague às cegas):

   ```bash
   ls -l ~/.claude/skills/<nome-da-skill>
   ```

   A saída tem que mostrar `-> /home/dr/projetos/claude/skills-que-prestam/...`. Se mostrar outra coisa, pare.

2. **Remover só o atalho.** Sem barra no final — barra faz o `rm` mirar no conteúdo, não na placa:

   ```bash
   rm ~/.claude/skills/<nome-da-skill>
   ```

3. **Confirmar que a pasta original sobreviveu:**

   ```bash
   ls ~/projetos/claude/skills-que-prestam/<pacote>/<nome-da-skill>/SKILL.md
   ```

4. **Regerar o índice** (procedimento 4) e atualizar a contagem de skills ativas em `REPOSITORY-INVENTORY.md`.

5. Fechar por branch e PR (procedimento 5).

Para religar depois, é o passo 3 do procedimento 1 de novo.

**Como saber que deu certo:** `ls ~/.claude/skills | wc -l` caiu em 1, o `SKILL.md` do passo 3 ainda existe, e a skill
sumiu de `/skills` numa sessão nova.

---

## 3. Adicionar um subagente novo

Um **subagente** é um Claude auxiliar com missão estreita e modelo próprio — o barato varre arquivo, o caro decide.
Ele economiza contexto do agente principal. Antes de criar, leia `../agents/README.md`: se um dos 18 já faz o
trabalho, criar outro é bola de neve, não ganho.

1. **Conferir se já existe dono para a tarefa:**

   ```bash
   python3 ~/projetos/scripts/indices/query_claude_index.py agents
   ```

2. **Ler o molde e as convenções** antes de escrever:

   - `../agents/docs/template-de-agente.md` — o esqueleto
   - `../agents/docs/convencoes.md` — o que é obrigatório
   - `../agents/docs/roteamento.md` — qual agente pega qual tarefa
   - `../agents/CONTRIBUTING.md` — as regras de contribuição

3. **Criar a pasta e os dois arquivos.** O padrão da casa é `agents/<nome>/<nome>.md` + `agents/<nome>/README.md`:

   ```bash
   mkdir -p ~/projetos/claude/agents/<nome>
   ```

   O `<nome>.md` começa com frontmatter neste formato (exemplo real, `agents/fiscal/fiscal.md`):

   ```yaml
   ---
   name: <nome>
   description: Use quando <gatilho>. Não use para <o que é de outro agente, citando o nome dele>.
   tools: Read, Grep, Glob, Bash
   disallowedTools: Agent
   model: haiku | sonnet | opus
   permissionMode: bypassPermissions
   ---
   ```

   `disallowedTools: Agent` é obrigatório: subagente não lança subagente — a hierarquia tem 2 níveis, não mais.

4. **Rodar o validador da frota.** Ele confere frontmatter, nomes e convenções de todos os agentes:

   ```bash
   python3 ~/projetos/scripts/claude/validar_frota.py --strict
   ```

   `--strict` faz o script terminar com **exit code** 1 (código de saída = o "sinal vital" que um programa devolve ao
   terminar: 0 é sucesso, qualquer outro é falha) se achar erro.

5. **Regerar o índice** (procedimento 4). O atalho `~/.claude/agents` já aponta para `agents/` inteira — agente novo
   não precisa de atalho próprio.

6. Fechar por branch e PR (procedimento 5), e atualizar a contagem de subagentes em `REPOSITORY-INVENTORY.md`.

**Como saber que deu certo:** `validar_frota.py --strict` termina em exit code 0 (`echo $?` mostra `0`), o agente
aparece em `query_claude_index.py agents`, e numa sessão nova o Claude consegue chamá-lo pelo nome.

---

## 4. Regerar o índice depois de mudar skill ou agente

O **índice** é o catálogo de busca do repo: um banco de dados pequeno (`memory/claude_index.db`) mais dois documentos
legíveis (`memory/MAPA-CLAUDE.md` e `memory/SKILLS-CATALOGO.md`). É o fichário do repo — se estiver velho, toda consulta
mente com cara de verdade.

O índice deste repo **não** se regenera sozinho. Rodar na mão é obrigatório depois de criar, apagar ou renomear skill,
agente ou documento.

1. **Regerar:**

   ```bash
   python3 ~/projetos/scripts/indices/build_claude_index.py
   ```

2. **Conferir que o catálogo ficou mais novo que o que você mexeu:**

   ```bash
   ls -l --time-style=+%d-%m\ %H:%M ~/projetos/claude/memory/
   ```

3. **Consultar para provar que a mudança entrou:**

   ```bash
   python3 ~/projetos/scripts/indices/query_claude_index.py skill <nome-da-skill>
   python3 ~/projetos/scripts/indices/query_claude_index.py agents
   ```

O `claude_index.db` **não** vai para o git (é gerado, não escrito). Já `MAPA-CLAUDE.md` e `SKILLS-CATALOGO.md` são
versionados — entram no commit da entrega.

**Como saber que deu certo:** o script termina em exit code 0, a data dos arquivos em `memory/` é de agora, e a
consulta do passo 3 devolve a skill ou o agente que você acabou de mexer.

---

## 5. Entregar um trabalho: do branch ao merge

A doutrina completa — nome de branch, formato da mensagem de commit, o que nunca entra num commit e como desfazer cada
tipo de erro — está em **`../.claude/rules/git-workflow.md`**. Não repito aqui. Leia lá antes da primeira vez.

O que interessa neste runbook é a ordem de execução, e a única regra que não pode ser esquecida: **commit direto na
`main` é proibido**; o merge, esse sim, não pede confirmação (ordem permanente de 28-jul-2026).

1. **Antes de abrir o branch**, rode a conferência adversarial: peça ao Claude *"confere"* e a skill
   `verify-before-finish` (`../.claude/skills/verify-before-finish/SKILL.md`) tenta derrubar cada afirmação da
   entrega. Entrega que não passou por ela não vai para PR.

2. **Executar a sequência de 7 passos** de `../.claude/rules/git-workflow.md` §"Sequência de uma entrega completa" —
   `git switch -c` → `git add` seletivo → `git status` → `git commit` → `git push -u` → `gh pr create --fill` →
   `gh pr merge --squash --delete-branch` → `git switch main && git pull`.

3. **Confirmar que a `main` local ficou limpa e igual à remota:**

   ```bash
   cd ~/projetos/claude && git status --short && git log --oneline -3
   ```

**Como saber que deu certo:** `git status --short` não imprime nada (nenhuma alteração solta), `git branch` mostra você
em `main`, o commit da entrega aparece no `git log --oneline -3`, e o branch de trabalho sumiu — foi apagado pelo
`--delete-branch`.

---

## 6. Auditar o repo

A auditoria confere quatro coisas que apodrecem em silêncio: caminho citado em documento que não existe mais no disco,
atalho de skill quebrado, índice velho e número publicado que deixou de bater. Nenhum outro agente da frota faz isso.

1. **Disparar a skill.** Diga ao Claude *"audita o repo"* — a skill `audit-repository`
   (`../.claude/skills/audit-repository/SKILL.md`) faz as 5 verificações e devolve o relatório em tabela.

2. **Ler o relatório.** Ele vem sempre com estas 5 linhas, nesta ordem — nenhuma pode faltar:

   | Item | O que significa quando dá FALHA |
   | --- | --- |
   | Caminhos citados em docs | um documento manda o leitor para um arquivo que não existe |
   | Symlinks × skills | há skill sem atalho, ou atalho sem skill |
   | Symlinks quebrados | atalho apontando para o vazio — a skill sumiu da sessão (ver procedimento 7) |
   | Índice | o catálogo é mais velho que os arquivos — toda consulta está mentindo (ver procedimento 4) |
   | Números do inventário | `REPOSITORY-INVENTORY.md` publica contagem que não bate mais com o disco |

   Item que a skill não conseguiu verificar sai como `[SEM_FONTE]` — nunca como "OK". Cada FALHA vem com o caminho
   exato do arquivo culpado.

3. **Corrigir na ordem do relatório**, de cima para baixo. Caminho quebrado em documento é o mais grave: manda pessoa e
   agente para o lugar errado.

4. **Rodar de novo** e só então fechar por branch e PR (procedimento 5).

**Como saber que deu certo:** as 5 linhas do relatório saem `OK`, sem nenhum `[SEM_FONTE]`, numa execução feita
*depois* das correções.

---

## 7. Consertar atalho (symlink) quebrado em `~/.claude/skills/`

Atalho quebrado é a placa apontando para uma sala que foi demolida: a pasta da skill foi movida, renomeada ou apagada, e
o atalho ficou. O Claude simplesmente não enxerga mais a skill — sem erro, sem aviso.

1. **Detectar.** `-xtype l` lista atalhos cujo destino não existe:

   ```bash
   find ~/.claude/skills -maxdepth 1 -xtype l
   ```

   Saída vazia = nenhum quebrado. Hoje o número correto é **0**.

2. **Ver para onde o atalho quebrado aponta** — o destino errado diz o que aconteceu (pasta renomeada? pacote trocado?):

   ```bash
   ls -l ~/.claude/skills/<nome-quebrado>
   ```

3. **Achar onde a pasta foi parar de verdade:**

   ```bash
   find ~/projetos/claude/skills-que-prestam -maxdepth 2 -type d -name '<nome-quebrado>'
   ```

4. **Refazer o atalho** — apagar a placa velha e pregar a nova, sempre com caminho absoluto:

   ```bash
   rm ~/.claude/skills/<nome-quebrado>
   ln -s <caminho-real-do-passo-3> ~/.claude/skills/<nome-quebrado>
   ```

   Se o passo 3 não achou nada, a skill não existe mais: então o certo é só o `rm` — o atalho é lixo.

5. **Reconferir os dois números:**

   ```bash
   find ~/.claude/skills -maxdepth 1 -xtype l | wc -l   # tem que dar 0
   ls ~/.claude/skills | wc -l                          # tem que bater com a contagem de SKILL.md
   ```

**Como saber que deu certo:** o `find` do passo 5 devolve `0`, a contagem de atalhos bate com a de `SKILL.md` das
skills ativas, e a skill volta a aparecer em `/skills` numa sessão nova.

---

## 8. FASE 2 PENDENTE — renomear `~/projetos/claude` para `~/projetos/claude-steroid`

> **Este procedimento ainda NÃO foi executado.** A pasta continua sendo `~/projetos/claude` e o repositório no GitHub
> continua sendo `doutortenente/Claude`. Nenhum documento deste repo deve escrever `~/projetos/claude-steroid` como se
> já existisse. *Claude-Steroid* hoje é o nome da arquitetura, não o nome da pasta.

**Por que é arriscado:** nada aqui usa caminho relativo. Os 36 atalhos de skill, os scripts de índice, os arquivos de
memória e a configuração global gravam `/home/dr/projetos/claude` **por extenso**. Mover a pasta quebra tudo isso de
uma vez — e quebra em silêncio, sem mensagem de erro: a skill some da lista, o índice para de achar arquivo, o script
falha ao abrir caminho inexistente.

### Ordem de conserto — não pular, não trocar a ordem

| Etapa | O que fazer | Quem executa |
| --- | --- | --- |
| **(a)** | Fechar o projeto `claude` na IDE WebStorm | **OPERADOR** |
| (b) | Mover a pasta | Claude |
| (c) | Refazer o atalho `~/.claude/agents` | Claude |
| (d) | Refazer os 36 atalhos de `~/.claude/skills/` | Claude |
| (e) | Corrigir `ROOT` nos 2 scripts de índice | Claude |
| (f) | Corrigir `saude_pc.py` e `validar_frota.py` | Claude |
| (g) | Corrigir `~/.claude.json` e os 2 arquivos de memória | Claude |
| (h) | Corrigir `~/projetos/CLAUDE.md` | Claude |
| (i) | Corrigir as auto-referências internas (enumeradas por grep, 14 em 08-ago-2026) | Claude |
| (j) | Renomear o repositório no GitHub e atualizar o **remote** | Claude |
| (k) | Regerar o índice e conferir 0 atalho quebrado | Claude |

---

#### (a) Fechar o projeto na IDE — **depende do operador**

A WebStorm mantém arquivos abertos e um índice próprio apontando para o caminho antigo. Mover a pasta com a IDE aberta
produz projeto fantasma, arquivos "desaparecidos" e reindexação forçada — com 7,6 GiB de RAM, isso é travamento de
máquina.

**Nícholas: feche o projeto `claude` na WebStorm (File → Close Project) e responda "fechado" antes de eu começar.**
Nenhuma etapa abaixo pode rodar antes disso.

#### (b) Mover a pasta

```bash
mv ~/projetos/claude ~/projetos/claude-steroid
ls -d ~/projetos/claude-steroid
```

A partir daqui, **tudo está quebrado** até a etapa (k). Não interromper no meio.

#### (c) Refazer o atalho de agentes

```bash
rm ~/.claude/agents
ln -s ~/projetos/claude-steroid/agents ~/.claude/agents
ls ~/.claude/agents | head -3
```

#### (d) Refazer os 36 atalhos de skill

Todos apontam com caminho absoluto para `/home/dr/projetos/claude/...`. Recriar em bloco:

```bash
for l in ~/.claude/skills/*; do
  alvo=$(readlink "$l") || continue
  case "$alvo" in
    /home/dr/projetos/claude/*)
      novo="/home/dr/projetos/claude-steroid/${alvo#/home/dr/projetos/claude/}"
      rm "$l" && ln -s "$novo" "$l" ;;
  esac
done
find ~/.claude/skills -maxdepth 1 -xtype l | wc -l   # tem que dar 0
```

#### (e) Corrigir o `ROOT` dos scripts de índice

Os dois trazem a linha `ROOT = os.path.join(DEV, "claude")` — em `build_claude_index.py` é a linha 16, em
`query_claude_index.py` é a linha 23. Trocar `"claude"` por `"claude-steroid"`:

- `~/projetos/scripts/indices/build_claude_index.py`
- `~/projetos/scripts/indices/query_claude_index.py`

```bash
grep -n 'os.path.join(DEV, "claude")' ~/projetos/scripts/indices/build_claude_index.py \
                                      ~/projetos/scripts/indices/query_claude_index.py
```

#### (f) Corrigir os dois scripts que citam o caminho

- `~/projetos/scripts/pc/saude_pc.py` — lista `HOME / "projetos/claude"` entre os repos vigiados
- `~/projetos/scripts/claude/validar_frota.py` — `AGENTS_DIR = Path.home() / "projetos" / "claude" / "agents"`

```bash
grep -rn 'projetos/claude[^-]\|"projetos", "claude[^-]\|projetos" / "claude[^-]' ~/projetos/scripts/
```

O grep tem que voltar vazio depois da correção.

#### (g) Corrigir configuração global e memória

- `~/.claude.json` — configuração global do Claude Code (guarda projetos conhecidos e servidores MCP)
- `~/.claude/memory/comando.md`
- `~/.claude/memory/log.md`

```bash
grep -n 'projetos/claude' ~/.claude.json ~/.claude/memory/comando.md ~/.claude/memory/log.md
```

Cuidado: `~/.claude.json` é JSON — editar com cuidado e conferir que continua legível:

```bash
python3 -c "import json;json.load(open('/home/dr/.claude.json'));print('json ok')"
```

#### (h) Corrigir o índice do workspace

`~/projetos/CLAUDE.md` — a tabela de repos aponta `claude/` e descreve os atalhos.

```bash
grep -n 'claude/' ~/projetos/CLAUDE.md
```

#### (i) Corrigir as auto-referências internas

Não confie em lista fixa aqui — ela envelhece a cada documento novo. Enumere na hora, antes de editar:

```bash
grep -rl 'projetos/claude' ~/projetos/claude-steroid/ --include='*.md' | grep -v '/\.git/'
```

Medido em 08-ago-2026: **14 arquivos** (`.md` fora do `.git`). Corrija todos os que o comando listar, incluindo
este próprio `docs/RUNBOOK.md`. Depois, o grep de conteúdo abaixo só pode devolver ocorrências de `claude-steroid`:

```bash
grep -rn 'projetos/claude[^-]' ~/projetos/claude-steroid/ --include='*.md' | grep -v '/\.git/'
```

#### (j) Renomear no GitHub e atualizar o remote

**Remote** = o endereço do repositório na nuvem que o `git push` usa. Renomear no site não muda o endereço gravado
localmente — tem que trocar na mão.

```bash
gh repo rename Claude-Steroid --repo doutortenente/Claude
cd ~/projetos/claude-steroid
git remote set-url origin https://github.com/doutortenente/Claude-Steroid.git
git remote -v
git fetch origin && git status
```

O GitHub mantém redirecionamento do nome antigo, mas depender disso é deixar dívida — corrija o remote na hora.

#### (k) Regerar o índice e conferir

```bash
python3 ~/projetos/scripts/indices/build_claude_index.py
find ~/.claude/skills -maxdepth 1 -xtype l | wc -l
ls ~/.claude/skills | wc -l
python3 ~/projetos/scripts/claude/validar_frota.py --strict; echo "exit=$?"
```

Depois, rode a auditoria completa (procedimento 6) e feche por branch e PR (procedimento 5).

**Como saber que deu certo (todas as linhas, sem exceção):**

| Verificação | Resultado obrigatório |
| --- | --- |
| `find ~/.claude/skills -maxdepth 1 -xtype l \| wc -l` | `0` |
| `ls ~/.claude/skills \| wc -l` | bate com a contagem de `SKILL.md` ativos |
| `grep -rn 'projetos/claude[^-]' ~/projetos/claude-steroid/ ~/projetos/scripts/ ~/projetos/CLAUDE.md ~/.claude/memory/ --exclude-dir=.git` | vazio |
| `validar_frota.py --strict` | `exit=0` |
| `git remote -v` | aponta para `Claude-Steroid` |
| Auditoria (procedimento 6) | as 5 linhas em `OK` |
| WebStorm | reabrir o projeto pelo caminho novo e ver a árvore de arquivos completa |

Só quando todas passarem é que a Fase 2 pode ser declarada concluída — e este bloco de aviso, apagado deste arquivo.
