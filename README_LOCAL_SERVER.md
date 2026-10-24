# 🚀 Comment Lancer le Dashboard Localement

## Problème Identifié

Lorsque vous ouvrez `index.html` directement dans votre navigateur (protocole `file://`), les données ne se chargent pas automatiquement en raison des restrictions de sécurité du navigateur sur les requêtes API.

**Symptômes:**
- ✅ Le dashboard s'affiche correctement
- ❌ Les taux EURIBOR, BUND, SWAP affichent des tirets `-`
- ❌ Les cotations CAC40 n'apparaissent pas
- ✅ L'appel manuel de l'API fonctionne parfaitement (testé en console)

## Solution: Serveur HTTP Local

Pour que toutes les données se chargent correctement, vous devez servir le dashboard via un serveur HTTP local.

### Option 1: Script Automatique (Recommandé)

```bash
# Dans le dossier covered-bonds-dashboard
./start-server.sh
```

Puis ouvrez votre navigateur à l'adresse: **http://localhost:8000**

### Option 2: Commande Python Directe

```bash
# Python 3
python3 -m http.server 8000

# OU Python 2
python -m SimpleHTTPServer 8000
```

Puis ouvrez: **http://localhost:8000**

### Option 3: Node.js (si installé)

```bash
# Installer http-server globalement (une seule fois)
npm install -g http-server

# Lancer le serveur
http-server -p 8000
```

Puis ouvrez: **http://localhost:8000**

## Vérification

Une fois le serveur lancé et le dashboard ouvert sur `http://localhost:8000`:

1. **Onglet "Covered Bonds (Traditionnels)"**
   - ✅ EURIBOR 3M: 3.65%, 6M: 3.45%, 12M: 3.25%
   - ✅ BUND 10Y: 2.91%, OAT 10Y: 2.91%
   - ✅ SWAP EUR 2Y: 3.12%, 5Y: 2.88%, 10Y: 2.75%
   - ✅ Badge: "✅ Données Réelles - ECB Data Portal"

2. **Onglet "Digital Bonds (Blockchain)"**
   - ✅ Cotations CAC40 avec données réelles Marketstack (EOD)
   - ✅ Badge: "✅ Données Réelles - Marketstack (Euronext Paris, EOD)"

3. **Console du navigateur**
   - ✅ Aucune erreur CORS
   - ✅ Logs: `[ECB RATES] ✅ All rates fetched successfully`
   - ✅ Logs: `[MARKETSTACK] ✅ Fetched X stocks successfully`

## Pourquoi Cela Fonctionne sur GitHub Pages?

GitHub Pages sert automatiquement les fichiers via HTTPS, ce qui permet aux requêtes API de fonctionner sans restriction. C'est pourquoi vous voyez les données correctement sur:
- ✅ https://joanl.github.io/covered-bonds-dashboard/

## Notes Importantes

- 🔒 **Sécurité**: Ce serveur local est uniquement pour le développement, ne l'exposez pas à Internet
- 🌐 **Port**: Si le port 8000 est déjà utilisé, changez-le (ex: 8080, 3000, etc.)
- 🔄 **Rechargement**: Pas besoin de redémarrer le serveur après modification des fichiers, rafraîchissez simplement le navigateur
- ⚡ **Performance**: Le serveur Python est suffisant pour le développement local

## Dépannage

### Le serveur ne démarre pas
```bash
# Vérifier si Python est installé
python3 --version

# Si non installé, installer Python depuis python.org
```

### Port déjà utilisé
```bash
# Utiliser un autre port
python3 -m http.server 8080

# Puis ouvrir: http://localhost:8080
```

### Les données ne se chargent toujours pas
1. Vider le cache du navigateur: `Cmd+Shift+R` (Mac) ou `Ctrl+Shift+R` (Windows)
2. Ouvrir la console (F12) et vérifier les erreurs
3. Vérifier que vous accédez bien via `http://localhost:8000` et non `file://`

## Résumé

| Méthode d'Accès | Données ECB | Données CAC40 | Recommandation |
|-----------------|-------------|---------------|----------------|
| `file://` (double-clic) | ❌ | ❌ | ⛔ Ne pas utiliser |
| `http://localhost:8000` | ✅ | ✅ | ✅ **Recommandé** |
| GitHub Pages (HTTPS) | ✅ | ✅ | ✅ Production |

---

**🎯 Action Recommandée**: Utilisez toujours `./start-server.sh` pour tester localement!
