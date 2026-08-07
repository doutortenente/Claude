# Changelog da frota

Formato: data, o que mudou, por quê. Mudança de `description` conta como mudança de comportamento —
ela altera o roteamento de toda a frota.

## 2026-08-07 — 10 → 18 agentes, e a pasta virou estrutura

### Adicionados (8)

| agente | model | lacuna que fecha |
|---|---|---|
| `arquiteto` | opus | Plano de FROTA (quem despachar, em que ordem) — o `Plan` nativo só desenha a implementação |
| `segurador` | opus | Segredo vazando, chave de servidor no navegador, PHI em log. O `deploy-sentinel` só olhava RLS e build |
| `testador` | sonnet | Teste escrito por quem NÃO implementou — teste do autor herda o viés do autor |
| `otimizador` | opus | Desempenho com baseline medido. Ninguém verificava se estava rápido, só se estava correto |
| `refatorador` | sonnet | Estrutura sem mudar comportamento, com teste verde obrigatório antes de entrar |
| `documentador` | sonnet | Doc de repositório (README, CLAUDE.md, changelog). A `secretaria` cuida da memória do operador, não disso |
| `onboarder` | sonnet | Mapa de repositório inteiro. O `code-explainer` cobre 1 arquivo; o `batedor`, 1 pergunta |
| `zelador` | haiku | Boletim de saúde com checklist fixo e comparável entre execuções |

### Estrutura criada

- `docs/contrato-de-relatorio.md` — formato único de saída, com `NÃO VI` obrigatório
- `docs/convencoes.md` — padrão de escrita, campos do frontmatter, modelo por papel
- `docs/auditoria-2026-08-07.md` — estado da frota antes desta mudança
- `_template.md` — esqueleto para agente novo
- `CONTRIBUTING.md` — como criar/alterar, com checklist
- `~/projetos/scripts/claude/validar_frota.py` — validador automático

### Corrigido

- **`disallowedTools: Agent` nos 18.** A doutrina de 2 níveis era só combinado: a plataforma permite
  **3 camadas** de aninhamento de subagente. Agora a trava é real.
- Emoji removido de `deploy-sentinel` (2) e `secretaria` (1).

### Erro cometido e revertido nesta mesma sessão

Afirmei que `disallowedTools` e `maxTurns` eram campos inválidos e que a hierarquia de 2 níveis era
imposta pela plataforma. **As duas afirmações estavam erradas** — a spec oficial
(`code.claude.com/docs/en/sub-agents.md`) documenta 16 campos, incluindo os dois, e o teto de
aninhamento é 3. O validador, as convenções e os 8 agentes chegaram a ser escritos com a informação
errada e foram corrigidos antes do merge.

Campos válidos que a frota ainda não usa: `permissionMode`, `skills`, `mcpServers`, `hooks`, `memory`,
`background`, `effort`, `isolation`, `color`, `initialPrompt`.

### Segunda passada — revisão adversarial

O revisor de conformidade achou 11 defeitos nos 8 recém-escritos. Corrigidos antes do merge final:

| Defeito | Onde |
|---|---|
| `pnpm test` — o `sasi-v2` usa npm e **não tem script de teste** | `testador` |
| Afirmação falsa sobre a plataforma sobreviveu à correção em lote | `otimizador` |
| Trava duplicada (introduzida ao remover a linha do `graphify`) | `onboarder` |
| Linha do contrato de relatório caiu depois de `## Travas` | `documentador` |
| `Bash` concedido e nunca usado no Método | `arquiteto` |
| `description` repetindo passo do Método | `otimizador`, `refatorador` |
| `description` sem o vizinho mais confundível | `arquiteto` (`chefe`), `segurador` (`fiscal`) |
| Travas secas, sem o porquê colado | 5 linhas em 4 arquivos |
| Nome sem aspas, fora do padrão de identidade | `onboarder` |
| **Reimplementava à mão o que `faxina_dev.py` já mede** | `zelador` |

O caso do `zelador` era o mais sério: o Método refazia em linguagem natural os mesmos checks que um
script determinístico já produz. Agora ele roda `faxina_dev.py` e `saude_pc.py` e interpreta a saída —
duas medidas do mesmo item divergem, uma só não.

### Pendente (não executado — mexe em agente que hoje funciona)

1. Padronizar os 10 antigos na estrutura de 4 seções — 12 avisos abertos no validador
2. Reescrever as `description` dos 10 antigos tirando o resumo de procedimento (o `fiscal` é o pior caso)
3. `chefe` com 72 linhas, acima do teto de 60
4. Divergência memória × arquivo: `comando.md` diz `secretaria = opus`, o arquivo diz `sonnet`

## 2026-07-06 — Conferência obrigatória

Achado de agente de leitura que vá motivar ação de risco não vira ação direto. Origem: no mesmo dia o
`batedor` inverteu a direção à-frente/atrás do `git` e afirmou conteúdo de pasta vazia.

## 2026-07-03 — Frota criada

`residente` e `batedor`, a pedido do operador: "coordena como gerente, subagentes executam o braçal".
