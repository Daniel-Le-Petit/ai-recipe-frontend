#!/bin/bash

# Définissez le chemin vers votre répertoire frontend
# REMPLACEZ '/mnt/c/Users/AIFinesHerbes/AIFB/frontend' par le chemin réel de votre projet.
FRONTEND_DIR="/mnt/c/Users/AIFinesHerbes/AIFB/frontend"

# Naviguez vers le répertoire du projet frontend
echo "--- Navigation vers le répertoire: ${FRONTEND_DIR} ---"
cd "${FRONTEND_DIR}" || { echo "Erreur: Impossible de naviguer vers ${FRONTEND_DIR}. Veuillez vérifier le chemin."; exit 1; }

echo "--- Statut Git initial ---"
git status
echo "Branche actuelle: $(git rev-parse --abbrev-ref HEAD)"
echo "Dernier commit sur la branche actuelle: $(git log --oneline -1)"

echo "--- Étape 1: Gérer les changements locaux et pousser vers 'dev' ---"

# Vérifiez s'il y a des changements locaux non committés (stagés ou non-stagés)
if ! git diff-index --quiet HEAD --; then
  echo "Des changements locaux non committés ont été détectés."
  # Sauvegarde temporairement les changements locaux (inclut les fichiers non suivis)
  echo "Sauvegarde des changements locaux avec 'git stash'..."
  git stash push --include-untracked -m "WIP before switching to dev from $(git rev-parse --abbrev-ref HEAD)"
  if [ $? -ne 0 ]; then
    echo "Erreur: Échec du 'git stash'. Assurez-vous que Git est correctement configuré et que le répertoire est valide."
    exit 1
  fi
  STASHED=true
else
  STASHED=false
  echo "Aucun changement local non committé à stasher."
fi

# Assurez-vous d'être sur la branche 'dev'
echo "Vérification et bascule vers la branche 'dev'..."
git checkout dev
if [ $? -ne 0 ]; then
  echo "Erreur: Impossible de basculer vers la branche 'dev'. Vous avez peut-être des conflits avec votre stash ou des fichiers non-suivis. Résolvez-les manuellement ou utilisez 'git restore .' pour annuler les changements non suivis."
  exit 1
fi
echo "Branche actuelle: $(git rev-parse --abbrev-ref HEAD)"

echo "--- Récupération des dernières modifications de 'dev' distante ---"
git pull origin dev
if [ $? -ne 0 ]; then
  echo "Erreur: Échec du pull depuis 'origin dev'. Vérifiez votre connexion et les permissions du dépôt."
  exit 1
fi

# Si des changements ont été stashés, réappliquez-les sur la branche 'dev'
if [ "$STASHED" = true ]; then
  echo "Réapplication des changements stashés avec 'git stash pop'..."
  git stash pop
  if [ $? -ne 0 ]; then
    echo "Attention: Des conflits peuvent survenir lors du 'git stash pop'. Veuillez les résoudre manuellement MAINTENANT."
    echo "Après résolution: 'git add .' puis 'git commit'."
    exit 1 # Arrête le script pour permettre la résolution manuelle
  fi
fi

echo "--- Statut Git après stash/pull/pop sur 'dev' ---"
git status
echo "Dernier commit sur 'dev' local: $(git log --oneline -1)"
echo "Diff entre 'dev' local et 'origin/dev':"
git diff origin/dev dev --name-only # Affiche seulement les noms de fichiers différents

# Ajoutez toutes les modifications suivies et non suivies au staging area
echo "Ajout de toutes les modifications au staging area..."
git add .

echo "--- Statut Git après git add sur 'dev' ---"
git status

# Vérifiez s'il y a des changements à committer
if git diff --cached --quiet; then
    echo "Aucun nouveau changement à committer sur la branche 'dev'."
else
    # Créez un commit avec un message descriptif pour vos changements.
    # REMPLACEZ CE MESSAGE par un résumé PRÉCIS de VOS dernières modifications.
    echo "Création du commit sur la branche 'dev'..."
    git commit -m "feat: Mise à jour du composant RecipeList avec parsing JSON et corrections UX (Correction GA)"
    if [ $? -ne 0 ]; then
        echo "Erreur: Échec du 'git commit'. Il y a peut-être eu un problème inattendu. Exécutez 'git status' manuellement pour plus de détails."
        exit 1
    fi
    echo "Dernier commit sur 'dev' local après commit: $(git log --oneline -1)"
fi

echo "--- Statut Git final avant push 'dev' ---"
git status

# Poussez la branche dev mise à jour vers GitHub
echo "Poussée de la branche 'dev' vers 'origin'..."
git push origin dev
if [ $? -ne 0 ]; then
    echo "Erreur: Échec de la poussée vers 'origin dev'. Vérifiez vos identifiants GitHub, les permissions du dépôt ou un éventuel conflit en amont (utilisez 'git pull' puis résolvez si nécessaire)."
    exit 1
fi
echo "--- 'dev' poussée avec succès. Vérifiez GitHub. ---"

echo "--- Étape 2: Fusion de 'dev' dans 'main' et push ---"

# Passez à la branche main
echo "Bascule vers la branche 'main'..."
git checkout main
if [ $? -ne 0 ]; then
  echo "Erreur: Impossible de basculer vers la branche 'main'. Veuillez résoudre les problèmes locaux."
  exit 1
fi
echo "Branche actuelle: $(git rev-parse --abbrev-ref HEAD)"

echo "--- Récupération des dernières modifications de 'main' distante ---"
git pull origin main
if [ $? -ne 0 ]; then
  echo "Erreur: Échec du pull depuis 'origin main'. Vérifiez votre connexion et les permissions."
  exit 1
fi

# Fusionnez la branche dev dans main. Ceci apportera tous les commits de dev vers main.
echo "Fusion de 'dev' dans 'main'..."
# Utilisation de --no-ff pour un historique de fusion plus explicite
git merge dev --no-ff
if [ $? -ne 0 ]; then
    echo "Erreur: Échec de la fusion de 'dev' dans 'main'. Des conflits sont survenus."
    echo "Veuillez résoudre les conflits manuellement (utilisez 'git status' pour voir les fichiers en conflit),"
    echo "puis committez ('git commit') et relancez le 'git push origin main'."
    exit 1
fi

echo "--- Statut Git après merge sur 'main' ---"
git status
echo "Dernier commit sur 'main' local: $(git log --oneline -1)"

# Poussez la branche main mise à jour vers GitHub
echo "Poussée de la branche 'main' vers 'origin'..."
git push origin main
if [ $? -ne 0 ]; then
    echo "Erreur: Échec de la poussée vers 'origin main'. Vérifiez vos identifiants GitHub et les permissions du dépôt."
    exit 1
fi
echo "--- 'main' poussée avec succès. Vérifiez GitHub. ---"

echo "--- Processus terminé ---"
echo "Vos branches 'dev' et 'main' sont maintenant synchronisées."

