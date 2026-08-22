# Camping

Une archive ouverte des startups passées par Le Camping / NUMA Paris entre 2011 et 2016.

Le site est volontairement simple : HTML, CSS, JavaScript natif et un fichier JSON.

## Lancer le site localement

```sh
python3 -m http.server 4173
```

Puis ouvrir `http://localhost:4173`.

## Corriger les données

Les données sont dans [`data.json`](data.json). Les corrections et compléments sont les bienvenus via une pull request.

Le fichier est validé en CI contre [`data.schema.json`](data.schema.json). Pour vérifier localement :

```sh
npx ajv-cli@5 validate --spec=draft2020 --all-errors -s data.schema.json -d data.json
```

## Hébergement

Le site est publié sur `numa.cosmith.fr`.
