// ============================================
// MARKETSTACK API - EURONEXT PARIS STOCK QUOTES
// ============================================
// Free tier: 1000 requests/month
// Data: End-of-Day (EOD) - Clôture de la veille
// Exchange: XPAR (Euronext Paris)
// Documentation: https://marketstack.com/documentation

const MarketstackAPI = {
    config: {
        get apiKey() {
            return CONFIG.marketstack?.apiKey || '';
        },
        get enabled() {
            return CONFIG.marketstack?.enabled && this.apiKey && this.apiKey !== 'demo';
        },
        baseUrl: 'https://api.marketstack.com/v1',
        exchange: 'XPAR', // Euronext Paris
        scheduledHours: [8, 10, 12, 14, 16, 18], // Mises à jour toutes les 2h
        cacheExpiration: 15 * 60 * 1000, // 15 minutes
    },

    // Cache pour éviter requêtes redondantes
    cache: new Map(),
    lastUpdate: null,

    /**
     * Vérifie si une mise à jour est nécessaire selon le calendrier
     */
    shouldUpdate() {
        const now = new Date();
        const currentHour = now.getHours();

        // Si aucune mise à jour n'a jamais été faite, autoriser le fetch initial
        if (!this.lastUpdate && this.cache.size === 0) {
            console.log('[MARKETSTACK] ℹ️ First load - fetching initial data');
            return true;
        }

        // Vérifier si on est dans une heure de mise à jour programmée
        const isScheduledHour = this.config.scheduledHours.includes(currentHour);

        if (!isScheduledHour) {
            return false;
        }

        // Vérifier si on a déjà fait une mise à jour dans cette heure
        if (this.lastUpdate) {
            const lastUpdateHour = this.lastUpdate.getHours();
            if (lastUpdateHour === currentHour) {
                console.log('[MARKETSTACK] ℹ️ Already updated this hour, using cache');
                return false;
            }
        }

        return true;
    },

    /**
     * Retourne l'heure de la prochaine mise à jour
     */
    getNextUpdateTime() {
        const now = new Date();
        const currentHour = now.getHours();

        // Trouver la prochaine heure de mise à jour
        const nextHour = this.config.scheduledHours.find(h => h > currentHour);

        if (nextHour) {
            return `${nextHour}h00`;
        } else {
            // Si aucune heure aujourd'hui, retourner la première heure de demain
            return `${this.config.scheduledHours[0]}h00 (demain)`;
        }
    },

    /**
     * Fetch batch de cotations pour plusieurs symboles
     * @param {Array<string>} symbols - Tableau de symboles (ex: ['MC.PA', 'TTE.PA'])
     * @returns {Promise<Object>} Map symbol -> quote data
     */
    async fetchBatchQuotes(symbols) {
        if (!this.config.enabled) {
            console.log('[MARKETSTACK] ⚠️ API not enabled or no API key configured');
            return null;
        }

        try {
            // Construire la liste de symboles (enlever ^FCHI qui n'est pas une action)
            const stockSymbols = symbols.filter(s => s !== '^FCHI');
            const symbolsParam = stockSymbols.join(',');

            console.log(`[MARKETSTACK] 🔄 Fetching batch quotes for ${stockSymbols.length} symbols...`);

            // Endpoint: /eod/latest pour obtenir les dernières cotations EOD
            const url = `${this.config.baseUrl}/eod/latest?access_key=${this.config.apiKey}&symbols=${symbolsParam}&limit=100`;

            const response = await fetch(url);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('[MARKETSTACK] ❌ API Error:', response.status, errorText);
                return null;
            }

            const data = await response.json();

            if (!data.data || data.data.length === 0) {
                console.log('[MARKETSTACK] ⚠️ No data returned from API');
                return null;
            }

            // Convertir en Map pour accès rapide
            const quotesMap = new Map();
            data.data.forEach(quote => {
                quotesMap.set(quote.symbol, {
                    symbol: quote.symbol,
                    price: quote.close, // Prix de clôture
                    open: quote.open,
                    high: quote.high,
                    low: quote.low,
                    volume: quote.volume,
                    date: quote.date,
                    change: quote.close - quote.open,
                    changesPercentage: ((quote.close - quote.open) / quote.open) * 100,
                    previousClose: quote.open, // Approximation
                });
            });

            console.log(`[MARKETSTACK] ✅ Received ${quotesMap.size} quotes from API`);

            // Mettre en cache
            this.cache = quotesMap;
            this.lastUpdate = new Date();

            return quotesMap;

        } catch (error) {
            console.error('[MARKETSTACK] ❌ Error fetching batch quotes:', error);
            return null;
        }
    },

    /**
     * Enrichit un tableau de stocks avec les vraies cotations
     * @param {Array<Object>} stocks - Tableau de stocks avec données statiques
     * @returns {Promise<Array<Object>>} Tableau enrichi avec cotations réelles
     */
    async enrichStocksWithRealData(stocks) {
        console.log(`[MARKETSTACK] 🔄 Enriching ${stocks.length} stocks with real EOD data...`);

        // Extraire les symboles
        const symbols = stocks.map(s => s.symbol);

        // Fetch batch de cotations
        const quotesMap = await this.fetchBatchQuotes(symbols);

        if (!quotesMap) {
            console.log('[MARKETSTACK] ⚠️ Batch fetch failed, using static data');
            return stocks;
        }

        // Enrichir les stocks
        const enrichedStocks = [];
        let successCount = 0;
        let failCount = 0;

        for (const stock of stocks) {
            // Skip CAC 40 index
            if (stock.symbol === '^FCHI') {
                enrichedStocks.push(stock);
                continue;
            }

            const quote = quotesMap.get(stock.symbol);

            if (quote) {
                enrichedStocks.push({
                    ...stock,
                    price: quote.price,
                    open: quote.open,
                    high: quote.high,
                    low: quote.low,
                    volume: quote.volume,
                    change: quote.change,
                    changesPercentage: quote.changesPercentage,
                    previousClose: quote.previousClose,
                    lastUpdate: quote.date,
                });
                successCount++;
            } else {
                // Fallback to static data
                enrichedStocks.push(stock);
                failCount++;
                console.log(`[MARKETSTACK] ⚠️ No quote for ${stock.symbol}, using static data`);
            }
        }

        console.log(`[MARKETSTACK] ✅ Enrichment complete: ${successCount} real quotes, ${failCount} fallback to static`);

        return enrichedStocks;
    },

    /**
     * Initialisation du module
     */
    init() {
        if (!this.config.enabled) {
            console.log('[MARKETSTACK] ℹ️ Module loaded but API not enabled (no API key)');
            console.log('[MARKETSTACK] 💡 Get free API key: https://marketstack.com/product');
            return;
        }

        console.log('[MARKETSTACK] ✅ Module loaded - Ready for Euronext Paris EOD quotes');
        console.log(`[MARKETSTACK] ℹ️ Update schedule: ${this.config.scheduledHours.join('h, ')}h`);
        console.log(`[MARKETSTACK] ℹ️ Exchange: ${this.config.exchange} (Euronext Paris)`);
        console.log(`[MARKETSTACK] ℹ️ Data type: End-of-Day (EOD)`);
    }
};

// Auto-initialisation
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        MarketstackAPI.init();
    });
}

// Export pour utilisation dans d'autres modules
if (typeof window !== 'undefined') {
    window.MarketstackAPI = MarketstackAPI;
}
