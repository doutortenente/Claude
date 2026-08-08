# Guia do app interativo (e do Markdown gêmeo)

## Regra de ouro do formato: HTML ESTÁTICO por padrão

A pré-visualização de arquivos no **app do celular normalmente não executa JavaScript**. Por isso, um "joguinho" que dependa de JS para montar a tela aparece **travado/bugado** ali. A solução é gerar **HTML estático**: todo o conteúdo já vem escrito no arquivo, e a única interação (abrir/fechar o Modo Nerd) usa o elemento nativo `<details>`, que funciona **sem JavaScript** em qualquer navegador ou pré-visualização.

**Portanto: gere o app com o gerador estático.** Não escreva HTML na mão nem use o template JS como padrão.

## Como montar o app (caminho padrão)

1. Copie `assets/modelo-dados.js` e preencha **`CONFIG`** e **`ESTAGIOS`** com o seu conteúdo (esquema abaixo).
2. Rode o gerador:

   ```bash
   node scripts/gerar-html.mjs  meus-dados.js  saida.html
   ```

   Ele produz um HTML **estático, autossuficiente, sem JS**, com o visual gamificado (estágios, TL;DR, blocos com emoji-âncora, Modo Nerd em `<details>`, navegação por âncoras, rodapé). Base pronta e testada.
3. Faça a checagem de qualidade (abaixo) e entregue.

Por que assim: zero dependências, zero build, abre offline e **renderiza mesmo sem JavaScript** — que é exatamente onde os apps quebravam.

## Esquema dos dados

### `CONFIG`
```js
const CONFIG = {
  tagline: "TOP SECRET // PROTOCOLO X",  // etiqueta pequena do topo
  tituloApp: "NOME.OPS",                  // codinome curto do jogo
  subtitulo: "/tema_v1",                  // sufixo discreto
  acento: "#38BDF8",                       // cor de acento (hex)
  rodape: { r: "// RODAPÉ", l1: "linha 1", l2: "© ..." },
};
```

### `ESTAGIOS` (lista de 5 a 8)
```js
{
  codinome: "ESTÁGIO 02 // RECONHECIMENTO",
  titulo: "Nome do conceito",
  emoji: "🎯",                 // âncora visual do estágio
  cor: "#F59E0B",              // cor deste estágio
  tldr: "Uma frase impactante.",
  missao: "O que dominar aqui.",
  blocos: [                    // 3 a 5; cada texto 2–3 linhas, **negrito** nos termos-chave
    { ancora: "🔍", titulo: "O que é", texto: "..." },
  ],
  nerd: {                      // obrigatório
    titulo: "Aprofundamento técnico",
    itens: ["Item com **jargão** real.", "**Referência**: Autor. Revista. Ano."],
  },
  caso: { titulo: "Missão final", texto: "Opcional: caso real." }, // pode omitir
}
```

### Blocos clínicos opcionais (fortes em tema médico)

Três campos extras por estágio, todos opcionais. Em conteúdo clínico, procure usá-los — são o que transforma a aula num guia de plantão (ver `modo-medico.md`). Ordem de render: `blocos → escores → exames → prescricao → nerd → caso`.

```js
// 📊 ESCORES VALIDADOS (azul) — mesma forma de `nerd`: {titulo, itens[]}
escores: {
  titulo: "Escores que mudam a conduta",
  itens: [
    "**Child-Pugh**: A 5–6 · B 7–9 · C 10–15.",
    "**MELD 3.0** (bili, INR, Cr, Na, alb, sexo): prioriza transplante.",
  ],
},

// 🧪 EXAMES — o que pedir e QUANDO (teal): {titulo, itens[]}
exames: {
  titulo: "O que pedir e quando",
  itens: [
    "**Paracentese diagnóstica** — na admissão de toda ascite nova/descompensação.",
    "**Lactato** — se instável; repetir para ver clareamento.",
  ],
},

// 💊 PRESCRIÇÃO NA PRÁTICA (verde) — bloco estruturado; todos os campos opcionais
prescricao: {
  titulo: "Prescrição na prática",
  drogas: [ // um "cartão" por droga: nome + apresentação/dose/via + linha pronta p/ copiar
    { nome: "Ceftriaxona", apresentacao: "1 g FA", dose: "1 g 24/24h", via: "IV",
      prescricao: "Ceftriaxona 1 g IV 1x/dia por 5–7 dias." },
  ],
  passos:   ["O COMO FAZER, passo a passo, na ordem."],   // lista numerada verde
  resgate:  ["Plano B se falhar (âmbar)."],                // o que fazer se não responder
  naoFazer: ["**Não** faça X — porque Y (vermelho)."],     // armadilhas: o que evita dar merda
},
```

