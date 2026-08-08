import { readFileSync, writeFileSync } from 'fs';

const dataFile = process.argv[2];
const outFile = process.argv[3];
const src = readFileSync(dataFile, 'utf8');
const { CONFIG, ESTAGIOS } = (new Function(src + '\n; return { CONFIG, ESTAGIOS };'))();

const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const rich = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

const chip = (e, i) => `<a class="chip" href="#e${i + 1}"><span class="ce">${esc(e.emoji || '▪')}</span><span class="cn">E${String(i + 1).padStart(2, '0')}</span></a>`;

const bloco = (b, i) => `
      <div class="bloco">
        <div class="bc"><span class="anc">${esc(b.ancora || '▪')}</span>
          <div><div class="seg">Dados_${String(i + 1).padStart(2, '0')}</div>
          <div class="bt">${esc(b.titulo || '')}</div></div></div>
        <p class="btx">${rich(b.texto || '')}</p>
      </div>`;

// Cartão genérico título+itens (usado por ESCORES e EXAMES). `cls` define a cor/ícone via CSS.
const listCard = (obj, cls, ico, kicker) => !obj ? '' : `
      <div class="mcard ${cls}">
        <div class="mck"><span class="mico">${ico}</span><span class="mkk">${esc(kicker)}</span><span class="mtt">${esc(obj.titulo || '')}</span></div>
        <div class="mbody">
          ${(obj.itens || []).map(it => `<div class="mitem"><span class="mdot">▸</span><p>${rich(it)}</p></div>`).join('')}
        </div>
      </div>`;

// Cartão estruturado de PRESCRIÇÃO NA PRÁTICA (droga/dose + passo-a-passo + resgate + não-fazer).
const presc = p => !p ? '' : `
      <div class="mcard presc">
        <div class="mck"><span class="mico">💊</span><span class="mkk">Prescrição // à beira do leito</span><span class="mtt">${esc(p.titulo || 'Prescrição na prática')}</span></div>
        <div class="mbody">
          ${(p.drogas || []).length ? `<div class="drugs">${p.drogas.map(d => `
            <div class="drug">
              <div class="dn">${rich(d.nome || '')}</div>
              <div class="dmeta">${d.apresentacao ? `<span class="dm"><b>Apres.</b> ${rich(d.apresentacao)}</span>` : ''}${d.dose ? `<span class="dm"><b>Dose</b> ${rich(d.dose)}</span>` : ''}${d.via ? `<span class="dm"><b>Via</b> ${rich(d.via)}</span>` : ''}</div>
              ${d.prescricao ? `<div class="drx"><span class="rxk">📝 Prescrição-padrão</span> ${rich(d.prescricao)}</div>` : ''}
            </div>`).join('')}</div>` : ''}
          ${(p.passos || []).length ? `<div class="psec"><div class="pseck pk-do">▶ Passo a passo</div>${p.passos.map((s, i) => `<div class="pstep"><span class="pnum">${i + 1}</span><p>${rich(s)}</p></div>`).join('')}</div>` : ''}
          ${(p.resgate || []).length ? `<div class="psec pk-wrap resg"><div class="pseck pk-resg">🆘 Medidas de resgate</div>${p.resgate.map(s => `<div class="pline"><span class="pmk">↳</span><p>${rich(s)}</p></div>`).join('')}</div>` : ''}
          ${(p.naoFazer || []).length ? `<div class="psec pk-wrap nao"><div class="pseck pk-nao">✕ NÃO faça (se não, dá merda)</div>${p.naoFazer.map(s => `<div class="pline"><span class="pmk xis">✕</span><p>${rich(s)}</p></div>`).join('')}</div>` : ''}
        </div>
      </div>`;

const nerd = n => !n ? '' : `
      <details class="nerd">
        <summary><span class="nico">🔬</span><span class="ns"><span class="nk">Acesso restrito // deep dive</span><span class="nt">${esc(n.titulo || 'Modo Nerd')}</span></span><span class="chev">▸</span></summary>
        <div class="ncorpo">
          ${(n.itens || []).map((it, i) => `<div class="nitem"><span class="nn">[${String(i + 1).padStart(2, '0')}]</span><p>${rich(it)}</p></div>`).join('')}
        </div>
      </details>`;

