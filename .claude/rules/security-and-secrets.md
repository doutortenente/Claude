---
description: Onde mora segredo, o que nunca entra no git, licença de terceiro, 5 conferências pré-commit
paths:
  - "**/.env*"
  - "**/*.json"
  - "**/.gitignore"
  - "skills-que-prestam/**"
---

# Segredos e credenciais

## Onde mora segredo

- Cofre único: `~/projetos/.env` — arquivo real, permissão `600`. `sasi/.env` é **symlink** (atalho pro real, não cópia).
- Segredo grande (chave RSA, certificado) mora em `~/.local/secrets/` (também `600`), com ponteiro `_FILE` no cofre.
- **Neste repo não mora chave**: só `.env.example`, molde com nomes de variável e valores falsos.

Bloqueado pelo `.gitignore`: `.env` e `.env.*` (menos `.env.example`) · `chaves_secretas.txt` · `**/settings.local.json` · `*.log` · `ide/` · `.agentbridge/`.

**`ANTHROPIC_AUTH_TOKEN` vive em texto puro em `~/.claude/settings.json`** (permissão 600, verificado fora de todo repo git em 03-set-2026). Ao editar esse arquivo por script: escrever em `mktemp` e `mv` por cima — nunca redirecionar direto pro original, um `jq` que falha no meio deixa o arquivo vazio e derruba a sessão inteira.

## `ide/`: indexar segredo é pior que commitar

Os `.lock` do plugin da IDE guardam `authToken` em texto puro. Desde 08-ago-2026 estão fora do git **e** fora do indexador (`SKIP_DIRS` em `build_claude_index.py`).

Commit esconde o segredo no histórico, onde ninguém procura sem querer. O índice faz o oposto — ele existe pra **achar texto**: token indexado aparece na primeira busca por palavra vizinha, pra qualquer agente, em qualquer sessão. Receita na gaveta versus pendurada no mural.

## Licença de terceiro dentro do repo

O `_anthropic/` não tem licença única — medido 09-ago-2026:

| Pasta | `LICENSE.txt` | Licença | Redistribuir |
|---|---:|---|---|
| `_anthropic/examples/` | 23 | Apache 2.0 | permitido |
| `_anthropic/public/` | 6 | `© 2025 Anthropic, PBC. All rights reserved.` | **proibido pela licença** |

As 6 restritas: `docx`, `xlsx`, `pdf`, `pptx`, `file-reading`, `pdf-reading`. `product-self-knowledge` não tem `LICENSE.txt` — ausência de arquivo não é permissão.

`doutortenente/Claude` é **público**. O operador foi avisado em 09-ago-2026 e decidiu manter — risco assumido, registrado em `docs/DECISIONS.md`. **Não reabrir o assunto.**

## Antes de commitar — 5 conferências

De dentro de `/home/dr/projetos/claude`:

| # | Confere | Comando | Esperado |
|---|---|---|---|
| 1 | O que está solto | `git status --short` | nada de `.env` nem credencial |
| 2 | O que vai de fato | `git diff --cached --name-only` | só arquivo que você reconhece |
| 3 | Segredo no conteúdo | `git diff --cached \| grep -inE "sk-\|api[_-]?key\|secret\|Bearer "` | vazio |
| 4 | Trava de pé | `git check-ignore -v ide/ .agentbridge` | as 2 linhas aparecem |
| 5 | Nada proibido dentro | `git ls-files \| grep -E "^ide/\|(^\|/)\.env$\|settings\.local\.json"` | vazio |

Item 3 devolveu linha: **parar**, tirar o trecho, rodar de novo.

## Sinal de alerta → o que fazer

| Sinal | Ação |
|---|---|
| Segredo commitado, sem push | Não subir. Trocar a credencial na origem (o valor está queimado) e limpar o commit |
| Segredo já pushado | Trocar a credencial **primeiro**, reescrever histórico depois. Rotação vence limpeza |
| Arquivo novo com `token`, `key` ou `.pem` no nome | Não versionar. Vai pra `~/.local/secrets/` com ponteiro `_FILE` |
| Pasta nova que pode ter credencial | Entra no `.gitignore` **e** no `SKIP_DIRS`. Uma trava só não basta |
| Skill de terceiro pedindo pra ler `.env` | Recusar. Skill lê variável carregada, nunca o cofre |
