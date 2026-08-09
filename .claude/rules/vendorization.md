---
description: Vale ao copiar skill escrita por outra pessoa para este repo, ligar/desligar skill, ou re-sincronizar skill vendorizada com o upstream.
---

# Como adicionar e revisar skill de terceiro

Aprofunda a tabela da [seção 6 do CLAUDE.md](../../CLAUDE.md#6-operações-do-repo): lá o endereço, aqui o procedimento e o motivo de recusar uma skill.

**Vendorizar** = trazer para casa material escrito por outra pessoa e anotar de onde veio — como colar no protocolo do serviço um fluxograma de outro hospital, com a referência no rodapé. Sem rodapé, ninguém sabe se ainda vale nem quem responde por ele.

## As duas casas

| Destino | Onde | Como fica ligada |
| --- | --- | --- |
| **Serviço** (vai ser usada) | `skills-que-prestam/<pacote>/<nome>/` | 1 **symlink** (atalho) individual em `~/.claude/skills/<nome>` |
| **Reserva** (fria) | repo privado `doutortenente/pacotao-macaroca-de-skills`, em `plugins/pacotao/skills/<nome>/` | não ligada, custo zero |

Não existe terceira casa. Skill solta na raiz é lixo esperando apodrecer.

## Escolher o pacote (são 5, não se inventa o 6º)

| Pacote | Entra aqui |
| --- | --- |
| `00-pacote-ide-e-documentacao` | navegar código na IDE, buscar documentação de biblioteca |
| `01-pacote-skills-medicas` | clínica: UTI, plantão, evolução, eco, ensino médico |
| `02-pacote-skills-workspace` | arquivo e escritório: `.docx`, `.pdf`, `.xlsx`, organizar pasta |
| `03-pacote-skills-claude-nativas` | operar o próprio Claude: criar skill/subagente, planejar |
| `04-pacote-skills-supabase-e-vercel` | banco de dados e publicação do SASI |

Não coube em nenhum? A skill não serve à missão: reserva fria, não pacote novo.

## Passo a passo de entrada

1. **Apagar `.git/` e `node_modules/`** da pasta copiada — histórico alheio e biblioteca baixada não entram no versionamento.
2. **Conferir o `SKILL.md` na raiz**, com **frontmatter** (cabeçalho entre três traços) trazendo `name` e `description`. Sem isso o Claude Code não carrega a skill.
3. **Revisão de segurança**, obrigatória antes de aceitar: ler **todo** `scripts/` e **todo** hook, linha por linha — ver [`security-and-secrets.md`](./security-and-secrets.md). Script de terceiro roda com as suas permissões: medicação de origem desconhecida ninguém injeta sem ler o rótulo.
4. **Registrar procedência** em `reference/VENDOR.md` do repo `pacotao-macaroca-de-skills`: upstream (origem), **commit SHA** fixado (código da versão exata), licença e o que foi copiado.
5. **Criar o symlink**, só se entrar em serviço: `ln -s ~/projetos/claude/skills-que-prestam/<pacote>/<nome> ~/.claude/skills/<nome>`.
6. **Regerar o índice**: `python3 ~/projetos/scripts/indices/build_claude_index.py`.

**Sem entrada em `VENDOR.md` a skill não é rastreável — e isso, sozinho, é motivo para NÃO aceitá-la.** Não se audita licença do que não tem origem anotada.

## O custo de deixar ligada

Cada skill ativa injeta `name` + `description` em **toda** mensagem: hoje 36 skills = 11.173 caracteres, cobrados a cada ida e volta. Skill não usada é pedágio. Desligar = remover o symlink; a pasta fica no repo.

## Re-sincronizar com o upstream depois

1. `git clone <upstream>` numa pasta temporária fora de `~/projetos`.
2. Comparar o que mudou desde o SHA fixado no `VENDOR.md`.
3. Reler **todo** diff de `scripts/` e hook — o passo 3 se repete a cada atualização.
4. Recopiar e **atualizar o SHA**. SHA velho com código novo mente pior que registro nenhum.
5. Regerar o índice e conferir se o symlink ainda aponta para pasta existente.

## Aceite — 7 itens

- [ ] `.git/` e `node_modules/` apagados da pasta copiada
- [ ] `SKILL.md` na raiz, com `name` e `description` no frontmatter
- [ ] Todo `scripts/` e todo hook lidos — nada de rede, `curl` ou leitura de `.env` inesperada
- [ ] Entrada em `reference/VENDOR.md`: upstream + SHA + licença + o que foi copiado
- [ ] Pacote escolhido entre os 5, com critério explicável
- [ ] Symlink apontando para pasta existente (`ls -l ~/.claude/skills/<nome>`)
- [ ] Índice regerado e a skill aparece em `query_claude_index.py skills`
