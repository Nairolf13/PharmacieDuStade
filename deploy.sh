#!/bin/bash

echo "🔧 Nettoyage et reconstruction du projet..."
rm -rf dist

echo "📦 Construction du projet..."
npm run build

echo "📋 Vérification du build..."
if [ ! -f "dist/index.html" ]; then
    echo "❌ Erreur: Le build a échoué, index.html non trouvé"
    exit 1
fi

echo "🚀 Déploiement sur GitHub Pages..."
npx gh-pages -d dist

echo "✅ Déploiement terminé!"
echo "🌐 Votre site sera disponible dans quelques minutes à:"
echo "   https://nairolf13.github.io/PharmacieDuStade/"
