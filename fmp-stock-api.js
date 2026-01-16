/**
 * Financial Modeling Prep (FMP) API Integration for Stock Market Data
 * Provides real-time stock quotes for CAC 40 and other indices
 */

class FMPStockApi {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://financialmodelingprep.com/api/v3';
        this.cache = new Map();
        this.cacheExpiry = 60000; // 1 minute cache
    }

    /**
     * Fetch CAC 40 index data
     */
    async getCAC40Index() {
        const ticker = '^FCHI'; // CAC 40 ticker
        return this.getQuote(ticker);
    }

    /**
     * Fetch quote for a specific ticker
     */
    async getQuote(ticker) {
        const cacheKey = `quote_${ticker}`;

        // Check cache first
        const cached = this.getFromCache(cacheKey);
        if (cached) {
            console.log(`[FMP Stock] 📦 Using cached data for ${ticker}`);
            return cached;
        }

        try {
            const url = `${this.baseUrl}/quote/${ticker}?apikey=${this.apiKey}`;
            console.log(`[FMP Stock] 📡 Fetching data for ${ticker}...`);

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            if (!data || data.length === 0) {
                throw new Error('No data returned from FMP API');
            }

            const quote = data[0]; // FMP returns array

            // Transform to our format
            const result = {
                status: 'success',
                source: 'FMP Real-Time Data',
                ticker: ticker,
                name: quote.name || ticker,
                price: quote.price,
                change: quote.change,
                changesPercentage: quote.changesPercentage,
                dayLow: quote.dayLow,
                dayHigh: quote.dayHigh,
                yearLow: quote.yearLow,
                yearHigh: quote.yearHigh,
                marketCap: quote.marketCap,
                volume: quote.volume,
                avgVolume: quote.avgVolume,
                open: quote.open,
                previousClose: quote.previousClose,
                timestamp: quote.timestamp || Date.now(),
                trend: quote.changesPercentage >= 0 ? 'up' : 'down'
            };

            // Cache the result
            this.setCache(cacheKey, result);

            console.log(`[FMP Stock] ✅ Data fetched for ${ticker}:`, {
                price: result.price,
                change: result.changesPercentage
            });

            return result;

        } catch (error) {
            console.error(`[FMP Stock] ❌ Error fetching ${ticker}:`, error.message);
            throw error;
        }
    }

    /**
     * Fetch multiple quotes at once
     */
    async getMultipleQuotes(tickers) {
        const tickerList = tickers.join(',');
        const cacheKey = `quotes_${tickerList}`;

        // Check cache
        const cached = this.getFromCache(cacheKey);
        if (cached) {
            console.log(`[FMP Stock] 📦 Using cached data for multiple quotes`);
            return cached;
        }

        try {
            const url = `${this.baseUrl}/quote/${tickerList}?apikey=${this.apiKey}`;
            console.log(`[FMP Stock] 📡 Fetching ${tickers.length} quotes...`);

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();

            if (!data || data.length === 0) {
                throw new Error('No data returned');
            }

            // Transform all quotes
            const results = data.map(quote => ({
                status: 'success',
                source: 'FMP Real-Time Data',
                ticker: quote.symbol,
                name: quote.name,
                price: quote.price,
                change: quote.change,
                changesPercentage: quote.changesPercentage,
                volume: quote.volume,
                timestamp: quote.timestamp || Date.now(),
                trend: quote.changesPercentage >= 0 ? 'up' : 'down'
            }));

            // Cache results
            this.setCache(cacheKey, results);

            console.log(`[FMP Stock] ✅ Fetched ${results.length} quotes`);
            return results;

        } catch (error) {
            console.error(`[FMP Stock] ❌ Error fetching multiple quotes:`, error.message);
            throw error;
        }
    }

    /**
     * Check if market is open (Euronext Paris)
     */
    isMarketOpen() {
        const now = new Date();
        const day = now.getDay(); // 0 = Sunday, 6 = Saturday
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const time = hours * 60 + minutes;

        // Weekend
        if (day === 0 || day === 6) {
            return false;
        }

        // Euronext Paris: 9:00 - 17:30 CET
        const marketOpen = 9 * 60; // 9:00
        const marketClose = 17 * 60 + 30; // 17:30

        return time >= marketOpen && time < marketClose;
    }

    /**
     * Get from cache
     */
    getFromCache(key) {
        const cached = this.cache.get(key);
        if (!cached) return null;

        const age = Date.now() - cached.timestamp;
        if (age > this.cacheExpiry) {
            this.cache.delete(key);
            return null;
        }

        return cached.data;
    }

    /**
     * Set cache
     */
    setCache(key, data) {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
    }

    /**
     * Clear cache
     */
    clearCache() {
        this.cache.clear();
        console.log('[FMP Stock] 🗑️ Cache cleared');
    }
}

// Export for use in other modules
window.FMPStockApi = FMPStockApi;