Notas:
- Use `**texto**` para negrito em qualquer campo — o gerador converte para `<strong>`. O gerador **não** faz itálico com `*` simples: escreva nomes de revista sem asterisco (`J Hepatol`, não `*J Hepatol*`), senão o asterisco aparece cru.
- O gerador já escapa `<`, `>` e `&`, então pode escrever fórmulas como "doses >4 mg/kg/h" à vontade.
- O primeiro estágio é o "briefing" (fisga); o último, a "missão final" (caso). Ver `pedagogia.md`.

## Checagem de qualidade (faça antes de entregar)

Prove que funciona **sem JavaScript** (é o cenário do celular). Com navegador headless:

```js
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const b = await chromium.launch();
const ctx = await b.newContext({ viewport:{width:390,height:844}, javaScriptEnabled:false }); // JS OFF
const p = await ctx.newPage();
await p.goto('file://' + process.argv[2], { waitUntil:'load' });
console.log('estágios:', await p.locator('.estagio').count(),
            '| modo nerd:', await p.locator('details.nerd').count());
await b.close();
```

Espere ver todos os estágios e os `details.nerd` **mesmo com JS desligado**. Se não tiver navegador, releia o arquivo de dados procurando vírgula/aspas faltando e `**` sem par.

## Mobile e acessibilidade

O gerador já entrega mobile-first: coluna única, fonte confortável (≈17px), espaçamento generoso (amigável a dislexia), navegação por toque (âncoras) e áreas de toque grandes. Só cuide para os textos não virarem "paredão".

## O Markdown gêmeo

Entregue **sempre** junto, salvo pedido em contrário. Mesma estrutura, em formato de leitura. Modelo:

```markdown
# 🎮 [TEMA] — Missão de Aprendizado

> **Como jogar:** cada estágio é uma fase. Leia o TL;DR, avance pelos blocos,
> e abra o **Modo Nerd** para a profundidade técnica.

---

## 🧠 ESTÁGIO 01 // BRIEFING — [Título]

> ⚡ **TL;DR:** [frase impactante]
>
> 🎯 **Missão:** [o que dominar]

**⚡ [Bloco]**
[2–3 linhas com **negrito**.]

<details>
<summary>🔬 <b>MODO NERD — [subtítulo]</b></summary>

- **[Termo]:** [explicação].
- **Referência:** Autor. Revista. Ano.

</details>

---
[...repete...]
```

## Versão interativa em JavaScript (OPCIONAL — só navegador)

Existe um template com jogo em JS (barra de progresso animada, botões "confirmar missão", calculadora bayesiana ao vivo) em `assets/modelo-app.html`. Ele é mais rico, mas **só funciona em navegador de verdade com JS** — pode aparecer travado na pré-visualização do celular. Ofereça-o apenas quando o usuário for abrir num navegador/desktop, e **sempre** entregue também a versão estática. Para temas de diagnóstico, a calculadora bayesiana vive nesse template (ver `modo-medico.md`).

## Variante React (só se pedirem)

Para colar num projeto de código (estilo "material 1", `App.jsx` + Tailwind + lucide-react): mesmo esquema `ESTAGIOS`, `useState`, classes Tailwind. Nunca use `localStorage`/`sessionStorage`.
