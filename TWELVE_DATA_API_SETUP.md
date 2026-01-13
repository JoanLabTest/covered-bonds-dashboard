# Configuration API Twelve Data - Données Temps Réel

## 🎯 Objectif

Pour obtenir des données boursières **temps réel** pour les indices et actions CAC 40, vous devez configurer une clé API gratuite Twelve Data.

## 📝 Étapes pour obtenir votre clé API GRATUITE

### 1. Créer un compte gratuit

Rendez-vous sur : **https://twelvedata.com/pricing**

- Cliquez sur "Get Started" sous le plan **FREE**
- Remplissez le formulaire d'inscription (email + mot de passe)
- Confirmez votre email

### 2. Récupérer votre clé API

- Connectez-vous à votre dashboard : https://twelvedata.com/account/api-keys
- Copiez votre clé API (format : `abc123def456...`)

### 3. Configurer la clé dans le dashboard

Ouvrez le fichier `config.js` et remplacez :

```javascript
apiKey: 'demo', // Clé de démonstration
```

Par :

```javascript
apiKey: 'VOTRE_CLE_API_ICI', // Votre clé gratuite Twelve Data
```

### 4. Redéployer

```bash
git add config.js
git commit -m "feat: add Twelve Data API key for real-time market data"
git push origin main
```

## ✅ Limites du plan GRATUIT

- **800 requêtes/jour** (largement suffisant)
- **8 requêtes/minute**
- Données temps réel pour :
  - ✅ Actions US
  - ✅ Forex
  - ✅ Crypto
  - ✅ Indices mondiaux (CAC 40, S&P 500, DAX, etc.)

## 🔄 Mode Fallback

Sans clé API configurée, le dashboard affiche :
- ⚠️ **Données simulées** réalistes basées sur les dernières valeurs connues
- Un badge avec un lien direct pour obtenir la clé gratuite
- Toutes les fonctionnalités restent accessibles (filtres, tri, etc.)

## 💡 Utilisation en Salle de Marché

Une fois la clé API configurée :
- ✅ Données temps réel toutes les 60 secondes
- ✅ 5 indices majeurs (CAC 40, S&P 500, DAX, Dow Jones, VIX)
- ✅ 40 actions du CAC 40 organisées par secteur
- ✅ Métriques : prix, variations, volumes, min/max jour

## 🆘 Support

En cas de problème :
- Documentation Twelve Data : https://twelvedata.com/docs
- Support : support@twelvedata.com
