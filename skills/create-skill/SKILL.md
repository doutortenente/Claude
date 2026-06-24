---
name: create-skill
description: Cria Agent Skills pro Claude Code. Use ao criar uma skill nova ou ao perguntar sobre a estrutura do SKILL.md.
---

# Criar skills no Claude Code

Skills são arquivos markdown que ensinam o agente a fazer uma tarefa específica: revisar PRs com o padrão do time, gerar commits num formato, consultar um schema, qualquer workflow especializado.

## Antes de começar: junte os requisitos

1. **Propósito e escopo**: que tarefa/workflow a skill resolve?
2. **Local**: pessoal (`~/.claude/skills/`) ou de projeto (`.claude/skills/`)?
3. **Gatilhos**: quando o agente deve aplicar a skill?
4. **Conhecimento de domínio**: o que o agente precisa saber e ainda não sabe?
5. **Formato de saída**: tem template/estilo específico?

Se o usuário deu texto exato pra usar, respeite **verbatim** (mesmas palavras, mesma ordem). Não parafraseie nem adicione comentário. Se houver contexto da conversa, infira a skill do que foi discutido. Use AskUserQuestion pra esclarecer quando precisar.

## Estrutura

Skills são diretórios com um `SKILL.md`:

```
nome-da-skill/
├── SKILL.md          # obrigatório — instruções principais
├── reference.md      # opcional — documentação detalhada
└── scripts/          # opcional — scripts utilitários
```

| Tipo | Caminho | Escopo |
|------|---------|--------|
| Pessoal | `~/.claude/skills/<nome>/` | Todos os seus projetos |
| Projeto | `.claude/skills/<nome>/` | Compartilhada via repositório |

### SKILL.md

```markdown
---
name: nome-da-skill
description: O que a skill faz e quando usá-la.
---

# Nome da Skill

## Instruções
Orientação clara, passo a passo.

## Exemplos
Exemplos concretos de uso.
```

| Campo | Requisito |
|-------|-----------|
| `name` | Máx 64 chars, minúsculas/números/hífens |
| `description` | Máx 1024 chars, não vazia |

## A description é crítica

O agente usa a `description` pra decidir quando aplicar a skill. Escreva em **3ª pessoa** ("Extrai texto de PDFs", não "Eu posso..."/"Você pode..."), seja **específico com termos-gatilho**, e inclua **O QUÊ** (capacidades) + **QUANDO** (cenários):

```yaml
# ✅ bom
description: Extrai texto e tabelas de PDFs, preenche formulários, junta documentos. Use ao trabalhar com PDFs ou quando o usuário mencionar PDFs, formulários ou extração.
# ❌ vago
description: Ajuda com documentos
```

## Princípios de autoria

1. **Conciso é tudo.** O contexto é compartilhado. Assuma que o agente já é inteligente — só adicione o que ele não sabe. Questione cada parágrafo: "ele justifica o custo em tokens?"
2. **SKILL.md < 500 linhas.** Use disclosure progressivo.
3. **Disclosure progressivo**: o essencial no SKILL.md; o detalhe em arquivos separados que o agente lê só quando precisa. Mantenha referências a **um nível** de profundidade.
4. **Grau de liberdade conforme a fragilidade**: instruções de texto pra tarefas com vários caminhos válidos; templates pra padrão preferido; scripts específicos pra operações frágeis onde consistência é crítica.

## Padrões úteis

- **Template**: forneça o formato de saída exato a preencher.
- **Exemplos**: pra skills onde a qualidade depende de ver entrada→saída.
- **Workflow**: quebre operações complexas em passos com checklist.
- **Loop de feedback**: pra tarefas críticas, valide e só prossiga quando passar.

## Anti-padrões

- Caminhos estilo Windows (`scripts\x.py`) → use `scripts/x.py`.
- Opções demais → dê um default com escape ("use X; pra caso Y, use Z").
- Info com prazo de validade ("antes de agosto/2025...") → use seção "padrões antigos".
- Terminologia inconsistente → escolha um termo e mantenha.
- Nomes vagos (`helper`, `utils`) → `processando-pdfs`, `analisando-planilhas`.

## Checklist antes de finalizar

- [ ] Description específica, em 3ª pessoa, com O QUÊ + QUANDO
- [ ] Corpo < 500 linhas, terminologia consistente
- [ ] Referências a um nível de profundidade
- [ ] Exemplos concretos, sem info com prazo de validade
- [ ] Se incluir scripts: pacotes documentados, sem caminhos Windows
