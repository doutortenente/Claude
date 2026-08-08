# pubmed-evidence-checker — documentação

## O que faz
Checa uma afirmação clínica contra a literatura via **MCP** (protocolo que conecta o Claude a uma ferramenta externa, aqui o PubMed) e devolve veredito com **PMID** (identificador único do artigo no PubMed) rastreável. Não afirma nada sem fonte real recuperada na sessão.

## Quando despachar

| Situação | Por que este agente e não o vizinho |
|---|---|
| "Tem evidência pra essa conduta?" / validar dose, cutoff, indicação | É o único agente com acesso ao PubMed; `clinical-data-auditor` audita dado de PACIENTE sem fonte, não literatura |
| Escrever texto clínico (skill, doc, protocolo) que cita "estudos mostram" | Substitui a citação vaga por PMID real ou remove a afirmação |
| Validar conduta que vai entrar no SASI (alerta, regra) | Antes de codificar cutoff, confirmar que existe RCT/guideline/meta-análise por trás |
| Revisar se um número (dose, desfecho) "parece certo" de memória | Proibido estimar de memória — só este agente busca a fonte primária de fato |

## Ferramentas e por quê

| Ferramenta | Para que serve aqui |
|---|---|
| `Read`, `Grep`, `Glob` | Ler o texto/afirmação a checar e localizar onde ela aparece no repo |
| `Bash` | Uso auxiliar não especificado no corpo do agente (nenhum comando fixo documentado) |
| `mcp__claude_ai_PubMed__search_articles` | Busca inicial da afirmação na literatura — primeira ação obrigatória |
| `mcp__claude_ai_PubMed__get_article_metadata` | Confirma dados do artigo achado (autor, ano, journal) |
| `mcp__claude_ai_PubMed__get_full_text_article` | Lê o artigo completo quando o resumo não basta pra confirmar o achado |
| `mcp__claude_ai_PubMed__find_related_articles` | Amplia a busca por evidência mais forte (guideline, meta-análise) |
| `mcp__claude_ai_PubMed__lookup_article_by_citation` | Verifica citação específica já apontada (ex.: "Surviving Sepsis 2021") |

**Ausentes de propósito**: `Write`/`Edit` — este agente não é dono de nenhum arquivo, só valida e reporta; quem grava o texto final é quem despachou. `disallowedTools: Agent` — ele não pode lançar subagente (hierarquia da frota é 2 níveis, papel de coordenar é do gerente, não dele).

## Dependências
**MCP** `claude_ai_PubMed` ativo na sessão (ferramentas `search_articles`, `get_article_metadata`, `get_full_text_article`, `find_related_articles`, `lookup_article_by_citation`). Sem esse MCP conectado, o agente para — não há dependência de script em `~/projetos/scripts/` nem de outro servidor.

## Skills relacionadas
`pubmed-evidence-checker` é o próprio nome citado na skill `pubmed_evidence_checker` de referência no ecossistema de checagem clínica do repo — nenhuma skill específica identificada no corpo deste agente para pré-carregar.

## Contexto que ele precisa receber
A afirmação clínica EXATA a validar (não o parágrafo inteiro em volta) e, se houver, a fonte já citada pra conferir. Critério de aceite: cada linha da tabela de saída tem PMID ou "SEM EVIDÊNCIA LOCALIZADA" — nunca afirmação sem um dos dois.

```
Valide: "PEEP > 15 em SDRA grave reduz mortalidade em 28 dias."
Contexto: vai entrar como justificativa de conduta na nota de admissão UTI.
Saída esperada: tabela afirmação · veredito · PMID · achado em 1 linha.
```

## Armadilhas conhecidas
Maior risco deste agente específico: responder de memória quando o MCP PubMed cair no meio da sessão (timeout, erro de conexão) em vez de checar a ferramenta a cada chamada. O próprio agente é instruído a parar com "PubMed indisponível nesta sessão — validação não realizada." — se a resposta vier sem essa frase E sem PMID, ele quebrou a própria regra.

## Como saber se ele fez um bom trabalho
Toda linha da tabela de saída tem PMID real (não inventado, conferível no PubMed) OU o veredito "SEM EVIDÊNCIA"/"SEM EVIDÊNCIA LOCALIZADA" — nenhuma linha com afirmação apoiada e PMID vazio.
