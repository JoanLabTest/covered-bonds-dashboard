/**
 * Covered Bonds Market Widget
 * Fetches real-time market data from Python backend and updates the UI
 */

class CoveredBondsMarket {
    constructor() {
        // API endpoint - Production Vercel deployment
        this.apiUrl = window.location.hostname === 'localhost'
            ? 'http://localhost:3000/api/market'
            : 'https://covered-bonds-dashboard.vercel.app/api/market';

        this.cache = {
            data: null,
            timestamp: null,
            expiration: 60 * 60 * 1000 // 1 hour cache
        };

        this.widgetId = 'cb-market-widget';
    }

    /**
     * Initialize the widget and fetch data
     */
    async init() {
        console.log('[CB MARKET] Initializing Covered Bonds Market Widget...');

        try {
            const data = await this.fetchMarketData();
            this.updateWidget(data);
        } catch (error) {
            console.error('[CB MARKET] Failed to initialize:', error);
            this.showError();
        }
    }

    /**
     * Fetch market data from backend with caching
     */
    async fetchMarketData() {
        // Check cache first
        if (this.isCacheValid()) {
            console.log('[CB MARKET] ✅ Using cached data');
            return this.cache.data;
        }

        console.log('[CB MARKET] 📡 Fetching fresh data from API...');

        try {
            const response = await fetch(this.apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            if (data.status === 'success') {
                // Update cache
                this.cache.data = data;
                this.cache.timestamp = Date.now();

                console.log('[CB MARKET] ✅ Data fetched successfully:', {
                    price: data.price,
                    change: data.daily_change_percent,
                    trend: data.trend
                });

                return data;
            } else {
                throw new Error(data.message || 'API returned error status');
            }

        } catch (error) {
            console.error('[CB MARKET] ❌ Fetch failed:', error.message);

            // Return cached data if available, even if expired
            if (this.cache.data) {
                console.warn('[CB MARKET] ⚠️ Using stale cached data as fallback');
                return this.cache.data;
            }

            throw error;
        }
    }

    /**
     * Check if cached data is still valid
     */
    isCacheValid() {
        if (!this.cache.data || !this.cache.timestamp) {
            return false;
        }

        const age = Date.now() - this.cache.timestamp;
        return age < this.cache.expiration;
    }

    /**
     * Update the widget UI with market data
     */
    updateWidget(data) {
        const widget = document.getElementById(this.widgetId);
        if (!widget) {
            console.error('[CB MARKET] Widget element not found');
            return;
        }

        const priceEl = widget.querySelector('#cb-price-display');
        const changeEl = widget.querySelector('#cb-change-display');
        const dateEl = widget.querySelector('#cb-date-display');

        if (!priceEl || !changeEl || !dateEl) {
            console.error('[CB MARKET] Widget elements missing');
            return;
        }

        // Update price
        priceEl.textContent = `${data.price} ${data.currency}`;

        // Update change with arrow and color
        const isPositive = data.daily_change_percent >= 0;
        const arrow = isPositive ? '▲' : '▼';
        const sign = isPositive ? '+' : '';

        changeEl.textContent = `${arrow} ${sign}${data.daily_change_percent}%`;

        // Apply color classes
        changeEl.classList.remove('trend-up', 'trend-down');
        widget.classList.remove('border-up', 'border-down');

        if (isPositive) {
            changeEl.classList.add('trend-up');
            widget.classList.add('border-up');
        } else {
            changeEl.classList.add('trend-down');
            widget.classList.add('border-down');
        }

        // Update date
        const formattedDate = this.formatDate(data.date);
        dateEl.innerHTML = `Données au : <strong>${formattedDate}</strong><br>Source: ${data.ticker} (${data.data_source})`;

        console.log('[CB MARKET] ✅ Widget updated successfully');
    }

    /**
     * Show error state in widget
     */
    showError() {
        const widget = document.getElementById(this.widgetId);
        if (!widget) return;

        const priceEl = widget.querySelector('#cb-price-display');
        const changeEl = widget.querySelector('#cb-change-display');
        const dateEl = widget.querySelector('#cb-date-display');

        if (priceEl) priceEl.textContent = 'Données indisponibles';
        if (changeEl) {
            changeEl.textContent = '--';
            changeEl.classList.remove('trend-up', 'trend-down');
        }
        if (dateEl) dateEl.textContent = 'Erreur de connexion au serveur';

        widget.classList.remove('border-up', 'border-down');
    }

    /**
     * Format date for display
     */
    formatDate(dateString) {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (error) {
            return dateString;
        }
    }

    /**
     * Manually refresh data (for testing or user-triggered refresh)
     */
    async refresh() {
        console.log('[CB MARKET] Manual refresh triggered');
        this.cache.timestamp = null; // Invalidate cache
        await this.init();
    }
}

// Auto-initialize when DOM is ready
if (typeof window !== 'undefined') {
    window.CoveredBondsMarket = CoveredBondsMarket;

    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.cbMarket = new CoveredBondsMarket();
            window.cbMarket.init();
        });
    } else {
        // DOM already loaded
        window.cbMarket = new CoveredBondsMarket();
        window.cbMarket.init();
    }
}
