# Projet Flask + SQL + Plotly Simulation

## Table des matières

1. [Présentation](#présentation)
2. [Lancement du projet](#lancement-du-projet)
3. [Utilisation de l'application](#utilisation-de-lapplication)
4. [Simulation automatique](#simulation-automatique)

---

## Présentation

Dans ce petit projet, j'ai utilisé **Flask** pour connecter l'application web à la base de données (`app.py`).  
Pour le côté web, j'ai utilisé **HTML**, **CSS** et **JavaScript**.

---

## Lancement du projet

Depuis votre terminal :

1. Activez l'environnement virtuel :

    ```bash
    source ../../../Projects/myenv/bin/activate
    ```

2. Lancez le serveur Flask :

    ```bash
    python3 app.py

    ```
3. Lancer 'index.html' avec go live dans vscode

4. Pour faire la simulation avec les items dans 'plots_sql.json', lancer ceci :
    ```bash
    python3 simulation.py

    ```

---

## Utilisation de l'application

1. **Entrer une requête SQL** : sélectionnez ce que vous voulez extraire de la base de données.
2. **Taper la requête SQL** dans le petit terminal prévu à cet effet.
3. **Cliquer sur** le bouton **"Send the query"**.
4. Si la commande est correcte, une alerte apparaît :  
   _"Données reçues avec succès ! Tu peux tracer ton graphe."_  
   Cliquez sur **OK** pour continuer.
5. Pour vérifier les résultats, cliquez sur **"Show / Hide the results"** pour les afficher ou les cacher.
6. **Entrer le code Plotly** dans la zone prévue (`plotlyCode`) et compléter les informations de mise en page (`plotlyLayout`) : titre de la figure, nom des axes X et Y, etc.
7. Cliquez sur **"Draw the graph"** pour tracer le graphique.
8. Vous pouvez ensuite voir les **propriétés** du point cliqué.

---

## Simulation automatique

Le fichier `simulation.py` permet de simuler automatiquement ce processus avec les 10 items contenus dans `plots_sql.json`.

Après chaque item, une question s'affiche dans le terminal :

'Would you like to continue the simulation for item {item_index + 1}? (y/n):'

- Répondez `y` pour continuer.
- Répondez `n` pour arrêter la simulation et fermer la page.

---
