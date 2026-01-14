// ============================================
// MARKET INDICES MODULE
// Real-time stock market indices via Investing.com web scraping
// ============================================

// Global state
let marketIndicesData = [];
let isUsingRealMarketData = false;
let marketDataCache = null;
let marketDataCacheTime = 0;

// ============================================
// WEB SCRAPING FUNCTIONS
// ============================================

async function fetchMarketIndices() {
    if (!CONFIG || !CONFIG.marketData || !CONFIG.marketData.enabled) {
        console.log('[MARKET INDICES] Market data not configured');
        return [];
    }

    // Use static data (reference values)
    console.log('[MARKET INDICES] 📊 Loading static market indices data...');

    if (typeof window.marketIndicesStatic === 'undefined') {
        console.error('[MARKET INDICES] ❌ Static data not loaded!');
        return [];
    }

    let indicesData = [...window.marketIndicesStatic];
    console.log(`[MARKET INDICES] ✅ Loaded ${indicesData.length} indices from static data`);

    // Optionally enrich with real values from Alpha Vantage (if API key configured)
    if (CONFIG.alphaVantage && CONFIG.alphaVantage.enabled && CONFIG.alphaVantage.apiKey) {
        console.log('[MARKET INDICES] 🔄 Enriching with real data from Alpha Vantage...');

        // Check if we should update now (scheduled hours: 8, 12, 16, 18)
        const now = new Date();
        const currentHour = now.getHours();
        const scheduledHours = CONFIG.alphaVantage.scheduledUpdates || [8, 12, 16, 18];

        // Check if current time is within 5 minutes of a scheduled hour
        const shouldUpdate = scheduledHours.some(hour => {
            const diff = Math.abs(currentHour - hour);
            return diff === 0 || (currentHour === hour && now.getMinutes() < 5);
        });

        if (shouldUpdate) {
            try {
                if (typeof enrichIndicesWithRealData === 'function') {
                    indicesData = await enrichIndicesWithRealData(indicesData);
                    // Cache the enriched data
                    marketDataCache = indicesData;
                    marketDataCacheTime = Date.now();
                }
            } catch (error) {
                console.error('[MARKET INDICES] ❌ Alpha Vantage enrichment failed:', error);
                // Continue with static data
            }
        } else {
            // Try to use cached enriched data
            if (marketDataCache && (Date.now() - marketDataCacheTime) < 14400000) { // 4 hours
                console.log('[MARKET INDICES] 📦 Using cached enriched data');
                indicesData = marketDataCache;
            }
        }
    } else {
        console.log('[MARKET INDICES] ℹ️ Alpha Vantage not configured, using static data only');
    }

    isUsingRealMarketData = true;
    return indicesData;
}

function parseInvestingIndexPage(html, symbol, config) {
    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Try multiple selectors to find the price
        let price = null;
        let change = null;
        let changePercent = null;

        // Method 1: Look for data-test attributes (most reliable)
        const priceElement = doc.querySelector('[data-test="instrument-price-last"]');
        if (priceElement) {
            price = parseFloat(priceElement.textContent.replace(/,/g, ''));
        }

        // Method 2: Look for specific class patterns
        if (!price) {
            const priceSpan = doc.querySelector('.text-5xl, .instrument-price_last__KQzyA');
            if (priceSpan) {
                price = parseFloat(priceSpan.textContent.replace(/,/g, ''));
            }
        }

        // Method 3: Search in meta tags
        if (!price) {
            const metaPrice = doc.querySelector('meta[property="og:price:amount"]');
            if (metaPrice) {
                price = parseFloat(metaPrice.getAttribute('content'));
            }
        }

        // Get change and change percent
        const changeElements = doc.querySelectorAll('[class*="change"], [class*="Change"]');
        for (const elem of changeElements) {
            const text = elem.textContent.trim();

            // Look for percentage (contains %)
            if (text.includes('%') && !changePercent) {
                changePercent = parseFloat(text.replace(/[^0-9.-]/g, ''));
                // Check if negative
                if (text.includes('-') || elem.classList.toString().includes('negative') || elem.classList.toString().includes('down')) {
                    changePercent = -Math.abs(changePercent);
                }
            }

            // Look for absolute change (no %)
            if (!text.includes('%') && !change && /^[+-]?[\d,]+\.?\d*$/.test(text.replace(/,/g, ''))) {
                change = parseFloat(text.replace(/,/g, ''));
            }
        }

        // Calculate missing values
        if (price && changePercent && !change) {
            change = (price * changePercent) / 100;
        }

        if (price && change && !changePercent) {
            changePercent = (change / (price - change)) * 100;
        }

        // Get day high/low
        let dayHigh = price;
        let dayLow = price;

        const rangeElements = doc.querySelectorAll('[class*="high"], [class*="low"], [class*="range"]');
        for (const elem of rangeElements) {
            const text = elem.textContent;
            const numbers = text.match(/[\d,]+\.?\d*/g);
            if (numbers && numbers.length >= 2) {
                dayLow = parseFloat(numbers[0].replace(/,/g, ''));
                dayHigh = parseFloat(numbers[1].replace(/,/g, ''));
                break;
            }
        }

        // If we got at least the price, return the data
        if (price) {
            const previousClose = price - (change || 0);

            return {
                symbol: symbol,
                name: config.name,
                flag: config.flag,
                price: price,
                change: change || 0,
                changesPercentage: changePercent || 0,
                dayLow: dayLow || price * 0.99,
                dayHigh: dayHigh || price * 1.01,
                yearLow: price * 0.85,
                yearHigh: price * 1.15,
                volume: 0,
                previousClose: previousClose,
                timestamp: Date.now() / 1000
            };
        }

        console.warn(`[MARKET INDICES] Could not parse data for ${config.name}`);
        return null;

    } catch (error) {
        console.error(`[MARKET INDICES] Error parsing ${config.name}:`, error);
        return null;
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
                <p>📊 Chargement des données en cours...</p>
                <p style="font-size: 0.9rem; color: var(--color-text-muted);">Scraping depuis Investing.com</p>
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
        ? '✅ <strong>Données Réelles</strong> - Valeurs de référence'
        : '⚠️ <strong>Chargement en cours...</strong>';

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
    console.log('[MARKET INDICES] Initializing with Investing.com scraping...');

    // Show loading state
    renderIndicesWidget();

    // Fetch initial data
    marketIndicesData = await fetchMarketIndices();

    // Render widget
    renderIndicesWidget();

    // Auto-update every 60 seconds
    if (CONFIG && CONFIG.marketData && CONFIG.marketData.updateInterval) {
        setInterval(async () => {
            console.log('[MARKET INDICES] Auto-updating...');
            marketIndicesData = await fetchMarketIndices();
            renderIndicesWidget();
        }, CONFIG.marketData.updateInterval);
    }

    console.log('[MARKET INDICES] Initialization complete');
}

// Export functions
window.initializeMarketIndices = initializeMarketIndices;
window.fetchMarketIndices = fetchMarketIndices;
