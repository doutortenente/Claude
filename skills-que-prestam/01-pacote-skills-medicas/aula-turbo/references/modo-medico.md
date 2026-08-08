# Modo médico — superpoderes clínicos

Ative quando o tema for **clínico, diagnóstico ou de decisão médica** (o usuário é médico intensivista). Aqui a skill vai além de explicar: ela vira uma ferramenta de raciocínio à beira do leito.

## Regra nº 1: pesquise ANTES de escrever. Sempre.

Conteúdo médico errado é perigoso. A ordem importa: **primeiro pesquise, depois escreva.** Não redija de cabeça para "conferir depois" — o depois não vem, e o número errado passa.

- **Antes de redigir**, abra guidelines e PubMed/literatura e trave: prevalências, sensibilidade/especificidade, likelihood ratios, **pontos de corte de escores**, **doses, apresentações e diluições**, e as condutas. Fontes: as sociedades da área (AHA/ESC, ATS/IDSA, Surviving Sepsis, EASL/AASLD, Baveno, KDIGO, ICA, etc.) + os ensaios primários que fundamentam a conduta.
- **Nunca invente uma referência.** Se citar um estudo, ele tem que existir (autor, revista, ano corretos). Na dúvida, cite a guideline em vez de um número específico.
- **Sinalize a incerteza.** "≈", "faixa de X–Y", "varia com a população" são honestos e úteis.
- **Doses são território de alto risco.** Confira cada dose/via/frequência na fonte. Ao dar uma "prescrição-padrão", deixe explícito que é um exemplo a conferir com o protocolo institucional.
- Feche todo material clínico com um lembrete enxuto: *apoio ao estudo/decisão; não substitui juízo clínico nem protocolo institucional; confirme doses.*

Precisão vale mais que brilho. Um joguinho lindo com um LR ou uma dose inventada é um passivo, não um ativo.

## O esqueleto bayesiano

Sempre que fizer sentido, enquadre o diagnóstico como atualização de probabilidade. Conceitos-âncora para virar estágios:

- 🎯 **Probabilidade pré-teste** — a chance antes do exame (história + exame + epidemiologia; escores validados).
- 🎯 **Sensibilidade / 🛡️ Especificidade** — detectar quem tem / descartar quem não tem. Mnemônicos: **SnNOUT** (Sn alta + negativo → exclui), **SpPIN** (Sp alta + positivo → confirma).
- 🧮 **Likelihood Ratio** — a arma cirúrgica. `LR+ = Sn/(1−Sp)`, `LR− = (1−Sn)/Sp`. Interpretação: LR>10 ou <0,1 muda muito; ≈1 é inútil. Vantagem: independe da prevalência.
- 🔄 **Fórmula de odds** — `odds pós = odds pré × LR`. Conversões: `odds = P/(1−P)`, `P = odds/(1+odds)`.
- 📐 **Nomograma de Fagan** — o cálculo em geometria: `log(odds pós) = log(odds pré) + log(LR)`.

## Estrutura recomendada para uma patologia

Quando o "jogo" for sobre uma doença específica (ex.: TEP, HELLP, dissecção), cada estágio ou o caso final pode carregar:

- **Gatilho clínico (queixa sentinela)** — o padrão que deve acender a luz.
- **Prevalência / contexto** — a taxa-base na população certa (com a fonte).
- **Pré-teste por escore validado** — Wells, HEART, ADD-RS, CURB-65, qSOFA/NEWS2, Ottawa SAH, critérios de Tennessee/Mississippi, etc.
- **Exames com LR+ e LR−** — e a regra prática ("negativo + pré-teste baixa exclui").
- **Armadilhas / vieses** — taxa-base neglect, ancoragem, fechamento prematuro, apresentação atípica no idoso/diabético/grávida.
- **Conduta** — o que fazer com pré-teste alta + critérios, incluindo tempo-alvo.
- **Referências primárias verificadas.**

Esses campos entram no `bloco`/`nerd`/`caso` do template (ver `app-interativo.md`).

## Os três blocos que o intensivista usa no plantão

Além dos blocos narrativos, o template tem três campos feitos para decisão à beira do leito: `escores`, `exames` e `prescricao` (esquema em `app-interativo.md`). Em tema de UTI, **procure preencher os três** na(s) patologia(s) central(is) — é o que separa "aula bonita" de "guia que salva o plantão". Não force onde não cabe, mas a régua é: se o intensivista faria isso de fato, o bloco existe.

### 📊 `escores` — sempre que um número muda a conduta

Todo tema hepático/UTI tem escores que decidem. **Cite-os por nome, com os componentes e os cortes que importam** — não deixe implícito. Se o paciente é estratificado por um escore, ele entra.

- Exemplos que quase sempre cabem: **Child-Pugh** (A 5–6 / B 7–9 / C 10–15), **MELD 3.0**, **SOFA/qSOFA**, **CLIF-C ACLF**, **CURB-65**, **Maddrey/Lille** (hepatite alcoólica), **ICA-AKI** (estágios de IRA).
- Diga o que cada faixa **implica** (ex.: "Child C10–13 → indica TIPS pré-emptivo"). Um escore sem consequência é decoração.

### 🧪 `exames` — o que pedir e QUANDO

O intensivista não quer só "peça exames" — quer o **gatilho temporal**: na admissão? se piorar? antes do procedimento? Seja específico.

