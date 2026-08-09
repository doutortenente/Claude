# Inventário do repositório

> **Documento mutável.** Números medidos em **09-ago-2026**. Regerar a fonte com
> `python3 ~/projetos/scripts/indices/build_claude_index.py` e atualizar esta página quando divergir.
> Número sem medição é `[SEM_FONTE]` — nunca estimado.

## Números do repo

| Métrica | Valor | Como foi medido |
| --- | ---: | --- |
| Arquivos versionados | 924 | `git ls-files \| wc -l` |
| Arquivos indexados | 918 | índice (exclui symlink, `ide/`, `.git`) |
| Symlinks versionados | 7 | por isso indexados < versionados |
| Arquivos em `skills-que-prestam/` | 848 | dos 917 indexados |
| Disco sem histórico | 30 MB | `du -sh --exclude=.git` |
| Disco com histórico | 67 MB | `du -sh` |
| Linhas indexadas | 103.527 | `memory/MAPA-CLAUDE.md` |
| Tokens indexados | 515.783 | `memory/MAPA-CLAUDE.md` |
| Skills ativas | 36 | pastas de topo nos 5 pacotes |
| `SKILL.md` no repo | 71 | inclui as 3 skills de `.claude/skills/`, sub-skills aninhadas e `_anthropic/` |
| Symlinks em `~/.claude/skills/` | 36 | batem 1:1 com as skills ativas |
| Symlinks quebrados | 0 | verificado 09-ago-2026 |
| Subagentes | 18 | `agents/<nome>/` |
| **Custo de contexto das skills** | **11.173 caracteres** | `name` + `description` injetados em TODA mensagem |

## Skills por pacote

| Pacote | Skills | Assunto |
| --- | ---: | --- |
| `00-pacote-ide-e-documentacao` | 4 | IDE, Context7, busca de documentação |
| `01-pacote-skills-medicas` | 7 | UTI: admissão, eco, hemodinâmica, plantão, ingest |
| `02-pacote-skills-workspace` | 9 | docx, pdf, xlsx, pptx, organização de arquivo |
| `03-pacote-skills-claude-nativas` | 12 | skill-creator, TDD, brainstorming, humanizer |
| `04-pacote-skills-supabase-e-vercel` | 4 | banco e publicação |
| **Total** | **36** | |

`_anthropic/` (dentro do pacote 03) **não é skill ativável** — é coleção com prefixo `_`. Duas licenças, medidas em
09-ago-2026: `examples/` = Apache 2.0 (23 arquivos `LICENSE.txt`, redistribuir permitido) · `public/` =
`© 2025 Anthropic, PBC. All rights reserved.` (6: `docx`, `xlsx`, `pdf`, `pptx`, `file-reading`, `pdf-reading`).

## Peso por categoria (do indexador)

| Categoria | Arquivos | Tokens |
| --- | ---: | ---: |
| Pacote 03 — nativas do Claude | 194 | 228.513 |
| Scripts que são corpo de skill | 185 | 114.064 |
| Pacote 02 — workspace | 55 | 51.876 |
| Pacote 01 — médicas | 35 | 40.781 |
| Subagentes | 45 | 27.088 |
| Pacote 04 — Supabase/Vercel | 67 | 24.053 |
| `docs/` | 4 | 9.193 |
| Pacote 00 — IDE/docs | 8 | 8.619 |
| `.claude/` governança | 13 | 7.934 |
| `memory/` | 2 | 1.696 |
| Raiz | 5 | 1.571 |
| `EXTRACAO-CLINICA-SASI/` | 1 | 762 |
| Binários (só path, sem busca) | 304 | 0 |

## Frota de subagentes (18)

