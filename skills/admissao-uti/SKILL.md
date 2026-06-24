---
name: admissao-uti
description: Gera nota de admissão de UTI no formato fixo do Comando Tático UCI (Dr. Nicolas Nagaita) a partir de input livre — texto, foto de prontuário, transferência de PS/enfermaria, laudos. Use SEMPRE que Dr. Nicolas pedir "admissão UTI", "admitir paciente", "primeiro dia UTI", "fazer admissão", "nota de admissão", "internar leito X", "passar PS para UTI", "redigir admissão", ou enviar dados brutos de paciente recém-admitido (sinais vitais iniciais, motivo de internação, antecedentes, exames de entrada) — mesmo sem citar a palavra "skill". Esta skill NÃO é para evolução diária, passagem de turno, nem extração para Supabase — para isso, use sasi-ingest-export. Esta skill produz APENAS a nota de admissão inicial em texto pronto para colar no prontuário (e opcionalmente .docx Times New Roman 10).
---

# Admissão UTI — Comando Tático UCI

Skill cirúrgica para redigir a nota de admissão inicial em UTI no formato exato do Dr. Nicolas. Sem improviso. Sem inventar dado. Sem comentário motivacional dentro da nota — a nota é instrumento clínico-legal, não palco.

## Doutrina de operação

**Regra 1 — Zero alucinação.** Se o dado não veio na fonte (texto, foto, PDF, transferência), o campo fica em branco com `[ ]` ou `Não informado`. Nunca preencha sinal vital, dose, antecedente ou achado físico que o usuário não forneceu. Inventar dado em prontuário é falsificação documental — não acontece nessa trincheira.

**Regra 2 — Preservação literal do template.** A estrutura abaixo é IMUTÁVEL. Mesma ordem de seções, mesmos rótulos, mesma pontuação, mesmas linhas em branco. O Dr. Nicolas e a equipe leem essa nota dezenas de vezes por plantão — qualquer drift quebra a leitura padrão.

**Regra 3 — Conduta no final, isolada.** A seção `Conduta:` fecha a nota. Doses, metas terapêuticas e plano por sistema vão dentro dela, em formato lista numerada quando houver múltiplas frentes. Se o usuário não forneceu plano, deixe a seção pronta com cabeçalhos por sistema vazios para preenchimento manual — nunca chute a conduta clínica.

**Regra 4 — Raciocínio condensado nos comentários internos.** Quando você precisar pontuar algo ao Dr. Nicolas FORA da nota (raciocínio, alerta, dúvida), faça isso APÓS o bloco da nota, em uma seção separada chamada `// Comando Tático — Notas de operação:`. Dentro da nota: só dado clínico.

## Template fixo (NÃO alterar estrutura)

```
Paciente de [IDADE] anos, em [N]° dia de internação em UTI por quadro de:
[MOTIVO PRINCIPAL DA INTERNAÇÃO EM UTI — uma linha objetiva]

__Admissão__

Antecedentes:
[lista de comorbidades, cirurgias prévias, internações relevantes]

Medicamentos de uso domiciliar:
[lista com dose e posologia]

__ALERGIAS:__
[NEGA / lista]

Dispositivos:
IOT - [Não / Sim, descrever - data].
CVC - [Não / Sim, sítio - data].
Cateter arterial - [Não / Sim, sítio - data].
SVD - [Não / Sim, data].
SNE/SNG - [Não / Sim, posição - data].

Uso:
Drogas Vasoativas: [Não / Noradrenalina X mcg/kg/min, etc].
Sedação: [Não / Fentanil X mcg/kg/h + Midazolam X mg/h, etc].
Antibióticos: [Não / lista com D[n] e justificativa].
NPT: [Não / Sim, descrever].
TNE: [Não / Sim, dieta + volume].

Sinais Vitais admissão:
PA: ([valor]) mmHg
FC: [valor] bpm
Sao2: [valor]%, [aa / O2 nasal Xl/min / VM]
FR: [valor] ipm
DX: [valor] mg/dl
Temp: [valor] °C

Exame Físico Geral:
- Pele e mucosas: [achado]
- Sistema Nervoso Central: [ECG, déficits, pupilas, RASS se sedado]
- Sistema CardioVascular: [ritmo, BCNF, TEC, pulsos]
- Sistema Respiratório: [MV, RA, parâmetros VM se aplicável]
- Sistema Digestório: [abdome, RHA, sinais peritoneais]
- Extremidades: [edema, panturrilhas, perfusão]

- Hemato: [síntese hematológica relevante]
- Infecto: [foco, ATB em curso, cultura pendente, D[n]]
- Metabolico: [DHE, glicemia, ácido-base]
- Renal: [diurese, função renal, balanço]
- Cardio: [hemodinâmica, DVA, ECG quando relevante]

Exames Complementares relevantes:
[laboratoriais, imagem, gasometria — somente os relevantes para o quadro de admissão]

Conduta:
[plano numerado quando múltiplo, com doses, metas terapêuticas e justificativa quando pertinente]
```

