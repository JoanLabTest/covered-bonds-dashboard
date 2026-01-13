// ============================================
// CONFIGURATION - DATA SOURCES & API SETTINGS
// ============================================

const CONFIG = {
    // API Configuration
    apis: {
        etherscan: {
            enabled: true,
            apiKey: 'VRNNJJ7MKXMAWSQ22S5SN7DKY4HAIJC5F5', // Etherscan API key configured
            baseUrl: 'https://api.etherscan.io/api',
            rateLimit: 5000, // 5 seconds between calls (free tier: 5 calls/second)
        },
        rwaXyz: {
            enabled: false, // Set to true when you have API access
            apiKey: '', // Add your RWA.xyz API key here
            baseUrl: 'https://api.rwa.xyz/v1',
            rateLimit: 10000, // 10 seconds between calls
        }
    },

    // Economic Calendar Configuration
    economicCalendar: {
        enabled: true,
        provider: 'investing-scraper', // Web scraping from Investing.com
        // CORS proxy to bypass Cloudflare protection
        corsProxy: 'https://api.allorigins.win/raw?url=',
        targetUrl: 'https://www.investing.com/economic-calendar/',
        updateInterval: 600000, // 10 minutes (avoid overloading)
        defaultCountries: ['US', 'EU', 'GB', 'JP', 'CN', 'DE', 'FR'],
        showOnlyHighImportance: false,
        useSimulatedFallback: true // Fallback to simulated data if scraping fails
    },

    // Market Data Configuration (Indices & Stocks)
    // Pour obtenir des données temps réel, créez votre clé API GRATUITE :
    // 1. Allez sur https://twelvedata.com/pricing
    // 2. Cliquez sur "Get Started" (plan FREE - 800 requêtes/jour)
    // 3. Récupérez votre clé API dans votre dashboard
    // 4. Remplacez 'demo' par votre clé ci-dessous
    // Voir TWELVE_DATA_API_SETUP.md pour plus de détails
    marketData: {
        enabled: true,
        provider: 'twelve-data',
        apiKey: 'demo', // Clé de démonstration - Remplacer par votre clé gratuite sur https://twelvedata.com
        baseUrl: 'https://api.twelvedata.com',
        updateInterval: 60000, // 60 seconds (rate limit: 8 calls/minute) feel
        indices: {
            '^FCHI': { name: 'CAC 40', flag: '🇫🇷' },
            '^GSPC': { name: 'S&P 500', flag: '🇺🇸' },
            '^GDAXI': { name: 'DAX', flag: '🇩🇪' },
            '^DJI': { name: 'Dow Jones', flag: '🇺🇸' },
            '^VIX': { name: 'VIX', flag: '📊' }
        },
        cac40Stocks: {
            'Luxe': ['MC.PA', 'RMS.PA', 'KER.PA', 'OR.PA'],
            'Banque & Finance': ['BNP.PA', 'ACA.PA', 'GLE.PA', 'CS.PA'],
            'Énergie': ['TTE.PA', 'ENGI.PA'],
            'Automobile': ['STLAM.MI', 'RNO.PA'],
            'Aéronautique & Défense': ['AIR.PA', 'SAF.PA', 'HO.PA', 'AM.PA'],
            'Technologie': ['STM.PA', 'CAP.PA', 'DSY.PA', 'WLN.PA'],
            'Télécoms': ['ORA.PA'],
            'Santé & Pharma': ['SAN.PA', 'EL.PA'],
            'Matériaux': ['AI.PA', 'SGO.PA', 'MT.AS'],
            'Industrie': ['SU.PA', 'LR.PA', 'DG.PA', 'EN.PA', 'FGR.PA'],
            'Biens de Consommation': ['BN.PA', 'RI.PA', 'CA.PA'],
            'Services': ['PUB.PA', 'SW.PA', 'AC.PA'],
            'Immobilier': ['URW.AS']
        }
    },

    // Auto-update intervals (in milliseconds)
    updateIntervals: {
        onChainData: 60000, // 1 minute - for Etherscan data
        primaryMarket: 300000, // 5 minutes - for new emissions
        secondaryMarket: 30000, // 30 seconds - for market data
        news: 600000, // 10 minutes - for news rotation
        economicCalendar: 300000, // 5 minutes - for economic events
    },

    // Cache settings
    cache: {
        enabled: true,
        expirationTime: 300000, // 5 minutes
        localStorage: true, // Use localStorage for persistence
    },

    // Known smart contract addresses (verified on-chain)
    smartContracts: {
        // Société Générale covered bonds
        'SG-2019-CB': {
            address: null, // Not publicly available
            blockchain: 'Ethereum',
            explorer: 'https://etherscan.io'
        },
        // EIB digital bonds
        'EIB-2021-DB': {
            address: null, // Private blockchain
            blockchain: 'Ethereum',
            explorer: 'https://etherscan.io'
        },
        // Add verified contract addresses as they become available
    },

    // Data source priorities (1 = highest priority)
    dataSources: {
        priority: {
            onChain: 1, // Etherscan, The Graph
            verified: 2, // Manually verified institutional data
            simulated: 3, // Simulated market data (with disclaimer)
        }
    },

    // Fallback settings
    fallback: {
        useStaticData: true, // Use static data if API fails
        showWarnings: true, // Show warnings when using fallback
        retryAttempts: 3, // Number of retry attempts for API calls
        retryDelay: 5000, // Delay between retries (ms)
    },

    // Display settings
    display: {
        showDataSourceBadges: true, // Show "Live Data", "Verified", "Simulated" badges
        showLastUpdate: true, // Show last update timestamp
        showApiStatus: true, // Show API connection status
    },

    // Feature flags
    features: {
        etherscanIntegration: true,
        rwaXyzIntegration: false, // Enable when API key available
        theGraphIntegration: false, // Future feature
        realTimeUpdates: true,
        exportData: true,
    }
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