| Agente | Modelo | Papel |
| --- | --- | --- |
| `arquiteto` | opus | Plano de ataque: quem chamar, em que ordem |
| `batedor` | haiku | Reconhecimento barato, só leitura |
| `caco` | haiku | Roda script que já existe, reporta saída |
| `chefe` | opus | Engenheiro do arsenal `~/projetos/scripts/` |
| `clinical-data-auditor` | opus | ZERO ALUCINAÇÃO em dado clínico |
| `code-explainer` | sonnet | Explica código/diff em tabela curta |
| `deploy-sentinel` | sonnet | Portão de build/RLS antes do merge |
| `documentador` | sonnet | README, CLAUDE.md do repo, changelog |
| `fiscal` | sonnet | Verificador adversarial: tenta refutar |
| `onboarder` | sonnet | Tour de repositório desconhecido |
| `otimizador` | opus | Investiga lentidão |
| `pubmed-evidence-checker` | sonnet | Valida afirmação clínica com PMID |
| `refatorador` | sonnet | Melhora estrutura sem mudar comportamento |
| `residente` | sonnet | Implementa código já prescrito |
| `secretaria` | sonnet | Memória do operador + sync com GitHub |
| `segurador` | opus | Auditoria de segurança |
| `testador` | sonnet | Testes escritos por quem não implementou |
| `zelador` | haiku | Boletim de higiene do workspace |

Roteamento completo: `agents/README.md` e `agents/docs/roteamento.md`.

## Estrutura da raiz

| Item | Versionado | O que é |
| --- | :---: | --- |
| `CLAUDE.md` | sim | Constituição |
| `README.md` | sim | Entrada humana |
| `.claude/` | sim | Governança: rules, skills do repo, agente, hooks, settings |
| `docs/` | sim | Manual, inventário, decisões, runbook |
| `memory/` | parcial | `MAPA-CLAUDE.md` e `SKILLS-CATALOGO.md` versionados; o `.db` não |
| `agents/` | sim | 18 subagentes + `docs/` com 6 arquivos de doutrina |
| `skills-que-prestam/` | sim | 5 pacotes temáticos, 36 skills |
| `EXTRACAO-CLINICA-SASI/` | sim | `BRIEFING.md` real + 6 atalhos relativos para skills médicas |
| `.env.example` | sim | Molde do cofre (o cofre real é `~/projetos/.env`) |
| `ide/` | **não** | `.lock` da IDE com `authToken` — fora do git E do indexador |
| `.agentbridge/` | **não** | Banco de conversa local |
| `.idea/` | **não** | Config da IDE |

## Fora deste PC, de propósito

`doutortenente/pacotao-macaroca-de-skills` (privado) — reserva fria de 85 skills de terceiros, extraída em
07-ago-2026 para parar de pesar 24 MB / 572 arquivos aqui. É um marketplace de plugin:
`/plugin marketplace add doutortenente/pacotao-macaroca-de-skills`. O `VENDOR.md` com procedência e licença de cada
item mora lá, em `reference/VENDOR.md`. **Não reclonar para cá.**

## Divergências corrigidas (08 e 09-ago-2026)

| O que o doc afirmava | Real | Situação |
| --- | --- | --- |
| 867 arquivos / 39 MB | 910 / 30 MB sem histórico | corrigido |
| 35 skills ativas | 36 | corrigido |
| ~42.600 caracteres de custo | 11.173 | corrigido (medido depois da extração do pacotão) |
| README citava `skills/`, `settings/`, `templates/`, `memory/` | 3 das 4 não existiam | README reescrito |
| Índice em `mapa-claude-e-catalogo-skills/` | renomeado para `memory/` | script corrigido |
| Indexador varria `ide/` | `authToken` entrava no banco de busca | fechado, verificado |
| Categorizador apontava para pastas mortas | 470 arquivos caíam em "Revisar" | zerado |
| 68 `SKILL.md` e `.claude/` com 2 arquivos / 16 tokens | 71 `SKILL.md` e 12 arquivos / 6.512 tokens | corrigido 09-ago — as 3 skills de `.claude/skills/` não tinham entrado na conta e o índice estava velho |
