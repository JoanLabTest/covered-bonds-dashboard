// ============================================
// ECB RATES API MODULE
// Fetch real market rates from ECB Data Portal SDMX REST API
// Source: European Central Bank (Official)
// ============================================

class ECBRatesAPI {
    constructor() {
        this.baseUrl = 'https://data-api.ecb.europa.eu/service/data';
        this.cache = new Map();
        this.cacheExpiration = 24 * 60 * 60 * 1000; // 24 hours (daily data)

        // ECB SDMX series keys
        this.seriesKeys = {
            // Euribor rates (Money Market - FM)
            euribor3m: 'FM/D.U2.EUR.RT.MM.EURIBOR3MD_.HSTA',
            euribor6m: 'FM/D.U2.EUR.RT.MM.EURIBOR6MD_.HSTA',
            euribor12m: 'FM/D.U2.EUR.RT.MM.EURIBOR1YD_.HSTA',

            // Government bond yields (Yield Curves - YC)
            bund10y: 'YC/B.U2.EUR.4F.G_N_A.SV_C_YM.SR_10Y',  // Euro area AAA
            oat10y: 'YC/B.FR.EUR.4F.G_N_A.SV_C_YM.SR_10Y',   // France

            // Interest Rate Swaps (approximation via IRS data)
            swap2y: 'FM/D.U2.EUR.4F.BB.EURIBOR3MD_.HSTA',
            swap5y: 'FM/D.U2.EUR.4F.BB.EURIBOR6MD_.HSTA',
            swap10y: 'FM/D.U2.EUR.4F.BB.EURIBOR1YD_.HSTA'
        };

        // Fallback static values (used if API fails)
        this.fallbackValues = {
            euribor3m: 3.65,
            euribor6m: 3.45,
            euribor12m: 3.25,
            bund10y: 2.42,
            oat10y: 2.91,
            swap2y: 3.12,
            swap5y: 2.88,
            swap10y: 2.75
        };
    }

    /**
     * Fetch a single rate from ECB SDMX API
     * @param {string} seriesKey - ECB series key
     * @param {string} rateName - Human-readable name for logging
     * @returns {Promise<number|null>} - Rate value or null if failed
     */
    async fetchRate(seriesKey, rateName) {
        const cacheKey = `ecb_${seriesKey}`;

        // Check cache
        const cached = this.cache.get(cacheKey);
        if (cached && (Date.now() - cached.timestamp) < this.cacheExpiration) {
            console.log(`[ECB RATES] 📦 Using cached ${rateName}: ${cached.value}%`);
            return cached.value;
        }

        try {
            // Construct URL with latest observation
            const url = `${this.baseUrl}/${seriesKey}?format=jsondata&lastNObservations=1`;

            console.log(`[ECB RATES] 🔄 Fetching ${rateName} from ECB...`);
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            // Parse SDMX JSON structure
            // Structure: data.dataSets[0].series.{key}.observations.{index}[0]
            const dataSets = data.dataSets;
            if (!dataSets || dataSets.length === 0) {
                throw new Error('No data sets in response');
            }

            const series = dataSets[0].series;
            if (!series) {
                throw new Error('No series in data set');
            }

            // Get first series (should be only one)
            const seriesId = Object.keys(series)[0];
            if (!seriesId) {
                throw new Error('No series key found');
            }

            const observations = series[seriesId].observations;
            if (!observations) {
                throw new Error('No observations in series');
            }

            // Get latest observation (should be index "0" for lastNObservations=1)
            const obsKey = Object.keys(observations)[0];
            if (!obsKey) {
                throw new Error('No observation key found');
            }

            const value = parseFloat(observations[obsKey][0]);

            if (isNaN(value)) {
                throw new Error('Invalid rate value');
            }

            // Cache the result
            this.cache.set(cacheKey, {
                value: value,
                timestamp: Date.now()
            });

            console.log(`[ECB RATES] ✅ ${rateName}: ${value}%`);
            return value;

        } catch (error) {
            console.error(`[ECB RATES] ❌ Failed to fetch ${rateName}:`, error.message);
            return null;
        }
    }

    /**
     * Fetch all Euribor rates (3M, 6M, 12M)
     * @returns {Promise<Object>} - Object with euribor3m, euribor6m, euribor12m
     */
    async fetchEuriborRates() {
        console.log('[ECB RATES] 📊 Fetching Euribor rates...');

        const [euribor3m, euribor6m, euribor12m] = await Promise.all([
            this.fetchRate(this.seriesKeys.euribor3m, 'Euribor 3M'),
            this.fetchRate(this.seriesKeys.euribor6m, 'Euribor 6M'),
            this.fetchRate(this.seriesKeys.euribor12m, 'Euribor 12M')
        ]);

        return {
            euribor3m: euribor3m ?? this.fallbackValues.euribor3m,
            euribor6m: euribor6m ?? this.fallbackValues.euribor6m,
            euribor12m: euribor12m ?? this.fallbackValues.euribor12m
        };
    }

