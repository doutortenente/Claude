# deploy-sentinel — documentação

## O que faz
Portão final antes de mergear na `main` do SASI — merge ali dispara **deploy** (publicação automática do código em
produção) na Vercel (`sasi-uti.vercel.app`). Roda **typecheck** (conferência de tipo sem executar o código),
**lint** (corretor automático de erro bobo), **build** (compilação de produção) e testes Vitest quando existirem,
confere RLS (**Row Level Security**, trava de acesso por linha no banco) em tabela nova e tipos TS regenerados, e
devolve veredito binário: PODE MERGEAR ou NÃO PODE MERGEAR.

## Quando despachar

| Situação | Por que este agente e não o vizinho |
|---|---|
| Antes de qualquer push/merge na `main` do SASI | É o portão dedicado — roda os comandos reais (typecheck/lint/build/teste) e dá veredito binário; `fiscal` refuta CLAIM de uma entrega, não roda build do zero |
| Migration nova precisa checar RLS antes de subir | Ele confere policy por operação no diff; `segurador` (opus) é auditoria de segurança ampla, não o portão de merge pontual |
| Confirmar que código prescrito não quebrou build/teste | Ele valida o estado COMMITADO; `testador` escreve/roda teste sobre código que não escreveu — não é gate de merge |
| Suspeita de que o build local mascarou erro (working tree sujo) | Ele exige checkout limpo + Node 24 antes de rodar — comportamento específico deste agente |

## Ferramentas e por quê

| Ferramenta | Para que serve aqui |
|---|---|
| `Bash` | Rodar typecheck, lint, build e testes com o gerenciador que o repo usa (`pnpm` ou `npm`, decidido pelo lockfile), mais `git diff`/`git status` — é o corpo do trabalho dele |
| `Read` | Ler arquivo de config (`package.json`, migration SQL) para confirmar o que o comando realmente checou |
| `Grep` | Procurar `ENABLE ROW LEVEL SECURITY` / `CREATE POLICY` no diff de migration |
| `Glob` | Localizar arquivo de migration ou de tipo TS gerado no diff |

Sem **Write/Edit**: proposital — o portão só relata, nunca conserta. Corrigir erro é tarefa de outro agente
(`residente`), não dele. `disallowedTools: Agent` — não pode despachar subagente (hierarquia de 2 níveis: quem
despacha `deploy-sentinel` não pode virar despachante através dele).

## Dependências
- Scripts `typecheck`, `lint` e `build` definidos no `package.json` da pasta `frontend` do
  SASI, e script de teste Vitest quando existir.
- Node 24 ativo (default do `nvm`) — é a versão que a Vercel usa em produção.
- Repositório git com estado commitado limpo para o build de verificação (não valida working tree sujo).

## Skills relacionadas
Nenhuma identificada — o agente não referencia nenhuma skill no corpo nem no frontmatter.

## Contexto que ele precisa receber
Caminho do repo (`frontend` do SASI), se há migration nova no diff (para ele saber que precisa checar RLS), e se é
para validar o commit atual ou um branch específico. Critério de aceite: veredito único no topo + tabela
checagem/resultado/evidência.

Exemplo de despacho bom:
```
Rode o portão de merge no SASI antes do push pra main.
Repo: ~/projetos/sasi/frontend
Branch: feature/fichaSchema-adapter, commit d0c06c3 (checkout limpo, Node 24)
Diff inclui migration nova em supabase/migrations/ — confira RLS.
Saída esperada: veredito PODE MERGEAR / NÃO PODE MERGEAR + tabela de evidência.
```

## Armadilhas conhecidas
Validar contra o **working tree sujo** em vez do commit — `tsc -b` é incremental e absorve erro que só apareceria
num build limpo, dando falso "PODE MERGEAR". O próprio agente é instruído a checkar contra checkout limpo, mas o
despacho precisa deixar claro qual commit/branch validar, senão ele valida o estado errado.

## Como saber se ele fez um bom trabalho
A resposta abre com uma das duas linhas fixas (PODE MERGEAR / NÃO PODE MERGEAR), seguida de tabela com uma linha
por checagem (typecheck, lint, build, teste, RLS, tipos TS) e cada resultado tem a linha de output real do comando
como evidência — nunca "passou" sem trecho de log atrás.
