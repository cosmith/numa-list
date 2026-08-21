# Fact-check de `data.json`

Date de vérification : 21 août 2026.

## Méthode

Chaque startup est contrôlée champ par champ : appartenance à la promotion,
nom et pivots, fondateurs, statut, détail du statut, site web et présence sur
une photographie quand une photographie source est disponible.

Les verdicts utilisés sont :

- `verified` : une source fiable soutient directement l'affirmation ;
- `corrected` : les sources imposent une modification ;
- `conflicting` : des sources crédibles se contredisent ;
- `unverifiable` : les sources disponibles ne permettent pas de conclure.

Une source officielle de l'entreprise, de NUMA ou de l'acquéreur est
privilégiée. Les registres publics, communiqués de presse et médias reconnus
servent de corroboration. Un site inaccessible ou l'absence de résultat dans
un moteur de recherche ne prouve pas à lui seul qu'une activité est arrêtée.
Les profils et annuaires communautaires ne sont pas utilisés seuls pour une
affirmation forte.

Les fichiers `batch-*.json` constituent la piste d'audit structurée. Les
fichiers `batch-*.md` résument les corrections et les points restant à
documenter. Les modifications retenues sont ensuite consolidées dans
`data.json`.
