# Como mexer na frota

## Criar um agente novo

```bash
cd ~/projetos/claude
git checkout -b frota-<nome>
cp agents/_template.md agents/<nome>.md
# preencher; ver agents/docs/convencoes.md
python3 ~/projetos/scripts/claude/validar_frota.py --strict
```

Antes de escrever, responda 3 perguntas. Se travar em qualquer uma, o agente não deve existir:

1. **Que missão ele atende que nenhum dos 18 atende?** Sobreposição não resolvida vira despacho errado —
   o gerente chama um quando queria o outro, e ninguém percebe.
2. **Qual erro dele é inaceitável?** Isso vira o primeiro parágrafo do arquivo. Agente sem falha
   definida não tem como se autocorrigir.
3. **Ele precisa mesmo escrever?** Se só lê, não dê `Write` nem `Edit`. A trava mais barata contra dano
   é não ter a ferramenta.

## Alterar um agente existente

Mudança na `description` muda o **roteamento da frota inteira** — o gerente passa a delegar diferente.
Trate como mudança de comportamento, não de texto: altere, rode o validador e teste com uma missão real
antes de mergear.

Mudança no corpo é mais barata, mas vale a mesma regra do teto: 60 linhas. Passou disso, o excedente vira
arquivo em `docs/` e o agente aponta pra lá.

## Checklist antes do commit

- [ ] `validar_frota.py --strict` sai com código 0
- [ ] Frontmatter tem exatamente 4 campos: `name`, `description`, `tools`, `model`
- [ ] `description` diz QUANDO delegar, não resume o procedimento
- [ ] `description` diz de qual agente vizinho ele se diferencia
- [ ] Corpo tem as 4 seções na ordem: identidade → `## Método` → `## Formato de saída` → `## Travas`
- [ ] Cada trava tem o porquê colado
- [ ] Arquivo com no máximo 60 linhas
- [ ] Agente sem `Write`/`Edit` não promete editar nada
- [ ] Zero emoji, zero menção a `graphify`
- [ ] `README.md` atualizado com a linha do agente novo
- [ ] `CHANGELOG.md` atualizado

## Testar um agente antes de confiar nele

Validador confere forma, não comportamento. Para saber se funciona:

1. Despache uma missão **de leitura** real, com resposta que você já conhece.
2. Confira se o relatório traz `NÃO VI` preenchido — agente que omite o que não olhou é o mais perigoso,
   porque faz cobertura parcial parecer total.
3. Só depois disso libere missão de escrita.

## Fluxo git

Branch de feature, push, PR, merge. Commit direto na `main` é proibido. Mensagem em português, estilo
Conventional Commits: `feat(agents):`, `docs(agents):`, `fix(agents):`.

## Onde NÃO mexer

| Coisa | Por quê |
|---|---|
| `~/.claude/agents` | É symlink. Editar lá edita aqui, mas sem git e sem revisão |
| `agents/docs/contrato-de-relatorio.md` sozinho | Todo agente herda esse formato — mudança afeta os 18 de uma vez |
| Script de infra dentro deste repo | Casa única é `~/projetos/scripts/`; o validador da frota mora em `scripts/claude/` |
