// ============================================
// BOURSORAMA RATES API MODULE
// Fetch real market rates from Boursorama via web scraping
// Source: Boursorama (French financial data provider)
// ============================================

class BoursoramaRatesAPI {
    constructor() {
        // CORS proxy to bypass browser restrictions
        this.corsProxy = 'https://corsproxy.io/?';

        // Boursorama rate page URLs (updated format)
        this.rateUrls = {
            euribor3m: 'https://www.boursorama.com/bourse/taux/cours/2xERB3MOIS/',
            euribor6m: 'https://www.boursorama.com/bourse/taux/cours/2xERB6MOIS/',
            euribor12m: 'https://www.boursorama.com/bourse/taux/cours/2xERB12MOIS/',
            bund10y: 'https://www.boursorama.com/bourse/taux/cours/1rTGER10YT/',
            oat10y: 'https://www.boursorama.com/bourse/taux/cours/1rTFRA10YT/'
        };

        // Cache configuration
        this.cache = new Map();
        this.cacheExpiration = 24 * 60 * 60 * 1000; // 24 hours (daily data)

        // Fallback static values (used if scraping fails)
        this.fallbackValues = {
            euribor3m: 3.65,
            euribor6m: 3.45,
            euribor12m: 3.25,
            bund10y: 2.42,
            oat10y: 2.91,
            swap2y: 3.12,  // No Boursorama source
            swap5y: 2.88,  // No Boursorama source
            swap10y: 2.75  // No Boursorama source
        };

        console.log('[BOURSORAMA RATES] 📦 Module loaded - Ready to fetch market rates');
    }

    /**
     * Fetch and parse a single rate from Boursorama
     * @param {string} url - Boursorama rate page URL
     * @param {string} rateName - Human-readable name for logging
     * @returns {Promise<number|null>} - Rate value or null if failed
     */
    async fetchRate(url, rateName) {
        const cacheKey = `boursorama_${rateName}`;

        // Check cache
        const cached = this.cache.get(cacheKey);
        if (cached && (Date.now() - cached.timestamp) < this.cacheExpiration) {
            console.log(`[BOURSORAMA RATES] 📦 Using cached ${rateName}: ${cached.value}%`);
            return cached.value;
        }

        try {
            // Fetch HTML via CORS proxy
            const proxiedUrl = this.corsProxy + encodeURIComponent(url);
            console.log(`[BOURSORAMA RATES] 🔄 Fetching ${rateName} from Boursorama...`);

            const response = await fetch(proxiedUrl);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const html = await response.text();

            // Parse HTML to extract rate value
            const value = this.parseRateFromHtml(html, rateName);

            if (value === null) {
                throw new Error('Failed to parse rate value from HTML');
            }

            // Cache the result
            this.cache.set(cacheKey, {
                value: value,
                timestamp: Date.now()
            });

            console.log(`[BOURSORAMA RATES] ✅ ${rateName}: ${value}%`);
            return value;

        } catch (error) {
            console.error(`[BOURSORAMA RATES] ❌ Failed to fetch ${rateName}:`, error.message);
            return null;
        }
    }

    /**
     * Parse rate value from Boursorama HTML
     * @param {string} html - HTML content from Boursorama
     * @param {string} rateName - Rate name for logging
     * @returns {number|null} - Parsed rate value or null
     */
    parseRateFromHtml(html, rateName) {
        try {
            // Create DOM parser
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Try primary selector: .c-faceplate__price .c-instrument--last
            let element = doc.querySelector('.c-faceplate__price .c-instrument--last');

            // Fallback selectors if primary fails
            if (!element) {
                element = doc.querySelector('.c-instrument--last');
            }
            if (!element) {
                element = doc.querySelector('.c-faceplate__price');
            }

            if (!element) {
                console.error(`[BOURSORAMA RATES] ❌ Could not find rate element for ${rateName}`);
                return null;
            }

            // Extract text content
            let text = element.textContent.trim();

            // Remove percentage sign if present
            text = text.replace('%', '').trim();

            // Replace French decimal separator (comma) with dot
            text = text.replace(',', '.');

            // Parse as float
            const value = parseFloat(text);

            if (isNaN(value)) {
                console.error(`[BOURSORAMA RATES] ❌ Invalid rate value for ${rateName}: "${text}"`);
                return null;
            }

            // Validate reasonable range (0-20% for rates)
            if (value < 0 || value > 20) {
                console.error(`[BOURSORAMA RATES] ❌ Rate value out of range for ${rateName}: ${value}%`);
                return null;
            }

            return value;

        } catch (error) {
            console.error(`[BOURSORAMA RATES] ❌ Error parsing HTML for ${rateName}:`, error.message);
            return null;
        }
    }

