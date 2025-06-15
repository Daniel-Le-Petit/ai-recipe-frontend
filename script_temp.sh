#!/bin/bash

# Chemin vers le répertoire racine de votre projet frontend
# Assurez-vous que ce chemin est correct pour votre système
FRONTEND_ROOT="/mnt/c/Users/AIFinesHerbes/AIFB/frontend"

echo "Déplacement vers le répertoire racine du frontend : $FRONTEND_ROOT"
cd "$FRONTEND_ROOT" || { echo "Erreur: Impossible de se déplacer vers $FRONTEND_ROOT. Vérifiez le chemin."; exit 1; }

echo "Création du répertoire src/components/Pages/ si nécessaire..."
mkdir -p src/components/Pages/

echo "Déplacement des fichiers de page de src/components/Common/ vers src/components/Pages/..."

# Déplacer les fichiers de page
mv src/components/Common/AnalyticsDashboardPage.jsx src/components/Pages/ || echo "Avertissement: AnalyticsDashboardPage.jsx non trouvé ou erreur de déplacement."
mv src/components/Common/CreateRecipeFormPage.jsx src/components/Pages/ || echo "Avertissement: CreateRecipeFormPage.jsx non trouvé ou erreur de déplacement."
mv src/components/Common/FeatureUsagePage.jsx src/components/Pages/ || echo "Avertissement: FeatureUsagePage.jsx non trouvé ou erreur de déplacement."
mv src/components/Common/GeneratedRecipeDisplayPage.jsx src/components/Pages/ || echo "Avertissement: GeneratedRecipeDisplayPage.jsx non trouvé ou erreur de déplacement."
mv src/components/Common/HomePage.jsx src/components/Pages/ || echo "Avertissement: HomePage.jsx non trouvé ou erreur de déplacement."
mv src/components/Common/ProfilePage.jsx src/components/Pages/ || echo "Avertissement: ProfilePage.jsx non trouvé ou erreur de déplacement."
mv src/components/Common/RecipesOverviewPage.jsx src/components/Pages/ || echo "Avertissement: RecipesOverviewPage.jsx non trouvé ou erreur de déplacement."
mv src/components/Common/UserLocationMapPage.jsx src/components/Pages/ || echo "Avertissement: UserLocationMapPage.jsx non trouvé ou erreur de déplacement."

echo "Déplacement de RecipeList.jsx de src/components/Common/ vers src/..."
mv src/components/Common/RecipeList.jsx src/ || echo "Avertissement: RecipeList.jsx non trouvé ou erreur de déplacement."

# Les fichiers Header.jsx, Footer.jsx et Icons.jsx restent dans src/components/Common/
echo "Les fichiers Header.jsx, Footer.jsx et Icons.jsx restent dans src/components/Common/."

echo "Vérification des fichiers restants dans src/components/Common/ (devraient être Header.jsx, Footer.jsx, Icons.jsx uniquement) :"
ls src/components/Common/

echo "Déplacement des fichiers terminé !"
echo "------------------------------------------------------------------------------------------------"
echo "ATTENTION : N'oubliez PAS de mettre à jour les chemins d'importation (import statements)"
echo "dans vos fichiers React pour refléter la nouvelle structure des dossiers."
echo "Les codes des immersives que je vous ai fournis précédemment incluent déjà ces corrections de chemins."
echo "Une fois les fichiers déplacés, copiez le contenu des immersives correspondants."
echo "------------------------------------------------------------------------------------------------"

