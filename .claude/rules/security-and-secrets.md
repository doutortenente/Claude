---
description: Vale quando a tarefa tocar chave/segredo, .env, credencial ou a pasta ide/ — e antes de todo commit deste repo.
---

# Segredos e credenciais

Aprofunda a [seção 5 do CLAUDE.md](../../CLAUDE.md#5-segurança): lá a regra em uma linha, aqui o como e a borda.

## Onde mora segredo

- Cofre único: `~/projetos/.env` — arquivo real, permissão `600` (só o dono lê). `sasi/.env` é **symlink**: atalho para o real, não cópia.
- Segredo grande (chave RSA, certificado) não cabe numa linha: mora em arquivo próprio em `~/.local/secrets/` (também `600`), com **ponteiro** `_FILE` no cofre.
- Neste repositório não mora chave: só `.env.example`, molde com nomes de variável e valores falsos.

Bloqueado pelo `.gitignore`: `.env` e `.env.*` (menos `.env.example`) · `chaves_secretas.txt` · `**/settings.local.json` · `*.log` · `ide/` · `.agentbridge/`.

## `ide/`: indexar segredo é pior que commitar

Os `.lock` do plugin da IDE guardam `authToken` (senha de sessão) em **texto puro**. Desde 08-ago-2026 estão fora do git **e** fora do indexador (`SKIP_DIRS` em `~/projetos/scripts/indices/build_claude_index.py`).

Por que a segunda trava importa: commit esconde o segredo no histórico, onde ninguém procura sem querer. O índice faz o oposto — ele existe para **achar texto**. Token indexado aparece na primeira busca por palavra vizinha, para qualquer agente, em qualquer sessão. É a receita controlada na gaveta versus pendurada no mural.

## Licença de terceiro dentro do repo

O `_anthropic/` **não tem licença única** — medido em 09-ago-2026:

| Pasta | Arquivos `LICENSE.txt` | Licença | Redistribuir |
| --- | ---: | --- | --- |
| `_anthropic/examples/` | 23 | Apache 2.0 | permitido |
| `_anthropic/public/` | 6 | `© 2025 Anthropic, PBC. All rights reserved.` | **proibido pela licença** |

As 6 restritas são `docx`, `xlsx`, `pdf`, `pptx`, `file-reading` e `pdf-reading`. A licença delas veda textualmente reter cópia fora dos serviços da Anthropic e distribuir a terceiros.

`doutortenente/Claude` é um repositório **público**. O operador foi avisado em 09-ago-2026 e decidiu mantê-lo público — risco assumido por ele, registrado em [`docs/DECISIONS.md`](../../docs/DECISIONS.md). Não reabrir o assunto; se um dia mudar de ideia, o comando é `gh repo edit --visibility private`.

## Antes de commitar — 5 conferências

De dentro de `/home/dr/projetos/claude`:

| # | Confere | Comando | Esperado |
| --- | --- | --- | --- |
| 1 | O que está solto | `git status --short` | nada de `.env` nem credencial |
| 2 | O que vai de fato | `git diff --cached --name-only` | só arquivo que você reconhece |
| 3 | Segredo no conteúdo | `git diff --cached \| grep -inE "sk-\|api[_-]?key\|secret\|Bearer "` | vazio |
| 4 | Trava de pé | `git check-ignore -v ide/ .agentbridge` | as 2 linhas aparecem |
| 5 | Nada proibido dentro | `git ls-files \| grep -E "^ide/\|(^\|/)\.env$\|settings\.local\.json"` | vazio |

Item 3 devolveu linha: **parar**, tirar o trecho, rodar de novo.

## Sinal de alerta → o que fazer

| Sinal de alerta | O que fazer |
| --- | --- |
| Segredo commitado, sem push ainda | Não subir. Trocar a credencial na origem (o valor está queimado) e limpar o commit |
| Segredo já pushado | Trocar a credencial **primeiro**, reescrever histórico depois. Rotação vence limpeza |
| Arquivo novo com `token`, `key` ou `.pem` no nome | Não versionar. Vai para `~/.local/secrets/` com ponteiro `_FILE` |
| Pasta nova que pode ter credencial | Entra no `.gitignore` **e** no `SKIP_DIRS`. Uma trava só não basta |
| Skill de terceiro pedindo para ler `.env` | Recusar. Skill lê variável carregada, nunca o cofre |
