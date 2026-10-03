# Configuration Marketstack API - Guide Utilisateur

## 🎯 Objectif

Obtenir une clé API gratuite Marketstack pour afficher les **cotations réelles** des actions CAC 40 (Euronext Paris) sur votre dashboard.

---

## 📋 Étapes d'Installation

### 1. Créer un Compte Marketstack (Gratuit)

1. Aller sur **https://marketstack.com/product**
2. Cliquer sur **"Get Free API Key"** ou **"Sign Up"**
3. Remplir le formulaire :
   - **Email** : Votre adresse email
   - **Password** : Choisir un mot de passe sécurisé
   - **Plan** : Sélectionner **"Free Plan"** (1000 requêtes/mois)
4. Cliquer sur **"Create Account"**
5. **Vérifier votre email** et cliquer sur le lien de confirmation

---

### 2. Récupérer votre Clé API

1. Se connecter sur **https://marketstack.com/dashboard**
2. Votre **API Access Key** s'affiche directement sur le dashboard
3. **Copier la clé** (format : `abc123def456...`)

**Exemple de clé** :
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

---

### 3. Configurer la Clé dans le Dashboard

#### Option A : Modification Manuelle

1. Ouvrir le fichier **`config.js`** dans votre éditeur de code
2. Chercher la section `marketstack:` (ligne ~59)
3. Remplacer `'demo'` par votre clé API :

**Avant** :
```javascript
marketstack: {
    enabled: true,
    apiKey: 'demo', // Replace with your free API key
    ...
}
```

**Après** :
```javascript
marketstack: {
    enabled: true,
    apiKey: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6', // Votre clé API
    ...
}
```

4. **Sauvegarder** le fichier

#### Option B : Via Terminal (Mac/Linux)

```bash
cd /Users/joanl/covered-bonds-dashboard

# Remplacer VOTRE_CLE_API par votre vraie clé
sed -i '' "s/apiKey: 'demo'/apiKey: 'VOTRE_CLE_API'/" config.js
```

---

### 4. Déployer sur GitHub Pages

```bash
cd /Users/joanl/covered-bonds-dashboard

# Ajouter les modifications
git add config.js marketstack-api.js cac40.js cac40.html

# Commit
git commit -m "feat: configure Marketstack API for real Euronext Paris quotes"

# Push vers GitHub
git push origin main
```

**Attendre 1-2 minutes** pour que GitHub Pages se mette à jour.

---

### 5. Vérifier que ça Fonctionne

1. Ouvrir **https://joanlabtest.github.io/covered-bonds-dashboard/cac40.html**
2. Ouvrir la **Console** (F12 → Console)
3. Vérifier les messages :

**✅ Succès** :
```
[MARKETSTACK] ✅ Module loaded - Ready for Euronext Paris EOD quotes
[CAC 40] 🔄 Fetching real EOD quotes from Marketstack (Euronext Paris)...
[MARKETSTACK] ✅ Received 39 quotes from API
[MARKETSTACK] ✅ Enrichment complete: 39 real quotes, 0 fallback to static
[CAC 40] ✅ Real EOD quotes loaded from Marketstack
```

**❌ Erreur API Key invalide** :
```
[MARKETSTACK] ❌ API Error: 401 Unauthorized
```
→ Vérifier que la clé est correcte dans `config.js`

**⚠️ Mode Démo** :
```
[CAC 40] ℹ️ Marketstack in demo mode - using static reference data
[CAC 40] 💡 Get free API key: https://marketstack.com/product
```
→ La clé n'a pas été configurée (encore `'demo'`)

4. Vérifier le **badge** :
   - ✅ **Badge vert** : "✅ Données Réelles - Marketstack (Euronext Paris, EOD)"
   - ⚠️ **Badge orange** : "⚠️ Mode Démo - Données de référence" + lien API

5. Vérifier les **prix** :
   - Les prix doivent être **réalistes** (pas 850€ pour LVMH)
   - Les prix correspondent à la **clôture de la veille** (EOD)

---

## 📊 Comprendre les Données EOD

### Qu'est-ce que EOD ?

**EOD = End-of-Day** (Fin de journée)

