// ============================================
// MARKET INDICES MODULE
// Real-time stock market indices tracking via Twelve Data API
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
        return getFallbackIndicesData();
    }

    // Check cache (60 seconds)
    const now = Date.now();
    if (marketDataCache && (now - marketDataCacheTime) < 60000) {
        console.log('[MARKET INDICES] Using cached data');
        return marketDataCache;
    }

    try {
        const apiKey = CONFIG.marketData.apiKey;
        const baseUrl = CONFIG.marketData.baseUrl;

        // Check if API key is configured
        if (!apiKey || apiKey === 'demo' || apiKey === 'YOUR_API_KEY_HERE') {
            console.warn('[MARKET INDICES] No valid API key configured. Using fallback data.');
            console.warn('[MARKET INDICES] Get your free API key at: https://twelvedata.com/pricing');
            isUsingRealMarketData = false;
            return getFallbackIndicesData();
        }

        const symbols = Object.keys(CONFIG.marketData.indices);
        console.log('[MARKET INDICES] Fetching from Twelve Data:', symbols);

        const allData = [];

        // Fetch each index individually
        for (const key of symbols) {
            try {
                const config = CONFIG.marketData.indices[key];
                const symbol = config.symbol || key.replace('^', '');

                const url = `${baseUrl}/quote?symbol=${symbol}&apikey=${apiKey}`;
                const response = await fetch(url);

                if (!response.ok) {
                    console.warn(`[MARKET INDICES] Failed to fetch ${symbol}: ${response.status}`);
                    continue;
                }

                const data = await response.json();

                if (data && !data.code && data.symbol) {
                    const transformedData = {
                        symbol: key,
                        name: config.name,
                        flag: config.flag,
                        price: parseFloat(data.close || data.price),
                        change: parseFloat(data.change),
                        changesPercentage: parseFloat(data.percent_change),
                        dayLow: parseFloat(data.low),
                        dayHigh: parseFloat(data.high),
                        yearLow: parseFloat(data.fifty_two_week.low),
                        yearHigh: parseFloat(data.fifty_two_week.high),
                        volume: parseInt(data.volume),
                        previousClose: parseFloat(data.previous_close),
                        timestamp: Date.now() / 1000
                    };

                    allData.push(transformedData);
                }

                // Delay to respect rate limit (8 calls/minute = 7.5s between calls)
                await new Promise(resolve => setTimeout(resolve, 8000));

            } catch (error) {
                console.error(`[MARKET INDICES] Error fetching ${key}:`, error);
            }
        }

        if (allData.length === 0) {
            throw new Error('No data received from Twelve Data');
        }

        console.log(`[MARKET INDICES] Successfully fetched ${allData.length} indices`);

        // Update cache
        marketDataCache = allData;
        marketDataCacheTime = now;
        isUsingRealMarketData = true;

        return allData;

    } catch (error) {
        console.error('[MARKET INDICES] Failed to fetch data:', error);
        isUsingRealMarketData = false;
        return getFallbackIndicesData();
    }
}

// Fallback data with realistic values
function getFallbackIndicesData() {
    const now = Date.now() / 1000;
    return [
        {
            symbol: '^FCHI',
            name: 'CAC 40',
            flag: '🇫🇷',
            price: 7650.50,
            change: 45.30,
            changesPercentage: 0.60,
            dayLow: 7605.20,
            dayHigh: 7665.80,
            yearLow: 6800.00,
            yearHigh: 7850.00,
            volume: 3500000,
            previousClose: 7605.20,
            timestamp: now
        },
        {
            symbol: '^GSPC',
            name: 'S&P 500',
            flag: '🇺🇸',
            price: 4850.25,
            change: 12.50,
            changesPercentage: 0.26,
            dayLow: 4838.00,
            dayHigh: 4862.00,
            yearLow: 4100.00,
            yearHigh: 4950.00,
            volume: 2800000,
            previousClose: 4837.75,
            timestamp: now
        },
        {
            symbol: '^GDAXI',
            name: 'DAX',
            flag: '🇩🇪',
            price: 17250.80,
            change: -25.40,
            changesPercentage: -0.15,
            dayLow: 17225.00,
            dayHigh: 17290.00,
            yearLow: 15500.00,
            yearHigh: 17500.00,
            volume: 1500000,
            previousClose: 17276.20,
            timestamp: now
        },
        {
            symbol: '^DJI',
            name: 'Dow Jones',
            flag: '🇺🇸',
            price: 38250.60,
            change: 85.20,
            changesPercentage: 0.22,
            dayLow: 38165.40,
            dayHigh: 38280.00,
            yearLow: 33000.00,
            yearHigh: 39000.00,
            volume: 350000,
            previousClose: 38165.40,
            timestamp: now
        },
        {
            symbol: '^VIX',
            name: 'VIX',
            flag: '📊',
            price: 14.25,
            change: -0.35,
            changesPercentage: -2.40,
            dayLow: 14.10,
            dayHigh: 14.80,
            yearLow: 12.00,
            yearHigh: 25.00,
            volume: 0,
            previousClose: 14.60,
            timestamp: now
        }
    ];
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

    if (isUsingRealMarketData) {
        badge.innerHTML = '✅ <strong>Données Temps Réel</strong> - Twelve Data';
    } else {
        badge.innerHTML = `
            ⚠️ <strong>Données Simulées</strong> - 
            <a href="https://twelvedata.com/pricing" target="_blank" style="color: white; text-decoration: underline;">
                Obtenez votre clé API gratuite
            </a>
        `;
    }

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
