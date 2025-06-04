#!/bin/bash

echo "🔍 Diagnostic GitHub Pages..."
echo "================================"

# Vérifier si on est dans un repo git
if [ ! -d ".git" ]; then
    echo "❌ Erreur: Ce répertoire n'est pas un dépôt Git"
    exit 1
fi

# Obtenir l'URL du repository
REPO_URL=$(git config --get remote.origin.url)
echo "📁 Repository URL: $REPO_URL"

# Extraire le nom du repository depuis l'URL
if [[ $REPO_URL =~ github\.com[:/]([^/]+)/([^/.]+) ]]; then
    USER_NAME="${BASH_REMATCH[1]}"
    REPO_NAME="${BASH_REMATCH[2]}"
    echo "👤 Utilisateur: $USER_NAME"
    echo "📂 Repository: $REPO_NAME"
    echo "🌐 URL GitHub Pages: https://$USER_NAME.github.io/$REPO_NAME/"
else
    echo "❌ Impossible d'extraire les informations du repository"
    exit 1
fi

# Vérifier le fichier vite.config.js
echo ""
echo "🔧 Vérification de vite.config.js..."
if grep -q "repoName = '$REPO_NAME'" vite.config.js; then
    echo "✅ Le nom du repository est correct dans vite.config.js"
else
    echo "⚠️  Le nom du repository dans vite.config.js ne correspond pas"
    echo "   Repository actuel: $REPO_NAME"
    echo "   Correction en cours..."
    sed -i "s/repoName = '.*'/repoName = '$REPO_NAME'/" vite.config.js
    echo "✅ vite.config.js corrigé"
fi

# Construire le projet
echo ""
echo "🔨 Construction du projet..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Construction réussie"
else
    echo "❌ Erreur lors de la construction"
    exit 1
fi

# Vérifier les fichiers générés
echo ""
echo "📋 Vérification des fichiers générés..."
if [ -f "dist/index.html" ]; then
    echo "✅ index.html généré"
    echo "🔍 Vérification des chemins dans index.html:"
    grep -o "/$REPO_NAME/[^\"']*" dist/index.html | head -5
else
    echo "❌ index.html non trouvé"
fi

# Déployer
echo ""
echo "🚀 Déploiement vers GitHub Pages..."
npm run deploy

if [ $? -eq 0 ]; then
    echo "✅ Déploiement réussi"
    echo "🌐 Votre site sera disponible à: https://$USER_NAME.github.io/$REPO_NAME/"
    echo ""
    echo "📝 Assurez-vous que:"
    echo "   1. GitHub Pages est activé dans les paramètres du repository"
    echo "   2. La source est définie sur 'Deploy from a branch'"
    echo "   3. La branche source est 'gh-pages'"
else
    echo "❌ Erreur lors du déploiement"
    exit 1
fi