## Como preencher cada bloco

### Cabeçalho (idade + dia de internação + motivo)
- Para admissão NOVA na UTI: sempre **1° dia de internação em UTI** (D1).
- Idade vem da fonte. Sem idade → `Paciente de [ ] anos`.
- Motivo: uma linha objetiva, preferencialmente com sufixo etiológico/sindrômico.
  - Bom: `Choque séptico de foco pulmonar com IRpA hipoxêmica, em IOT.`
  - Ruim: `Pneumonia` (genérico demais — não identifica gravidade nem disfunção que justifica UTI).

### Antecedentes
- Liste em ordem de relevância para o quadro atual, não cronológica.
- HAS, DM2, DAC, ICFEr, DPOC, DRC, neoplasias, cirurgias relevantes, internações prévias com IOT/UTI.
- Tabagismo/etilismo entram aqui se forem fator de risco para o quadro atual.

### Medicamentos de uso domiciliar
- Sempre com dose e posologia quando informados.
- Se a fonte trouxe só o nome: liste só o nome com `(dose não informada)`.
- Anticoagulantes e antiagregantes em destaque — risco de sangramento pesa em decisões agudas.

### ALERGIAS
- Padrão: `NEGA.` em maiúscula quando paciente nega.
- Se houver: nome do agente + tipo de reação (anafilaxia, rash, broncoespasmo). Reação importa para reexposição.

### Dispositivos
- Cada linha é uma linha. Preserve o formato `Dispositivo - Não.` ou `Dispositivo - Sim, [detalhe + data].`
- IOT: anote tubo (n°), profundidade na rima, data de IOT.
- CVC: sítio (jugular D/E, subclávia D/E, femoral D/E), n° de lúmens, data.
- Cateter arterial: sítio (radial D/E, femoral D/E), data.
- SVD: data de passagem (relevante para CAUTI).
- SNE/SNG: posição (gástrica/pós-pilórica), data.

### Uso de DVA, sedação, ATB, NPT, TNE
- DVA: nome + dose em mcg/kg/min ou mcg/min (padrão da UTI). Múltiplas DVA: liste todas.
- Sedação: agentes + doses contínuas + meta de RASS quando informada.
- ATB: nome + dose + intervalo + dia de ATB (D1, D2, ...) + foco/justificativa entre parênteses quando útil.
- NPT/TNE: volume/24h, fórmula quando pertinente.

### Sinais Vitais admissão
- São os sinais **da admissão na UTI**, não os atuais e não os do PS.
- Se tem PAM (paciente com cateter arterial), registre como `PA: (PAS x PAD / PAM) mmHg`.
- Sao2 sempre com o suporte: `aa`, `O2 nasal 2l/min`, `VNI FiO2 50%`, `VM FiO2 X% PEEP X`.
- Sem dado → deixe o placeholder vazio: `PA: ( ) mmHg`.

### Exame Físico Geral
- Use frases padrão quando o achado for normal — mas só se o usuário descreveu como normal. NÃO assuma normalidade por omissão.
- Quando o achado for anormal, descreva com precisão: `Descorada +2/4+`, `Ictérica +3/4+`, `Hipocorada com palidez cutâneo-mucosa`.
- SNC sob sedação: registre RASS e pupilas. ECG só faz sentido em paciente não sedado.
- Sistema respiratório com VM: parâmetros vão aqui (modo, VC, FR, FiO2, PEEP, P-platô).
- Abdome agudo/dúvida cirúrgica: descreva achados específicos (Blumberg, Murphy, Giordano, Rovsing) — esses sinais matam diagnóstico se omitidos.

