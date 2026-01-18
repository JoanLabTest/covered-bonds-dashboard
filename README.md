# 🏦 Covered Bonds Blockchain Dashboard

Dashboard professionnel de suivi des émissions institutionnelles de covered bonds sur blockchain.

![Dashboard Preview](https://img.shields.io/badge/Status-Live-success)
![Auto-Update](https://img.shields.io/badge/Auto--Update-Enabled-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 🌟 Fonctionnalités

### 📊 Marché Primaire
- **23 émissions institutionnelles** de banques majeures (SG, BNP Paribas, EIB, etc.)
- Filtrage avancé par émetteur, blockchain, devise, statut
- Tri dynamique sur toutes les colonnes
- Export CSV des données
- Visualisations interactives (Charts.js)

### 💹 Marché Secondaire
- **Actualisation automatique toutes les 30 secondes**
- Métriques en temps réel : volume, spread, transactions, prix
- Graphiques d'évolution (prix, spreads)
- Top 5 émetteurs les plus tradés

### 📰 Actualités
- Dernières nouvelles du marché blockchain
- Rotation automatique toutes les 10 minutes
- Catégorisation par type (Innovation, Régulation, ESG, CBDC)

### 🔄 Auto-Update
- **Marché secondaire** : 30 secondes
- **Nouvelles émissions** : 5 minutes
- **Actualités** : 10 minutes
- Notifications visuelles élégantes

## 🎨 Design

- **Glassmorphism** avec effets de transparence
- **Gradient doré** sur valeurs métriques
- **Micro-animations** fluides (ripple, shine, hover)
- **Dark mode** premium
- **Responsive** (desktop, tablette, mobile)

## 🚀 Déploiement Local

```bash
# Cloner le repository
git clone https://github.com/VOTRE_USERNAME/covered-bonds-dashboard.git
cd covered-bonds-dashboard

# Lancer un serveur local
python3 -m http.server 8000

# Ouvrir dans le navigateur
open http://localhost:8000
```

## 📦 Technologies

- **Frontend** : HTML5, CSS3, JavaScript (Vanilla)
- **Charts** : Chart.js
- **Hosting** : GitHub Pages
- **Auto-Update** : Client-side intervals

## 📊 Sources de Données

### Données Vérifiées (Par défaut)
Les données sont basées sur des émissions institutionnelles réelles et vérifiées :
- Société Générale (SG-FORGE)
- European Investment Bank (EIB)
- BNP Paribas
- Berlin Hyp, DekaBank, LBBW (SWIAT)
- Lloyds, Barclays, HSBC
- Huaxia Bank (Chine)

### Intégration API (Optionnel)

Le dashboard supporte l'intégration avec des sources de données en temps réel :

#### 🔗 Etherscan API (Gratuit)
- Données on-chain en temps réel
- Vérification des transactions blockchain
- Liens vers smart contracts
- **Configuration** : Voir [DATA_SOURCES_GUIDE.md](DATA_SOURCES_GUIDE.md)

#### 📊 RWA.xyz API (Payant)
- Données de marché tokenisé
- Métriques RWA globales
- Comparaison avec autres actifs tokenisés
- **Contact** : team@rwa.xyz

### Badges de Source de Données

Le dashboard affiche des badges pour indiquer la source des données :
- 🔗 **Live Data** : Données en temps réel depuis la blockchain
- ✓ **Verified** : Données vérifiées depuis sources institutionnelles
- ⚠ **Simulated** : Données simulées à titre indicatif (marché secondaire)

## 🔧 Configuration Auto-Update

Modifiez les intervalles dans `config.js` :

```javascript
const CONFIG = {
    updateIntervals: {
        onChainData: 60000,      // 1 minute - données blockchain
        primaryMarket: 300000,    // 5 minutes - nouvelles émissions
        secondaryMarket: 30000,   // 30 secondes - marché secondaire
        news: 600000,             // 10 minutes - actualités
    },
    features: {
        etherscanIntegration: true,  // Activer Etherscan
        rwaXyzIntegration: false,    // Activer RWA.xyz
        realTimeUpdates: true,       // Mises à jour automatiques
    }
};
```

## 📝 License

MIT License - Libre d'utilisation

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📧 Contact

Pour toute question ou suggestion, ouvrez une issue sur GitHub.

---

**Made with ❤️ for the blockchain finance community**

