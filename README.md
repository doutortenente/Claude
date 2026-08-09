# claude

**Repositório** (pasta de trabalho com histórico de tudo que mudou) canônico de configuração do Claude Code, a IA que
roda no terminal: **skills** (procedimentos que ela sabe executar) e **subagentes** (ajudantes especializados), com a
versão travada em cada **commit** — assinar uma versão do trabalho no histórico, igual assinar a evolução no
prontuário.

Não é um aplicativo: sem **build** (montar o programa pra rodar), sem teste automatizado, sem **runtime** (processo
vivo em produção). É uma biblioteca de arquivos de texto que outros repos leem por **symlink** (atalho de pasta que
aponta para o arquivo real, sem duplicar).

```text
claude/
├── CLAUDE.md                    constituição — regra e doutrina do repo
├── README.md                    este arquivo — porta de entrada
├── docs/                        manual humano (4 arquivos)
├── agents/                      18 subagentes + docs/ (6) + README/CONTRIBUTING/CHANGELOG
├── skills-que-prestam/          36 skills ativas, em 5 pacotes numerados
├── memory/                      MAPA-CLAUDE.md + SKILLS-CATALOGO.md + índice de busca
├── EXTRACAO-CLINICA-SASI/       briefing clínico pro pipeline do SASI
├── .claude/                     config LIDA pelo Claude Code (rules, hooks, settings)
└── .env.example                 modelo de variável de ambiente, sem segredo
```

## Quero X → vá para Y

| Quero | Vá para |
|---|---|
| Entender a regra e a doutrina do repo | `CLAUDE.md` |
| Passo a passo de operação (adicionar skill, resync) | `docs/OPERATING-MANUAL.md` |
| Executar rotina passo a passo (8 procedimentos, com o teste de "deu certo") | `docs/RUNBOOK.md` |
| Ver decisão já travada (o que não se rediscute) | `docs/DECISIONS.md` |
| Ver o inventário medido do repo | `docs/REPOSITORY-INVENTORY.md` |
| Entender a frota de subagentes | `agents/README.md` |
| Descobrir qual skill existe e o que ela faz | `memory/SKILLS-CATALOGO.md` |

## Números medidos (08-ago-2026)

- **901 arquivos** indexados, **30 MB** sem histórico de commits (**67 MB** com histórico)
- **36 skills** ativas (00: 4 · 01: 7 · 02: 9 · 03: 12 · 04: 4) — todas com symlink 1:1 em `~/.claude/skills/`, 0
  quebrado
- **18 subagentes** em `agents/<nome>/`
- Custo de contexto: **11.173 caracteres** injetados em toda mensagem só pelas skills ativas

## Licença

`skills-que-prestam/03-pacote-skills-claude-nativas/_anthropic/` tem **duas licenças**, uma por subpasta — medido em
09-ago-2026, 29 arquivos `LICENSE.txt` no total:

| Subpasta | Licenças | Qual | Redistribuir |
| --- | ---: | --- | --- |
| `examples/` | 23 | Apache 2.0 | permitido |
| `public/` | 6 | `© 2025 Anthropic, PBC. All rights reserved.` | **vedado pela licença** |

As 6 restritas são `docx`, `xlsx`, `pdf`, `pptx`, `file-reading` e `pdf-reading`. **Este repositório é público** — o
operador foi avisado em 09-ago-2026 e decidiu mantê-lo assim; a decisão está registrada em `docs/DECISIONS.md`.