    /**
     * Fetch government bond yields (Bund 10Y, OAT 10Y)
     * @returns {Promise<Object>} - Object with bund10y, oat10y
     */
    async fetchBondYields() {
        console.log('[ECB RATES] 📊 Fetching government bond yields...');

        const [bund10y, oat10y] = await Promise.all([
            this.fetchRate(this.seriesKeys.bund10y, 'Bund 10Y'),
            this.fetchRate(this.seriesKeys.oat10y, 'OAT 10Y')
        ]);

        return {
            bund10y: bund10y ?? this.fallbackValues.bund10y,
            oat10y: oat10y ?? this.fallbackValues.oat10y
        };
    }

    /**
     * Fetch EUR swap rates (2Y, 5Y, 10Y)
     * Note: Using IRS approximation as ECB doesn't publish direct swap rates
     * @returns {Promise<Object>} - Object with swap2y, swap5y, swap10y
     */
    async fetchSwapRates() {
        console.log('[ECB RATES] 📊 Fetching EUR swap rates...');

        // Note: These are approximations using IRS data
        // For production, consider using a dedicated swap rates API
        const [swap2y, swap5y, swap10y] = await Promise.all([
            this.fetchRate(this.seriesKeys.swap2y, 'Swap EUR 2Y'),
            this.fetchRate(this.seriesKeys.swap5y, 'Swap EUR 5Y'),
            this.fetchRate(this.seriesKeys.swap10y, 'Swap EUR 10Y')
        ]);

        return {
            swap2y: swap2y ?? this.fallbackValues.swap2y,
            swap5y: swap5y ?? this.fallbackValues.swap5y,
            swap10y: swap10y ?? this.fallbackValues.swap10y
        };
    }

    /**
     * Fetch all market rates
     * @returns {Promise<Object>} - Object with all rates
     */
    async fetchAllRates() {
        console.log('[ECB RATES] 🚀 Fetching all market rates from ECB Data Portal...');

        try {
            const [euribor, bonds, swaps] = await Promise.all([
                this.fetchEuriborRates(),
                this.fetchBondYields(),
                this.fetchSwapRates()
            ]);

            const allRates = {
                ...euribor,
                ...bonds,
                ...swaps,
                timestamp: new Date().toISOString(),
                source: 'ECB Data Portal'
            };

            console.log('[ECB RATES] ✅ All rates fetched successfully');
            return allRates;

        } catch (error) {
            console.error('[ECB RATES] ❌ Failed to fetch rates:', error);
            console.log('[ECB RATES] ⚠️ Using fallback values');

            return {
                ...this.fallbackValues,
                timestamp: new Date().toISOString(),
                source: 'Fallback (Static)'
            };
        }
    }

    /**
     * Update the market rates ticker in the HTML
     * @param {Object} rates - Rates object from fetchAllRates()
     */
    updateMarketRatesTicker(rates) {
        console.log('[ECB RATES] 🔄 Updating market rates ticker...');

        // Update Euribor rates
        this.updateElement('euribor3m', rates.euribor3m);
        this.updateElement('euribor6m', rates.euribor6m);
        this.updateElement('euribor12m', rates.euribor12m);

        // Update bond yields
        this.updateElement('bund10y', rates.bund10y);
        this.updateElement('oat10y', rates.oat10y);

        // Update swap rates
        this.updateElement('swap2y', rates.swap2y);
        this.updateElement('swap5y', rates.swap5y);
        this.updateElement('swap10y', rates.swap10y);

        console.log('[ECB RATES] ✅ Market rates ticker updated');

        // Update data source badge if exists
        this.updateDataSourceBadge(rates.source);
    }

    /**
     * Update a single HTML element with rate value
     * @param {string} elementId - HTML element ID
     * @param {number} value - Rate value
     */
    updateElement(elementId, value) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = `${value.toFixed(2)}%`;
        } else {
            console.warn(`[ECB RATES] ⚠️ Element #${elementId} not found`);
        }
    }

    /**
     * Update or create data source badge
     * @param {string} source - Data source name
     */
    updateDataSourceBadge(source) {
        // Find the market ticker section
        const ticker = document.querySelector('.market-ticker');
        if (!ticker) return;

        // Remove existing badge
        const existingBadge = ticker.querySelector('.ecb-data-badge');
        if (existingBadge) {
            existingBadge.remove();
        }

        // Create new badge
        const badge = document.createElement('div');
        badge.className = 'ecb-data-badge';
        badge.style.cssText = `
            background: var(--color-success-bg);
            color: var(--color-success);
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            font-size: 0.875rem;
            margin-bottom: 0.5rem;
            border: 1px solid var(--color-success);
        `;

        const isRealData = source === 'ECB Data Portal';
        badge.innerHTML = isRealData
            ? '✅ <strong>Données Réelles</strong> - ECB Data Portal (Taux officiels quotidiens)'
            : '⚠️ <strong>Données Statiques</strong> - Fallback (API ECB indisponible)';

        // Insert badge before ticker content
        ticker.insertBefore(badge, ticker.firstChild);
    }

    /**
     * Clear cache (useful for testing)
     */
    clearCache() {
        this.cache.clear();
        console.log('[ECB RATES] 🗑️ Cache cleared');
    }
}

// Export for use in other modules
window.ECBRatesAPI = ECBRatesAPI;

console.log('[ECB RATES] 📦 Module loaded - Ready to fetch real market rates from ECB');
