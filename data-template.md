# Template de Données - Covered Bonds Dashboard

Ce fichier explique comment ajouter les champs optionnels pour activer les fonctionnalités avancées.

## Champs Optionnels

### Pour Greenium Analysis
```javascript
yield: 2.35,                    // Rendement réel du bond (%)
conventionalYield: 2.50,        // Rendement équivalent traditionnel (%)
```
**Greenium** = `conventionalYield - yield` (ex: 0.15% = 15 bps)

### Pour Juridiction Distribution
```javascript
jurisdiction: "Loi Allemande (eWpG)",  // Options suggérées:
// - "Loi Française"
// - "Loi Allemande (eWpG)"
// - "Loi Luxembourgeoise"
// - "Loi UK"
// - "Loi US (New York)"
// - "Loi Slovène"
// - Autre juridiction exacte
```

### Pour Smart Contract Links
```javascript
smartContractAddress: "0x40eb908b87f1c45c1a3e6e39e0e6b0c8e7f8b3a2",  // Adresse Ethereum vérifiée
// OU
smartContractAddress: null,  // Si non applicable (Canton Network, BSN, etc.)
```

### Pour Prospectus Links
```javascript
prospectusUrl: "https://www.sgforge.com/bonds/FR0013516549",  // URL officielle du prospectus
```

### Pour Glossaire (Nature du Bond)
```javascript
bondNature: "Native Digital"  // Options:
// - "Native Digital": Émis nativement sur blockchain
// - "Tokenized": Représentation digitale d'un titre existant
```

## Exemple Complet

```javascript
{
    issuer: "Société Générale",
    amount: 50,
    currency: "EUR",
    blockchain: "Ethereum",
    platform: "SG-FORGE",
    issueDate: "2023-12-05",
    maturity: "2028-12-05",
    coupon: 2.5,
    status: "Active",
    rating: "Aaa/AAA",
    greenBond: true,
    cbdcSettlement: false,
    settlementType: "T+1",
    country: "France",
    type: "Green Covered Bond",
    isin: "FR0014009YQ3",
    notes: "Premier green bond digital sur blockchain publique",
    
    // NOUVEAUX CHAMPS OPTIONNELS
    yield: 2.35,
    conventionalYield: 2.50,
    jurisdiction: "Loi Française",
    smartContractAddress: "0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b",
    prospectusUrl: "https://www.sgforge.com/bonds/FR0014009YQ3",
    bondNature: "Native Digital"
}
```

## Comportement si Champs Absents

| Fonctionnalité | Comportement sans données |
|---|---|
| **Greenium Analysis** | Affiche "Données non disponibles" |
| **Settlement Speed** | ✅ Fonctionne (utilise `settlementType` existant) |
| **Juridiction** | Affiche "Non spécifié" dans le graphique |
| **Maturity Wall** | ✅ Fonctionne (utilise `maturity` existant) |
| **Smart Contract Link** | Icône 🔗 grisée avec tooltip "Non disponible" |
| **Prospectus Link** | Icône 📄 grisée avec tooltip "Non disponible" |
| **Glossaire** | ✅ Fonctionne (contenu statique) |

## Sources de Données Recommandées

### Yields
- Bloomberg Terminal
- Refinitiv Eikon
- Prospectus officiels (section "Pricing")

### Smart Contract Addresses
- Etherscan.io (pour Ethereum)
- Documentation plateforme (SG-FORGE, etc.)
- Annonces officielles des émetteurs

### Juridictions
- Prospectus (section "Governing Law")
- Documentation légale de l'émission

### Prospectus URLs
- Sites officiels des émetteurs
- Plateformes réglementaires (AMF, BaFin, etc.)
