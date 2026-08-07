# Auditoria da frota — 07-ago-2026

Estado no commit `2262a8f`. Números medidos com `wc`, `grep` e `validar_frota.py`, não estimados.

## Inventário

10 agentes, 60 KB, 11 arquivos `.md`, nenhum arquivo de outro tipo. Nenhuma pasta. Nenhum script.
Nenhum teste. Nenhum validador. Nenhum template.

| agente | linhas | palavras | desc (chars) | model |
|---|---:|---:|---:|---|
| chefe | 72 | 849 | 494 | opus |
| residente | 46 | 442 | 388 | sonnet |
| secretaria | 43 | 477 | 334 | sonnet |
| batedor | 40 | 462 | 417 | haiku |
| caco | 40 | 374 | 308 | haiku |
| clinical-data-auditor | 40 | 313 | 283 | opus |
| code-explainer | 38 | 312 | 227 | sonnet |
| fiscal | 38 | 355 | 387 | sonnet |
| pubmed-evidence-checker | 30 | 243 | 223 | sonnet |
| deploy-sentinel | 29 | 265 | 244 | sonnet |

## O que está certo e não se mexe

1. **Hierarquia de 2 níveis** documentada e respeitada — subagente não despacha subagente.
2. **Modelo por papel** coerente: haiku varre, sonnet implementa, opus julga.
3. **`fiscal` adversarial** — camada de refutação antes de aceitar entrega. Padrão correto.
4. **Conferência obrigatória** de achado que dispara ação de risco, com a origem do incidente
   documentada (06-jul-2026, o `batedor` inverteu direção do `git` e afirmou conteúdo de pasta vazia).
5. **Escrita negada por padrão** — 8 dos 10 agentes não têm `Write`/`Edit`. A trava mais barata é não
   ter a ferramenta.

## Defeitos encontrados

### 1. Estrutura interna divergente — 9 de 10 agentes

Nenhum padrão de seções. Cada agente inventou o próprio esqueleto: `## Regras de execução`,
`## Método`, `## Procedimento`, `## O que fazer`. O `validar_frota.py` acusa 13 avisos de estrutura.

Consequência: não dá pra ler dois agentes em sequência sem reaprender o layout, e agente novo não
tem de onde copiar.

### 2. `description` resumindo procedimento

O `fiscal` é o caso mais claro: *"Roda testes, confere cada claim contra a fonte, procura caso-limite."*

Isso é anti-padrão medido (fonte: skill `writing-skills`, seção CSO). Quando a descrição resume o
procedimento, o modelo segue o resumo e **pula o corpo**. O caso documentado: uma descrição dizendo
"revisão de código entre tarefas" fez o modelo executar 1 revisão onde o corpo mandava 2.

Os outros 9 têm o mesmo padrão em grau menor.

### 3. Sem validação automatizada

Não havia como detectar campo de frontmatter inválido, `name` divergente do arquivo, emoji, menção a
ferramenta removida ou agente acima do teto de tamanho. Tudo dependia de revisão humana.

### 4. Sem template

Agente novo nascia por cópia do vizinho — e herdava os defeitos do vizinho junto.

### 5. Sem contrato de relatório

Cada agente devolvia no formato que quis. O gerente não tinha campo obrigatório para "o que eu NÃO
verifiquei", que é justamente onde mora o erro caro: cobertura parcial lida como total.

### 6. `chefe` acima do teto

72 linhas. Agente longo é agente lido pela metade.

### 7. Emoji em 2 agentes

`deploy-sentinel` e `secretaria`. Ruído em saída de terminal.

## Correções aplicadas nesta sessão

| Item | Antes | Depois |
|---|---|---|
| Contrato de relatório | não existia | `docs/contrato-de-relatorio.md` |
| Convenções de escrita | não existiam | `docs/convencoes.md` |
| Template | não existia | `_template.md` |
| Validador | não existia | `~/projetos/scripts/claude/validar_frota.py` |
| Frota | 10 agentes | 18 agentes |
| Erros de validação | — | 0 |

## Pendências deliberadas (não executadas sem ordem)

1. **Padronizar os 10 antigos** para a estrutura de 4 seções — 13 avisos abertos. É reescrita de
   texto que hoje funciona; risco de regressão sem ganho imediato.
2. **Reescrever as 10 `description`** tirando o resumo de procedimento. Ganho real, mas muda o
   comportamento de roteamento da frota inteira — merece ser feito e testado em bloco próprio.
3. **`chefe`**: cortar 12 linhas ou mover o excedente para `docs/`.
4. **Tirar os emoji** de `deploy-sentinel` e `secretaria`.
5. **Divergência memória × arquivo**: `~/.claude/memory/comando.md` diz `secretaria = opus` (o arquivo
   diz `sonnet`) e deixa `deploy-sentinel` e `code-explainer` sem modelo (ambos são `sonnet`).