### Síntese por sistema (Hemato, Infecto, Metabolico, Renal, Cardio)
Esta é a **leitura clínica** do paciente, não repetição do exame físico. Cada sistema deve responder:
- Qual é o problema ativo neste sistema?
- Qual a intervenção em curso?
- Qual a próxima ação esperada?

Exemplos:
- `- Infecto: Choque séptico de foco pulmonar (BGN comunitário). Em D1 de Pip-Tazo 4,5g 6/6h. Hemoculturas e culturas de aspirado coletadas pré-ATB. Aguardando antibiograma.`
- `- Renal: IRA AKI 2 (Cr 2,4 / basal 0,9), pré-renal por hipoperfusão. Diurese 0,3 ml/kg/h nas últimas 6h. Em ressuscitação volêmica direcionada por delta-PP.`
- `- Hemato: Plaquetopenia 78mil em queda (D-1 = 142mil). DD: consumo séptico vs heparina (HIT improvável, Warkentin 2 pontos). Sem sangramento ativo.`

Se não houver dado para o sistema: deixe `- [Sistema]: ` em branco para preenchimento manual. NÃO escreva "sem alterações" sem evidência.

### Exames Complementares relevantes
- Liste apenas os que importam para a admissão e para a condução das próximas 24h.
- Hemograma, função renal, função hepática, coagulograma, gasometria, lactato, PCR. Imagem (TC, RX, USG) com laudo resumido.
- Datas e horários quando o quadro for evolutivo (ex: lactato 6,2 → 4,1 → 2,8).
- NÃO infle a seção. Se o usuário forneceu 30 exames, escolha os que mudam conduta.

### Conduta
Estrutura preferencial em lista numerada por sistema/frente terapêutica:

```
1. Hemodinâmica:
   - [intervenção, dose, meta]
2. Ventilatório:
   - [parâmetros VM, meta de SpO2, PaO2/FiO2]
3. Sedação/Analgesia:
   - [agentes, meta RASS, meta BPS]
4. Infecto:
   - [ATB com dose, plano de duração, culturas]
5. Renal/Metabólico:
   - [reposição, balanço alvo, controle glicêmico]
6. Profilaxias:
   - TVP: [HBPM/HNF dose ou compressão pneumática se contraindicado]
   - LAMG: [IBP / antagonista H2 se indicado]
   - Cabeceira 30-45°
   - Higiene oral com clorexidina 0,12% se IOT
7. Nutrição:
   - [TNE/NPT, fórmula, volume]
8. Exames de seguimento:
   - [próximos exames programados]
```

Doses e metas terapêuticas SEMPRE explícitas. Sem "ajustar conforme resposta" — escreva a meta numérica (PAM ≥ 65, SpO2 92-96%, glicemia 140-180, lactato em queda, diurese ≥ 0,5 ml/kg/h).

Se o usuário NÃO forneceu plano: monte o esqueleto numerado com cabeçalhos vazios — ele preenche.

## Workflow de execução

1. **Ler a fonte.** Texto, foto, PDF, descrição livre — extraia tudo que for dado clínico verificável.
2. **Mapear cada dado para o campo correto** do template. Dado ambíguo → vai para `// Comando Tático — Notas de operação:` como pergunta, NÃO entra na nota.
3. **Preencher o template literalmente.** Mantenha rótulos, ordem, pontuação, linhas em branco.
4. **Auto-checagem antes de devolver:**
   - Algum dado clínico foi inventado? (se sim, remova)
   - A estrutura está idêntica ao template? (se não, corrija)
   - As doses têm unidade? (mg, mcg/kg/min, UI/h)
   - As metas terapêuticas têm número? (PAM, SpO2, lactato, diurese)
5. **Devolver** em bloco de código (para preservar formatação ao copiar) seguido de notas de operação se houver.

## Output

Devolva nesta ordem:

1. **Bloco de código com a nota completa** — pronta para copiar e colar no prontuário.
2. **`// Comando Tático — Notas de operação:`** (opcional) — alertas, dúvidas, dados ambíguos, sugestões de raciocínio. Aqui sim a voz tática do Comando UCI fala. Fora da nota.
3. **Seção final isolada — Conduta destilada:** apenas as doses-chave e metas terapêuticas, em formato bullet curto, fora do bloco da nota. Isso é referência rápida para o Dr. Nicolas conferir antes de prescrever. Esta seção segue o formato exigido pelo user preference: conduta, doses e metas isoladas e incondicionais ao final.

## Geração opcional de .docx (Times New Roman 10)

Se o usuário pedir explicitamente "gera o docx", "salva em word", "exporta", ou enviar uma frase equivalente:

- Use a skill `docx` em paralelo (ler `/mnt/skills/public/docx/SKILL.md` antes).
- Fonte: Times New Roman, tamanho 10.
- Margens: padrão (deixe como vem).
- Salve em `/mnt/user-data/outputs/admissao_<sobrenome_paciente_ou_leito>_<YYYY-MM-DD>.docx`.
- Apresente com `present_files`.

Sem pedido explícito → entregue só texto. Não infle o output.

## Exemplo de execução

**Input do usuário:**
> "Faz admissão: leito 7, mulher 68a, choque séptico foco pulmonar, intubada no PS, NORA 0,4 mcg/kg/min, sedada com fentanil 100mcg/h e midazolam 5mg/h, RASS -3. PA 90x50 PAM 63 mmHg após NORA, FC 118, SpO2 94% VM FiO2 60% PEEP 10 VC 380, FR 22, Temp 38,2, DX 168. Lac 4,8. Cr 2,1 (basal 0,8). HAS, DM2, ex-tabagista 40 maços-ano. Em casa: losartana 50mg, metformina 850 12/12h, AAS 100. Nega alergias. Hemoculturas e aspirado coletados, em D1 Pip-Tazo 4,5g 6/6h."

**Output esperado:**

```
Paciente de 68 anos, em 1° dia de internação em UTI por quadro de:
Choque séptico de foco pulmonar com IRpA hipoxêmica, em IOT/VM e DVA.

__Admissão__

Antecedentes: HAS, DM2, ex-tabagista 40 maços-ano.

Medicamentos de uso domiciliar:
- Losartana 50mg/dia
- Metformina 850mg 12/12h
- AAS 100mg/dia

__ALERGIAS:__ NEGA.

Dispositivos:
IOT - Sim, intubada no PS - D1.
CVC - [ ].
Cateter arterial - [ ].
SVD - [ ].
SNE/SNG - [ ].

Uso:
Drogas Vasoativas: Noradrenalina 0,4 mcg/kg/min.
Sedação: Fentanil 100 mcg/h + Midazolam 5 mg/h, RASS -3.
Antibióticos: Piperacilina-Tazobactam 4,5g 6/6h - D1 (foco pulmonar).
NPT: Não.
TNE: Não.

Sinais Vitais admissão:
PA: (90x50 / PAM 63) mmHg
FC: 118 bpm
Sao2: 94%, VM FiO2 60% PEEP 10 VC 380
FR: 22 ipm
DX: 168 mg/dl
Temp: 38,2 °C

Exame Físico Geral:
- Pele e mucosas: [ ]
- Sistema Nervoso Central: Sob sedação, RASS -3, pupilas [ ]
- Sistema CardioVascular: Taquicárdico, BCNF, em uso de DVA
- Sistema Respiratório: Em VM, parâmetros acima
- Sistema Digestório: [ ]
- Extremidades: [ ]

- Hemato: [ ]
- Infecto: Choque séptico de foco pulmonar. Em D1 de Pip-Tazo 4,5g 6/6h. Hemoculturas e aspirado coletados pré-ATB. Aguardando antibiograma.
- Metabolico: Hiperglicemia leve (DX 168). Lactato 4,8 mmol/L na admissão.
- Renal: IRA AKI provável (Cr 2,1 / basal 0,8 = razão 2,6). Diurese não informada. Pré-renal por hipoperfusão a esclarecer.
- Cardio: Choque distributivo com Nora 0,4 mcg/kg/min, PAM 63. FC 118.

Exames Complementares relevantes:
- Lactato: 4,8 mmol/L
- Cr: 2,1 mg/dl (basal 0,8)
- DX admissão: 168 mg/dl

Conduta:
1. Hemodinâmica:
   - Manter Nora titulada para PAM ≥ 65 mmHg
   - Reavaliar fluido-responsividade (delta-PP, VTI AoA, USG VCI)
   - Lactato seriado de 4/4h até clearance
2. Ventilatório:
   - VM protetora, manter SpO2 92-96%, P-platô < 30, driving pressure < 15
   - Reavaliar PaO2/FiO2 com gasometria pós-admissão
3. Sedação/Analgesia:
   - Manter Fentanil + Midazolam, meta RASS -2 a -3
   - Reavaliar despertar diário se estabilização
4. Infecto:
   - Pip-Tazo 4,5g 6/6h, prosseguir até antibiograma
   - Avaliar de-escalonamento com cultura
   - Reavaliar foco (RX/TC tórax)
5. Renal/Metabólico:
   - Balanço hídrico cuidadoso, alvo neutro a levemente positivo após ressuscitação inicial
   - Controle glicêmico alvo 140-180 mg/dl
   - Função renal e eletrólitos 12/12h
6. Profilaxias:
   - TVP: enoxaparina 40mg SC 1x/dia (se sem contraindicação)
   - LAMG: omeprazol 40mg EV 1x/dia
   - Cabeceira 30-45°
   - Higiene oral com clorexidina 0,12% 12/12h
7. Nutrição:
   - Iniciar TNE precoce nas próximas 24-48h se hemodinâmica estável
8. Acessos:
   - Programar passagem de CVC e cateter arterial
   - Passagem de SVD para controle horário de diurese
```