    /**
     * Fetch all Euribor rates (3M, 6M, 12M)
     * @returns {Promise<Object>} - Object with euribor3m, euribor6m, euribor12m
     */
    async fetchEuriborRates() {
        console.log('[BOURSORAMA RATES] 📊 Fetching Euribor rates...');

        const [euribor3m, euribor6m, euribor12m] = await Promise.all([
            this.fetchRate(this.rateUrls.euribor3m, 'Euribor 3M'),
            this.fetchRate(this.rateUrls.euribor6m, 'Euribor 6M'),
            this.fetchRate(this.rateUrls.euribor12m, 'Euribor 12M')
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
        console.log('[BOURSORAMA RATES] 📊 Fetching government bond yields...');

        const [bund10y, oat10y] = await Promise.all([
            this.fetchRate(this.rateUrls.bund10y, 'Bund 10Y'),
            this.fetchRate(this.rateUrls.oat10y, 'OAT 10Y')
        ]);

        return {
            bund10y: bund10y ?? this.fallbackValues.bund10y,
            oat10y: oat10y ?? this.fallbackValues.oat10y
        };
    }

    /**
     * Fetch EUR swap rates (2Y, 5Y, 10Y)
     * Note: Boursorama does not provide swap rates, using static fallback
     * @returns {Promise<Object>} - Object with swap2y, swap5y, swap10y
     */
    async fetchSwapRates() {
        console.log('[BOURSORAMA RATES] 📊 Using static fallback for EUR swap rates (not available on Boursorama)...');

        return {
            swap2y: this.fallbackValues.swap2y,
            swap5y: this.fallbackValues.swap5y,
            swap10y: this.fallbackValues.swap10y
        };
    }

    /**
     * Fetch all market rates
     * @returns {Promise<Object>} - Object with all rates
     */
    async fetchAllRates() {
        console.log('[BOURSORAMA RATES] 🚀 Fetching all market rates from Boursorama...');

        try {
            const [euribor, bonds, swaps] = await Promise.all([
                this.fetchEuriborRates(),
                this.fetchBondYields(),
                this.fetchSwapRates()
            ]);

            // Check if we got real data (at least one non-fallback value)
            const hasRealData =
                euribor.euribor3m !== this.fallbackValues.euribor3m ||
                euribor.euribor6m !== this.fallbackValues.euribor6m ||
                euribor.euribor12m !== this.fallbackValues.euribor12m ||
                bonds.bund10y !== this.fallbackValues.bund10y ||
                bonds.oat10y !== this.fallbackValues.oat10y;

            const allRates = {
                ...euribor,
                ...bonds,
                ...swaps,
                timestamp: new Date().toISOString(),
                source: hasRealData ? 'Boursorama' : 'Fallback (Static)',
                hasRealData: hasRealData
            };

            console.log('[BOURSORAMA RATES] ✅ All rates fetched successfully');
            return allRates;

        } catch (error) {
            console.error('[BOURSORAMA RATES] ❌ Failed to fetch rates:', error);
            console.log('[BOURSORAMA RATES] ⚠️ Using fallback values');

            return {
                ...this.fallbackValues,
                timestamp: new Date().toISOString(),
                source: 'Fallback (Static)',
                hasRealData: false
            };
        }
    }

    /**
     * Update the market rates ticker in the HTML
     * @param {Object} rates - Rates object from fetchAllRates()
     */
    updateMarketRatesTicker(rates) {
        console.log('[BOURSORAMA RATES] 🔄 Updating market rates ticker...');

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

        console.log('[BOURSORAMA RATES] ✅ Market rates ticker updated');

        // Update data source badge
        this.updateDataSourceBadge(rates.source, rates.hasRealData);
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
            console.warn(`[BOURSORAMA RATES] ⚠️ Element #${elementId} not found`);
        }
    }

    /**
     * Update or create data source badge
     * @param {string} source - Data source name
     * @param {boolean} hasRealData - Whether real data was fetched
     */
    updateDataSourceBadge(source, hasRealData) {
        // Find the market ticker section
        const ticker = document.querySelector('.market-ticker');
        if (!ticker) return;

        // Remove existing badge
        const existingBadge = ticker.querySelector('.boursorama-data-badge');
        if (existingBadge) {
            existingBadge.remove();
        }

        // Create new badge
        const badge = document.createElement('div');
        badge.className = 'boursorama-data-badge';

        if (hasRealData) {
            badge.style.cssText = `
                background: var(--color-success-bg);
                color: var(--color-success);
                padding: 0.5rem 1rem;
                border-radius: 0.5rem;
                font-size: 0.875rem;
                margin-bottom: 0.5rem;
                border: 1px solid var(--color-success);
            `;
            badge.innerHTML = '✅ <strong>Données Réelles</strong> - Boursorama (quotidien) | ⚠️ <em>SWAP: valeurs statiques</em>';
        } else {
            badge.style.cssText = `
                background: var(--color-warning-bg);
                color: var(--color-warning);
                padding: 0.5rem 1rem;
                border-radius: 0.5rem;
                font-size: 0.875rem;
                margin-bottom: 0.5rem;
                border: 1px solid var(--color-warning);
            `;
            badge.innerHTML = '⚠️ <strong>Données Statiques</strong> - Fallback (Boursorama indisponible)';
        }

        // Insert badge before ticker content
        ticker.insertBefore(badge, ticker.firstChild);
    }

    /**
     * Clear cache (useful for testing)
     */
    clearCache() {
        this.cache.clear();
        console.log('[BOURSORAMA RATES] 🗑️ Cache cleared');
    }
}

// Export for use in other modules
window.BoursoramaRatesAPI = BoursoramaRatesAPI;

console.log('[BOURSORAMA RATES] 📦 Module loaded - Ready to fetch real market rates from Boursorama');
