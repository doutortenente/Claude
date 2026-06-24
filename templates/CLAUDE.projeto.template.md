# CLAUDE.md — PROJETO: <NOME>
<!-- Raiz do projeto (./CLAUDE.md). Herda o global. So o especifico daqui. Alvo <150 linhas. -->
<!-- Detalhe de stack vai em .claude/rules/ (path-scoped, carrega sob demanda). -->
<!-- ATENCAO: regra que PRECISA sobreviver ao /compact fica AQUI, nao em rule path-scoped. -->
<!-- Rode /init pra gerar a base lendo o codigo; refine depois. -->

## DESCRIÇÃO
<!-- 3-5 bullets: o que faz e o stack. -->
-

## COMANDOS (exatos, verificáveis)
- Dev:        `npm run dev`
- Build:      `npm run build`
- Test:       `npm test`
- Lint:       `npm run lint`
- Typecheck:  `npm run typecheck`

## ARQUITETURA (at a glance)
- `src/` —
- Banco / RLS / migrations / edge functions: ver `.claude/rules/supabase.md`.

## REGRAS "SEMPRE FAÇA"
- Rodar `npm run typecheck` antes de commitar.
- Regenerar tipos TS após qualquer mudança de schema Supabase.

## ESPECÍFICO
<!-- O que o Claude erraria sem isto escrito. -->
-

<!-- ============ EXEMPLO PREENCHIDO — SASI (apague ou use de molde) ============
## DESCRIÇÃO
- SASI — dashboard de comando de UTI, 33 leitos (UTI 2/3/4). Escore SOFA, severidade, devices.
- Stack: React 18 + Vite + TS + Tailwind. Back: Supabase (projeto idswehsvvqczzkiatuzu, sa-east-1).

## COMANDOS
- Dev: `npm run dev` | Build: `npm run build` | Test: `npm test` (Vitest) | Typecheck: `tsc --noEmit`

## ARQUITETURA
- `src/lib/` — lógica clínica modular: types, constants, dictionaries, calculations, guards, scores, alerts, __tests__.
- `clinical-logic-compat.ts` — camada de compatibilidade retro.
- Banco/RLS/migrations/edge functions: `.claude/rules/supabase.md`.

## REGRAS "SEMPRE FAÇA"
- SOFA: componente sem dado-fonte fica NÃO calculado e documentado, nunca estimado.
- Sinais vitais: ordem Máx–Mín em todo parâmetro (inclui SpO2).
- Sepsis-3 usa ΔSOFA, não SOFA absoluto.

## ESPECÍFICO — DÉBITOS CONHECIDOS
- `dev_bypass` RLS (PERMISSIVE, public, USING(true)) anula as policies auth.uid() nas 9 tabelas → dados expostos via anon key. Dropar só após confirmar auth Supabase no front.
- `eventos_clinicos` com 0 linhas → ΔSOFA / BH / tendência 72h cegos.
- Gemini API key client-side → migrar pra Edge Function.
============================ fim do exemplo ============================ -->
