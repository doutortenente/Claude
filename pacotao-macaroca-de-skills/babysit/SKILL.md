---
name: babysit
description: Mantém um PR pronto pra merge — tria comentários, resolve conflitos claros e conserta o CI num loop. Use quando o usuário pedir pra "cuidar", "babá", deixar um PR mergeável, ou acompanhar CI/comentários até ficar verde.
---

# Babysit PR

Seu trabalho é levar este PR ao estado "pronto pra merge".

Cheque o status do PR, os comentários e o CI mais recente (via `gh`) e resolva tudo até dar pra mergear.

1. **Conflitos de merge**: resolva preservando a intenção e a correção das mudanças do seu branch e da base. Se as
   intenções conflitam de verdade, aborte o merge e pergunte.

2. **Comentários**: revise os comentários ativos não resolvidos e atenda os pedidos de mudança / relatos de bug válidos.
   Ao buscar comentários no GitHub, filtre primeiro as threads já resolvidas. Leia só o corpo do comentário e o mínimo
   de localização/URL necessário pra agir — não despeje o JSON inteiro. Valide cada issue com cuidado; aja só nas
   válidas e explique quando discordar ou estiver em dúvida.

3. **CI**: conserte falhas de CI causadas por mudanças dentro do escopo deste PR. Nunca altere os checks/workflows do CI
   só pra fazer a falha passar, nem faça mudanças não relacionadas — se isso fosse necessário, reporte de volta. Pra
   falhas que bloqueiam o merge mas parecem não ter relação com o PR, verifique se o branch está atrás da base e traga
   as mudanças mais recentes (outro PR pode ter consertado). Faça push só dos fixes do escopo e fique observando o CI
   até ficar mergeável + verde + comentários triados.
