# Frota de subagentes — fonte única (~/projetos/claude/agents)

`~/.claude/agents` é symlink pra cá. Editar um agente = editar e commitar neste repo,
nunca no symlink.

## Frota completa (10 agentes)

| agente | model | papel em 1 linha | quando usar |
|---|---|---|---|
| `batedor` | haiku | Reconhecimento barato — lê muito, devolve resumo curto | Mapear terreno antes de decidir (estrutura de repo, onde mora uma função, o que um log acusa) |
| `caco` | haiku | Executor puro — roda script existente, reporta fiel | Rodar rotina já pronta (higiene do PC, fix de MCP, boletim) e devolver a saída |
| `chefe` | opus | Engenheiro do arsenal `~/projetos/scripts` — projeta/escreve/revisa | Criar ou alterar script de manutenção/automação; decidir qual script resolve um problema |
| `residente` | sonnet | Implementador de código de produto já prescrito | Executar feature/fix/refactor no SASI ou outro repo — editar, testar, reportar |
| `fiscal` | sonnet | Verificador adversarial — tenta refutar a entrega | Depois de qualquer entrega substantiva de outro subagente, antes de aceitar conclusão importante |
| `secretaria` | sonnet | Mantém `comando.md` (memória do operador) | Fim de sessão, "atualiza a memória", "o que eu fiz", "anota isso" |
| `deploy-sentinel` | sonnet | Portão final antes de mergear na main | Antes de qualquer push/merge na main (= deploy em produção) |
| `code-explainer` | sonnet | Explica código/diff em linguagem simples, tabela curta | Revisar PR grande, arquivo desconhecido, "me explica esse código" |
| `clinical-data-auditor` | opus | Audita dado clínico atrás de campo sem fonte rastreável | Antes de dado novo ir pro dashboard, após ingest em lote, auditoria de tabela clínica |
| `pubmed-evidence-checker` | sonnet | Valida afirmação clínica com PMID via MCP PubMed | Escrever conteúdo clínico, validar conduta, "tem evidência pra isso?" |

## Roteamento (modo gerente)

- Reconhecimento (olhar o terreno) → `batedor`.
- Rodar script que já existe → `caco`.
- Criar ou alterar script → `chefe`.
- Implementar código de produto → `residente`.
- Conferir entrega de outro agente → `fiscal`.
- Memória do operador → `secretaria`.
- Gate de merge na main → `deploy-sentinel`.
- Repo com `graphify-out/` (sasi, celebro, claude) → `batedor`/`residente`/`fiscal`
  começam o reconhecimento com `graphify query`, não com grep/Read direto no
  código. O gerente inclui essa instrução na missão sempre que despachar um
  subagente pra um desses 3 repos.

### Conferência obrigatória de achado que dispara ação

Relatório de subagente de leitura (`batedor` ou outro) que vá motivar ação de
risco — merge, deleção, gravação em banco, push — **não vira ação direto**: o
gerente confere antes, com 1 comando direto (caso simples) ou despachando o
`fiscal` (entrega substantiva). Origem: 06-jul-2026, o `batedor` errou 2x na
faxina do dia (inverteu a direção à-frente/atrás do `git` e afirmou conteúdo de
pasta vazia); o `batedor.md` já ganhou procedimentos de evidência (commit
`4624a59`) — esta regra é a segunda camada de defesa, do lado do gerente.

## Squads e limites técnicos

1. **Subagente NÃO lança outro subagente.** A hierarquia é gerente → subagente, 2
   níveis fixos. Um agente rodando não pode despachar outro agente por baixo dele.
2. **"Time com líder de squad" se faz com a ferramenta Workflow do Claude Code**, não
   empilhando subagentes: o roteiro determinístico faz o papel do líder (loops,
   pipelines, fan-out) e cada passo do roteiro roda no modelo certo (haiku varre,
   sonnet implementa, opus julga).
3. **Empilhar Opus como líder-subagente seria pagar caro por um agente que não pode
   delegar.** O Workflow faz a mesma coordenação de graça (é roteiro, não modelo) e
   sem risco de alucinar um passo do processo.

## Rotina agendada (chefe/caco)

- **Faxina do workspace** — `~/projetos/scripts/pc/faxina_dev.py` (boletim leitura-pura:
  raiz `~/projetos`, `Downloads` envelhecido, repos sujos/à-frente-atrás/merge travado,
  worktrees órfãos, lixo comum). `caco` roda semanalmente ou quando o operador
  reclamar de bagunça ("tá tudo uma bagunça").

## Convenção de modelo

- **haiku** — mecânico, leitura pura (batedor, caco).
- **sonnet** — implementação e verificação (residente, fiscal, deploy-sentinel,
  code-explainer, secretaria, pubmed-evidence-checker).
- **opus** — engenharia de scripts e auditoria clínica (chefe, clinical-data-auditor).
