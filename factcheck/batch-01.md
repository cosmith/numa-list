# Fact-check — batch 01 (indices 0 à 39)

Vérification effectuée le 21 août 2026 sur les 40 premières startups de `data.json`.

## Résultat

- 5 lignes vérifiées sans correction
- 34 lignes avec au moins une correction proposée
- 1 ligne partiellement invérifiable
- 0 conflit non résolu au niveau du verdict global

Pour le seul champ `founders`, 10 équipes sont confirmées sans modification,
29 ont été corrigées ou complétées, et 1 reste invérifiable. Cette seconde
passe privilégie les portraits de presse contemporains, les pages officielles
et les actes de création plutôt que les annuaires généralistes.

Les promotions et noms ont généralement pu être confirmés par des annonces de cohorte. Le champ `seenInPhoto` reste invérifiable sur les 40 lignes : aucune source photographique légendée ne permet d'identifier chaque startup avec une confiance suffisante.

## Problèmes principaux

- Équipes fondatrices incomplètes corrigées : PrepMyFuture, Skerou, Zifiz,
  HereWeDate, Oleapark, Siz, WeCook, Fleex, Poutsch, Stormz et Webshell.
- Une équipe reste sans preuve nominative suffisante : `s3-whale-street`.
- Statuts obsolètes ou erronés : LoungeUp a rejoint D-EDGE, Pili Pop Labs a été acquis par Unique Heritage Media, Explee a été liquidée en 2023, et TV Time a fermé en juillet 2026.
- Pivots ou changements de nom incomplets : Pili Pop est passé par Teeniz puis Babble Planet; Lima était auparavant ForgetBox.
- Événements de sortie imprécis : Augment a été acquis par StayinFront en mai 2024; Darjeelin par L'Officiel des Vacances en 2014; Sketchfab, après Epic Games en 2021, a été repris par KitBash en août 2026.
- Confusion fréquente entre société juridique, produit et domaine web : Dabla est encore active juridiquement alors que son service historique n'a pas été retrouvé; le domaine `explee.com` ne représente plus la startup française historique.
- Les mentions « service non retrouvé » ne constituent pas une preuve d'arrêt. Ces lignes sont classées `unverifiable` lorsqu'aucune radiation, annonce de fermeture ou source primaire équivalente n'a été trouvée.

## Corrections à examiner en priorité

1. `s3-stormz` : remplacer Jean-Denis Vauguet par Alexandre Eisenchteter et François de Metz.
2. `s2-wecook` : compléter l'équipe avec Matthieu Vincent et Alexandre Grimault.
3. `s3-fleex` : ajouter Guillaume Dupuy.
4. `s3-poutsch` : ajouter Étienne Adriaenssen et Melchior Schöller.
5. `s3-webshell` : ajouter Thibaud Arnault et Arnaud Richard autour de Mehdi Medjaoui.
6. `s1-skerou`, `s1-zifiz`, `s2-herewedate`, `s2-oleapark` et `s2-siz` : renseigner les équipes retrouvées dans la presse d'époque.

Le détail par champ, les patchs proposés et les sources consultées figurent dans `batch-01.json`. Aucun changement n'a été appliqué à `data.json`.
