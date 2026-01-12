// ============================================
// CONFIGURATION - DATA SOURCES & API SETTINGS
// ============================================

const CONFIG = {
    // API Configuration
    apis: {
        etherscan: {
            enabled: true,
            apiKey: '', // Add your Etherscan API key here (free at etherscan.io/apis)
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

    // Auto-update intervals (in milliseconds)
    updateIntervals: {
        onChainData: 60000, // 1 minute - for Etherscan data
        primaryMarket: 300000, // 5 minutes - for new emissions
        secondaryMarket: 30000, // 30 seconds - for market data
        news: 600000, // 10 minutes - for news rotation
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
