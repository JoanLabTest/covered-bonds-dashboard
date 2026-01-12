# Guide d'Utilisation - Sources de Données Réelles

## Configuration des API Keys

### 1. Etherscan API (Gratuit)

Pour activer l'intégration Etherscan et obtenir des données on-chain en temps réel :

1. **Créer un compte** sur [Etherscan.io](https://etherscan.io/register)
2. **Générer une API key** : [https://etherscan.io/myapikey](https://etherscan.io/myapikey)
3. **Ajouter la clé** dans `config.js` :
   ```javascript
   apis: {
       etherscan: {
           enabled: true,
           apiKey: 'VOTRE_CLE_API_ICI',
           ...
       }
   }
   ```

**Limites gratuites** : 5 appels/seconde, 100 000 appels/jour

### 2. RWA.xyz API (Payant)

Pour activer l'intégration RWA.xyz :

1. **Contacter RWA.xyz** : team@rwa.xyz
2. **Obtenir un accès API** (pricing sur demande)
3. **Ajouter la clé** dans `config.js` :
   ```javascript
   apis: {
       rwaXyz: {
           enabled: true,
           apiKey: 'VOTRE_CLE_API_ICI',
           ...
       }
   }
   ```

## Fonctionnalités Activées

### Sans API Keys (Mode par défaut)
- ✅ Données vérifiées institutionnelles
- ✅ Toutes les fonctionnalités de visualisation
- ⚠️ Badge "Données statiques" dans le header
- ⚠️ Pas de mise à jour automatique on-chain

### Avec Etherscan API
- ✅ Données on-chain en temps réel
- ✅ Liens vers smart contracts
- ✅ Vérification des transactions
- ✅ Badge "Live Data" pour émissions on-chain
- ✅ Auto-update toutes les 60 secondes

### Avec RWA.xyz API
- ✅ Données de marché tokenisé
- ✅ Métriques RWA globales
- ✅ Comparaison avec autres actifs tokenisés

## Badges de Source de Données

Le dashboard affiche des badges pour indiquer la source des données :

- 🔗 **Live Data** (vert) : Données en temps réel depuis la blockchain
- ✓ **Verified** (bleu) : Données vérifiées depuis sources institutionnelles
- ⚠ **Simulated** (orange) : Données simulées à titre indicatif

## Smart Contract Addresses

Pour ajouter des adresses de smart contracts vérifiées, modifiez `config.js` :

```javascript
smartContracts: {
    'SG-2019-CB': {
        address: '0x...', // Adresse Ethereum
        blockchain: 'Ethereum',
        explorer: 'https://etherscan.io'
    }
}
```

Les liens Etherscan apparaîtront automatiquement dans le tableau.

## Système de Cache

Le système utilise un cache intelligent pour optimiser les performances :

- **Durée de cache** : 5 minutes par défaut
- **Stockage** : localStorage du navigateur
- **Fallback** : Données statiques si API échoue

Pour vider le cache :
```javascript
// Dans la console du navigateur
dataSourceManager.clearCache();
```

## Dépannage

### "Données statiques" affiché en permanence
- Vérifiez que votre API key est correcte dans `config.js`
- Vérifiez que `enabled: true` pour l'API concernée
- Ouvrez la console (F12) pour voir les erreurs

### Erreur "Rate limit exceeded"
- Attendez quelques secondes entre les requêtes
- Augmentez `rateLimit` dans `config.js`
- Considérez un plan API Pro pour Etherscan

### Données ne se mettent pas à jour
- Vérifiez que `features.realTimeUpdates: true` dans `config.js`
- Vérifiez la connexion internet
- Vérifiez les logs dans la console

## Support

Pour toute question sur l'intégration des APIs :
- Etherscan : [https://docs.etherscan.io/](https://docs.etherscan.io/)
- RWA.xyz : team@rwa.xyz
