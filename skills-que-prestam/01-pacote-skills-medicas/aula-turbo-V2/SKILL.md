---
name: aula-turbo
description: >-
  Transforma conteúdo complexo (artigo, guideline, paper, tema, conceito
  difícil) num "joguinho" de aprendizado: um app web gamificado
  (estágios/missões, TL;DR, âncoras com emoji, "Modo Nerd" técnico) MAIS um
  Markdown gêmeo pra ler. Superfície clara de "criança de 12 anos brilhante" e
  núcleo de especialista (técnica de Feynman), amigável a TDAH e dislexia.
  USE SEMPRE que pedirem para explicar, ensinar, resumir, "me ajuda a
  entender", "me explica", destrinchar, estudar, revisar ou aprender um tema —
  ou "virar joguinho/jogo/aula/flashcard/interativo" — mesmo sem dizer "skill".
  Forte em tema médico/UTI: raciocínio bayesiano (pré-teste, sensibilidade,
  especificidade, LR, Fagan) com calculadora embutida e — pesquisando
  guidelines/PubMed ANTES de escrever — blocos de "prescrição na prática"
  (droga, apresentação, dose, prescrição-padrão, passo a passo, resgate, o que
  NÃO fazer), "exames" (o que pedir e quando) e "escores validados"
  (Child-Pugh, MELD, SOFA…).
---

# Aula-Turbo 🎮

Pega um assunto difícil e devolve um **jogo de aprendizado** que prende a atenção e ainda assim entrega profundidade real. Feito para uma mente que aprende melhor quando o conteúdo vira missão — sem abrir mão do rigor.

## O que você entrega

Por padrão, **dois arquivos** (só entregue um se o usuário pedir explicitamente):

1. **App (HTML estático)** — um HTML autossuficiente **sem JavaScript** (zero dependências, abre no celular, na pré-visualização e offline). É o "joguinho". Sem JS porque a pré-visualização mobile costuma não rodar script — e aí o app aparece "bugado".
2. **Documento Markdown gêmeo** — o mesmo conteúdo em texto formatado, pra ler, revisar ou imprimir.

## O princípio que rege TUDO (leia antes de escrever)

**Técnica de Feynman: superfície simples, núcleo profundo.**

Explique como se o leitor fosse uma **criança de 12 anos brilhante e curiosa** — mas lembre que o leitor real é um **especialista** (médico intensivista). Isso significa:

- A superfície **nunca infantiliza os fatos**. Ela torna a explicação **vívida e concreta**: analogias, imagens mentais, exemplos do dia a dia, uma ideia de cada vez.
- A **profundidade técnica real** mora no **"Modo Nerd"** de cada estágio: jargão de verdade, fórmulas, mecanismos "por baixo dos panos" e referências primárias.
- **Nunca invente** números, doses, valores de LR, prevalências ou citações. Em tema técnico/médico, **pesquise e verifique antes de escrever**. Precisão vale mais que brilho.

Por que isso importa: quem precisa de clareza extrema não é limitado — está usando o método mais poderoso que existe para fixar conhecimento. A embalagem é lúdica; o conteúdo é sério.

## Fluxo de trabalho

0. **Capte o material.** O usuário pode colar texto, anexar um arquivo (leia-o) ou dar só o tema. Se der só o tema e for técnico, você mesmo levanta o conteúdo.
1. **PESQUISE ANTES DE ESCREVER (não é opcional em tema clínico).** Antes de redigir uma linha de conteúdo médico, consulte guidelines e PubMed/literatura e confira números, doses, escores, cortes e referências. Não escreva "de cabeça" e conserte depois — pesquise primeiro, escreva depois. O leitor é intensivista e vai usar isso à beira do leito. Como pesquisar e o que travar: `references/modo-medico.md`.
2. **Estruture em ESTÁGIOS** (missões) com arco narrativo — do briefing à "missão final". Quantos, que arco e que tom: `references/pedagogia.md`.
3. **Escreva cada estágio** seguindo as regras cognitivas (dislexia + TDAH + altas habilidades): `references/pedagogia.md`.
4. **Monte o app (HTML estático).** Copie `assets/modelo-dados.js`, preencha `CONFIG` e `ESTAGIOS`, e rode `node scripts/gerar-html.mjs seus-dados.js saida.html`. Sai um HTML **sem JavaScript** que abre até na pré-visualização do celular. Esquema (incluindo os blocos `escores`, `exames` e `prescricao`), geração e checagem: `references/app-interativo.md`.
5. **Se for clínico, ative o Modo Médico.** Em tema de UTI/decisão, cada patologia deve trazer os blocos que o intensivista usa no plantão — **escores validados**, **exames (o que pedir e quando)** e **prescrição na prática** (droga, dose, passo a passo, resgate, o que NÃO fazer) — além de cobrir as **entidades adjacentes** que costumam vir junto. Tudo em `references/modo-medico.md`.
6. **Gere o Markdown gêmeo** — mesma estrutura de estágios, em formato de leitura (modelo em `references/app-interativo.md`).
7. **Entregue os dois arquivos** com `SendUserFile`. Se for algo que o usuário vai reabrir (guia de estudo, referência), ofereça persistir o HTML como artifact.

