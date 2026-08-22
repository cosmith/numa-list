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

## Troisième passage : extension aux saisons 10-13 (22 août 2026)

Le périmètre initial (promotions 1 à 9, 2011-2016) reposait sur une photo de
promotion et une liste de sélection officielle. Après le partage de cette
liste à d'anciens fondateurs, une correction reçue (saison 12, Hello Charly)
a révélé que NUMA avait continué à accélérer des startups à Paris bien
au-delà de 2016. Une recherche dédiée a permis de récupérer la base alumni
officielle de NUMA (`hub.numa.co/public/alumni`) via une capture Common
Crawl d'octobre 2018, listant les saisons 1 à 12 ainsi qu'une cohorte finale
non numérotée (tag interne `season2018`) précédant l'arrêt de l'accélération
de startups par NUMA en janvier 2019 — numérotée « saison 13 » dans ce
dataset par convention chronologique.

Chaque startup des saisons 10 à 13 a été recherchée individuellement
(fondateurs, statut 2026, sources), avec la même rigueur que le second
passage. Plusieurs pistes provenant d'un annuaire communautaire non fiable
(`annuaire-startups.pro`) ont été écartées faute de corroboration réelle, ou
parce qu'elles concernaient en fait un programme distinct de NUMA (« UR
Link », co-organisé avec Unibail-Rodamco, ou « Rise », un programme de
pré-accélération) plutôt qu'une saison numérotée de l'accélérateur.

## Quatrième passage : audit approfondi des saisons 10-13 (22 août 2026)

Les 21 fiches des saisons 10 à 13, ajoutées lors du troisième passage avec une
documentation sommaire (1 à 5 sources, aucune preuve d'archive), ont reçu le
même traitement que les saisons 1 à 9 : un agent de recherche dédié par
startup, six audits menés en parallèle.

Cibles propres à cette période : la base alumni officielle de NUMA archivée
(`hub.numa.co/public/alumni`) comme preuve primaire d'appartenance à une
saison, la presse d'époque 2016-2018, et les registres publics français
(ces sociétés sont assez récentes pour y figurer). Consigne explicite de ne
pas se fier à `annuaire-startups.pro` ni de confondre les programmes « UR
Link » et « Rise » avec une saison de l'accélérateur.

Résultat : 170 preuves contre 68, et 42 des 53 fondateurs disposent d'une URL
LinkedIn contre 19 sur 46. Aucun statut ni acquéreur n'a dû être corrigé —
le troisième passage les avait déjà établis correctement.

À cette occasion, le calcul du champ `confidence` a été revu sur l'ensemble
des 143 fiches : les limites d'outillage de la session (web.archive.org
bloqué par le proxy, profils LinkedIn non consultables directement)
représentaient 345 des 548 points ouverts et faisaient baisser la confiance
de fiches par ailleurs bien sourcées. Seuls les doutes de fond sont désormais
comptés, aux côtés du volume de preuves et de la solidité du champ `status`.
