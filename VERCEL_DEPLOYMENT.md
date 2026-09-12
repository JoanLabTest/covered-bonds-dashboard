# Guide de Déploiement Vercel - Backend Python

Ce guide explique comment déployer le backend Python (API de données Covered Bonds) sur Vercel.

## Prérequis

1. **Compte Vercel** : Créez un compte gratuit sur [vercel.com](https://vercel.com)
2. **Vercel CLI** (optionnel) : `npm install -g vercel`
3. **Compte GitHub** : Pour l'intégration automatique

## Méthode 1 : Déploiement via GitHub (Recommandé)

### Étape 1 : Connexion GitHub → Vercel

1. Allez sur [vercel.com/new](https://vercel.com/new)
2. Cliquez sur **"Import Git Repository"**
3. Autorisez Vercel à accéder à votre compte GitHub
4. Sélectionnez le repository `covered-bonds-dashboard`

### Étape 2 : Configuration du Projet

1. **Framework Preset** : Sélectionnez `Other`
2. **Root Directory** : Laissez vide (`.`)
3. **Build Settings** :
   - Build Command : Laissez vide
   - Output Directory : Laissez vide
   - Install Command : `pip install -r requirements.txt`

### Étape 3 : Variables d'Environnement

Aucune variable d'environnement n'est requise pour cette API (Yahoo Finance est public).

### Étape 4 : Déploiement

1. Cliquez sur **"Deploy"**
2. Attendez 1-2 minutes que le déploiement se termine
3. Vercel vous donnera une URL de production : `https://your-project.vercel.app`

### Étape 5 : Tester l'API

Testez votre endpoint API :
```bash
curl https://your-project.vercel.app/api/market
```

Vous devriez recevoir une réponse JSON avec les données du marché.

## Méthode 2 : Déploiement via CLI

### Étape 1 : Installation

```bash
npm install -g vercel
```

### Étape 2 : Connexion

```bash
vercel login
```

### Étape 3 : Déploiement

Depuis le répertoire du projet :

```bash
cd /Users/joanl/covered-bonds-dashboard
vercel
```

Suivez les instructions :
- **Set up and deploy?** → `Y`
- **Which scope?** → Sélectionnez votre compte
- **Link to existing project?** → `N`
- **Project name** → `covered-bonds-dashboard`
- **Directory** → `.` (répertoire actuel)
- **Override settings?** → `N`

### Étape 4 : Déploiement en Production

```bash
vercel --prod
```

## Configuration des Fichiers

Le projet contient déjà les fichiers nécessaires :

### `vercel.json`
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/market.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/api/market",
      "dest": "api/market.py"
    }
  ]
}
```

### `requirements.txt`
```
Flask==3.0.0
yfinance==0.2.32
pandas==2.1.3
gunicorn==21.2.0
```

### `api/market.py`
Fonction serverless Flask qui récupère les données de Yahoo Finance.

## Mise à Jour du Frontend

Une fois déployé, mettez à jour l'URL de l'API dans `covered-bonds-market.js` :

```javascript
constructor() {
    // Production: Remplacez par votre URL Vercel
    this.apiUrl = 'https://your-project.vercel.app/api/market';
    
    // Development: localhost
    // this.apiUrl = 'http://localhost:3000/api/market';
    
    // ...
}
```

## Déploiements Automatiques

Une fois connecté à GitHub, Vercel déploiera automatiquement :
- **Production** : À chaque push sur la branche `main`
- **Preview** : À chaque pull request

## Vérification

### Test de l'API

```bash
# Tester l'endpoint
curl https://your-project.vercel.app/api/market | jq

# Vérifier les headers CORS
curl -I https://your-project.vercel.app/api/market
```

### Réponse Attendue

```json
{
  "status": "success",
  "ticker": "ICOV.L",
  "asset": "Euro Covered Bond Market (Proxy ETF)",
  "price": 143.34,
  "currency": "EUR",
  "daily_change_percent": 0.03,
  "trend": "Hausse",
  "volume": 10933,
  "date": "2026-01-13",
  "data_source": "Yahoo Finance",
  "last_updated": "2026-01-15T13:37:00Z"
}
```

## Logs et Monitoring

### Voir les Logs

1. Allez sur [vercel.com/dashboard](https://vercel.com/dashboard)
2. Sélectionnez votre projet
3. Cliquez sur **"Logs"** dans le menu latéral
4. Filtrez par fonction : `api/market.py`

### Monitoring

Vercel fournit automatiquement :
- **Analytics** : Nombre de requêtes, temps de réponse
- **Error Tracking** : Erreurs 4xx/5xx
- **Function Metrics** : Temps d'exécution, mémoire utilisée

## Limites du Plan Gratuit

- **100 GB de bande passante** / mois
- **100 heures de fonction serverless** / mois
- **Déploiements illimités**
- **HTTPS automatique**

Pour notre usage (quelques requêtes par jour), le plan gratuit est largement suffisant.

## Dépannage

### Erreur : Module not found

Vérifiez que `requirements.txt` contient toutes les dépendances :
```bash
pip freeze | grep -E "(Flask|yfinance|pandas|gunicorn)"
```

### Erreur : Function timeout

Les fonctions Vercel ont un timeout de 10 secondes (plan gratuit). Si Yahoo Finance est lent :
1. Ajoutez un timeout dans `yfinance` :
   ```python
   data = yf.Ticker("ICOV.L").history(period="5d", timeout=5)
   ```

### Erreur CORS

Vérifiez que les headers CORS sont présents dans `api/market.py` :
```python
response.headers['Access-Control-Allow-Origin'] = '*'
```

## Support

- **Documentation Vercel** : [vercel.com/docs](https://vercel.com/docs)
- **Vercel Python** : [vercel.com/docs/functions/serverless-functions/runtimes/python](https://vercel.com/docs/functions/serverless-functions/runtimes/python)
- **Support** : [vercel.com/support](https://vercel.com/support)