## Regras de ouro (resumo — o detalhe está em pedagogia.md)

- **Emoji-âncora** no começo de cada conceito. Parágrafos de **no máximo 2–3 linhas**. **Negrito** nos termos-chave. Listas para quebrar blocos.
- Cada estágio abre com um **TL;DR** de uma frase impactante. Tom **enérgico, de videogame**.
- **"Modo Nerd" obrigatório** em cada estágio: jargão real, mecanismo, fórmula, referências verificadas.
- **Não infantilize os fatos.** Explique o **porquê** e o **como**, nunca só o "o quê".
- **Voz natural, sem cara de IA nem firula.** O jogo é divertido na mecânica (estágios, missões), não em cosplay brega. Fuja de clichê de robô, "TOP SECRET", copyright cafona no rodapé e emoji decorativo. O rodapé é só um **aviso clínico enxuto + as fontes** (ver `CONFIG.rodape` no modelo) — nada além disso.

## Checklist antes de entregar

- [ ] Você **pesquisou guidelines/PubMed ANTES** de escrever (tema clínico)?
- [ ] O HTML renderiza **sem JavaScript**? (teste headless com `javaScriptEnabled:false` — é o cenário do celular)
- [ ] Todo estágio tem TL;DR **e** Modo Nerd?
- [ ] Em tema clínico: as patologias trazem **escores**, **exames (o que pedir e quando)** e **prescrição na prática** (com passo a passo, resgate e "o que NÃO fazer")?
- [ ] As drogas **lideram com o agente disponível no meio do leitor** (contexto BR), com o clássico do trial só como nota?
- [ ] Você cobriu as **entidades adjacentes** esperadas (as que aparecem junto no mesmo paciente)?
- [ ] Números, doses, escores e citações **verificados** (não inventados)?
- [ ] Nenhum parágrafo virou "paredão" de texto?
- [ ] Rodapé **limpo** (aviso + fontes), sem firula brega?
- [ ] Funciona no **celular** (coluna única, botões grandes)?
- [ ] O **Markdown gêmeo** foi entregue junto?

## Arquivos desta skill

- `references/pedagogia.md` — o motor pedagógico: regras de dislexia/TDAH/altas habilidades, tom, arquitetura de estágios, o Modo Nerd, anti-padrões. **Leia sempre.**
- `references/app-interativo.md` — como preencher `assets/modelo-app.html`, esquema dos dados, notas de mobile/acessibilidade, o modelo do Markdown gêmeo, e como gerar a variante React se pedirem.
- `references/modo-medico.md` — superpoderes clínicos: raciocínio bayesiano, escores, red flags, conduta e a **disciplina de verificação de fatos**. Leia quando o tema for médico.
- `scripts/gerar-html.mjs` — o gerador: transforma seu arquivo de dados em HTML estático (sem JS). Use sempre. `node scripts/gerar-html.mjs dados.js saida.html`.
- `assets/modelo-dados.js` — o esqueleto de dados (CONFIG + ESTAGIOS) para copiar e preencher.
- `assets/modelo-app.html` — versão interativa **opcional** em JavaScript (barra de progresso, calculadora bayesiana). Só funciona em navegador com JS; **pode aparecer bugada na pré-visualização do celular**. Use apenas a pedido, sempre além da versão estática.
