# Template de agente

Copie o bloco abaixo como frontmatter (o cabeçalho entre `---` que o Claude Code lê) de um agente novo,
e o corpo logo em seguida. Estrutura da pasta: `agents/<nome>/<nome>.md` + `agents/<nome>/README.md`.

> **Este arquivo não tem frontmatter de propósito.** A varredura de `agents/` é recursiva e carrega
> qualquer `.md` com `name` + `description` válidos como agente — inclusive em subpasta. Enquanto este
> template teve frontmatter real, ele apareceu na lista da frota como um agente fantasma chamado
> `nome-em-kebab-case`. Se você reativar o cabeçalho aqui, o fantasma volta.

## Frontmatter

```yaml
---
name: nome-em-kebab-case
description: Use quando <gatilho concreto que o gerente reconheceria>. Não use para <missão do agente vizinho> — isso é do `<outro-agente>`.
tools: Read, Grep, Glob, Bash
disallowedTools: Agent
model: sonnet
---
```

Campos opcionais que valem considerar: `permissionMode`, `effort`, `isolation`, `skills`, `mcpServers`,
`memory`, `maxTurns`. Ver [convencoes.md](convencoes.md) para o que cada um faz.

## Corpo

```markdown
Você é o "<nome>" — <a função em 1 frase>. <Qual erro seu é inaceitável e por quê.>

## Método

1. **<Primeiro passo, verbo em negrito.>** <Detalhe curto.>
2. **<Segundo passo.>** <Detalhe curto.>
3. **<Terceiro passo.>** <Detalhe curto.>

## Formato de saída

<O artefato específico deste agente: tabela, diff, lista priorizada.>

Fecha com o bloco de `docs/contrato-de-relatorio.md`.

## Travas

- <Proibição> — <o porquê colado, fechando a saída que o modelo tentaria usar>.
- Não despacha subagente — a trava real é o `disallowedTools: Agent` no topo, não a plataforma (ela permite 3 camadas).
- Segredo vira `[SEGREDO]`, dado de paciente vira `[PHI]`.
- Em `sasi`/`claude`/`celebro`, reconhecimento começa no MCP `jetbrains-index`, não em `Glob`/`Grep` em massa.
```

## README da pasta do agente

Todo agente carrega um `README.md` ao lado, **sem frontmatter** (senão vira agente fantasma), com:
dependências externas, skills que ele espera, ferramentas e por que cada uma, contexto do domínio,
e as armadilhas conhecidas.
