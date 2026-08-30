# Runbook Runtime — resolver problemas comuns

> Procedimentos passo a passo. Cada item tem comando executável e resultado esperado.

## 1. Claude Code não vê uma skill

**Sintoma:** Skill chamada mas não aparece na lista, ou diz "skill not found".

**Diagnóstico:**
```bash
# A skill existe no repo?
find ~/projetos/claude/skills-que-prestam -name SKILL.md | grep <nome>

# O symlink existe e aponta certo?
ls -la ~/.claude/skills/<nome>
readlink -f ~/.claude/skills/<nome>
```

**Fix:**
```bash
# Sincroniza tudo (recria symlinks quebrados)
python3 ~/projetos/claude/scripts/sync-claude-config.py --apply

# Ou corrige individualmente
rm ~/.claude/skills/<nome>
ln -s ~/projetos/claude/skills-que-prestam/<pacote>/<nome> ~/.claude/skills/<nome>
```

## 2. Claude Code "não conecta" — erro de auth

**Sintoma:** Mensagem "invalid token" ou "401" quando tenta usar modelo.

**Diagnóstico:**
```bash
grep ANTHROPIC_AUTH_TOKEN ~/.claude/settings.json | head -1  # deve mostrar token, não ${...}
```

**Fix:**
```bash
# O sync script preserva o token existente. Se sumiu, restaura do .env:
source ~/projetos/.env && sed -i "s/\"ANTHROPIC_AUTH_TOKEN\":.*/\"ANTHROPIC_AUTH_TOKEN\": \"$ANTHROPIC_AUTH_TOKEN\"/" ~/.claude/settings.json

# Verifica
python3 -c "import json; s=json.load(open('/home/dr/.claude/settings.json')); print(len(s['env']['ANTHROPIC_AUTH_TOKEN']))"
```

## 3. MCP server não responde

**Sintoma:** Claude Code diz "MCP server não respondeu" ou "connection refused".

**Diagnóstico:**
```bash
# Qual MCP tá caído?
python3 ~/projetos/claude/scripts/sync-claude-config.py 2>&1 | grep -i "✓.*http\|✗"
```

**Fix por server:**
| Server | Como resolver |
|---|---|
| `jetbrains-index` | Reinicia a IDE → porta muda → o `fix_ide_mcp.py` detecta e atualiza. Rode `python3 ~/projetos/scripts/pc/fix_ide_mcp.py` |
| `obsidian` | Reinicia o Obsidian → porta 27123 volta. Se não, reinicia o bridge MCP |
| `supabase` | No menu `/mcp` → Supabase → "Clear authentication" → autenticar de novo |
| `playwright` | `npx @playwright/mcp@latest --help` para testar. Pode precisar `npx playwright install` |
| `agentbridge` | DESABILITADO (endpoint quebrado). Não tem fix — só reativar quando houver endpoint válido |

## 4. Memória do operador não atualiza

**Sintoma:** Claude responde com informação antiga que eu já corrigi em `~/.claude/memory/`.

**Fix:**
```bash
# Push do repo para runtime
python3 ~/projetos/claude/scripts/sync-claude-config.py --apply

# Ou copia individual
cp ~/projetos/claude/context/memory/comando.md ~/.claude/memory/
```

## 5. CLAUDE.md global não reflete mudança

**Sintoma:** Editei algo no repo Claude mas o Claude Code continua com o velho.

**Fix:**
```bash
python3 ~/projetos/claude/scripts/sync-claude-config.py --apply
# confirma:
diff ~/.claude/CLAUDE.md ~/projetos/claude/context/global-claude-persona.md  # deve sair vazio
```

## 6. Hook não roda

**Sintoma:** Hook declarado em settings.json mas não executa.

**Diagnóstico:**
```bash
# O caminho do hook existe e é executável?
H=$(grep -o '"command":[^,}]*' ~/.claude/settings.json | sed 's/"command": *"//;s/"$//')
for cmd in $H; do test -x "$cmd" && echo "✓" || echo "✗ $cmd"; done
```

**Fix:** se o hook aponta pra fora do repo (ex: `~/.codex/hooks/prefer-ide-tools.sh` — caminho quebrado),
recomece o path para `.claude/hooks/` do repo.

## 7. using-superpowers some ou duplica skills

**Sintoma:** Skill do plugin aparece duplicada ou some da lista.

**Fix (NÃO executar sem autorização):**
```bash
# using-superpowers é PLUGIN, não skill do repo — permanece como cópia
# Reinstalar pelo marketplace se sumiu:
# /plugin marketplace add using-superpowers
```

## 8. Recovery completo (máquina nova ou disco perdido)

```bash
# 1. Clona o repo
git clone https://github.com/doutortenente/Claude.git ~/projetos/claude

# 2. Sincroniza tudo
python3 ~/projetos/claude/scripts/sync-claude-config.py --apply
# (vai pedir ANTHROPIC_AUTH_TOKEN — cole do ~/projetos/.env ou do cofre Vaultwarden)

# 3. Reinstala plugins do marketplace
# (using-superpowers, hooks-development, nextjs-expert — via Claude Code marketplace)
```
