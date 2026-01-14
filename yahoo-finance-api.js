// ============================================
// YAHOO FINANCE API MODULE
// Real-time stock quotes for CAC 40 stocks (Euronext Paris)
// Free, reliable, 15-minute delayed data
// ============================================

const YahooFinanceAPI = {
    cache: new Map(),
    lastUpdateTime: 0,

    /**
     * Fetch real-time quote for a single stock from Yahoo Finance
     * @param {string} symbol - Stock symbol (e.g., 'MC.PA' for LVMH)
     * @returns {Promise<Object>} Stock quote data
     */
    async fetchQuote(symbol) {
        // Check cache (15 minutes)
        const cached = this.cache.get(symbol);
        if (cached && (Date.now() - cached.timestamp < 900000)) {
            console.log(`[YAHOO] Using cached data for ${symbol}`);
            return cached.data;
        }

        try {
            // Yahoo Finance uses URL-encoded symbols (^FCHI -> %5EFCHI)
            const encodedSymbol = symbol.replace('^', '%5E');
            const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodedSymbol}`;

            console.log(`[YAHOO] Fetching ${symbol}...`);
            const response = await fetch(url);

            if (!response.ok) {
                console.error(`[YAHOO] Failed to fetch ${symbol}: ${response.status}`);
                return null;
            }

            const data = await response.json();

            // Validate response
            if (!data.chart || !data.chart.result || data.chart.result.length === 0) {
                console.error(`[YAHOO] No data for ${symbol}`);
                return null;
            }

            const quote = data.chart.result[0];
            const meta = quote.meta;

            // Check if market is open or we have valid data
            if (!meta.regularMarketPrice) {
                console.warn(`[YAHOO] No price data for ${symbol}`);
                return null;
            }

            // Calculate change percentage
            const change = meta.regularMarketPrice - meta.previousClose;
            const changesPercentage = (change / meta.previousClose) * 100;

            const result = {
                symbol: symbol,
                name: meta.symbol,
                price: meta.regularMarketPrice,
                change: change,
                changesPercentage: changesPercentage,
                volume: meta.regularMarketVolume || 0,
                dayHigh: meta.regularMarketDayHigh || meta.regularMarketPrice,
                dayLow: meta.regularMarketDayLow || meta.regularMarketPrice,
                previousClose: meta.previousClose,
                timestamp: Date.now(),
                dataSource: 'Yahoo Finance'
            };

            // Cache for 15 minutes
            this.cache.set(symbol, {
                data: result,
                timestamp: Date.now()
            });

            console.log(`[YAHOO] ✅ ${symbol}: €${result.price.toFixed(2)} (${result.changesPercentage > 0 ? '+' : ''}${result.changesPercentage.toFixed(2)}%)`);

            return result;

        } catch (error) {
            console.error(`[YAHOO] Error fetching ${symbol}:`, error);
            return null;
        }
    },

    /**
     * Fetch quotes for multiple stocks
     * @param {Array<Object>} stocks - Array of stock objects with symbol property
     * @returns {Promise<Array>} Array of enriched stock objects
     */
    async enrichStocksWithRealData(stocks) {
        console.log(`[YAHOO] 🔄 Fetching real quotes for ${stocks.length} stocks from Yahoo Finance...`);
        console.log(`[YAHOO] ⏱️ Estimated time: ~${Math.ceil(stocks.length * 0.2)} seconds`);

        const enrichedStocks = [];
        let successCount = 0;
        let failCount = 0;

        for (const stock of stocks) {
            const quote = await this.fetchQuote(stock.symbol);

            if (quote) {
                enrichedStocks.push({
                    ...stock,
                    ...quote,
                    sector: stock.sector // Preserve sector from static data
                });
                successCount++;
            } else {
                // Fallback to static data
                enrichedStocks.push(stock);
                failCount++;
            }

            // Small delay to avoid overwhelming Yahoo's servers
            await this.sleep(100);
        }

        console.log(`[YAHOO] ✅ Enrichment complete: ${successCount} real quotes, ${failCount} fallback to static`);
        this.lastUpdateTime = Date.now();

        return enrichedStocks;
    },

    /**
     * Check if we should update based on scheduled hours (every 2 hours from 8h to 18h)
     * @returns {boolean}
     */
    shouldUpdate() {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinutes = now.getMinutes();

        // Scheduled hours: 8h, 10h, 12h, 14h, 16h, 18h
        const scheduledHours = [8, 10, 12, 14, 16, 18];

        // Check if we're within 10 minutes of a scheduled hour
        const isScheduledTime = scheduledHours.some(hour => {
            return currentHour === hour && currentMinutes < 10;
        });

        // Also check if we haven't updated in the last 2 hours
        const timeSinceLastUpdate = Date.now() - this.lastUpdateTime;
        const twoHours = 2 * 60 * 60 * 1000;

        return isScheduledTime || timeSinceLastUpdate > twoHours;
    },

    /**
     * Get next scheduled update time
     * @returns {string}
     */
    getNextUpdateTime() {
        const now = new Date();
        const currentHour = now.getHours();
        const scheduledHours = [8, 10, 12, 14, 16, 18];

        for (const hour of scheduledHours) {
            if (currentHour < hour) {
                return `${hour}h00`;
            }
        }

        return '8h00 (demain)';
    },

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};

// Export to window
window.YahooFinanceAPI = YahooFinanceAPI;

console.log('[YAHOO FINANCE] ✅ Module loaded - Ready for Euronext Paris quotes');
console.log('[YAHOO FINANCE] ℹ️ Update schedule: 8h, 10h, 12h, 14h, 16h, 18h');
