#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_passagem.py — Motor determinístico da passagem de plantão (UTI adulto)
============================================================================
Comando Tático UCI — Dr. Nicolas. Zero erro aritmético: o LLM NÃO faz conta, este script faz.

POR QUE ESTE SCRIPT EXISTE
  O LLM lê a letra da enfermagem muito bem, mas erra CONTA e CLASSIFICAÇÃO
  (ex.: contou diurese como ingesta; somou o balanço errado). Aqui a conta é
  travada: balanço = Σ ganhos − Σ perdas, com dicionário canônico que impede
  diurese/SNG/dreno de caírem no lado do ganho.

REGRA DE OURO (zero alucinação):
  - Item de balanço com nome fora do dicionário => NÃO entra no cálculo; vira warning.
  - Vital sem valor => aparece como "?" no bloco; nunca é inventado.
  - Se a extração marcar a categoria errada (diurese como ganho), o script
    RECLASSIFICA pela CANON e registra o conserto em `warnings`.

USO:
  python3 build_passagem.py --demo                 # caso de validação (inclui o bug clássico)
  python3 build_passagem.py --file leito.json      # 1 leito ou {"meta":..,"leitos":[..]}
  echo '{...}' | python3 build_passagem.py         # stdin
  python3 build_passagem.py --json '{...}'

ENTRADA (JSON). Um leito:
  {
    "leito": "01", "iniciais": "VLC", "dia_internacao": "5º",
    "sup_o2": "AA", "dieta": "geral hipossódica + Nutren Senior",
    "vitais": {                       # cada vital: lista horária OU {"max":..,"min":..}
      "PAS": [139,128,...],  "PAD": {"max":84,"min":59}, "FC":[...], ...
    },
    "ganhos": [ {"nome":"dieta","ml":600}, {"nome":"soro EV","ml":430} ],
    "perdas": [ {"nome":"diurese","ml":1100} ],
    "evacuacao": "ausente no período",
    # seções de PROSA (vêm do LLM/texto, o script só costura — não calcula):
    "terapias": "NEURO: ...\nCV: ...",
    "exame_fisico": "Neurológico: ...",
    "evolucao": "Manejo IC ...",
    "impressao": ["IC aguda, estável ...", "DRC agudizada, em melhora ..."],
    "conduta": ["CV/Renal: ...", "Endócrino: ..."]
  }
  Vários leitos: {"meta":{"unidade":"UTI 4","data":"27/06/2026","turno":"diurno",
                          "janela":"6–18 h"}, "leitos":[ {...}, {...} ]}
