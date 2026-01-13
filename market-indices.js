// ============================================
// MARKET INDICES MODULE
// Real-time stock market indices tracking
// ============================================

// Global state
let marketIndicesData = [];
let isUsingRealMarketData = false;
let marketDataCache = null;
let marketDataCacheTime = 0;

// ============================================
// API FUNCTIONS
// ============================================

async function fetchMarketIndices() {
    if (!CONFIG || !CONFIG.marketData || !CONFIG.marketData.enabled) {
        console.log('[MARKET INDICES] Market data not configured');
        return [];
    }

    // Check cache (30 seconds)
    const now = Date.now();
    if (marketDataCache && (now - marketDataCacheTime) < 30000) {
        console.log('[MARKET INDICES] Using cached data');
        return marketDataCache;
    }

    try {
        const symbols = Object.keys(CONFIG.marketData.indices).join(',');
        const apiKey = CONFIG.marketData.apiKey;
        const baseUrl = CONFIG.marketData.baseUrl;

        const url = `${baseUrl}/quote/${symbols}?apikey=${apiKey}`;

        console.log('[MARKET INDICES] Fetching from FMP:', url);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();

        if (!data || data.length === 0) {
            throw new Error('No data received from API');
        }

        // Transform data
        const transformedData = data.map(quote => {
            const config = CONFIG.marketData.indices[quote.symbol];
            return {
                symbol: quote.symbol,
                name: config?.name || quote.name,
                flag: config?.flag || '📊',
                price: quote.price,
                change: quote.change,
                changesPercentage: quote.changesPercentage,
                dayLow: quote.dayLow,
                dayHigh: quote.dayHigh,
                yearLow: quote.yearLow,
                yearHigh: quote.yearHigh,
                volume: quote.volume,
                previousClose: quote.previousClose,
                timestamp: quote.timestamp || Date.now()
            };
        });

        console.log(`[MARKET INDICES] Successfully fetched ${transformedData.length} indices`);

        // Update cache
        marketDataCache = transformedData;
        marketDataCacheTime = now;
        isUsingRealMarketData = true;

        return transformedData;

    } catch (error) {
        console.error('[MARKET INDICES] Failed to fetch data:', error);
        isUsingRealMarketData = false;
        return [];
    }
}

// ============================================
// RENDERING FUNCTIONS
// ============================================

function renderIndicesWidget() {
    const container = document.getElementById('indicesWidget');
    if (!container) return;

    if (!marketIndicesData || marketIndicesData.length === 0) {
        container.innerHTML = `
            <div class="no-data-message">
                <p>📊 Données des indices temporairement indisponibles</p>
            </div>
        `;
        return;
    }

    container.innerHTML = '';

    marketIndicesData.forEach(index => {
        const card = createIndexCard(index);
        container.appendChild(card);
    });

    // Update data source badge
    updateMarketDataSourceBadge();
}

function createIndexCard(index) {
    const card = document.createElement('div');
    card.className = 'index-card';

    const isPositive = index.changesPercentage >= 0;
    const changeClass = isPositive ? 'positive' : 'negative';
    const changeIcon = isPositive ? '▲' : '▼';

    // Format numbers
    const price = formatNumber(index.price, 2);
    const change = formatNumber(Math.abs(index.change), 2);
    const changePercent = formatNumber(Math.abs(index.changesPercentage), 2);

    card.innerHTML = `
        <div class="index-header">
            <span class="index-flag">${index.flag}</span>
            <span class="index-name">${index.name}</span>
        </div>
        <div class="index-price">${price}</div>
        <div class="index-change ${changeClass}">
            <span class="change-icon">${changeIcon}</span>
            <span class="change-value">${change}</span>
            <span class="change-percent">(${changePercent}%)</span>
        </div>
        <div class="index-range">
            <small>Min: ${formatNumber(index.dayLow, 2)} | Max: ${formatNumber(index.dayHigh, 2)}</small>
        </div>
    `;

    return card;
}

function updateMarketDataSourceBadge() {
    // Remove existing badge
    const existingBadge = document.querySelector('.market-data-source-badge');
    if (existingBadge) {
        existingBadge.remove();
    }

    // Create new badge
    const badge = document.createElement('div');
    badge.className = isUsingRealMarketData ? 'market-data-source-badge real' : 'market-data-source-badge simulated';
    badge.innerHTML = isUsingRealMarketData
        ? '✅ <strong>Données Temps Réel</strong> - Financial Modeling Prep'
        : '⚠️ <strong>Données Indisponibles</strong>';

    // Insert badge
    const section = document.getElementById('marketIndicesSection');
    if (section) {
        const header = section.querySelector('.section-header');
        if (header) {
            header.parentNode.insertBefore(badge, header.nextSibling);
        }
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function formatNumber(num, decimals = 2) {
    if (num === null || num === undefined || isNaN(num)) return '-';
    return Number(num).toLocaleString('fr-FR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
}

function formatVolume(volume) {
    if (!volume) return '-';
    if (volume >= 1000000000) {
        return (volume / 1000000000).toFixed(2) + 'B';
    }
    if (volume >= 1000000) {
        return (volume / 1000000).toFixed(2) + 'M';
    }
    if (volume >= 1000) {
        return (volume / 1000).toFixed(2) + 'K';
    }
    return volume.toString();
}

// ============================================
// INITIALIZATION
// ============================================

async function initializeMarketIndices() {
    console.log('[MARKET INDICES] Initializing...');

    // Fetch initial data
    marketIndicesData = await fetchMarketIndices();

    // Render widget
    renderIndicesWidget();

    // Auto-update
    if (CONFIG && CONFIG.marketData && CONFIG.marketData.updateInterval) {
        setInterval(async () => {
            marketIndicesData = await fetchMarketIndices();
            renderIndicesWidget();
        }, CONFIG.marketData.updateInterval);
    }

    console.log('[MARKET INDICES] Initialization complete');
}

// Export functions
window.initializeMarketIndices = initializeMarketIndices;
window.fetchMarketIndices = fetchMarketIndices;
