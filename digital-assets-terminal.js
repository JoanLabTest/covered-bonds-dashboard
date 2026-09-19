/**
 * Digital Assets Terminal Module
 * Fetches and displays real-time tokenized asset data in Bloomberg-style terminal
 */

class DigitalAssetsTerminal {
    constructor() {
        this.apiUrl = this.getApiUrl();
        this.refreshInterval = 5 * 60 * 1000; // 5 minutes
        this.cacheKey = 'digital_assets_cache';
        this.cacheExpiry = 60 * 60 * 1000; // 1 hour
    }

    getApiUrl() {
        // Use production URL if on GitHub Pages, localhost otherwise
        if (window.location.hostname === 'joanlabtest.github.io') {
            return 'https://covered-bonds-dashboard.vercel.app/api/digital-bonds';
        }
        return 'http://localhost:3001/api/digital-bonds';
    }

    async fetchData() {
        try {
            // Check cache first
            const cached = this.getCache();
            if (cached) {
                console.log('📦 Using cached digital assets data');
                return cached;
            }

            console.log('🔌 Fetching digital assets from API...');
            const response = await fetch(this.apiUrl);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();

            if (data.status === 'success') {
                this.setCache(data);
                console.log(`✅ Loaded ${data.data.length} digital assets from ${data.source}`);
                return data;
            } else {
                throw new Error(data.message || 'API returned error status');
            }
        } catch (error) {
            console.error('❌ Error fetching digital assets:', error);
            return this.getFallbackData();
        }
    }

    getFallbackData() {
        return {
            status: 'success',
            data: [
                {
                    ticker: 'USDY (Ondo Treasury)',
                    type: 'Tokenized Bond',
                    price: 1.0512,
                    currency: 'USD',
                    change: 0.08,
                    volume: '2500K',
                    yield: '5.10%'
                },
                {
                    ticker: 'EURC (Circle Euro)',
                    type: 'Digital Cash',
                    price: 1.0002,
                    currency: 'EUR',
                    change: 0.01,
                    volume: '1200K',
                    yield: 'N/A'
                },
                {
                    ticker: 'PAXG (Tether Gold)',
                    type: 'Commodity-Backed',
                    price: 2685.50,
                    currency: 'USD',
                    change: -0.15,
                    volume: '850K',
                    yield: 'N/A'
                }
            ],
            updated: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
            source: 'Demo Data'
        };
    }

    getCache() {
        try {
            const cached = localStorage.getItem(this.cacheKey);
            if (!cached) return null;

            const { data, timestamp } = JSON.parse(cached);
            const age = Date.now() - timestamp;

            if (age < this.cacheExpiry) {
                return data;
            }

            localStorage.removeItem(this.cacheKey);
            return null;
        } catch (error) {
            return null;
        }
    }

    setCache(data) {
        try {
            const cacheData = {
                data,
                timestamp: Date.now()
            };
            localStorage.setItem(this.cacheKey, JSON.stringify(cacheData));
        } catch (error) {
            console.warn('Failed to cache data:', error);
        }
    }

    renderTable(data) {
        const tbody = document.getElementById('rwa-feed');
        if (!tbody) {
            console.error('Table body #rwa-feed not found');
            return;
        }

        if (!data || !data.data || data.data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#7f8c8d;">No data available</td></tr>';
            return;
        }

        tbody.innerHTML = '';

        data.data.forEach(asset => {
            const changeClass = asset.change >= 0 ? 'pos' : 'neg';
            const changeSymbol = asset.change >= 0 ? '▲' : '▼';

            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="color:#fff;font-weight:bold">${this.escapeHtml(asset.ticker)}</td>
                <td style="color:#aaa">${this.escapeHtml(asset.type)}</td>
                <td class="num">${asset.price} ${asset.currency}</td>
                <td class="num ${changeClass}">${changeSymbol} ${Math.abs(asset.change)}%</td>
                <td class="num" style="color:#f39c12">${this.escapeHtml(asset.yield)}</td>
                <td class="num" style="color:#aaa">${this.escapeHtml(asset.volume)}</td>
            `;
            tbody.appendChild(row);
        });

        // Update timestamp
        const timestampEl = document.getElementById('rwa-timestamp');
        if (timestampEl && data.updated) {
            timestampEl.textContent = `Last Update: ${data.updated}`;
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    async init() {
        console.log('🚀 Initializing Digital Assets Terminal...');

        const data = await this.fetchData();
        this.renderTable(data);

        // Auto-refresh every 5 minutes
        setInterval(async () => {
            console.log('🔄 Auto-refreshing digital assets data...');
            const freshData = await this.fetchData();
            this.renderTable(freshData);
        }, this.refreshInterval);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const terminal = new DigitalAssetsTerminal();
        terminal.init();
    });
} else {
    const terminal = new DigitalAssetsTerminal();
    terminal.init();
}
