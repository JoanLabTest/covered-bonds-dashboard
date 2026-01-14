# Configuration de l'API Financial Modeling Prep

## Obtenir votre Clé API Gratuite

1. **Créer un compte gratuit** :
   - Visitez : https://site.financialmodelingprep.com/register
   - Inscrivez-vous avec votre email
   - Confirmez votre email

2. **Récupérer votre clé API** :
   - Connectez-vous à votre compte
   - Allez dans "Dashboard" ou "API Keys"
   - Copiez votre clé API

3. **Plan gratuit** :
   - 250 requêtes par jour
   - Accès au calendrier économique
   - Données en temps réel
   - Parfait pour ce projet !

## Configuration dans le Dashboard

### Étape 1 : Ajouter la clé API

Ouvrez le fichier `config.js` et ajoutez votre clé API :

```javascript
economicCalendar: {
    enabled: true,
    provider: 'fmp-api',
    apiKey: 'VOTRE_CLE_API_ICI', // ← Collez votre clé ici
    baseUrl: 'https://financialmodelingprep.com/api/v3/economic_calendar',
    scheduledUpdates: [8, 12, 16, 18], // Mises à jour à 8h, 12h, 16h, 18h
    // ...
}
```

### Étape 2 : Vérifier la configuration

Les mises à jour sont programmées automatiquement aux heures suivantes :
- **8h00** : Mise à jour matinale
- **12h00** : Mise à jour midi
- **16h00** : Mise à jour après-midi
- **18h00** : Mise à jour fin de journée

Entre ces heures, les données sont mises en cache pour éviter de consommer des requêtes API inutilement.

## Comment ça fonctionne

### Système de Mises à Jour Programmées

1. **Au chargement de la page** :
   - Le système vérifie si l'heure actuelle correspond à une heure programmée
   - Si oui, il récupère les données de l'API
   - Sinon, il utilise les données en cache (valides 4 heures)

2. **Mises à jour automatiques** :
   - Le système calcule la prochaine heure programmée
   - Il programme automatiquement la prochaine mise à jour
   - Pas besoin de recharger la page !

3. **Gestion du cache** :
   - Les données sont stockées dans localStorage
   - Cache valide pendant 4 heures
   - Si l'API échoue, le cache est utilisé
   - En dernier recours, données simulées

### Logs de Console

Vous pouvez suivre l'activité dans la console du navigateur :

```
[FMP API] 🔄 Fetching real data from Financial Modeling Prep...
[FMP API] 📡 Request: 2026-01-14 to 2026-01-21
[FMP API] 📥 Response status: 200 OK
[FMP API] 📄 Received 45 events
[FMP API] ✅ Successfully transformed 45 events
[FMP API] 💾 Data cached successfully
[FMP API] ⏰ Next update scheduled for 12:00:00 (in 3h 45m)
```

## Consommation API

### Estimation quotidienne

Avec 4 mises à jour par jour :
- **4 requêtes/jour** pour le calendrier économique
- **Largement en dessous** de la limite de 250 requêtes/jour
- **Vous pouvez** ajouter d'autres fonctionnalités sans problème

### Optimisations

Le système est optimisé pour minimiser les requêtes :
- ✅ Cache de 4 heures entre les mises à jour
- ✅ Pas de requêtes continues
- ✅ Mises à jour uniquement aux heures programmées
- ✅ Fallback sur cache si API indisponible

## Données Disponibles

L'API FMP fournit :
- **Événements économiques** : CPI, GDP, Employment, etc.
- **Prévisions** (forecast/estimate)
- **Valeurs précédentes** (previous)
- **Valeurs réelles** (actual) une fois publiées
- **Impact** : High, Medium, Low
- **Pays** : US, EU, UK, JP, CN, etc.

## Dépannage

### Problème : "API key not configured"

**Solution** : Vérifiez que vous avez bien ajouté votre clé API dans `config.js`

### Problème : "403 Forbidden" ou "401 Unauthorized"

**Solution** : 
- Vérifiez que votre clé API est correcte
- Vérifiez que votre compte est actif
- Vérifiez que vous n'avez pas dépassé la limite de 250 requêtes/jour

### Problème : "No events found"

**Solution** :
- C'est normal si aucun événement n'est prévu dans les 7 prochains jours
- Le système utilisera automatiquement les données en cache ou simulées

### Problème : Les données ne se mettent pas à jour

**Solution** :
- Ouvrez la console du navigateur (F12)
- Vérifiez les logs `[FMP API]`
- Vérifiez l'heure de la prochaine mise à jour programmée

## Support

- **Documentation FMP** : https://site.financialmodelingprep.com/developer/docs
- **Support FMP** : https://site.financialmodelingprep.com/contact
- **Statut API** : https://site.financialmodelingprep.com/developer/docs/status

## Prochaines Étapes

Une fois configuré, le calendrier économique affichera :
- ✅ Badge vert "Données Réelles - Financial Modeling Prep"
- ✅ Événements économiques réels
- ✅ Mises à jour automatiques aux heures programmées
- ✅ Données fiables pour usage professionnel
