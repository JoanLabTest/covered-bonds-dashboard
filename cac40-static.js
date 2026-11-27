// ============================================
// CAC 40 - STATIC DATA
// Reference values for all 40 CAC 40 stocks organized by sector
// Last updated: 2026-01-14
// ============================================

const cac40StaticData = [
    // Luxe (4 actions)
    { symbol: 'MC.PA', name: 'LVMH', sector: 'Luxe', price: 850.00, change: +5.20, changesPercentage: +0.61, volume: 450000, dayLow: 845.00, dayHigh: 855.00, previousClose: 844.80 },
    { symbol: 'RMS.PA', name: 'Hermès', sector: 'Luxe', price: 2150.00, change: +12.00, changesPercentage: +0.56, volume: 25000, dayLow: 2140.00, dayHigh: 2160.00, previousClose: 2138.00 },
    { symbol: 'KER.PA', name: 'Kering', sector: 'Luxe', price: 285.00, change: -2.50, changesPercentage: -0.87, volume: 180000, dayLow: 283.00, dayHigh: 288.00, previousClose: 287.50 },
    { symbol: 'OR.PA', name: "L'Oréal", sector: 'Luxe', price: 425.00, change: +3.20, changesPercentage: +0.76, volume: 320000, dayLow: 422.00, dayHigh: 427.00, previousClose: 421.80 },

    // Banque & Finance (4 actions)
    { symbol: 'BNP.PA', name: 'BNP Paribas', sector: 'Banque & Finance', price: 65.50, change: +0.80, changesPercentage: +1.24, volume: 2500000, dayLow: 64.80, dayHigh: 65.80, previousClose: 64.70 },
    { symbol: 'ACA.PA', name: 'Crédit Agricole', sector: 'Banque & Finance', price: 14.20, change: +0.15, changesPercentage: +1.07, volume: 3200000, dayLow: 14.05, dayHigh: 14.25, previousClose: 14.05 },
    { symbol: 'GLE.PA', name: 'Société Générale', sector: 'Banque & Finance', price: 28.50, change: +0.40, changesPercentage: +1.42, volume: 1800000, dayLow: 28.10, dayHigh: 28.60, previousClose: 28.10 },
    { symbol: 'CS.PA', name: 'AXA', sector: 'Banque & Finance', price: 32.80, change: +0.25, changesPercentage: +0.77, volume: 1500000, dayLow: 32.55, dayHigh: 32.90, previousClose: 32.55 },

    // Énergie (2 actions)
    { symbol: 'TTE.PA', name: 'TotalEnergies', sector: 'Énergie', price: 68.50, change: +1.20, changesPercentage: +1.78, volume: 3500000, dayLow: 67.30, dayHigh: 68.80, previousClose: 67.30 },
    { symbol: 'ENGI.PA', name: 'Engie', sector: 'Énergie', price: 16.80, change: +0.10, changesPercentage: +0.60, volume: 2100000, dayLow: 16.70, dayHigh: 16.90, previousClose: 16.70 },

    // Automobile (2 actions)
    { symbol: 'STLAM.MI', name: 'Stellantis', sector: 'Automobile', price: 18.50, change: -0.30, changesPercentage: -1.60, volume: 4200000, dayLow: 18.40, dayHigh: 18.90, previousClose: 18.80 },
    { symbol: 'RNO.PA', name: 'Renault', sector: 'Automobile', price: 45.20, change: -0.80, changesPercentage: -1.74, volume: 1600000, dayLow: 45.00, dayHigh: 46.20, previousClose: 46.00 },

    // Aéronautique & Défense (4 actions)
    { symbol: 'AIR.PA', name: 'Airbus', sector: 'Aéronautique & Défense', price: 145.00, change: +2.50, changesPercentage: +1.75, volume: 950000, dayLow: 143.00, dayHigh: 145.50, previousClose: 142.50 },
    { symbol: 'SAF.PA', name: 'Safran', sector: 'Aéronautique & Défense', price: 195.00, change: +3.00, changesPercentage: +1.56, volume: 680000, dayLow: 192.50, dayHigh: 195.80, previousClose: 192.00 },
    { symbol: 'HO.PA', name: 'Thales', sector: 'Aéronautique & Défense', price: 142.00, change: +1.80, changesPercentage: +1.28, volume: 420000, dayLow: 140.50, dayHigh: 142.50, previousClose: 140.20 },
    { symbol: 'AM.PA', name: 'Dassault Aviation', sector: 'Aéronautique & Défense', price: 185.00, change: +2.20, changesPercentage: +1.20, volume: 35000, dayLow: 183.00, dayHigh: 186.00, previousClose: 182.80 },

    // Technologie (4 actions)
    { symbol: 'STM.PA', name: 'STMicroelectronics', sector: 'Technologie', price: 42.50, change: +0.80, changesPercentage: +1.92, volume: 1800000, dayLow: 41.80, dayHigh: 42.80, previousClose: 41.70 },
    { symbol: 'CAP.PA', name: 'Capgemini', sector: 'Technologie', price: 195.00, change: +1.50, changesPercentage: +0.78, volume: 380000, dayLow: 193.50, dayHigh: 196.00, previousClose: 193.50 },
    { symbol: 'DSY.PA', name: 'Dassault Systèmes', sector: 'Technologie', price: 38.50, change: -0.40, changesPercentage: -1.03, volume: 620000, dayLow: 38.30, dayHigh: 39.00, previousClose: 38.90 },
    { symbol: 'WLN.PA', name: 'Worldline', sector: 'Technologie', price: 12.80, change: -0.20, changesPercentage: -1.54, volume: 1200000, dayLow: 12.70, dayHigh: 13.10, previousClose: 13.00 },

    // Télécoms (1 action)
    { symbol: 'ORA.PA', name: 'Orange', sector: 'Télécoms', price: 10.50, change: +0.05, changesPercentage: +0.48, volume: 5200000, dayLow: 10.45, dayHigh: 10.55, previousClose: 10.45 },

    // Santé & Pharma (2 actions)
    { symbol: 'SAN.PA', name: 'Sanofi', sector: 'Santé & Pharma', price: 95.00, change: +0.60, changesPercentage: +0.64, volume: 1400000, dayLow: 94.50, dayHigh: 95.50, previousClose: 94.40 },
    { symbol: 'EL.PA', name: 'EssilorLuxottica', sector: 'Santé & Pharma', price: 205.00, change: +1.80, changesPercentage: +0.89, volume: 450000, dayLow: 203.50, dayHigh: 206.00, previousClose: 203.20 },

    // Matériaux (3 actions)
    { symbol: 'AI.PA', name: 'Air Liquide', sector: 'Matériaux', price: 175.00, change: +1.20, changesPercentage: +0.69, volume: 780000, dayLow: 174.00, dayHigh: 175.80, previousClose: 173.80 },
    { symbol: 'SGO.PA', name: 'Saint-Gobain', sector: 'Matériaux', price: 72.50, change: +0.90, changesPercentage: +1.26, volume: 1100000, dayLow: 71.80, dayHigh: 72.80, previousClose: 71.60 },
    { symbol: 'MT.AS', name: 'ArcelorMittal', sector: 'Matériaux', price: 25.80, change: -0.40, changesPercentage: -1.53, volume: 2800000, dayLow: 25.60, dayHigh: 26.30, previousClose: 26.20 },

    // Industrie (5 actions)
    { symbol: 'SU.PA', name: 'Schneider Electric', sector: 'Industrie', price: 215.00, change: +2.50, changesPercentage: +1.18, volume: 620000, dayLow: 213.00, dayHigh: 216.00, previousClose: 212.50 },
    { symbol: 'LR.PA', name: 'Legrand', sector: 'Industrie', price: 95.50, change: +0.80, changesPercentage: +0.85, volume: 480000, dayLow: 94.80, dayHigh: 95.80, previousClose: 94.70 },
    { symbol: 'DG.PA', name: 'Vinci', sector: 'Industrie', price: 115.00, change: +1.20, changesPercentage: +1.05, volume: 920000, dayLow: 114.00, dayHigh: 115.50, previousClose: 113.80 },
    { symbol: 'EN.PA', name: 'Bouygues', sector: 'Industrie', price: 35.50, change: +0.40, changesPercentage: +1.14, volume: 850000, dayLow: 35.20, dayHigh: 35.70, previousClose: 35.10 },
    { symbol: 'FGR.PA', name: 'Eiffage', sector: 'Industrie', price: 98.00, change: +0.70, changesPercentage: +0.72, volume: 320000, dayLow: 97.50, dayHigh: 98.50, previousClose: 97.30 },

    // Biens de Consommation (3 actions)
    { symbol: 'BN.PA', name: 'Danone', sector: 'Biens de Consommation', price: 62.50, change: +0.30, changesPercentage: +0.48, volume: 1200000, dayLow: 62.20, dayHigh: 62.80, previousClose: 62.20 },
    { symbol: 'RI.PA', name: 'Pernod Ricard', sector: 'Biens de Consommation', price: 145.00, change: -0.80, changesPercentage: -0.55, volume: 420000, dayLow: 144.50, dayHigh: 146.20, previousClose: 145.80 },
    { symbol: 'CA.PA', name: 'Carrefour', sector: 'Biens de Consommation', price: 16.20, change: +0.10, changesPercentage: +0.62, volume: 1800000, dayLow: 16.10, dayHigh: 16.30, previousClose: 16.10 },

    // Services (3 actions)
    { symbol: 'PUB.PA', name: 'Publicis', sector: 'Services', price: 95.00, change: +1.20, changesPercentage: +1.28, volume: 680000, dayLow: 94.00, dayHigh: 95.50, previousClose: 93.80 },
    { symbol: 'SW.PA', name: 'Sodexo', sector: 'Services', price: 82.50, change: +0.60, changesPercentage: +0.73, volume: 320000, dayLow: 82.00, dayHigh: 83.00, previousClose: 81.90 },
    { symbol: 'AC.PA', name: 'Accor', sector: 'Services', price: 42.00, change: +0.50, changesPercentage: +1.20, volume: 580000, dayLow: 41.60, dayHigh: 42.30, previousClose: 41.50 },

    // Immobilier (1 action)
    { symbol: 'URW.AS', name: 'Unibail-Rodamco-Westfield', sector: 'Immobilier', price: 75.00, change: -0.50, changesPercentage: -0.66, volume: 420000, dayLow: 74.50, dayHigh: 75.80, previousClose: 75.50 },

    // Add CAC 40 Index itself for metrics
    { symbol: '^FCHI', name: 'CAC 40', sector: 'Index', price: 7650.00, change: +45.50, changesPercentage: +0.60, volume: 0, dayLow: 7605.00, dayHigh: 7670.00, previousClose: 7604.50 }
];

// Export for use in cac40.js
window.cac40StaticData = cac40StaticData;

console.log('[CAC 40 STATIC] ✅ Loaded 40 CAC 40 stocks + index');
