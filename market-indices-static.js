// ============================================
// MARKET INDICES - STATIC DATA
// Reference values for major indices
// Last updated: 2026-01-14
// ============================================

const marketIndicesStatic = [
    {
        symbol: '^FCHI',
        name: 'CAC 40',
        flag: '🇫🇷',
        price: 7650.00,
        change: +45.50,
        changesPercentage: +0.60,
        dayLow: 7605.00,
        dayHigh: 7670.00,
        yearLow: 6800.00,
        yearHigh: 7850.00,
        volume: 0,
        previousClose: 7604.50,
        timestamp: Date.now() / 1000
    },
    {
        symbol: '^GSPC',
        name: 'S&P 500',
        flag: '🇺🇸',
        price: 5850.00,
        change: +25.30,
        changesPercentage: +0.43,
        dayLow: 5825.00,
        dayHigh: 5865.00,
        yearLow: 5200.00,
        yearHigh: 6100.00,
        volume: 0,
        previousClose: 5824.70,
        timestamp: Date.now() / 1000
    },
    {
        symbol: '^GDAXI',
        name: 'DAX',
        flag: '🇩🇪',
        price: 17500.00,
        change: +85.20,
        changesPercentage: +0.49,
        dayLow: 17420.00,
        dayHigh: 17530.00,
        yearLow: 15800.00,
        yearHigh: 18200.00,
        volume: 0,
        previousClose: 17414.80,
        timestamp: Date.now() / 1000
    },
    {
        symbol: '^DJI',
        name: 'Dow Jones',
        flag: '🇺🇸',
        price: 42500.00,
        change: +150.00,
        changesPercentage: +0.35,
        dayLow: 42350.00,
        dayHigh: 42580.00,
        yearLow: 38000.00,
        yearHigh: 44000.00,
        volume: 0,
        previousClose: 42350.00,
        timestamp: Date.now() / 1000
    },
    {
        symbol: '^VIX',
        name: 'VIX',
        flag: '📊',
        price: 14.50,
        change: -0.30,
        changesPercentage: -2.03,
        dayLow: 14.20,
        dayHigh: 15.10,
        yearLow: 12.00,
        yearHigh: 25.00,
        volume: 0,
        previousClose: 14.80,
        timestamp: Date.now() / 1000
    }
];

// Export for use in market-indices.js
window.marketIndicesStatic = marketIndicesStatic;
