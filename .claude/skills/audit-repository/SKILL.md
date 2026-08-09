---
name: audit-repository
description: Auditoria de integridade deste repo (~/projetos/claude). Aciona quando o operador disser "audita o repo", "confere se está tudo certo aqui", "tem caminho quebrado?", "tem symlink quebrado?", "o índice está velho?", "o inventário bate?", "os números do docs ainda valem?", ou antes de fechar uma reestruturação grande. Confere caminho citado em documento contra o disco, symlink de skill, frescor do índice e divergência dos números publicados em docs/REPOSITORY-INVENTORY.md.
---

# Auditar o repositório

Objetivo: achar mentira. Documento que cita pasta que não existe, atalho apontando pro vazio, número publicado que envelheceu. Nada aqui conserta — a auditoria **relata**, o conserto é decisão do operador.

Rode tudo a partir da raiz: `cd /home/dr/projetos/claude`.

## 1. Caminho citado × caminho real

Extrai todo caminho entre crases dos documentos e testa um por um. **Crase** = o acento ` que marca trecho de código no Markdown.

```bash
grep -rhoE '`[A-Za-z0-9_.~-]+(/[A-Za-z0-9_.*<>-]+)+/?`' CLAUDE.md README.md docs/*.md .claude/rules/*.md \
  | tr -d '`' | sort -u \
  | grep -E '^(\.claude|agents|docs|memory|skills-que-prestam|EXTRACAO-CLINICA-SASI)/' \
  | grep -vxF -e '.claude/skills/prompt-improver/scripts/engine.py' \
              -e 'docs/regras-do-repo' \
  | while read -r p; do
      case "$p" in *'<'*|*'*'*) continue;; esac
      [ -e "$p" ] || echo "FALTA: $p"
    done
```

O primeiro `grep -E` só deixa passar caminho que começa numa pasta real deste repo — sem ele entram falsos positivos: endereço de outro repositório (`doutortenente/…`) e caminho de fora (`~/…`). O `case` descarta molde (`<nome>`) e curinga (`*`).

O `grep -vxF` é a **lista de exceções**: duas citações que NÃO existem no disco de propósito, e que sem esta linha fariam a auditoria reprovar para sempre. `-x` exige linha inteira igual, `-F` compara texto literal — nada de curinga.

| Exceção | Por que não existe no disco |
| --- | --- |
| `.claude/skills/prompt-improver/scripts/engine.py` | Citação histórica em `docs/DECISIONS.md`: é o caminho que nunca existiu e que por isso matou os 3 hooks em 22-jul-2026. Apagar a citação apaga a lição. |
| `docs/regras-do-repo` | Nome de branch do exemplo em `.claude/rules/git-workflow.md` (`git switch -c docs/regras-do-repo`). Passa pelo filtro só porque o exemplo começa em `docs/`, que é pasta real. |

Com as exceções aplicadas, **saída vazia = aprovado**. Se um caminho novo entrar aqui, ele tem de vir com a justificativa na tabela acima — exceção sem motivo escrito é FALHA disfarçada de OK.

Caminho de fora do repo é conferido à mão, porque só existe um punhado:

```bash
ls -d ~/.claude/skills ~/.claude/agents ~/.claude/settings.json \
      ~/projetos/.env ~/projetos/scripts/indices/build_claude_index.py
```

## 2. Symlink de skill 1:1

**Symlink** = atalho: o arquivo mora num lugar só e o atalho aponta pra ele.

```bash
ls -1 ~/.claude/skills | wc -l                                              # atalhos ligados
find skills-que-prestam -mindepth 3 -maxdepth 3 -name SKILL.md | wc -l      # skills reais
find ~/.claude/skills/ -maxdepth 1 -xtype l                                 # atalhos QUEBRADOS
```

Os dois primeiros números têm de ser iguais. O terceiro comando tem de imprimir nada — `-xtype l` lista exatamente o atalho cujo destino sumiu. Pasta com prefixo `_` (ex.: `_anthropic`) não é skill e não entra na conta.

## 3. Índice velho

```bash
find . -name '*.md' -newer memory/claude_index.db \
  -not -path './.git/*' -not -path './ide/*' -not -path './memory/*' | head
```

Imprimiu arquivo = o índice é mais antigo que o conteúdo. Regerar com `python3 ~/projetos/scripts/indices/build_claude_index.py`.

`memory/` fica **fora** desta conta de propósito: o gerador grava o `.db` primeiro e só depois escreve `MAPA-CLAUDE.md` e `SKILLS-CATALOGO.md`. Os dois nascem sempre mais novos que o banco, então sem o `-not -path './memory/*'` esta conferência reprovaria mesmo logo após regerar.

## 4. Número publicado × número real

```bash
git ls-files | wc -l                                    # arquivos versionados
du -sh --exclude=.git . ; du -sh .                      # disco sem / com histórico
find agents -mindepth 1 -maxdepth 1 -type d | wc -l     # subagentes + a pasta docs/
```

Compare com a tabela "Números do repo" de `docs/REPOSITORY-INVENTORY.md`. Em `agents/`, subtraia 1 da contagem: `agents/docs/` é doutrina, não subagente.

## 5. Relatório final (obrigatório, nesta forma)

| Item | Esperado | Encontrado | Veredito |
| --- | --- | --- | --- |
| Caminhos citados em docs | todos existem | _n_ faltando | OK / FALHA |
| Symlinks × skills | iguais | 36 × 36 | OK / FALHA |
| Symlinks quebrados | 0 | _n_ | OK / FALHA |
| Índice | mais novo que os `.md` | velho / em dia | OK / FALHA |
| Números do inventário | batem | _quais divergiram_ | OK / FALHA |

Uma linha por item, sempre as cinco. Item não verificado é `[SEM_FONTE]`, nunca "OK" por otimismo. Cada FALHA leva o caminho exato do arquivo culpado.
