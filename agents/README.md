# Frota de subagentes — fonte única

`~/.claude/agents` é symlink pra cá. Editar um agente = editar e commitar **neste repo**, nunca no symlink.

**18 agentes.** Subagente é um assistente com contexto próprio e instruções próprias: o gerente (a sessão
principal) despacha uma missão, o subagente executa isolado e devolve um relatório. Serve pra economizar
contexto e pra especializar comportamento.

## Estrutura

Cada agente mora na própria pasta, com a documentação ao lado:

```
agents/
├── README.md              este índice
├── CONTRIBUTING.md        como criar e alterar agente
├── CHANGELOG.md           o que mudou, quando e por quê
├── docs/                  contrato de relatório, convenções, roteamento, template,
│                          arsenal de scripts, auditoria
├── arquiteto/
│   ├── arquiteto.md       o agente (o que o Claude Code lê)
│   └── README.md          dependências, ferramentas, contexto, armadilhas
├── batedor/
│   ├── batedor.md
│   └── README.md
└── … (18 pastas)
```

A varredura de `agents/` é **recursiva**: qualquer `.md` com `name` e `description` no cabeçalho vira agente,
esteja em subpasta ou não. Por isso o `README.md` de cada pasta **não tem cabeçalho YAML** — se tivesse,
viraria um agente fantasma na lista da frota. Foi o que aconteceu com o antigo `_template.md`, hoje
neutralizado em [docs/template-de-agente.md](docs/template-de-agente.md).

## Como usar esta pasta

| Você quer | Vá para |
|---|---|
| Saber qual agente chamar | tabela abaixo + [docs/roteamento.md](docs/roteamento.md) |
| Entender um agente a fundo | o `README.md` dentro da pasta dele |
| Criar ou alterar um agente | [CONTRIBUTING.md](CONTRIBUTING.md) e [docs/template-de-agente.md](docs/template-de-agente.md) |
| Entender o padrão de escrita | [docs/convencoes.md](docs/convencoes.md) |
| Saber o que todo agente devolve | [docs/contrato-de-relatorio.md](docs/contrato-de-relatorio.md) |
| Achar o script de infra certo | [docs/arsenal-de-scripts.md](docs/arsenal-de-scripts.md) |
| Ver o que mudou e quando | [CHANGELOG.md](CHANGELOG.md) |
| Conferir se está tudo conforme | `python3 ~/projetos/scripts/claude/validar_frota.py` |

## A frota

### Reconhecimento e execução mecânica

| agente | model | modo | quando chamar |
|---|---|---|---|
| `batedor` | haiku | leitura | Mapear terreno antes de decidir: estrutura de repo, onde mora uma função, o que um log acusa |
| `caco` | haiku | leitura | Rodar script que já existe e devolver a saída fiel |
| `zelador` | haiku | leitura | Boletim de saúde do workspace com checklist fixo: repo sujo, disco, Downloads velho |

### Planejamento e engenharia

| agente | model | modo | quando chamar |
|---|---|---|---|
| `arquiteto` | opus | leitura | Missão grande demais pra um agente só — decide quem chamar, em que ordem, com qual modelo |
| `chefe` | opus | escrita | Criar ou alterar script de infra em `~/projetos/scripts` |
| `residente` | sonnet | escrita | Implementar código de produto já prescrito — edita, roda typecheck/teste, reporta |
| `refatorador` | sonnet | escrita | Melhorar estrutura sem mudar comportamento; exige teste verde antes de entrar |
| `otimizador` | opus | escrita | Algo está lento — mede baseline, ataca o gargalo, mede de novo |

### Verificação

| agente | model | modo | quando chamar |
|---|---|---|---|
| `fiscal` | sonnet | leitura | Refutar entrega pronta de outro agente antes de aceitar |
| `testador` | sonnet | escrita | Escrever teste para código que ele NÃO escreveu — ataca o que o autor não imaginou |
| `segurador` | opus | leitura | Auditar segurança: segredo vazando, chave de servidor no navegador, injeção, PHI em log |
| `deploy-sentinel` | sonnet | leitura | Portão final antes de mergear na main: build, typecheck, lint, teste, RLS |

### Documentação e conhecimento

| agente | model | modo | quando chamar |
|---|---|---|---|
| `code-explainer` | sonnet | leitura | Explicar UM arquivo ou UM diff em linguagem simples |
| `onboarder` | sonnet | leitura | Mapear um repositório inteiro pra quem chega nele (inclusive você, semanas depois) |
| `documentador` | sonnet | escrita | Atualizar README/CLAUDE.md/changelog depois de mudança commitada |
| `secretaria` | sonnet | escrita | Memória do operador em `~/.claude/memory` — o que foi feito, o que está pendente |

### Clínico

| agente | model | modo | quando chamar |
|---|---|---|---|
| `clinical-data-auditor` | opus | leitura | Achar campo clínico sem fonte rastreável antes do dado ir pro dashboard |
| `pubmed-evidence-checker` | sonnet | leitura | Validar afirmação clínica com PMID via MCP PubMed |

## Pipelines que funcionam

| Situação | Sequência |
|---|---|
| Feature nova | `arquiteto` → `residente` → `testador` → `fiscal` → `documentador` → `deploy-sentinel` |
| Está lento | `batedor` → `otimizador` → `testador` → `fiscal` |
| Mudança sensível (login, rota pública, dado de paciente) | `arquiteto` → `residente` → `segurador` → `testador` → `deploy-sentinel` |
| Código sujo mas funcionando | `testador` (cria a rede) → `refatorador` → `fiscal` |
| Repo desconhecido | `onboarder` → `code-explainer` no que ficou obscuro |
| Bagunça no PC | `zelador` (mede) → `caco` (roda a rotina) |
| Fim de sessão | `secretaria` |

## Regras de frota

1. **Subagente não despacha subagente.** Hierarquia de 2 níveis: gerente → subagente.
2. **Coordenação é papel da ferramenta Workflow**, não de empilhar agente. Workflow é roteiro
   determinístico — faz loop, pipeline e fan-out sem alucinar passo de processo, e cada etapa roda no
   modelo certo.
3. **Achado de leitura que vai disparar ação de risco não vira ação direto.** Merge, deleção, gravação em
   banco e push passam por conferência do gerente — 1 comando direto, ou o `fiscal` se a entrega for
   substantiva. Origem: 06-jul-2026, o `batedor` inverteu a direção do `git` e afirmou conteúdo de pasta
   vazia no mesmo dia.
4. **Modelo mais barato que dá conta.** haiku varre, sonnet implementa, opus julga.
5. **Nenhum agente faz push, merge, deleção ou gravação em banco.** Isso é decisão do gerente.
6. **Fan-out cabe em 3 agentes simultâneos.** 4 núcleos e 7,6 GiB de RAM: acima disso vira fila.

## Personas de reunião

25 personas em 5 times × 5 arquétipos, uso exclusivo da skill `/meeting` (plugin `meeting-bots`
vendorizado). Não entram no roteamento normal e não substituem ninguém da frota.
