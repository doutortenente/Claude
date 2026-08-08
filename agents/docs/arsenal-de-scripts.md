# Arsenal de scripts — `~/projetos/scripts/`

Casa única de todo script de infra, travada em 22-jul-2026: nenhum repo tem `scripts/` próprio. Consultado
pelo `chefe` (que projeta e escreve) e pelo `caco` (que executa).

**Confirme com `ls` antes de citar.** Esta tabela é um mapa, não a verdade — o disco é. Conferida em
07-ago-2026 contra `find ~/projetos/scripts -maxdepth 2 -type f`.

## Gavetas

| Gaveta | Assunto |
|---|---|
| `indices/` | build e query dos índices de busca dos 3 repos |
| `pc/` | saúde da máquina: limpeza, boletim, conserto do MCP da IDE |
| `nuvem/` | OneDrive: catalogar e arquivar documento |
| `sasi/` | lançador do MCP do SASI e auditoria clínica |
| `claude/` | validação da frota de subagentes |
| `obsidian/` | ponte com o vault celebro |

## Scripts

| Script | Quando |
|---|---|
| `pc/fix_ide_mcp.py` | MCP JetBrains caiu, porta mudou, entrada ressuscitou com nome velho. Detecta portas vivas, poda nome morto, cria `jetbrains`/`jetbrains-index` se faltarem. Depois o operador roda `/mcp`. Tem `--dry`. Também é chamado sozinho pelo systemd `fix-ide-mcp.path` |
| `pc/pc_higiene.py` | Disco enchendo, limpeza periódica (Toolbox, npm, pip). **Dry-run por default; `--apply` executa** |
| `pc/saude_pc.py` | Boletim da máquina: disco, RAM, peso morto. Leitura pura |
| `pc/faxina_dev.py` | Boletim do workspace: repo sujo ou dessincronizado, worktree órfão, `~/Downloads` envelhecido. Leitura pura |
| `pc/otimiza_notebook.sh` | Exige `sudo` — devolver pro operador rodar com prefixo `!` |
| `indices/build_dev_index.py` · `query_dev_index.py` | Índice do `~/projetos`. O build roda sozinho pelo hook `Stop` (`--if-stale`); a query é livre |
| `indices/build_sasi_index.py` · `query_sasi_index.py` | Índice do repo sasi |
| `indices/build_claude_index.py` · `query_claude_index.py` | Índice do repo claude (skills e agentes) |
| `indices/push_repo_index_to_postgres.py` | Sobe o índice local para o Postgres |
| `claude/validar_frota.py` | Valida os 18 agentes contra `docs/convencoes.md`. `--strict` sai com código 1 se houver erro |
| `nuvem/arquivar.py` | Arquivamento no OneDrive v2. **Dry-run por default** |
| `nuvem/onedrive-index/` | Motor do acervo v2 por feature: `build_v2.py` classifica e renomeia, `regen_index_v2.py` regenera `_INDEX.md` e `_index.json`, mais `exec_v2.py` e `gen_html_v2.py`. `regen_index.py` (v1) é legado. Convenção: `categoria_assunto[_paciente][_AAAA-MM-DD].ext`, 7 pastas-feature, data só quando real |
| `sasi/mcp_sasi_wrapper.sh` | Lançador do MCP sasi (carrega `~/projetos/.env` e o Node 24 do nvm). Não se roda na mão — é chamado pelo `.mcp.json` |
| `sasi/audit_eventos.py` | Auditoria da fila de revisão de `eventos_clinicos` |
| `sasi/status.sh` | Estado rápido do SASI |
| `obsidian/check-obsidian-api.sh` | Testa se a ponte REST com o Obsidian está de pé (`127.0.0.1:27123`, só com o app aberto) |

## Dois caminhos cabeados fora de `~/projetos` — mover quebra em silêncio

| Quem chama | O quê |
|---|---|
| systemd `fix-ide-mcp.service` | `scripts/pc/fix_ide_mcp.py` |
| `~/projetos/.mcp.json` | `scripts/sasi/mcp_sasi_wrapper.sh` |

Antes de MOVER qualquer script, procure quem o chama:
`grep -rn <nome> ~/projetos ~/.claude/memory ~/.config/systemd`.

Os scripts de `indices/` têm o repo-alvo FIXO no topo (`ROOT = DEV/"claude"`) — não calculam por posição do
arquivo, então mover o script não muda o alvo, só quebra quem chama.
