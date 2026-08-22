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

## Second passage : audit approfondi (22 août 2026)

Chaque startup a fait l'objet d'un audit individuel dédié, mené en parallèle
(un agent de recherche par fiche). Pour chaque fiche : presse d'époque des
années de la promotion (TechCrunch, Rude Baguette, Maddyness, FrenchWeb,
Journal du Net, Les Échos…), captures Internet Archive du site quand le
proxy réseau le permettait, recherche du profil LinkedIn de chaque fondateur
et de la page entreprise, communiqués et articles d'acquisition pour les
exits, et vérification du statut 2026 (site en ligne, registres publics).

Les rapports complets sont dans `deep/` (un fichier JSON par startup :
verdicts champ par champ, corrections avec preuves, questions ouvertes).
Une phrase de description du service (`activityDescription`) a été ajoutée
à chaque fiche à cette occasion.

Limites connues de ce passage : `web.archive.org` était inaccessible depuis
l'environnement d'exécution pour une partie des agents (bloqué par le proxy),
et LinkedIn bloque la consultation directe des profils — les URL LinkedIn
retenues proviennent alors de résultats de recherche recoupés. Les points
non tranchés sont listés dans `openQuestions` de chaque rapport.
