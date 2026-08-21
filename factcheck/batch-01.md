# Fact-check — batch 01 (indices 0 à 39)

Vérification effectuée le 21 août 2026 sur les 40 premières startups de `data.json`.

## Résultat

- 6 lignes vérifiées sans correction
- 23 lignes avec au moins une correction proposée
- 11 lignes partiellement invérifiables
- 0 conflit non résolu au niveau du verdict global

Les promotions et noms ont généralement pu être confirmés par des annonces de cohorte. Le champ `seenInPhoto` reste invérifiable sur les 40 lignes : aucune source photographique légendée ne permet d'identifier chaque startup avec une confiance suffisante.

## Problèmes principaux

- Équipes fondatrices incomplètes : Beansight, docTrackr, Mesagraph, LoungeUp, Pictarine, qunb, TVShow Time, Lima et plusieurs projets peu documentés.
- Statuts obsolètes ou erronés : LoungeUp a rejoint D-EDGE, Pili Pop Labs a été acquis par Unique Heritage Media, Explee a été liquidée en 2023, et TV Time a fermé en juillet 2026.
- Pivots ou changements de nom incomplets : Pili Pop est passé par Teeniz puis Babble Planet; Lima était auparavant ForgetBox.
- Événements de sortie imprécis : Augment a été acquis par StayinFront en mai 2024; Darjeelin par L'Officiel des Vacances en 2014; Sketchfab, après Epic Games en 2021, a été repris par KitBash en août 2026.
- Confusion fréquente entre société juridique, produit et domaine web : Dabla est encore active juridiquement alors que son service historique n'a pas été retrouvé; le domaine `explee.com` ne représente plus la startup française historique.
- Les mentions « service non retrouvé » ne constituent pas une preuve d'arrêt. Ces lignes sont classées `unverifiable` lorsqu'aucune radiation, annonce de fermeture ou source primaire équivalente n'a été trouvée.

## Corrections à examiner en priorité

1. `s1-dabla` : société juridiquement active; fondateur identifié.
2. `s1-skerou` : vérifier la continuité vers PurchEase avant application au jeu de données principal.
3. `s2-loungeup` : ajouter Lionel Tressens et enregistrer le rapprochement avec D-EDGE.
4. `s2-pili-pop` : ajouter Babble Planet et harmoniser le statut d'acquisition.
5. `s2-tvshow-time` : ajouter Talal Mazroui, supprimer le site fermé et conserver la date de fermeture du 15 juillet 2026.
6. `s3-explee` : passer la startup historique à `stopped` et ne plus utiliser le domaine désormais réaffecté.
7. `s3-sketchfab` : actualiser l'acquéreur actuel, KitBash.

Le détail par champ, les patchs proposés et les sources consultées figurent dans `batch-01.json`. Aucun changement n'a été appliqué à `data.json`.
