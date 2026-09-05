// ============================================
// TWELVE DATA API MODULE
// Real-time stock quotes for CAC 40 stocks
// Free tier: 800 requests/day, 8 requests/minute
// ============================================

const TwelveDataAPI = {
    cache: new Map(),
    lastRequestTime: 0,
    requestCount: 0,

    /**
     * Fetch real-time quote for a single stock
     * @param {string} symbol - Stock symbol (e.g., 'MC.PA' for LVMH)
     * @returns {Promise<Object>} Stock quote data
     */
    async fetchQuote(symbol) {
        const config = CONFIG.twelveData;

        if (!config || !config.enabled || config.apiKey === 'demo') {
            console.log(`[TWELVE DATA] Demo mode - using static data for ${symbol}`);
            return null;
        }

        // Check cache
        const cached = this.cache.get(symbol);
        if (cached && (Date.now() - cached.timestamp < config.cacheExpiration)) {
            console.log(`[TWELVE DATA] Using cached data for ${symbol}`);
            return cached.data;
        }

        // Rate limiting: wait 7.5 seconds between requests (8 requests/minute)
        const now = Date.now();
        const timeSinceLastRequest = now - this.lastRequestTime;
        if (timeSinceLastRequest < 7500) {
            await this.sleep(7500 - timeSinceLastRequest);
        }

        try {
            // Twelve Data uses different formats for different exchanges
            // For Euronext Paris: symbol without .PA suffix
            // For other exchanges: keep the suffix
            let cleanSymbol = symbol;
            let exchange = '';

            if (symbol.endsWith('.PA')) {
                cleanSymbol = symbol.replace('.PA', '');
                exchange = 'EURONEXT';
            } else if (symbol.endsWith('.MI')) {
                cleanSymbol = symbol.replace('.MI', '');
                exchange = 'MIL'; // Milan
            } else if (symbol.endsWith('.AS')) {
                cleanSymbol = symbol.replace('.AS', '');
                exchange = 'AMS'; // Amsterdam
            }

            const url = `${config.baseUrl}/quote?symbol=${cleanSymbol}${exchange ? '&exchange=' + exchange : ''}&apikey=${config.apiKey}`;

            console.log(`[TWELVE DATA] Fetching ${symbol}...`);
            const response = await fetch(url);

            if (!response.ok) {
                console.error(`[TWELVE DATA] Failed to fetch ${symbol}: ${response.status}`);
                return null;
            }

            const data = await response.json();

            // Check for API errors
            if (data.code && data.code !== 200) {
                console.error(`[TWELVE DATA] API error for ${symbol}:`, data.message);
                return null;
            }

            // Check if we got valid data
            if (!data.close && !data.previous_close) {
                console.warn(`[TWELVE DATA] No price data for ${symbol}`);
                return null;
            }

            // Transform to our format
            const quote = {
                symbol: symbol,
                name: data.name || symbol,
                price: parseFloat(data.close) || parseFloat(data.previous_close) || 0,
                change: parseFloat(data.change) || 0,
                changesPercentage: parseFloat(data.percent_change) || 0,
                dayLow: parseFloat(data.low) || 0,
                dayHigh: parseFloat(data.high) || 0,
                volume: parseInt(data.volume) || 0,
                previousClose: parseFloat(data.previous_close) || 0,
                timestamp: Date.now(),
                dataSource: 'Twelve Data'
            };

            // Cache the result
            this.cache.set(symbol, {
                data: quote,
                timestamp: Date.now()
            });

            this.lastRequestTime = Date.now();
            this.requestCount++;

            console.log(`[TWELVE DATA] ✅ Fetched ${symbol}: €${quote.price.toFixed(2)} (${quote.changesPercentage > 0 ? '+' : ''}${quote.changesPercentage.toFixed(2)}%)`);

            return quote;

        } catch (error) {
            console.error(`[TWELVE DATA] Error fetching ${symbol}:`, error);
            return null;
        }
    },

    /**
     * Fetch quotes for multiple stocks with rate limiting
     * @param {Array<Object>} stocks - Array of stock objects with symbol property
     * @returns {Promise<Array>} Array of enriched stock objects
     */
    async enrichStocksWithRealData(stocks) {
        console.log(`[TWELVE DATA] 🔄 Enriching ${stocks.length} stocks with real-time data...`);
        console.log(`[TWELVE DATA] ⏱️ Estimated time: ~${Math.ceil(stocks.length * 7.5 / 60)} minutes (rate limiting: 8 requests/minute)`);

        const enrichedStocks = [];
        let successCount = 0;
        let failCount = 0;

        for (const stock of stocks) {
            // Skip the CAC 40 index itself
            if (stock.symbol === '^FCHI') {
                enrichedStocks.push(stock);
                continue;
            }

            const realQuote = await this.fetchQuote(stock.symbol);

            if (realQuote) {
                enrichedStocks.push({
                    ...stock,
                    ...realQuote,
                    sector: stock.sector // Preserve sector from static data
                });
                successCount++;
            } else {
                // Fallback to static data
                enrichedStocks.push(stock);
                failCount++;
            }
        }

        console.log(`[TWELVE DATA] ✅ Enrichment complete: ${successCount} real quotes, ${failCount} fallback to static`);
        return enrichedStocks;
    },

    /**
     * Check if we should update based on scheduled hours
     * @returns {boolean}
     */
    shouldUpdate() {
        const config = CONFIG.twelveData;
        if (!config || !config.enabled || config.apiKey === 'demo') {
            return false;
        }

        const now = new Date();
        const currentHour = now.getHours();
        const scheduledHours = config.scheduledUpdates || [8, 12, 16, 18];

        return scheduledHours.some(hour => {
            const diff = Math.abs(currentHour - hour);
            return diff === 0 || (currentHour === hour && now.getMinutes() < 10);
        });
    },

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};

// Export to window
window.TwelveDataAPI = TwelveDataAPI;

console.log('[TWELVE DATA] ✅ Module loaded');
