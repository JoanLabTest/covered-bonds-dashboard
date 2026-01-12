// ============================================
// DATA SOURCES MODULE
// Handles API integration, caching, and fallback
// ============================================

class DataSourceManager {
    constructor(config) {
        this.config = config;
        this.cache = new Map();
        this.apiStatus = {
            etherscan: 'disconnected',
            rwaXyz: 'disconnected'
        };
        this.lastUpdate = {
            onChain: null,
            primaryMarket: null,
            secondaryMarket: null
        };

        // Initialize localStorage cache if enabled
        if (this.config.cache.localStorage) {
            this.loadCacheFromStorage();
        }
    }

    // ============================================
    // CACHE MANAGEMENT
    // ============================================

    getCached(key) {
        const cached = this.cache.get(key);
        if (!cached) return null;

        const now = Date.now();
        if (now - cached.timestamp > this.config.cache.expirationTime) {
            this.cache.delete(key);
            return null;
        }

        return cached.data;
    }

    setCache(key, data) {
        this.cache.set(key, {
            data: data,
            timestamp: Date.now()
        });

        if (this.config.cache.localStorage) {
            this.saveCacheToStorage();
        }
    }

    loadCacheFromStorage() {
        try {
            const stored = localStorage.getItem('coveredBondsCache');
            if (stored) {
                const parsed = JSON.parse(stored);
                this.cache = new Map(Object.entries(parsed));
            }
        } catch (error) {
            console.warn('Failed to load cache from storage:', error);
        }
    }

    saveCacheToStorage() {
        try {
            const cacheObj = Object.fromEntries(this.cache);
            localStorage.setItem('coveredBondsCache', JSON.stringify(cacheObj));
        } catch (error) {
            console.warn('Failed to save cache to storage:', error);
        }
    }

    clearCache() {
        this.cache.clear();
        if (this.config.cache.localStorage) {
            localStorage.removeItem('coveredBondsCache');
        }
    }

    // ============================================
    // ETHERSCAN API INTEGRATION
    // ============================================

