# Workspace `~/projetos/`
<!-- Carrega junto do global, em toda mensagem daqui. Só o específico desta pasta. -->

Não é repo git. Cada pasta abaixo é um repo independente. Conferido no disco em 14-ago-2026.

| Pasta | Peso | GitHub | Papel |
|---|---|---|---|
| **SASI-V3** | 951M | `doutortenente/SASI-V3` | Produto clínico UTI. Next.js + pnpm. Renomeado 14-ago (antes `…-SEM_MIGUE`). A pasta `sasi/` do v2 não existe mais |
| **claude** | 69M | `doutortenente/Claude` | Skills + agents canônicos. `~/.claude/skills` e `/agents` são symlinks pra cá |
| **9router** | — | — | Roteador local na porta 20128. `ANTHROPIC_BASE_URL` e o Hermes passam por aqui (medido 04-set-2026) |
| **typescript-sdk** | 716M | clone de `modelcontextprotocol/typescript-sdk` | SDK do MCP, em uso. Clone, não fork — não se commita aqui |
| **_templates** | 97M | — | 3 templates de referência. Uma geração atrás — deles vem a forma, não a versão |
| **central-do-trampo** | 7,5M | `doutortenente/Central-do-trampo` | Rascunho HTML + `prettify-pal`. Não é repo git localmente |
| **python** | 69M | — | Helpers do PyCharm, deletado em 29-jul-2026. Provável resíduo órfão, não confirmado |
| **scripts** | 1,2M | — | Casa única de script de infra — nenhum repo tem `scripts/` próprio |

`memory/` e `_arquivo/` não existem mais — não recriar. Rascunho que não virou projeto → `rascunhos/`.

**Clone de referência não se mexe sem ordem.** Em 14-ago as dependências do `typescript-sdk` foram removidas por engano e restauradas com `pnpm install` (12,3s). `node_modules` de repo de referência é ferramenta em uso, não resíduo.

**Fora deste PC de propósito:** `doutortenente/pacotao-macaroca-de-skills` (privado) — 85 skills de terceiro em reserva fria. Saiu daqui pra parar de pesar 24 MB / 572 arquivos no índice. Não reclonar.

**Cofre:** `~/projetos/.env` é o arquivo real (permissão 600). `sasi/.env` é symlink pra ele (invertido 23-jul-2026).

## `scripts/` — casa única

| Gaveta | O que faz | Como chamar |
|---|---|---|
| `indices/` | Reconstrói e consulta os índices de busca | `python3 ~/projetos/scripts/indices/query_dev_index.py repos` |
| `pc/` | Saúde da máquina: disco, boletim | `python3 ~/projetos/scripts/pc/saude_pc.py` |
| `nuvem/` | OneDrive: catalogar e arquivar | `python3 ~/projetos/scripts/nuvem/arquivar.py` |
| `sasi/` | Servidor MCP + auditoria de evento clínico | chamado pelo `.mcp.json`, não na mão |
| `obsidian/` | Testa a ponte com o Obsidian | `bash ~/projetos/scripts/obsidian/check-obsidian-api.sh` |

O índice se reindexa sozinho (hook `Stop` com `--if-stale`). Não rodar `build_dev_index.py` na mão.
Dois caminhos cabeados fora daqui — mover quebra em silêncio: systemd `fix-ide-mcp.service` → `scripts/pc/fix_ide_mcp.py` · `.mcp.json` → `scripts/sasi/mcp_sasi_wrapper.sh`.

## Busca

`Grep`/`Glob`. Os 3 MCPs de IDE JetBrains (portas 29172, 6315, 64542) foram **desativados** em 04-set-2026 — entraram em `disabledMcpServers`, continuam no `settings.json`. Portas medidas mortas, nenhuma IDE rodando. O hook `prefer-ide-tools.sh`, que barrava `Grep`/`Glob` pra empurrar pro MCP, foi apagado.

## Vault celebro — `/home/dr/vaults/celebro`

Cérebro de conhecimento (o operacional é `~/.claude/memory`). Entrada: `celebro/CLAUDE.md` → `index.md` → a nota. Acesso por arquivo, não exige Obsidian aberto. O MCP `obsidian` (REST em `127.0.0.1:27123`) só responde com o app aberto.