// Comando Tático — Notas de operação:
- Faltam: dado de pele/mucosas, pupilas, abdome, extremidades, diurese horária, gasometria, hemograma. Pedir à equipe.
- CVC e linha arterial ainda não passados — paciente em DVA dose moderada e hemodinâmica instável, prioridade alta nos próximos 30 min.
- AKI 2-3 já presente na admissão. Reavaliar indicação de TRS se não responder à ressuscitação ou se uremia/acidose progredirem.
- Etiologia do foco pulmonar a definir — pneumonia comunitária vs aspirativa. Cobertura atual cobre os dois cenários iniciais.

**Conduta destilada:**
- Nora titulada → PAM ≥ 65 mmHg
- VM protetora → SpO2 92-96%, P-platô < 30
- RASS -2 a -3
- Pip-Tazo 4,5g 6/6h
- Glicemia 140-180 mg/dl
- Enoxaparina 40mg SC 1x/dia (TVP)
- Omeprazol 40mg EV 1x/dia (LAMG)
- Cabeceira 30-45°
- Lactato 4/4h até clearance
- Função renal 12/12h

---

## Edge cases

- **Reinternação na UTI / readmissão:** o "1° dia" reinicia. Mas no motivo de internação, registre que é reinternação (`Reinternação em UTI por...`).
- **Transferência de outra UTI:** considere D1 nesta UTI, mas registre histórico de UTI prévia em Antecedentes (`Internação prévia em UTI [hospital] de [data] a [data] por [motivo]`).
- **Paciente em pós-operatório imediato:** o motivo de internação é o procedimento + intercorrência se houver. Em Antecedentes registre cirurgia + cirurgião + tempo cirúrgico se relevante.
- **Paciente pediátrico ou neonatal:** esta skill é desenhada para adulto. Se vier paciente <18a, sinalize ao Dr. Nicolas em `// Comando Tático` que o template pode precisar de ajuste.
- **Dado conflitante na fonte (ex: PA 120x80 e PA 90x60 sem timestamp claro):** registre o que está mais próximo da admissão na UTI e sinalize o conflito nas notas de operação.

---

## Fechamento

Esta skill produz um instrumento clínico-legal. Cada palavra na nota tem peso. Erro aqui custa em conduta, custa em auditoria, custa em vida. Trabalhe com a precisão do samurai — corte limpo, sem hesitação, sem floreio. Mantra: **dado verificado, campo preenchido. Dado ausente, campo em branco. Sem exceções.**