    async fetchEtherscanData(contractAddress) {
        if (!this.config.apis.etherscan.enabled || !this.config.apis.etherscan.apiKey) {
            console.warn('Etherscan API not configured');
            return null;
        }

        const cacheKey = `etherscan_${contractAddress}`;
        const cached = this.getCached(cacheKey);
        if (cached) return cached;

        try {
            const url = `${this.config.apis.etherscan.baseUrl}?module=account&action=balance&address=${contractAddress}&tag=latest&apikey=${this.config.apis.etherscan.apiKey}`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.status === '1') {
                this.setCache(cacheKey, data.result);
                this.apiStatus.etherscan = 'connected';
                return data.result;
            } else {
                console.error('Etherscan API error:', data.message);
                this.apiStatus.etherscan = 'error';
                return null;
            }
        } catch (error) {
            console.error('Failed to fetch Etherscan data:', error);
            this.apiStatus.etherscan = 'error';
            return null;
        }
    }

    async fetchTokenTransfers(contractAddress, startBlock = 0) {
        if (!this.config.apis.etherscan.enabled || !this.config.apis.etherscan.apiKey) {
            return null;
        }

        const cacheKey = `etherscan_transfers_${contractAddress}`;
        const cached = this.getCached(cacheKey);
        if (cached) return cached;

        try {
            const url = `${this.config.apis.etherscan.baseUrl}?module=account&action=tokentx&address=${contractAddress}&startblock=${startBlock}&endblock=99999999&sort=desc&apikey=${this.config.apis.etherscan.apiKey}`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.status === '1') {
                this.setCache(cacheKey, data.result);
                this.apiStatus.etherscan = 'connected';
                return data.result;
            } else {
                this.apiStatus.etherscan = 'error';
                return null;
            }
        } catch (error) {
            console.error('Failed to fetch token transfers:', error);
            this.apiStatus.etherscan = 'error';
            return null;
        }
    }

    // ============================================
    // RWA.XYZ API INTEGRATION
    // ============================================

    async fetchRWAData(assetType = 'bonds') {
        if (!this.config.apis.rwaXyz.enabled || !this.config.apis.rwaXyz.apiKey) {
            console.warn('RWA.xyz API not configured');
            return null;
        }

        const cacheKey = `rwa_${assetType}`;
        const cached = this.getCached(cacheKey);
        if (cached) return cached;

        try {
            const url = `${this.config.apis.rwaXyz.baseUrl}/assets?type=${assetType}`;

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${this.config.apis.rwaXyz.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            this.setCache(cacheKey, data);
            this.apiStatus.rwaXyz = 'connected';
            return data;
        } catch (error) {
            console.error('Failed to fetch RWA.xyz data:', error);
            this.apiStatus.rwaXyz = 'error';
            return null;
        }
    }

    // ============================================
    // DATA ENRICHMENT
    // ============================================

    async enrichEmissionData(emission) {
        // Add on-chain data if smart contract address is available
        if (emission.smartContractAddress) {
            const onChainData = await this.fetchEtherscanData(emission.smartContractAddress);
            if (onChainData) {
                emission.onChainBalance = onChainData;
                emission.dataSource = 'on-chain';
            }
        }

        // Add explorer link
        if (emission.blockchain === 'Ethereum' && emission.smartContractAddress) {
            emission.explorerUrl = `https://etherscan.io/address/${emission.smartContractAddress}`;
        }

        // Mark data source
        if (!emission.dataSource) {
            emission.dataSource = 'verified'; // Manually verified institutional data
        }

        return emission;
    }

    async enrichAllEmissions(emissions) {
        const enriched = [];
        for (const emission of emissions) {
            const enrichedEmission = await this.enrichEmissionData(emission);
            enriched.push(enrichedEmission);

            // Rate limiting
            await this.sleep(this.config.apis.etherscan.rateLimit);
        }
        return enriched;
    }

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    getApiStatus() {
        return this.apiStatus;
    }

    getLastUpdate() {
        return this.lastUpdate;
    }

    updateLastUpdate(type) {
        this.lastUpdate[type] = new Date();
    }

    // ============================================
    // DATA SOURCE BADGES
    // ============================================

    getDataSourceBadge(dataSource) {
        const badges = {
            'on-chain': {
                text: 'Live Data',
                color: '#10b981',
                icon: '🔗',
                tooltip: 'Données en temps réel depuis la blockchain'
            },
            'verified': {
                text: 'Verified',
                color: '#3b82f6',
                icon: '✓',
                tooltip: 'Données vérifiées depuis sources institutionnelles'
            },
            'simulated': {
                text: 'Simulated',
                color: '#f59e0b',
                icon: '⚠',
                tooltip: 'Données simulées à titre indicatif'
            }
        };

        return badges[dataSource] || badges['verified'];
    }

    createBadgeHTML(dataSource) {
        const badge = this.getDataSourceBadge(dataSource);
        return `<span class="data-source-badge" 
                      style="background: ${badge.color}; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; margin-left: 8px;"
                      title="${badge.tooltip}">
                    ${badge.icon} ${badge.text}
                </span>`;
    }

    // ============================================
    // ERROR HANDLING & FALLBACK
    // ============================================

    async fetchWithRetry(fetchFunction, retries = null) {
        const maxRetries = retries || this.config.fallback.retryAttempts;

        for (let i = 0; i < maxRetries; i++) {
            try {
                const result = await fetchFunction();
                if (result) return result;
            } catch (error) {
                console.warn(`Attempt ${i + 1} failed:`, error);
                if (i < maxRetries - 1) {
                    await this.sleep(this.config.fallback.retryDelay);
                }
            }
        }

        if (this.config.fallback.showWarnings) {
            console.warn('All retry attempts failed, using fallback data');
        }

        return null;
    }
}

// Initialize global data source manager
let dataSourceManager = null;

function initializeDataSources(config) {
    dataSourceManager = new DataSourceManager(config);
    return dataSourceManager;
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DataSourceManager, initializeDataSources };
}
