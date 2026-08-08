# Como mexer na frota

## Criar um agente novo

```bash
cd ~/projetos/claude
git checkout -b frota-<nome>
mkdir agents/<nome>
# copiar os blocos de agents/docs/template-de-agente.md para agents/<nome>/<nome>.md
# escrever agents/<nome>/README.md com a documentação (SEM cabeçalho YAML)
python3 ~/projetos/scripts/claude/validar_frota.py --strict
```

**Uma pasta por agente**, com o arquivo do agente e o `README.md` de documentação ao lado. O nome do
arquivo não precisa bater com nada — a identidade vem do campo `name` no cabeçalho — mas usar
`<nome>/<nome>.md` mantém a pasta legível.

**O `README.md` da pasta não pode ter cabeçalho YAML.** A varredura é recursiva e carrega todo `.md`
com `name` + `description` como agente; um README com cabeçalho vira agente fantasma.

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
- [ ] Agente mora em `agents/<nome>/<nome>.md`, com `README.md` de documentação ao lado
- [ ] O `README.md` da pasta **não** tem cabeçalho YAML (senão vira agente fantasma)
- [ ] Cabeçalho só usa campos da spec oficial; `name` e `description` são obrigatórios
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
| ----- | ------- |
| `     | É       |
| ~/    |         |
| .c    | sym     |
| l     |         |
| au    | lin     |
| d     |         |
| e/    | k.      |
| a     |         |
| ge    | Edi     |
| n     |         |
| ts    | tar     |
| `     | lá      |
|       | edi     |
|       | ta      |
|       | aqu     |
|       | i,      |
|       | mas     |
|       | sem     |
|       | git     |
|       | e       |
|       | sem     |
|       | rev     |
|       | isã     |
|       | o       |
| `     | Tod     |
| ag    |         |
| en    | o       |
| t     |         |
| s/    | age     |
| d     |         |
| oc    | nte     |
| s     |         |
| /c    | her     |
| o     |         |
| nt    | da      |
| r     |         |
| at    | ess     |
| o     |         |
| -d    | e       |
| e     |         |
| -r    | for     |
| e     |         |
| la    | mat     |
| t     |         |
| or    | o —     |
| i     |         |
| o.    | mud     |
| m     |         |
| d`    | anç     |
| so    | a       |
| z     |         |
| in    | afe     |
| h     |         |
| o     | tao     |
|       | s18     |
|       | de      |
|       | uma     |
|       | vez     |
| Sc    | Cas     |
| r     |         |
| ip    | a       |
| t     |         |
| de    | úni     |
| in    | ca      |
| f     |         |
| ra    | é       |
| de    | `       |
| n     | ~/      |
| tr    | pro     |
| o     |         |
| de    | jet     |
| s     |         |
| te    | os/     |
| re    | scr     |
| p     |         |
| o     | ipt     |
|       | s/`     |
|       | ; o     |
|       | val     |
|       | ida     |
|       | dor     |
|       | da      |
|       | fro     |
|       | ta      |
|       | mor     |
|       | aem     |
|       | `sc     |
|       |  ri     |
|       | p t     |
|       | s/      |
|       | cla     |
|       |  ud     |
|       | e /     |
|       | `       |
