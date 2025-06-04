# Déploiement GitHub Pages

## Étapes pour configurer GitHub Pages

### 1. Préparer votre repository GitHub

1. Créez un repository sur GitHub (si ce n'est pas déjà fait)
2. Assurez-vous que le nom du repository correspond à celui dans `vite.config.js` (actuellement "Pharmacie")

### 2. Activer GitHub Pages

1. Allez dans **Settings** > **Pages** de votre repository GitHub
2. Sous **Source**, sélectionnez **Deploy from a branch**
3. Choisissez la branche **gh-pages** comme source
4. Cliquez sur **Save**

### 3. Déployer votre site

#### Option A : Déploiement automatique avec GitHub Actions (Recommandé)
Le workflow GitHub Actions est déjà configuré dans `.github/workflows/deploy.yml`.
Il se déclenchera automatiquement à chaque push sur la branche `main`.

#### Option B : Déploiement manuel
```bash
# Construire et déployer
npm run deploy
```

Cette commande va :
1. Construire votre application (`npm run build`)
2. Déployer le contenu du dossier `dist` sur la branche `gh-pages`

### 4. Accéder à votre site

Votre site sera disponible à l'adresse :
```
https://[votre-nom-utilisateur].github.io/Pharmacie/
```

### 5. Configuration du domaine personnalisé (Optionnel)

Si vous voulez utiliser un domaine personnalisé :
1. Renommez `CNAME.example` en `CNAME`
2. Ajoutez votre domaine dans le fichier `CNAME`
3. Configurez votre DNS pour pointer vers GitHub Pages

### Notes importantes

- Le fichier `.nojekyll` empêche GitHub Pages de traiter le site avec Jekyll
- La configuration dans `vite.config.js` assure que les chemins fonctionnent correctement sur GitHub Pages
- Les assets (images, CSS, JS) auront le bon préfixe de chemin en production

### Dépannage

Si votre site ne se charge pas correctement :
1. Vérifiez que le nom du repository dans `vite.config.js` correspond à votre repository GitHub
2. Assurez-vous que GitHub Pages est activé et configuré sur la branche `gh-pages`
3. Vérifiez la console de votre navigateur pour des erreurs de chargement de ressources