- Formato de cada item: **qual exame — em que momento — para responder o quê**. Ex.: "*Paracentese diagnóstica — na admissão de toda ascite/descompensação — PMN ≥250 fecha PBE*".
- Inclua o que **não** pedir de rotina (evita exame-reflexo). Ex.: "*amônia não guia conduta; não repita para 'acompanhar' EH*".

### 💊 `prescricao` — a "prescrição na prática" (o bloco-estrela)

Este é o pedido central do intensivista: sair do "trate com vasoativo" e chegar no **o que escrever na prescrição, como fazer, e o que não fazer**. Preencha com precisão verificada:

- **`drogas[]`** — para cada droga: **nome · apresentação · dose · via · uma "prescrição-padrão" pronta** (linha que dá pra copiar, deixando claro que é exemplo a conferir). Ex.: `{nome:"Terlipressina", apresentacao:"amp 1 mg", dose:"1 mg IV 6/6h (↑ até 2 mg 6/6h)", via:"IV", prescricao:"Terlipressina 1 mg IV em bólus 6/6h; reavaliar Cr no D4"}`.
- **`passos[]`** — o **COMO FAZER, passo a passo, na ordem** de execução. É o algoritmo do plantão, não teoria.
- **`resgate[]`** — o **plano B**: o que fazer quando a primeira linha falha (2ª droga, procedimento, quando escalar/transferir), com o gatilho ("se X em Y tempo → Z").
- **`naoFazer[]`** — as **armadilhas que dão merda**: o erro clássico e a razão. Ex.: "*não corrigir INR com plasma antes de procedimento — não reduz sangramento e piora a pressão porta*". Renderiza em vermelho de propósito.

Por que essa estrutura: à beira do leito, decisão é *fazer/não fazer* + *dose* + *e se falhar*. O bloco espelha exatamente esse raciocínio, e o "NÃO faça" previne o erro mais caro — que costuma ser omissão ou reflexo, não falta de teoria.

### 🌎 Priorize o agente que EXISTE no meio do leitor (contexto BR)

Guideline não é bula de importação. A droga "clássica" do trial nem sempre é a que está na farmácia do plantão — e uma prescrição com um agente indisponível é inútil na prática. O leitor é intensivista **no Brasil**: puxe primeiro o que ele realmente tem à mão e cite o clássico só como equivalência.

- **Lidere com o agente disponível no meio**; traga o histórico/trial como nota ("equivalente clássico dos estudos"), não como 1ª linha.
- Exemplo que importa: na **PBE**, o trial-âncora (Sort, 1999) usou **cefotaxima** — mas no Brasil a **ceftriaxona** (1 g 12/12h ou 2 g/dia) é o cavalo de batalha e é **equivalente** (há RCT cefotaxima ≈ ceftriaxona ≈ ciprofloxacino). Então **ceftriaxona lidera**, cefotaxima vira nota.
- Mesma lógica para profilaxias e alternativas: se o de escolha é pouco disponível (ex.: norfloxacino minguando), ofereça a alternativa local usada (ex.: **ciprofloxacino** 500 mg/dia).
- Quando não tiver certeza da disponibilidade local, dê o de escolha + a alternativa e sinalize "conforme disponibilidade/protocolo institucional". Nunca empurre um agente exótico como se fosse rotina.

### 🔗 Entidades adjacentes — não deixe buraco no mapa

Doença de UTI raramente vem sozinha. Ao montar um tema, liste mentalmente **o que costuma vir junto no mesmo paciente** e cubra — nem que seja um estágio curto. O leitor percebe na hora quando falta a peça que ele veria no plantão.

- Regra prática: pergunte "*que outra complicação/condição esse paciente quase sempre tem junto, e que eu teria que manejar no mesmo plantão?*".
- Ex. (cirrose descompensada): além de HDA varicosa, PBE, SHR, EH e ascite refratária, entram **trombose de veia porta** (quando anticoagular; DOAC ok em Child A/B, não em C) e **coagulopatia da cirrose** (hemostasia rebalanceada — não corrigir INR de rotina, alvos de fibrinogênio/plaqueta, profilaxia de TVP mesmo com INR alargado).

## A calculadora bayesiana embutida

O template já traz uma calculadora (pré-teste × LR → pós-teste, com odds e sugestão de conduta por faixa). Ligue em `CONFIG.calculadoraBayes` com presets tirados do próprio conteúdo, para o usuário tocar e ver a probabilidade mudar:

```js
calculadoraBayes: {
  presetsPre: [
    { label:"Wells <2",  v:1.3 },
    { label:"Wells 2–6", v:16 },
    { label:"Wells ≥7",  v:37 },
  ],
  presetsLR: [
    { label:"AngioTC +",  v:25 },
    { label:"D-dímero −", v:0.05 },
  ],
}
```

Use valores que você **verificou**. Os presets são atalhos didáticos: ao tocar, o campo preenche e o resultado recalcula na hora — ótimo para "sentir" na pele por que um D-dímero positivo isolado não confirma TEP, mas um negativo com pré-teste baixa exclui.

## Vieses cognitivos (bom material para um estágio inteiro)

Vale um estágio de "contra-inteligência": taxa-base neglect, ancoragem, viés de confirmação, fechamento prematuro, viés de disponibilidade. Antídotos: diferencial mínimo de 3 hipóteses, metacognição, *premortem* ("e se este diagnóstico estiver errado — por quê?"). É onde o raciocínio bayesiano encosta na segurança do paciente.
