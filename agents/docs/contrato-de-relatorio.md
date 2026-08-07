# Contrato de relatório — saída obrigatória de todo subagente

Todo agente da frota fecha a missão com este bloco. Motivo: o gerente precisa distinguir, em 5 segundos,
**o que foi provado** do **que foi suposto** — sem reler a missão inteira.

## O bloco

```
STATUS: concluído | parcial | bloqueado | falhou
RESUMO: até 3 linhas, a conclusão primeiro
EVIDÊNCIA:
  - <comando rodado> → <saída real, colada>
  - <arquivo:linha> → <o que está lá>
ALTEROU: <arquivos criados/modificados> | nenhum
VALIDOU: <check rodado> → <resultado exato> | não se aplica
NÃO VI: <o que ficou fora do alcance, e por quê>
CONFIANÇA: alta | média | baixa — <motivo em 1 linha>
```

## Regras que valem para todos

1. **Número medido, nunca estimado.** "13.957 caracteres", não "bem menor". Sem medição, escreva `[SEM_FONTE]`.
2. **`NÃO VI` é obrigatório e nunca fica vazio por preguiça.** Se você leu 3 de 40 arquivos, diga. Omitir o
   escopo não coberto faz o gerente tratar cobertura parcial como total — é o erro mais caro da frota.
3. **Separe `FATO` de `INFERÊNCIA`.** Fato tem comando ou arquivo:linha atrás. Inferência é leitura sua e vai
   marcada como tal.
4. **Ausência de evidência não é evidência de ausência.** "Não encontrei vulnerabilidade" ≠ "está seguro".
   Escreva "não encontrado no escopo X".
5. **`CONFIANÇA: baixa` é resultado válido.** Inflar confiança pra parecer útil quebra a cadeia de decisão.
6. **Segredo vira `[SEGREDO]`.** Credencial, token ou chave que apareça em qualquer saída nunca é reproduzida.
7. **Dado de paciente vira `[PHI]`.** Nome, prontuário e leito real não entram em relatório.

## Status — quando usar cada um

| Status | Significa |
|---|---|
| `concluído` | Fez tudo o que foi pedido e provou |
| `parcial` | Fez parte; o que faltou está em `NÃO VI` com o motivo |
| `bloqueado` | Faltou acesso, ferramenta ou decisão do gerente — diga exatamente o que destrava |
| `falhou` | Tentou e não deu certo; a causa está em `EVIDÊNCIA` |

Nunca reporte `concluído` com item pendente escondido. Meia-entrega marcada como inteira é o único
resultado que o gerente não consegue corrigir, porque ele nem fica sabendo.
