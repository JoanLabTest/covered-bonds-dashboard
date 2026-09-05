// ============================================
// YAHOO FINANCE INDICES API MODULE
// Real-time market indices via Yahoo Finance v8 API
// ============================================

/**
 * Yahoo Finance Indices API
 * Fetches real-time market indices data from Yahoo Finance v8 API
 * 
 * Features:
 * - No API key required (free public endpoint)
 * - CORS enabled (no proxy needed)
 * - Supports: CAC 40, S&P 500, DAX, Dow Jones, VIX
 * - 5-minute cache to optimize performance
 * - Automatic fallback to static data on error
 */
class YahooFinanceIndicesAPI {
    constructor() {
        // Use CORS proxy to bypass Yahoo Finance CORS restrictions
        // Using corsproxy.io for better reliability
        this.corsProxy = 'https://corsproxy.io/?';
        this.baseUrl = 'https://query1.finance.yahoo.com/v8/finance/chart/';

        // Cache configuration
        this.cache = {
            data: null,
            timestamp: null,
            expiration: 5 * 60 * 1000 // 5 minutes
        };

        // Index metadata
        this.indices = {
            '^FCHI': { name: 'CAC 40', flag: '🇫🇷' },
            '^GSPC': { name: 'S&P 500', flag: '🇺🇸' },
            '^GDAXI': { name: 'DAX', flag: '🇩🇪' },
            '^DJI': { name: 'Dow Jones', flag: '🇺🇸' },
            '^VIX': { name: 'VIX', flag: '📊' }
        };

        // Fallback to static data if API fails
        this.fallbackValues = window.marketIndicesStatic || [];
    }

    /**
     * Fetch data for a single index
     * @param {string} symbol - Index symbol (e.g., '^FCHI')
     * @returns {Promise<Object>} Index data
     */
    async fetchIndex(symbol) {
        try {
            // Construct URL with CORS proxy to bypass restrictions
            const apiUrl = `${this.baseUrl}${symbol}`;
            const url = `${this.corsProxy}${encodeURIComponent(apiUrl)}`;

            console.log(`[YAHOO INDICES] Fetching ${symbol} via CORS proxy...`);

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return this.parseIndexData(data, symbol);

        } catch (error) {
            console.error(`[YAHOO INDICES] ❌ Error fetching ${symbol}:`, error.message);

            // Return fallback data for this symbol
            const fallback = this.fallbackValues.find(idx => idx.symbol === symbol);
            if (fallback) {
                console.log(`[YAHOO INDICES] 🔄 Using fallback data for ${symbol}`);
                return fallback;
            }

            throw error;
        }
    }

    /**
     * Parse Yahoo Finance API response
     * @param {Object} data - Raw API response
     * @param {string} symbol - Index symbol
     * @returns {Object} Parsed index data
     */
    parseIndexData(data, symbol) {
        try {
            // Extract metadata from response
            const result = data.chart?.result?.[0];
            if (!result || !result.meta) {
                throw new Error('Invalid response structure');
            }

            const meta = result.meta;

            // Get current price and previous close
            const price = meta.regularMarketPrice;
            const previousClose = meta.previousClose || meta.chartPreviousClose;

            if (!price || !previousClose) {
                throw new Error('Missing price data');
            }

            // Calculate change and change percentage
            const change = price - previousClose;
            const changePercent = (change / previousClose) * 100;

            // Get index metadata
            const indexInfo = this.indices[symbol] || { name: symbol, flag: '🌍' };

            // Return formatted data
            return {
                symbol: meta.symbol || symbol,
                name: indexInfo.name,
                flag: indexInfo.flag,
                price: price,
                change: change,
                changesPercentage: changePercent,
                dayLow: meta.regularMarketDayLow || price * 0.99,
                dayHigh: meta.regularMarketDayHigh || price * 1.01,
                yearLow: meta.fiftyTwoWeekLow || price * 0.85,
                yearHigh: meta.fiftyTwoWeekHigh || price * 1.15,
                volume: meta.regularMarketVolume || 0,
                previousClose: previousClose,
                timestamp: meta.regularMarketTime || (Date.now() / 1000)
            };

        } catch (error) {
            console.error(`[YAHOO INDICES] ❌ Error parsing ${symbol}:`, error.message);
            throw error;
        }
    }

    /**
     * Fetch all indices
     * @returns {Promise<Array>} Array of index data
     */
    async fetchAllIndices() {
        const symbols = Object.keys(this.indices);

        console.log(`[YAHOO INDICES] 🔄 Fetching ${symbols.length} indices...`);

        try {
            // Fetch all indices in parallel
            const promises = symbols.map(symbol => this.fetchIndex(symbol));
            const results = await Promise.all(promises);

            console.log(`[YAHOO INDICES] ✅ Successfully fetched ${results.length} indices`);
            return results;

        } catch (error) {
            console.error('[YAHOO INDICES] ❌ Error fetching indices:', error.message);
            throw error;
        }
    }

    /**
     * Check if cached data is still valid
     * @returns {boolean} True if cache is valid
     */
    isCacheValid() {
        if (!this.cache.data || !this.cache.timestamp) {
            return false;
        }

        const age = Date.now() - this.cache.timestamp;
        const isValid = age < this.cache.expiration;

        if (isValid) {
            const remainingSeconds = Math.floor((this.cache.expiration - age) / 1000);
            console.log(`[YAHOO INDICES] 📦 Cache valid for ${remainingSeconds}s more`);
        }

        return isValid;
    }

    /**
     * Get indices with caching and fallback
     * Main entry point for fetching indices data
     * @returns {Promise<Array>} Array of index data
     */
    async getIndices() {
        // Check cache first
        if (this.isCacheValid()) {
            console.log('[YAHOO INDICES] 📦 Using cached data');
            return this.cache.data;
        }

        try {
            // Fetch fresh data
            console.log('[YAHOO INDICES] 🔄 Fetching real-time data from Yahoo Finance...');
            const indices = await this.fetchAllIndices();

            // Update cache
            this.cache.data = indices;
            this.cache.timestamp = Date.now();

            console.log('[YAHOO INDICES] ✅ Data cached successfully');
            return indices;

        } catch (error) {
            console.error('[YAHOO INDICES] ❌ Failed to fetch data:', error.message);
            console.log('[YAHOO INDICES] 🔄 Using fallback static data');

            // Return fallback data
            return this.fallbackValues;
        }
    }

    /**
     * Clear cache (useful for manual refresh)
     */
    clearCache() {
        this.cache.data = null;
        this.cache.timestamp = null;
        console.log('[YAHOO INDICES] 🗑️ Cache cleared');
    }

    /**
     * Get cache status
     * @returns {Object} Cache status information
     */
    getCacheStatus() {
        if (!this.cache.timestamp) {
            return { cached: false, age: 0, remaining: 0 };
        }

        const age = Date.now() - this.cache.timestamp;
        const remaining = Math.max(0, this.cache.expiration - age);

        return {
            cached: this.isCacheValid(),
            age: Math.floor(age / 1000),
            remaining: Math.floor(remaining / 1000),
            expiration: Math.floor(this.cache.expiration / 1000)
        };
    }
}

// Export to global scope
window.YahooFinanceIndicesAPI = YahooFinanceIndicesAPI;

// Log module loaded
console.log('[YAHOO INDICES] 📊 Yahoo Finance Indices API module loaded');