const caso = c => !c ? '' : `<div class="caso"><div class="ck">🎖️ ${esc(c.titulo || 'Missão final')}</div><div class="ctx">${rich(c.texto || '')}</div></div>`;

const estagio = (e, i) => `
    <section class="estagio" id="e${i + 1}" style="--cor:${esc(e.cor || CONFIG.acento || '#38BDF8')}">
      <div class="codinome">${esc(e.codinome || '')}</div>
      <div class="ecorpo">
        <div class="cab">
          <div class="emoji">${esc(e.emoji || '▪')}</div>
          <div><h2 class="et">${esc(e.titulo || '')}</h2>
          ${e.missao ? `<div class="missao"><span class="ml">Missão:</span> ${rich(e.missao)}</div>` : ''}</div>
        </div>
        ${e.tldr ? `<div class="tldr"><div class="tk">⚡ TL;DR // resumo rápido</div><div class="tv">${rich(e.tldr)}</div></div>` : ''}
        <div class="blocos">${(e.blocos || []).map(bloco).join('')}</div>
        ${listCard(e.escores, 'escores', '📊', 'Escores validados // risco')}
        ${listCard(e.exames, 'exames', '🧪', 'Exames // o que pedir e quando')}
        ${presc(e.prescricao)}
        ${nerd(e.nerd)}
        ${caso(e.caso)}
        <a class="topo" href="#topo">▲ voltar ao topo</a>
      </div>
    </section>`;

const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(CONFIG.tituloApp || 'Aula-Turbo')}</title>
<style>
  :root{--bg:#0a0b0f;--card:#12141a;--linha:#262a33;--txt:#f3f4f7;--suave:#aab0bd;--nerd:#a855f7;
    --azul:#3b82f6;--teal:#14b8a6;--verde:#10b981;--vermelho:#ef4444;--ambar:#f59e0b}
  *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
  body{margin:0;background:var(--bg);color:var(--txt);
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
    font-size:17px;line-height:1.72;letter-spacing:.01em;padding-bottom:56px;-webkit-text-size-adjust:100%}
  strong{color:#fff;font-weight:800}
  a{color:inherit;text-decoration:none}
  header{padding:20px 18px 8px;border-bottom:1px solid var(--linha)}
  .tagline{font-size:10px;letter-spacing:.28em;color:#7c93b8;font-weight:800;font-style:italic;text-transform:uppercase}
  h1{font-size:22px;font-weight:900;letter-spacing:-.02em;margin:4px 0 6px}
  h1 .sub{color:#5c626f;font-weight:400;font-size:13px}
  .intro{color:var(--suave);font-size:13.5px;margin-bottom:14px}
  .chips{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
  @media(min-width:620px){.chips{grid-template-columns:repeat(8,1fr)}}
  .chip{border:2px solid var(--linha);border-radius:11px;padding:9px 4px;display:flex;flex-direction:column;
    align-items:center;gap:3px;background:#0f1116}
  .chip .ce{font-size:18px;line-height:1}
  .chip .cn{font-size:9px;font-weight:900;color:var(--suave);letter-spacing:.02em}
  main{max-width:900px;margin:0 auto;padding:16px 14px 0}
  .estagio{border:1px solid var(--linha);border-radius:15px;overflow:hidden;margin-bottom:16px;
    background:linear-gradient(160deg,rgba(255,255,255,.035),transparent);scroll-margin-top:10px}
  .codinome{display:inline-block;background:var(--cor);color:#000;font-size:10px;font-weight:900;
    padding:6px 11px;letter-spacing:.05em;border-bottom-right-radius:11px}
  .ecorpo{padding:16px 16px 18px;border-left:5px solid var(--cor)}
  .cab{display:flex;gap:13px;align-items:flex-start}
  .emoji{flex-shrink:0;width:58px;height:58px;border:2px solid var(--cor);border-radius:13px;
    display:flex;align-items:center;justify-content:center;font-size:30px;background:rgba(255,255,255,.03)}
  .et{font-size:22px;font-weight:900;letter-spacing:-.02em;line-height:1.15;text-transform:uppercase;font-style:italic;margin:2px 0 0}
  @media(min-width:620px){.et{font-size:27px}}
  .missao{color:var(--suave);font-size:14px;margin-top:9px}
  .missao .ml{font-weight:900;text-transform:uppercase;color:var(--txt)}
  .tldr{margin:16px 0 4px;border-left:4px solid var(--cor);background:rgba(255,255,255,.03);padding:12px 15px;border-radius:0 10px 10px 0}
  .tk{font-size:10px;font-weight:900;color:var(--cor);letter-spacing:.06em;text-transform:uppercase}
  .tv{font-size:18px;font-weight:900;font-style:italic;letter-spacing:-.01em;margin-top:3px}
  .blocos{display:grid;grid-template-columns:1fr;gap:12px;margin:16px 0}
  @media(min-width:620px){.blocos{grid-template-columns:1fr 1fr}}
  .bloco{border:1px solid var(--linha);border-radius:12px;padding:15px;background:rgba(255,255,255,.012)}
  .bc{display:flex;gap:11px;align-items:flex-start;margin-bottom:7px}
  .anc{font-size:26px;line-height:1;flex-shrink:0}
  .seg{font-size:9px;font-weight:900;color:#4a4f5a;letter-spacing:.16em;text-transform:uppercase}
  .bt{font-size:15px;font-weight:900;text-transform:uppercase;letter-spacing:-.01em;margin-top:2px}
  .btx{font-size:15px;color:#d2d6de;margin:0}
  /* ---- Cartões clínicos (escores / exames / prescrição) ---- */
  .mcard{border:1px solid var(--linha);border-radius:12px;margin-bottom:14px;overflow:hidden;background:rgba(255,255,255,.015)}
  .mcard .mck{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:12px 15px;border-bottom:1px solid var(--linha)}
  .mico{width:34px;height:34px;flex-shrink:0;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px;border:1px solid var(--mc,#3b82f6)}
  .mkk{font-size:9.5px;font-weight:900;letter-spacing:.11em;text-transform:uppercase;color:var(--mc,#3b82f6)}
  .mtt{flex-basis:100%;font-size:15px;font-weight:900;font-style:italic;text-transform:uppercase;letter-spacing:-.01em}
  .mbody{padding:10px 15px 14px}
  .mitem{display:flex;gap:9px;align-items:flex-start;padding:5px 0}
  .mdot{color:var(--mc,#3b82f6);font-weight:900;margin-top:2px;flex-shrink:0}
  .mitem p{margin:0;font-size:14.5px;color:#dfe3ea}
  .mcard.escores{--mc:var(--azul)}
  .mcard.escores{border-color:rgba(59,130,246,.32);background:rgba(59,130,246,.06)}
  .mcard.exames{--mc:var(--teal)}
  .mcard.exames{border-color:rgba(20,184,166,.32);background:rgba(20,184,166,.06)}
  /* Prescrição */
  .mcard.presc{--mc:var(--verde);border-color:rgba(16,185,129,.34);background:rgba(16,185,129,.05)}
  .drugs{display:grid;grid-template-columns:1fr;gap:9px;margin-bottom:6px}
  .drug{border:1px solid rgba(255,255,255,.09);border-radius:10px;padding:10px 12px;background:rgba(0,0,0,.18)}
  .dn{font-size:15px;font-weight:900;color:#fff}
  .dmeta{display:flex;flex-wrap:wrap;gap:6px 14px;margin-top:4px}
  .dm{font-size:13px;color:#cdd3dc}
  .dm b{color:var(--verde);font-weight:800;text-transform:uppercase;font-size:10px;letter-spacing:.05em;margin-right:2px}
  .drx{margin-top:7px;font-size:13.5px;color:#e7f5ee;background:rgba(16,185,129,.09);border-left:3px solid var(--verde);padding:6px 10px;border-radius:0 7px 7px 0}
  .rxk{display:block;font-size:9.5px;font-weight:900;letter-spacing:.06em;text-transform:uppercase;color:#34d399;margin-bottom:1px}
  .psec{margin-top:11px}
  .pseck{font-size:10px;font-weight:900;letter-spacing:.06em;text-transform:uppercase;margin-bottom:5px}
  .pk-do{color:#34d399}
  .pstep{display:flex;gap:10px;align-items:flex-start;padding:3px 0}
  .pnum{flex-shrink:0;width:20px;height:20px;border-radius:50%;background:var(--verde);color:#04140d;font-size:11px;font-weight:900;display:flex;align-items:center;justify-content:center;margin-top:2px}
  .pstep p{margin:0;font-size:14px;color:#e2e7ee}
  .pk-wrap{border-radius:10px;padding:10px 12px}
  .resg{background:rgba(245,158,11,.08);border:1px solid rgba(245,158,11,.3)}
  .pk-resg{color:var(--ambar)}
  .nao{background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.32)}
  .pk-nao{color:#f87171}
  .pline{display:flex;gap:9px;align-items:flex-start;padding:3px 0}
  .pmk{flex-shrink:0;font-weight:900;color:var(--ambar);margin-top:1px}
  .pmk.xis{color:#f87171}
  .pline p{margin:0;font-size:14px;color:#e2e7ee}
  /* Modo nerd */
  .nerd{border:2px dashed rgba(168,85,247,.42);background:rgba(168,85,247,.07);border-radius:12px;margin-bottom:14px;overflow:hidden}
  .nerd>summary{list-style:none;cursor:pointer;padding:14px 15px;display:flex;align-items:center;gap:11px}
  .nerd>summary::-webkit-details-marker{display:none}
  .nico{width:40px;height:40px;flex-shrink:0;border:1px solid var(--nerd);border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:19px}
  .ns{display:flex;flex-direction:column;flex:1}
  .nk{font-size:10px;font-weight:900;color:#c084fc;letter-spacing:.13em;text-transform:uppercase}
  .nt{font-size:14.5px;font-weight:900;font-style:italic;text-transform:uppercase;letter-spacing:-.01em;margin-top:2px}
  .chev{color:#c084fc;font-size:18px;transition:transform .2s}
  .nerd[open] .chev{transform:rotate(90deg)}
  .ncorpo{padding:2px 15px 16px;border-top:1px solid rgba(168,85,247,.2)}
  .nitem{display:flex;gap:11px;align-items:flex-start;border-left:2px solid rgba(168,85,247,.35);padding:6px 0 6px 13px;margin-top:11px}
  .nn{font-size:10px;font-weight:900;color:var(--nerd);margin-top:3px;flex-shrink:0}
  .nitem p{margin:0;font-size:14px;color:#e6d8f6}
  .caso{border:1px solid var(--linha);border-radius:12px;padding:15px;margin-bottom:14px;background:rgba(255,255,255,.02)}
  .ck{font-size:10px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;color:var(--cor)}
  .ctx{font-size:15px;color:#d2d6de;margin-top:6px}
  .topo{display:inline-block;font-size:11px;font-weight:800;color:var(--suave);text-transform:uppercase;letter-spacing:.08em;opacity:.7}
  footer{max-width:900px;margin:0 auto;padding:22px 16px;border-top:1px solid var(--linha);
    color:#7a828f;font-size:12px;line-height:1.6;letter-spacing:.01em}
  footer .r{color:#f59e0b;font-weight:800;letter-spacing:.06em;text-transform:uppercase;font-size:10px;margin-bottom:6px}
  footer .l2{margin-top:6px;color:#5c626f;font-size:11px}
</style>
</head>
<body>
  <a id="topo"></a>
  <header>
    <div class="tagline">${esc(CONFIG.tagline || '')}</div>
    <h1>${esc(CONFIG.tituloApp || '')} <span class="sub">${esc(CONFIG.subtitulo || '')}</span></h1>
    <div class="intro">Cada estágio é uma fase. Toque nos números para pular. Abra o <b>🔬 Modo Nerd</b> para a profundidade técnica.</div>
    <nav class="chips">${ESTAGIOS.map(chip).join('')}</nav>
  </header>
  <main>
${ESTAGIOS.map(estagio).join('\n')}
  </main>
  <footer>
    <div class="r">${esc(CONFIG.rodape?.r || 'Aviso')}</div>
    <div>${esc(CONFIG.rodape?.l1 || '')}</div>
    <div class="l2">${esc(CONFIG.rodape?.l2 || '')}</div>
  </footer>
</body>
</html>`;

writeFileSync(outFile, html, 'utf8');
console.log(outFile, 'gerado (estático, sem JS) —', html.length, 'bytes,', ESTAGIOS.length, 'estágios');
