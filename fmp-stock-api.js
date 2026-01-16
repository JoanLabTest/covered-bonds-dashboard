/**
 * Yahoo Finance API Integration for Stock Market Data
 * Provides real-time stock quotes for CAC 40 and other indices
 * (Switched from FMP due to legacy endpoint deprecation)
 */

class YahooFinanceStockApi {
    constructor() {
        this.baseUrl = 'https://query1.finance.yahoo.com/v8/finance/chart';
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
     * Fetch quote for a specific ticker using Yahoo Finance
     * (FMP legacy endpoint no longer available for free tier)
     */
    async getQuote(ticker) {
        const cacheKey = `quote_${ticker}`;

        // Check cache first
        const cached = this.getFromCache(cacheKey);
        if (cached) {
            console.log(`[Yahoo Finance] 📦 Using cached data for ${ticker}`);
            return cached;
        }

        try {
            // Use CORS proxy to bypass browser CORS restrictions
            const corsProxy = 'https://corsproxy.io/?';
            const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=1d`;
            const url = corsProxy + encodeURIComponent(yahooUrl);

            console.log(`[Yahoo Finance] 📡 Fetching data for ${ticker} via CORS proxy...`);

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            if (!data || !data.chart || !data.chart.result || data.chart.result.length === 0) {
                throw new Error('No data returned from Yahoo Finance API');
            }

            const result = data.chart.result[0];
            const meta = result.meta;
            const quote = result.indicators.quote[0];

            // Calculate change
            const currentPrice = meta.regularMarketPrice;
            const previousClose = meta.previousClose;
            const change = currentPrice - previousClose;
            const changesPercentage = (change / previousClose) * 100;

            // Transform to our format
            const transformedData = {
                status: 'success',
                source: 'Yahoo Finance Real-Time',
                ticker: ticker,
                name: meta.symbol || ticker,
                price: currentPrice,
                change: change,
                changesPercentage: changesPercentage,
                dayLow: meta.regularMarketDayLow,
                dayHigh: meta.regularMarketDayHigh,
                volume: meta.regularMarketVolume,
                open: meta.regularMarketOpen || quote.open[quote.open.length - 1],
                previousClose: previousClose,
                timestamp: meta.regularMarketTime || Date.now(),
                trend: changesPercentage >= 0 ? 'up' : 'down'
            };

            // Cache the result
            this.setCache(cacheKey, transformedData);

            console.log(`[Yahoo Finance] ✅ Data fetched for ${ticker}:`, {
                price: transformedData.price,
                change: transformedData.changesPercentage.toFixed(2) + '%'
            });

            return transformedData;

        } catch (error) {
            console.error(`[Yahoo Finance] ❌ Error fetching ${ticker}:`, error.message);
            throw error;
        }
    }

    /**
     * Fetch multiple quotes at once using Yahoo Finance batch API
     * Optimized for CAC 40 stocks (40 tickers in one call)
     */
    async getMultipleQuotesYahoo(tickers) {
        const cacheKey = `batch_${tickers.join(',')}`;

        // Check cache
        const cached = this.getFromCache(cacheKey);
        if (cached) {
            console.log(`[Yahoo Finance] 📦 Using cached data for ${tickers.length} stocks`);
            return cached;
        }

        try {
            // Use Yahoo Finance v7 quote API for batch requests
            const corsProxy = 'https://corsproxy.io/?';
            const symbols = tickers.join(',');
            const yahooUrl = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols}`;
            const url = corsProxy + encodeURIComponent(yahooUrl);

            console.log(`[Yahoo Finance] 📡 Fetching ${tickers.length} stocks via CORS proxy...`);

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            if (!data || !data.quoteResponse || !data.quoteResponse.result || data.quoteResponse.result.length === 0) {
                throw new Error('No data returned from Yahoo Finance batch API');
            }

            const quotes = data.quoteResponse.result;

            // Transform all quotes to our format
            const transformedQuotes = quotes.map(quote => {
                const currentPrice = quote.regularMarketPrice;
                const previousClose = quote.regularMarketPreviousClose;
                const change = currentPrice - previousClose;
                const changesPercentage = (change / previousClose) * 100;

                return {
                    status: 'success',
                    source: 'Yahoo Finance Real-Time',
                    symbol: quote.symbol,
                    name: quote.shortName || quote.longName || quote.symbol,
                    price: currentPrice,
                    change: change,
                    changesPercentage: changesPercentage,
                    volume: quote.regularMarketVolume,
                    dayLow: quote.regularMarketDayLow,
                    dayHigh: quote.regularMarketDayHigh,
                    previousClose: previousClose,
                    timestamp: quote.regularMarketTime || Date.now(),
                    trend: changesPercentage >= 0 ? 'up' : 'down'
                };
            });

            // Cache results
            this.setCache(cacheKey, transformedQuotes);

            console.log(`[Yahoo Finance] ✅ Fetched ${transformedQuotes.length} stocks successfully`);
            return transformedQuotes;

        } catch (error) {
            console.error(`[Yahoo Finance] ❌ Error fetching batch quotes:`, error.message);
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
window.YahooFinanceStockApi = YahooFinanceStockApi;
// Backward compatibility alias
window.FMPStockApi = YahooFinanceStockApi;
