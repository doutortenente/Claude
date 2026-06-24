# Templates — scaffolding e Obsidian

Espelho versionado dos modelos **Padrão** do vault Obsidian **CELEBRO**.

| Pasta | Conteúdo | Fonte no Obsidian |
|---|---|---|
| `arquitetura/` | Scaffolds Node, Python, React, SASI v2 | `ARQUITETURA REPOSITÓRIOS/` |
| `obsidian/` | Nota diária / plantão | `99-Templates/daily.md` |
| `arquitetura-padrao.md` | Estrutura mínima de pastas para projetos novos | — |

Doutrina clínica e skills UTI vivem no repo **SASI** (`doctrine/`, skills em `claude/skills/`).

## Fonte canônica

```
/home/dr/vaults/celebro/
```

## Sincronizar do Obsidian

```bash
cp "/home/dr/vaults/celebro/ARQUITETURA REPOSITÓRIOS/SASI_v2_Compiladao_Arquitetura_Projetos_2026.md" \
   templates/arquitetura/sasi-v2-monorepo.md
cp "/home/dr/vaults/celebro/99-Templates/daily.md" templates/obsidian/daily.md
```