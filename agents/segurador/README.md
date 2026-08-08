# segurador — documentação

## O que faz
Audita segurança defensiva de código já autorizado: caça segredo **hardcoded** (senha ou chave escrita direto
no arquivo), PHI (dado de paciente) em log, chave de servidor vazando pro navegador, injeção de SQL, XSS e
SSRF. Só relata — não conserta.

## Quando despachar

| Situação | Por que este agente e não o vizinho |
|---|---|
| Antes de expor rota nova ao público, ou mexer em login/sessão/permissão | É o único da frota com foco em segurança defensiva; `deploy-sentinel` verifica build/RLS no portão de merge, não vulnerabilidade de código |
| "Tem segredo vazando?", "essa chave pode ir pro navegador?", "isso dá pra injetar?" | Pergunta específica de segurança — não é refutação de entrega pronta (isso é `fiscal`) nem checklist de saúde de máquina (isso é `zelador`) |
| Adicionar dependência nova (biblioteca de terceiro) | Ele varre versão vulnerável conhecida; `residente` implementa, não audita o que importou |
| Auditoria de segurança pedida explicitamente | Nome do agente já é o gatilho; não delegar pra `fiscal`, que refuta CLAIM de entrega, não varre classe de falha |

## Ferramentas e por quê

| Ferramenta | Para que serve aqui |
|---|---|
| `Read` | Abrir arquivo e confirmar a linha exata do achado antes de reportar |
| `Grep` | Varrer padrão de segredo, chamada perigosa, prefixo `VITE_`/`NEXT_PUBLIC_` |
| `Glob` | Delimitar escopo de arquivo por padrão de caminho |
| `Bash` | Rodar comando de varredura (ex.: checar dependência vulnerável) |

Sem `Write`/`Edit`: proposital — o agente não conserta, só reporta; consertar durante a auditoria apagaria a
linha do achado e impediria a conferência depois. `disallowedTools: Agent` no frontmatter trava despacho de
subagente — a doutrina da frota permite até 3 camadas de aninhamento, mas aqui a regra de 2 níveis vira
obrigatória em vez de combinado.

## Dependências
Nenhuma além das ferramentas nativas. Em `sasi`, `claude` e `celebro` o reconhecimento deve começar no MCP
`jetbrains-index` (`ide_find_file`, `ide_search_text`, `ide_find_references`) em vez de `Glob`/`Grep` em massa
— exigência do próprio arquivo do agente, não uma dependência instalada à parte.

## Skills relacionadas
Nenhuma identificada no corpo do agente.

## Contexto que ele precisa receber
Escopo de arquivo/pasta, o que roda no navegador vs. no servidor, e onde há dado de paciente — sem isso o
agente varre sem fim (o próprio método exige delimitar escopo no passo 1). Exemplo de despacho bom:

```
Audita segurança em frontend/src/features/ficha-evolucao/ e frontend/src/lib/exportPDF.ts.
Escopo: código que roda no navegador (bundle) e as Edge Functions em supabase/functions/.
Dado sensível presente: PHI de paciente (nome, leito, evolução clínica).
Saída: tabela severidade | arquivo:linha | achado | pré-condição | correção,
fechando com docs/contrato-de-relatorio.md.
```

## Armadilhas conhecidas
Achado sem `arquivo:linha` e sem pré-condição concreta é o modo de falha mais grave deste agente — manda o
gerente caçar fantasma e ensina o time a ignorar o relatório. Segundo risco: declarar "está seguro" quando na
verdade só faltou achado na varredura — a trava do próprio agente exige escrever "não encontrado no escopo X",
nunca "seguro".

## Como saber se ele fez um bom trabalho
Toda linha da tabela tem `arquivo:linha` conferível e pré-condição concreta (não genérica). Toda classe de
falha varrida e sem achado aparece explicitamente como "não encontrado no escopo X", nomeando o escopo real.
Segredo e PHI que aparecerem no relatório vêm mascarados (`[SEGREDO]`, `[PHI]`). Relatório fecha com o bloco de
`docs/contrato-de-relatorio.md`.
