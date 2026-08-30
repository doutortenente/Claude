# Contexto do operador

> Este diretório é a fonte canônica do **contexto e configuração** do Claude Code do Dr. Tenente.
> Foi importado de `~/.claude/CLAUDE.md`, `~/.claude/memory/` e `~/.claude/settings.json` em 30-ago-2026
> para versionar o que vivia só no disco local e corria risco de perda.

## Estrutura

| Arquivo | Origem | O que é |
| --- | --- | --- |
| `global-claude-persona.md` | `~/.claude/CLAUDE.md` | Persona global: regra de tradução, perfil Goggins, conselho dos alfas, formato de saída |
| `memory/comando.md` | `~/.claude/memory/comando.md` | Memória manual: perfil, arquitetura de informação, frota de subagentes, débitos abertos |
| `memory/debitos.md` | `~/.claude/memory/debitos.md` | Débitos técnicos e clínicos (SASI, infra, credenciais) |
| `memory/log.md` | `~/.claude/memory/log.md` | Histórico de sessões e ações |
| `memory/alpha-council.md` | `~/.claude/memory/alpha-council.md` | Doutrina Alpha Council — organização de vida |

## Sincronização

Este diretório é a fonte. O runtime (`~/.claude/`) é preenchido pelo script
`~/projetos/claude/scripts/sync-claude-config.sh`:

```bash
python3 ~/projetos/claude/scripts/sync-claude-config.py --apply
```

Regra: **editar aqui, sincronizar para fora.** Nunca editar diretamente em `~/.claude/CLAUDE.md`
ou `~/.claude/memory/` — a cópia ali é sempre regenerada deste repo.

## Segurança

- Nenhum arquivo neste diretório contém chave, token ou senha.
- Valores de segredo que apareciam em débitos foram substituídos por `[SEGURO_REDACTED]`.
- A chave real morre em `~/projetos/.env` (permissão 600, fora do git).