- Les données sont mises à jour **1 fois par jour** après la clôture d'Euronext Paris (17h30)
- Les prix affichés = **prix de clôture de la veille**
- **Pas de données intraday** (temps réel pendant la journée)

### Calendrier de Mises à Jour

Le dashboard vérifie les nouvelles données à :
- **8h00** ✅
- **10h00** ✅
- **12h00** ✅
- **14h00** ✅
- **16h00** ✅
- **18h00** ✅

**Mais** : Marketstack ne met à jour les données EOD qu'**1 fois par jour** (après clôture).

→ En pratique, les 6 vérifications afficheront les **mêmes données** (clôture J-1) jusqu'à la mise à jour Marketstack.

---

## 🔒 Sécurité de la Clé API

### ⚠️ Attention : Clé Publique

Votre clé API Marketstack sera **visible publiquement** dans le code source de votre site GitHub Pages.

**Risques** :
- ✅ **Faible** : Plan gratuit limité à 1000 requêtes/mois
- ⚠️ **Moyen** : Quelqu'un pourrait utiliser votre clé et consommer vos requêtes
- ❌ **Aucun risque financier** : Plan gratuit, pas de carte bancaire

**Recommandations** :
1. **Surveiller l'usage** : https://marketstack.com/dashboard
2. **Régénérer la clé** si usage suspect
3. Pour un usage professionnel : Utiliser un proxy serveur (clé côté serveur)

---

## 📈 Limites du Plan Gratuit

| Limite | Valeur | Impact Dashboard |
|--------|--------|------------------|
| **Requêtes/mois** | 1000 | ✅ Largement suffisant (180/mois) |
| **Requêtes/jour** | ~33 | ✅ OK (6/jour max) |
| **Type de données** | EOD uniquement | ⚠️ Pas de temps réel |
| **Historique** | 12 mois | ✅ Suffisant |
| **Exchanges** | 70+ dont XPAR | ✅ Euronext Paris inclus |

---

## 🆘 Dépannage

### Problème : Badge reste en "Mode Démo"

**Causes possibles** :
1. Clé API non configurée dans `config.js`
2. Fichier `config.js` pas déployé sur GitHub Pages
3. Cache navigateur

**Solutions** :
```bash
# 1. Vérifier config.js
grep "apiKey:" config.js
# Doit afficher : apiKey: 'VOTRE_CLE_ICI',

# 2. Redéployer
git add config.js
git commit -m "fix: update Marketstack API key"
git push origin main

# 3. Vider cache navigateur
# Chrome : Ctrl+Shift+R (Windows) ou Cmd+Shift+R (Mac)
```

### Problème : Erreur 401 Unauthorized

**Cause** : Clé API invalide

**Solutions** :
1. Vérifier que la clé est correcte (copier-coller depuis dashboard Marketstack)
2. Vérifier qu'il n'y a pas d'espaces avant/après la clé
3. Régénérer une nouvelle clé sur https://marketstack.com/dashboard

### Problème : Aucune donnée affichée

**Causes possibles** :
1. Limite de 1000 requêtes/mois dépassée
2. Problème réseau
3. Marketstack API en maintenance

**Solutions** :
1. Vérifier usage : https://marketstack.com/dashboard
2. Vérifier console navigateur pour erreurs
3. Attendre et réessayer plus tard

---

## 💡 Upgrade vers Plan Payant (Optionnel)

Si vous avez besoin de **données temps réel** ou plus de requêtes :

| Plan | Prix | Requêtes/mois | Données |
|------|------|---------------|---------|
| **Free** | €0 | 1000 | EOD uniquement |
| **Basic** | €10/mois | 10 000 | EOD + Intraday |
| **Professional** | €50/mois | 100 000 | EOD + Intraday + Real-time |

**Lien** : https://marketstack.com/product

---

## ✅ Checklist Finale

- [ ] Compte Marketstack créé
- [ ] Email vérifié
- [ ] Clé API copiée
- [ ] Clé configurée dans `config.js`
- [ ] Fichiers déployés sur GitHub Pages
- [ ] Badge vert affiché sur le site
- [ ] Console affiche "✅ Real EOD quotes loaded"
- [ ] Prix réalistes affichés

---

**Besoin d'aide ?** Consultez la documentation officielle : https://marketstack.com/documentation
