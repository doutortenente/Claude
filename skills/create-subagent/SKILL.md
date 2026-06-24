---
name: create-subagent
description: Cria subagentes customizados pro Claude Code. Use quando o usuário quiser criar um novo tipo de subagente, montar agentes pra tarefas específicas (revisor de código, debugger, assistente de domínio) com prompts próprios.
---

# Criar subagentes no Claude Code

Subagentes são assistentes especializados que rodam em contexto isolado, com system prompt próprio. Servem pra **preservar contexto** (isolar exploração da conversa principal), **especializar comportamento** e **reaproveitar** configurações entre projetos.

Se houver contexto da conversa anterior, infira o propósito do subagente a partir do que foi discutido.

## Onde ficam

| Local | Escopo | Prioridade |
|-------|--------|-----------|
| `.claude/agents/` | Projeto atual | Maior |
| `~/.claude/agents/` | Todos os seus projetos | Menor |

Quando dois subagentes têm o mesmo nome, o de maior prioridade vence. Subagentes de projeto (`.claude/agents/`) podem ir pro controle de versão pra compartilhar com o time.

## Formato do arquivo

Um `.md` com frontmatter YAML + corpo markdown (que vira o system prompt):

```markdown
---
name: code-reviewer
description: Especialista em revisão de código. Use logo após escrever ou modificar código.
tools: Read, Grep, Glob, Bash      # opcional — herda todas se omitido
model: sonnet                      # opcional — sonnet/opus/haiku ou inherit
---

Você é um revisor de código sênior. Quando invocado:
1. Rode git diff pra ver as mudanças recentes
2. Foque nos arquivos modificados
3. Comece a revisão imediatamente

Dê feedback por prioridade: crítico (corrigir), aviso (deveria), sugestão.
```

### Campos

| Campo | Obrigatório | Descrição |
|-------|:-----------:|-----------|
| `name` | sim | Identificador único (minúsculas e hífens) |
| `description` | sim | **Quando** delegar pra este subagente — seja específico |
| `tools` | não | Lista de tools permitidas; omita pra herdar todas |
| `model` | não | `sonnet` / `opus` / `haiku` ou `inherit` |

## A description é o que importa

O Claude usa a `description` pra decidir quando delegar. Escreva em 3ª pessoa, seja específico e inclua os gatilhos:

```yaml
# ❌ vago
description: Ajuda com código
# ✅ específico
description: Especialista em revisão de código. Use proativamente logo após escrever ou modificar código.
```

Inclua "use proativamente" pra encorajar delegação automática.

## Fluxo

1. **Escopo**: projeto (`.claude/agents/`) ou pessoal (`~/.claude/agents/`).
2. **Crie o arquivo**: `mkdir -p .claude/agents && touch .claude/agents/meu-agente.md`.
3. **Frontmatter** com `name` e `description` (+ `tools`/`model` se precisar).
4. **System prompt** no corpo: o que fazer quando invocado, o processo a seguir, formato de saída, restrições.
5. **Teste**: peça "use o subagente meu-agente pra [tarefa]".

## Boas práticas

- Cada subagente deve ser bom em **uma** coisa.
- Descrições detalhadas, com termos-gatilho.
- Subagentes de projeto no controle de versão pra compartilhar com o time.
