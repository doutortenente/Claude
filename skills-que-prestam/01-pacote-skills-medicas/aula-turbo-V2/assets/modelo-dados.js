/* ============================================================================
   AULA-TURBO — ARQUIVO DE DADOS DO JOGUINHO
   ----------------------------------------------------------------------------
   Preencha CONFIG e ESTAGIOS abaixo. Depois rode o gerador:

     node scripts/gerar-html.mjs  <este-arquivo>.js  <saida>.html

   Ele produz um HTML ESTÁTICO (zero JavaScript) que abre em qualquer lugar —
   inclusive na pré-visualização do celular, onde apps com JS costumam falhar.
   O "Modo Nerd" abre/fecha com recurso nativo do navegador (<details>).

   Regras de conteúdo: references/pedagogia.md (e modo-medico.md se for clínico).
   ============================================================================ */

const CONFIG = {
  // Etiqueta pequena do topo. Mantenha limpa e profissional — NADA de "TOP SECRET",
  // "PROTOCOLO_ALPHA", copyright cafona ou cosplay de espião. Ex.: "GUIA DE BOLSO · UTI".
  tagline: "GUIA DE BOLSO · UTI",
  tituloApp: "TEMA DA AULA",        // nome do tema (aparece grande no topo)
  subtitulo: "manejo na prática",   // sufixo discreto
  acento: "#38BDF8",                // cor de acento (hex)
  // Rodapé: aviso clínico enxuto + fontes. Sem branding brega.
  rodape: {
    r: "Aviso",
    l1: "Conteúdo de apoio ao estudo/decisão — não substitui juízo clínico à beira do leito nem o protocolo da sua instituição. Confira doses antes de prescrever.",
    l2: "Fontes: [guidelines usadas, com ano]. Atualizado [mês/ano].",
  },
};

const ESTAGIOS = [
  {
    codinome: "ESTÁGIO 01 // BRIEFING",
    titulo: "Título do estágio",
    emoji: "🧠",                                  // âncora visual (escolha um que signifique a ideia)
    cor: "#38BDF8",                               // cor deste estágio
    tldr: "Uma frase impactante que resume tudo em 1 linha.",
    missao: "O que a pessoa vai dominar aqui, em uma frase.",
    blocos: [                                     // 3 a 5 blocos; cada texto com 2–3 linhas
      { ancora: "⚡", titulo: "Ideia central", texto: "Parágrafo curto com **negrito** nos termos-chave. Uma ideia por bloco." },
      { ancora: "🎯", titulo: "Por que importa", texto: "Explique o **porquê** com uma analogia concreta antes de qualquer abstração." },
      { ancora: "🔍", titulo: "Como funciona", texto: "Mostre o mecanismo por baixo dos panos, ainda simples." },
      { ancora: "💥", titulo: "O que dá errado", texto: "O erro clássico que este conceito evita." },
    ],
    nerd: {                                       // obrigatório: profundidade técnica + referências
      titulo: "Arquivo confidencial — aprofundamento técnico",
      itens: [
        "Aqui entra o **jargão real**, fórmulas e mecanismos de especialista.",
        "**Referência**: Autor. Revista. Ano. (verificada, nunca inventada)",
      ],
    },
    // caso: { titulo: "Missão final", texto: "Opcional: um caso real para aplicar tudo." },
  },

  // ==========================================================================
  // EXEMPLO CLÍNICO — mostra os TRÊS blocos extras (escores / exames / prescricao).
  // Todos são OPCIONAIS, mas em tema médico procure incluí-los (ver modo-medico.md).
  // A ordem de render é: blocos → escores → exames → prescricao → nerd → caso.
  // ==========================================================================
  {
    codinome: "ESTÁGIO 02 // CONDUTA",
    titulo: "Nome da condição",
    emoji: "🩺",
    cor: "#EF4444",
    tldr: "Resumo de 1 linha da conduta.",
    missao: "O que dominar aqui.",
    blocos: [
      { ancora: "⚡", titulo: "Ideia central", texto: "Conceito com **negrito**." },
    ],

    // 📊 ESCORES VALIDADOS — {titulo, itens[]}. Sempre que houver escore que muda conduta.
    escores: {
      titulo: "Escores que mudam a conduta",
      itens: [
        "**Child-Pugh** (bili, albumina, INR, ascite, EH): A 5–6 · B 7–9 · C 10–15.",
        "**MELD 3.0** (bili, INR, Cr, Na, albumina, sexo): prioriza transplante / prevê mortalidade em 90 dias.",
      ],
    },

    // 🧪 EXAMES — {titulo, itens[]}. O QUE pedir e QUANDO (gatilho temporal explícito).
    exames: {
      titulo: "O que pedir e quando",
      itens: [
        "**Exame X** — na admissão de todo caso suspeito; repetir se [gatilho].",
        "**Exame Y** — só se [condição]; não peça de rotina.",
      ],
    },

    // 💊 PRESCRIÇÃO NA PRÁTICA — bloco estruturado. Campos todos opcionais:
    //   drogas[]  → {nome, apresentacao, dose, via, prescricao (linha pronta p/ copiar)}
    //   passos[]  → o COMO FAZER, passo a passo, na ordem
    //   resgate[] → o que fazer se falhar / plano B
    //   naoFazer[]→ armadilhas: o que NÃO fazer (aparece em vermelho)
    prescricao: {
      titulo: "Prescrição na prática",
      drogas: [
        { nome: "Droga exemplo", apresentacao: "amp 10 mg/mL", dose: "0,05 µg/kg/min", via: "IV BIC",
          prescricao: "Droga 10 mg + SF 100 mL, iniciar a X mL/h e titular." },
      ],
      passos: [
        "Passo 1: o que fazer primeiro.",
        "Passo 2: em seguida, com o alvo objetivo.",
      ],
      resgate: [
        "Se não responder em [tempo]: [medida de resgate].",
      ],
      naoFazer: [
        "**Não** faça [erro perigoso] — porque [consequência].",
      ],
    },

    nerd: {
      titulo: "Aprofundamento técnico",
      itens: ["**Mecanismo** e **referência** verificada. Autor. Revista. Ano."],
    },
    caso: { titulo: "Missão final", texto: "Caso real para aplicar tudo." },
  },

  // ... repita o padrão. 5 a 8 estágios é o ideal.
  // O primeiro é o "briefing" (fisga); o último, a "missão final" (caso real).
];