"""
import sys, json, argparse

# ── Dicionário canônico de balanço hídrico ─────────────────────────────────
# chave = radical em minúsculo (casa por "começa com" / "contém"); valor = categoria.
CANON = {
    # GANHOS (entra líquido no paciente)
    "dieta": "ganho", "nutren": "ganho", "diamax": "ganho", "proline": "ganho",
    "nutri": "ganho", "tne": "ganho", "npt": "ganho", "enteral": "ganho",
    "agua": "ganho", "água": "ganho", "hidrat": "ganho", "soro": "ganho",
    "sf": "ganho", "sg": "ganho", "ringer": "ganho", "ev": "ganho",
    "endovenoso": "ganho", "bomba": "ganho", "bic": "ganho", "dil": "ganho",
    "diluic": "ganho", "medicac": "ganho", "hemocomp": "ganho", "ch": "ganho",
    "plasma": "ganho", "albumina": "ganho", "ingesta": "ganho", "vo": "ganho",
    # PERDAS (sai líquido do paciente)
    "diurese": "perda", "diur": "perda", "urina": "perda", "svd": "perda",
    "sng": "perda", "gastric": "perda", "residuo": "perda", "resíduo": "perda",
    "dreno": "perda", "penrose": "perda", "torax": "perda", "tórax": "perda",
    "evacuac": "perda", "evacuação": "perda", "fezes": "perda", "fistula": "perda",
    "fístula": "perda", "vomito": "perda", "vômito": "perda", "emese": "perda",
    "sonda": "perda", "aspirado": "perda", "sangramento": "perda",
}

# ── Limiares de flag por vital (derivados do formato de passagem em uso) ────
# comparador: "lt" = flag se valor < ref ; "gt" = flag se valor > ref
LIMIARES = {
    "PAS":  [("lt", 90,  "< 90")],
    "PAD":  [("lt", 50,  "< 50")],
    "PAM":  [("lt", 65,  "< 65")],
    "FC":   [("gt", 100, "> 100")],
    "FR":   [("gt", 20,  "> 20")],
    "SpO2": [("lt", 92,  "< 92")],
    "TAX":  [("lt", 35.5, "< 35,5"), ("gt", 37.8, "> 37,8")],
    "Dx":   [("lt", 70,  "< 70"),   ("gt", 180,  "> 180")],
}
UNID = {"PAS":"mmHg","PAD":"mmHg","PAM":"mmHg","FC":"bpm","FR":"rpm",
        "SpO2":"%","TAX":"ºC","Dx":"mg/dl"}
# ordem de exibição
ORDEM_VITAIS = ["PAS","PAD","PAM","FC","FR","SpO2","TAX","Dx"]


def _fmt(n):
    """Inteiro sem casa; decimal com vírgula (padrão clínico BR)."""
    if n is None:
        return "?"
    if isinstance(n, float) and not n.is_integer():
        return f"{n:.1f}".replace(".", ",")
    return str(int(round(n)))


def classify(nome):
    """Categoria canônica de um item de balanço, ou None se desconhecido."""
    s = str(nome).strip().lower()
    for radical, cat in CANON.items():
        if s.startswith(radical) or radical in s:
            return cat
    return None


def calc_balanco(ganhos, perdas):
    """
    Soma determinística. Reclassifica cada item pela CANON — se a extração
    marcou do lado errado (diurese em ganhos), corrige e avisa.
    Retorna: dict(ganho_total, perda_total, balanco, itens_ganho, itens_perda, warnings)
    """
    warnings, g_total, p_total, it_g, it_p = [], 0.0, 0.0, [], []
    def _consumir(itens, lado_informado):
        nonlocal g_total, p_total
        for it in (itens or []):
            nome = it.get("nome", "?")
            serie = it.get("serie")
            if serie is not None:                      # células horárias cruas → o SCRIPT soma (não a enfermagem)
                ileg = sum(1 for v in serie if isinstance(v, str))
                cells = [float(v) for v in serie if isinstance(v, (int, float))]
                ml = sum(cells)
                if ileg:
                    warnings.append(f"'{nome}': {ileg} célula(s) ilegível(is) — soma pode subestimar, revisar folha")
            else:
                ml = it.get("ml", None)
            if ml is None:
                warnings.append(f"item '{nome}' sem volume (ml) — ignorado no cálculo")
                continue
            ml = float(ml)
            cat = classify(nome)
            if cat is None:
                warnings.append(f"item '{nome}' não reconhecido no dicionário — NÃO somado (revisar)")
                continue
            if cat != lado_informado:
                warnings.append(
                    f"RECLASSIFICADO: '{nome}' veio como {lado_informado.upper()}, "
                    f"é {cat.upper()} pela regra — corrigido")
            if cat == "ganho":
                g_total += ml; it_g.append((nome, ml))
            else:
                p_total += ml; it_p.append((nome, ml))
    _consumir(ganhos, "ganho")
    _consumir(perdas, "perda")
    return {
        "ganho_total": g_total, "perda_total": p_total,
        "balanco": g_total - p_total,
        "itens_ganho": it_g, "itens_perda": it_p, "warnings": warnings,
    }


def resumo_vital(nome, dados):
    """
    dados: lista de valores horários  OU  {"max":..,"min":..}.
    Retorna (max, min, n_flags_por_ref) — n_flags exato só quando há lista.
    """
    limiares = LIMIARES.get(nome, [])
    flags = []
    if isinstance(dados, dict):
        vmax, vmin = dados.get("max"), dados.get("min")
        vals = [v for v in (vmax, vmin) if v is not None]
        exato = False
    else:
        vals = [float(v) for v in dados if v is not None]
        vmax = max(vals) if vals else None
        vmin = min(vals) if vals else None
        exato = True
    for comp, ref, label in limiares:
        if not vals:
            continue
        hits = sum(1 for v in vals if (v < ref if comp == "lt" else v > ref))
        if hits:
            flags.append(f"[{hits}x {label}]" if exato else f"[≥1x {label}]")
    return vmax, vmin, flags


def render_leito(leito, meta):
    L = []
    ini = leito.get("iniciais", "?")
    n   = leito.get("leito", "?")
    dh  = leito.get("dia_internacao", "?")
    cab = f"LEITO {n} — {ini} — DH {dh}"
    if meta.get("data") or meta.get("turno"):
        cab += f" — {meta.get('data','')} {meta.get('turno','')}".rstrip()
    L.append(cab); L.append("")
    jan = meta.get("janela", "")
    L.append(f"Sinais vitais ({jan}) + balanço:" if jan else "Sinais vitais + balanço:")

    vitais = leito.get("vitais", {})
    all_warn = []
    for nome in ORDEM_VITAIS:
        if nome not in vitais:
            continue
        vmax, vmin, flags = resumo_vital(nome, vitais[nome])
        u = UNID.get(nome, "")
        sep = "/" if nome == "Dx" else "–"
        def fv(x):
            if x is None:
                return "?"
            if nome == "TAX":               # temperatura sempre com 1 casa (36,0)
                return f"{float(x):.1f}".replace(".", ",")
            return _fmt(x)
        val = f"{fv(vmax)}{sep}{fv(vmin)}"
        linha = f"{nome}: {val} {u}".rstrip()
        if flags:
            linha += " " + " ".join(flags)
        L.append(linha)

    # balanço determinístico
    bal = calc_balanco(leito.get("ganhos"), leito.get("perdas"))
    all_warn += bal["warnings"]
    conf = leito.get("conferencia_enfermagem")   # o que a enfermagem SOMOU à mão (não confiável)
    conf_linha = None
    if conf:
        divs = []
        for rot, calc, inf in [("Ganhos", bal["ganho_total"], conf.get("ganhos")),
                               ("Perdas", bal["perda_total"], conf.get("perdas")),
                               ("BH",     bal["balanco"],     conf.get("bh"))]:
            if inf is not None and abs(calc - inf) > 0.5:
                divs.append(f"{rot}: folha diz {_fmt(inf)}, células somam {_fmt(calc)} ({calc-inf:+.0f})")
        for d in divs:
            all_warn.append("CONFERÊNCIA — " + d)
        if divs:
            conf_linha = "⚠️ DIVERGE da soma da enfermagem: " + " · ".join(divs)
    if leito.get("sup_o2") or leito.get("dieta"):
        L.append(f"Sup O2: {leito.get('sup_o2','?')} | Dieta: {leito.get('dieta','?')}")
    diurese = next((ml for nm, ml in bal["itens_perda"] if classify(nm) == "perda" and "diur" in nm.lower()), None)
    sinal = "+" if bal["balanco"] >= 0 else ""
    L.append(
        f"Ingesta: {_fmt(bal['ganho_total'])} ml | "
        f"Perdas: {_fmt(bal['perda_total'])} ml"
        + (f" (diurese {_fmt(diurese)} ml)" if diurese is not None else "")
        + f" | BH: {sinal}{_fmt(bal['balanco'])} ml")
    if conf_linha:
        L.append(conf_linha)
    if leito.get("evacuacao"):
        L.append(f"Evacuação: {leito['evacuacao']}")

    def bloco(titulo, conteudo, numer=False):
        if not conteudo:
            return
        L.append(""); L.append(titulo)
        if isinstance(conteudo, list):
            for i, item in enumerate(conteudo, 1):
                L.append(f"{i}. {item}" if numer else item)
        else:
            L.append(conteudo)

    bloco("Terapias vigentes por sistema:", leito.get("terapias"))
    bloco("Exame físico + síntese por sistemas:", leito.get("exame_fisico"))
    bloco("Evolução / Intercorrências 24h:", leito.get("evolucao"))
    bloco("Impressão / Problemas ativos:", leito.get("impressao"), numer=True)
    bloco("Conduta estruturada por sistemas:", leito.get("conduta"), numer=True)

    md = "```\n" + "\n".join(L) + "\n```"
    return md, all_warn


def build(payload):
    if "leitos" in payload:
        meta, leitos = payload.get("meta", {}), payload["leitos"]
    else:
        meta, leitos = {}, [payload]
    out, warns = [], []
    if meta:
        out.append(f"# 🪖 EVOLUÇÕES {meta.get('unidade','UTI')} — COMPILADO")
        out.append(f"**Data:** {meta.get('data','?')} — plantão {meta.get('turno','?')}")
        out.append(f"**Janela de sinais vitais:** {meta.get('janela','?')}")
        out.append("**Doutrina:** zero alucinação · sinais vitais Max–Min · balanço = Σganhos − Σperdas (script)")
        out.append("")
    for leito in leitos:
        md, w = render_leito(leito, meta)
        out.append(f"## LEITO {leito.get('leito','?')} — {leito.get('iniciais','?')}")
        out.append(md); out.append("")
        for item in w:
            warns.append(f"L{leito.get('leito','?')}: {item}")
    return "\n".join(out), warns


DEMO = {
    "meta": {"unidade": "UTI 4", "data": "27/06/2026", "turno": "diurno", "janela": "6–18 h"},
    "leitos": [{
        "leito": "01", "iniciais": "Valdir L. C. (VLC)", "dia_internacao": "5º DIA",
        "sup_o2": "AA", "dieta": "geral hipossódica p/ diabético + Nutren Senior",
        "vitais": {
            "PAS": [139,131,120,110,101,97,105],
            "PAD": [84,80,72,66,61,59,63],
            "PAM": {"max":96,"min":70},
            "FC":  [102,98,88,80,74,72,79],
            "FR":  [19,17,15,14,13,12,14],
            "SpO2":[97,96,96,95,95,96,97],
            "TAX": [36.9,36.4,36.0,36.2,36.1,36.3,36.5],
            "Dx":  [165,116],
        },
        # >>> o bug clássico: alguém lançou "diurese" no lado da INGESTA <<<
        "ganhos": [{"nome":"dieta+hidratação","ml":1030}, {"nome":"diurese","ml":1100}],
        "perdas": [],
        "evacuacao": "ausente no período",
        "terapias": "CV: carvedilol 25 mg VO manhã; AAS 100 mg VO almoço.\nRENAL: nefrotóxicos suspensos.",
        "evolucao": "Manejo IC aguda + DRC agudizada; Cr em recuo (6,4→3,5). Sem instabilidade.",
        "impressao": ["IC aguda, estável — sem DVA.", "DRC agudizada / sd cardiorrenal, em melhora."],
        "conduta": ["CV/Renal: manejo IC + vigilância renal; meta PAM ≥ 65.", "Profilaxia: TEV/LAMG/cabeceira."],
    }]
}


def main():
    ap = argparse.ArgumentParser(description="Motor determinístico da passagem de plantão UTI.")
    ap.add_argument("--json", help="payload JSON inline")
    ap.add_argument("--file", help="arquivo JSON")
    ap.add_argument("--demo", action="store_true", help="roda caso de validação (inclui o bug clássico)")
    a = ap.parse_args()
    if a.demo:
        payload = DEMO
    elif a.json:
        payload = json.loads(a.json)
    elif a.file:
        with open(a.file, encoding="utf-8") as f:
            payload = json.load(f)
    else:
        payload = json.load(sys.stdin)
    md, warns = build(payload)
    print(md)
    if warns:
        print("\n---\n### ⚠️ Warnings do motor (revisar):", file=sys.stderr)
        for w in warns:
            print(f"- {w}", file=sys.stderr)


if __name__ == "__main__":
    main()
