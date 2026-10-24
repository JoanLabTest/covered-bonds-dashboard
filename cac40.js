// ============================================
// CAC 40 DETAILED PAGE MODULE
// Displays all 40 CAC 40 stocks organized by sector via Yahoo Finance API
// ============================================

// Global state
let cac40StocksData = [];
let filteredStocks = [];
let currentFilters = {
    sector: '',
    sortBy: 'name'
};

// ============================================
// API FUNCTIONS
// ============================================

async function fetchCAC40Stocks() {
    if (!CONFIG || !CONFIG.marketData || !CONFIG.marketData.enabled) {
        console.log('[CAC 40] Market data not configured');
        return [];
    }

    // Use static data (reference values)
    console.log('[CAC 40] 📊 Loading static CAC 40 data...');

    if (typeof window.cac40StaticData === 'undefined') {
        console.error('[CAC 40] ❌ Static data not loaded!');
        return [];
    }

    let stocksData = [...window.cac40StaticData];
    console.log(`[CAC 40] ✅ Loaded ${stocksData.length} stocks from static data`);

    // Create Yahoo Finance API instance
    const yahooApi = new YahooFinanceStockApi();

    // Fetch real-time CAC 40 index data
    try {
        console.log('[CAC 40] 📡 Fetching real-time CAC 40 index...');

        const cac40Data = await yahooApi.getCAC40Index();

        if (cac40Data && cac40Data.status === 'success') {
            // Update CAC 40 index in stocksData
            const indexIdx = stocksData.findIndex(s => s.symbol === '^FCHI');
            if (indexIdx !== -1) {
                stocksData[indexIdx] = {
                    ...stocksData[indexIdx],
                    price: cac40Data.price,
                    change: cac40Data.change,
                    changesPercentage: cac40Data.changesPercentage,
                    volume: cac40Data.volume,
                    dayLow: cac40Data.dayLow,
                    dayHigh: cac40Data.dayHigh,
                    dataSource: 'Yahoo Finance Real-Time',
                    isLive: yahooApi.isMarketOpen()
                };
                console.log(`[CAC 40] ✅ Real-time CAC 40 index updated: ${cac40Data.price} (${cac40Data.changesPercentage >= 0 ? '+' : ''}${cac40Data.changesPercentage.toFixed(2)}%)`);
            }
        }
    } catch (error) {
        console.warn('[CAC 40] ⚠️ Index API error, using static data:', error.message);
    }

    // Fetch real-time data for all 40 stocks
    try {
        console.log('[CAC 40] 📡 Fetching real-time data for 40 stocks...');

        // Get all stock tickers (exclude index)
        const stockTickers = stocksData
            .filter(s => s.symbol !== '^FCHI')
            .map(s => s.symbol);

        console.log(`[CAC 40] 📊 Fetching ${stockTickers.length} stocks in batch...`);

        // Fetch all stocks in one batch call
        const realStocksData = await yahooApi.getMultipleQuotesYahoo(stockTickers);

        // Merge real data with static data
        stocksData = stocksData.map(stock => {
            if (stock.symbol === '^FCHI') {
                // Keep index as-is (already updated above)
                return stock;
            }

            // Find real data for this stock
            const realData = realStocksData.find(r => r.symbol === stock.symbol);

            if (realData) {
                // Merge real data with static data (keep sector, name from static)
                return {
                    ...stock,
                    price: realData.price,
                    change: realData.change,
                    changesPercentage: realData.changesPercentage,
                    volume: realData.volume,
                    dayLow: realData.dayLow,
                    dayHigh: realData.dayHigh,
                    previousClose: realData.previousClose,
                    dataSource: 'Yahoo Finance Real-Time',
                    timestamp: realData.timestamp
                };
            }

            // If no real data found, keep static data
            return stock;
        });

        console.log(`[CAC 40] ✅ Real-time data loaded for ${realStocksData.length} stocks`);

    } catch (error) {
        console.warn('[CAC 40] ⚠️ Stocks API error, using static data:', error.message);
    }

    return stocksData;
}

// ============================================
// RENDERING FUNCTIONS
// ============================================

function renderMetrics() {
    // CAC 40 Index
    const cac40Index = cac40StocksData.find(s => s.symbol === '^FCHI');
    if (cac40Index) {
        const valueEl = document.getElementById('cac40IndexValue');

        // Add LIVE indicator if using real-time data and market is open
        if (cac40Index.isLive && cac40Index.dataSource === 'FMP Real-Time') {
            valueEl.innerHTML = `
                ${formatNumber(cac40Index.price, 2)}
                <span style="
                    margin-left: 0.5rem;
                    padding: 0.25rem 0.5rem;
                    background: linear-gradient(135deg, #10b981, #059669);
                    color: white;
                    font-size: 0.7rem;
                    font-weight: bold;
                    border-radius: 4px;
                    animation: pulse 2s ease-in-out infinite;
                ">● LIVE</span>
            `;
        } else {
            valueEl.textContent = formatNumber(cac40Index.price, 2);
        }

        const changeEl = document.getElementById('cac40IndexChange');
        const isPositive = cac40Index.changesPercentage >= 0;
        changeEl.className = `metric-change ${isPositive ? 'positive' : 'negative'}`;
        changeEl.innerHTML = `
            <span>${isPositive ? '▲' : '▼'}</span>
            <span>${formatNumber(Math.abs(cac40Index.changesPercentage), 2)}%</span>
        `;
    }

    // Top and worst performers
    const sortedByChange = [...cac40StocksData].sort((a, b) => b.changesPercentage - a.changesPercentage);

    if (sortedByChange.length > 0) {
        const top = sortedByChange[0];
        document.getElementById('topPerformer').textContent = top.name || top.symbol;
        document.getElementById('topPerformerChange').innerHTML = `
            <span>▲</span>
            <span>${formatNumber(top.changesPercentage, 2)}%</span>
        `;

        const worst = sortedByChange[sortedByChange.length - 1];
        document.getElementById('worstPerformer').textContent = worst.name || worst.symbol;
        document.getElementById('worstPerformerChange').innerHTML = `
            <span>▼</span>
            <span>${formatNumber(Math.abs(worst.changesPercentage), 2)}%</span>
        `;
    }

    // Total volume
    const totalVolume = cac40StocksData.reduce((sum, stock) => sum + (stock.volume || 0), 0);
    document.getElementById('totalVolume').textContent = formatVolume(totalVolume);
}

function renderStocksBySector() {
    const container = document.getElementById('stocksBySector');
    container.innerHTML = '';

    // Group stocks by sector
    const stocksBySector = {};
    filteredStocks.forEach(stock => {
        if (!stocksBySector[stock.sector]) {
            stocksBySector[stock.sector] = [];
        }
        stocksBySector[stock.sector].push(stock);
    });

    // Sort sectors alphabetically
    const sortedSectors = Object.keys(stocksBySector).sort();

    // Render each sector
    sortedSectors.forEach(sector => {
        const sectorSection = createSectorSection(sector, stocksBySector[sector]);
        container.appendChild(sectorSection);
    });
}

function createSectorSection(sectorName, stocks) {
    const section = document.createElement('section');
    section.className = 'table-section fade-in';
    section.style.marginBottom = '2rem';

    // Calculate sector performance
    const avgChange = stocks.reduce((sum, s) => sum + s.changesPercentage, 0) / stocks.length;
    const isPositive = avgChange >= 0;

    section.innerHTML = `
        <div class="table-header">
            <h3 class="table-title">
                <span>${getSectorIcon(sectorName)}</span>
                <span>${sectorName}</span>
                <span class="metric-change ${isPositive ? 'positive' : 'negative'}" style="font-size: 0.9rem; margin-left: 1rem;">
                    <span>${isPositive ? '▲' : '▼'}</span>
                    <span>${formatNumber(Math.abs(avgChange), 2)}%</span>
                </span>
            </h3>
            <span style="color: var(--color-text-muted); font-size: 0.9rem;">${stocks.length} actions</span>
        </div>
        <div class="table-wrapper">
            <table class="emissions-table">
                <thead>
                    <tr>
                        <th>Action</th>
                        <th>Symbole</th>
                        <th style="text-align: right;">Prix</th>
                        <th style="text-align: right;">Variation</th>
                        <th style="text-align: right;">Variation %</th>
                        <th style="text-align: right;">Volume</th>
                        <th style="text-align: right;">Min/Max Jour</th>
                    </tr>
                </thead>
                <tbody>
                    ${stocks.map(stock => createStockRow(stock)).join('')}
                </tbody>
            </table>
        </div>
    `;

    return section;
}

function createStockRow(stock) {
    const isPositive = stock.changesPercentage >= 0;
    const changeClass = isPositive ? 'positive' : 'negative';
    const changeIcon = isPositive ? '▲' : '▼';

    return `
        <tr>
            <td><strong>${stock.name || stock.symbol}</strong></td>
            <td><code style="background: var(--color-bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 4px;">${stock.symbol}</code></td>
            <td style="text-align: right;"><strong>${formatNumber(stock.price, 2)} €</strong></td>
            <td style="text-align: right; color: var(--color-${isPositive ? 'success' : 'danger'});">
                ${changeIcon} ${formatNumber(Math.abs(stock.change), 2)}
            </td>
            <td style="text-align: right;">
                <span class="metric-change ${changeClass}" style="display: inline-flex;">
                    <span>${changeIcon}</span>
                    <span>${formatNumber(Math.abs(stock.changesPercentage), 2)}%</span>
                </span>
            </td>
            <td style="text-align: right;">${formatVolume(stock.volume)}</td>
            <td style="text-align: right; color: var(--color-text-muted); font-size: 0.85rem;">
                ${formatNumber(stock.dayLow, 2)} - ${formatNumber(stock.dayHigh, 2)}
            </td>
        </tr>
    `;
}

// ============================================
// FILTERS
// ============================================

function populateFilters() {
    const sectorSelect = document.getElementById('filterSector');

    // Get unique sectors
    const sectors = [...new Set(cac40StocksData.map(s => s.sector))].sort();

    sectors.forEach(sector => {
        const option = document.createElement('option');
        option.value = sector;
        option.textContent = sector;
        sectorSelect.appendChild(option);
    });
}

function applyFilters() {
    const sector = document.getElementById('filterSector').value;
    const sortBy = document.getElementById('sortBy').value;

    currentFilters = { sector, sortBy };

    // Filter by sector
    filteredStocks = sector
        ? cac40StocksData.filter(s => s.sector === sector)
        : [...cac40StocksData];

    // Sort
    switch (sortBy) {
        case 'name':
            filteredStocks.sort((a, b) => (a.name || a.symbol).localeCompare(b.name || b.symbol));
            break;
        case 'change-desc':
            filteredStocks.sort((a, b) => b.changesPercentage - a.changesPercentage);
            break;
        case 'change-asc':
            filteredStocks.sort((a, b) => a.changesPercentage - b.changesPercentage);
            break;
        case 'price-desc':
            filteredStocks.sort((a, b) => b.price - a.price);
            break;
        case 'price-asc':
            filteredStocks.sort((a, b) => a.price - b.price);
            break;
        case 'volume-desc':
            filteredStocks.sort((a, b) => b.volume - a.volume);
            break;
    }

    renderStocksBySector();
}

function resetFilters() {
    document.getElementById('filterSector').value = '';
    document.getElementById('sortBy').value = 'name';
    applyFilters();
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

function getSectorIcon(sector) {
    const icons = {
        'Luxe': '💎',
        'Banque & Finance': '🏦',
        'Énergie': '⚡',
        'Automobile': '🚗',
        'Aéronautique & Défense': '✈️',
        'Technologie': '💻',
        'Télécoms': '📡',
        'Santé & Pharma': '💊',
        'Matériaux': '🏗️',
        'Industrie': '🏭',
        'Biens de Consommation': '🛒',
        'Services': '🔧',
        'Immobilier': '🏢'
    };
    return icons[sector] || '📊';
}

function addDataSourceBadge() {
    // Remove existing badge
    const existingBadge = document.querySelector('.market-data-source-badge');
    if (existingBadge) {
        existingBadge.remove();
    }

    // Create new badge
    const badge = document.createElement('div');
    badge.style.marginTop = '1rem';
    badge.style.padding = '0.75rem 1rem';
    badge.style.borderRadius = '8px';
    badge.style.fontSize = '0.9rem';
    badge.style.display = 'flex';
    badge.style.alignItems = 'center';
    badge.style.gap = '0.5rem';


    // Check if using real Marketstack data
    const usingRealData = CONFIG.marketstack && CONFIG.marketstack.enabled && CONFIG.marketstack.apiKey !== 'demo';

    if (usingRealData) {
        badge.className = 'market-data-source-badge real';
        badge.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))';
        badge.style.border = '1px solid rgba(16, 185, 129, 0.3)';
        badge.innerHTML = '✅ <strong>Données Réelles</strong> - Marketstack (Euronext Paris, EOD)';
    } else {
        badge.className = 'market-data-source-badge fallback';
        badge.style.background = 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(217, 119, 6, 0.1))';
        badge.style.border = '1px solid rgba(245, 158, 11, 0.3)';
        badge.innerHTML = `
            ⚠️ <strong>Mode Démo</strong> - Données de référence
            <a href="https://marketstack.com/product" target="_blank" 
               style="margin-left: auto; color: var(--color-primary); text-decoration: none; font-weight: 600;">
                Obtenir clé API gratuite →
            </a>
        `;
    }

    // Insert badge after header
    const header = document.querySelector('.header-content');
    if (header) {
        header.parentNode.insertBefore(badge, header.nextSibling);
    }
}

function updateLastUpdate() {
    const now = new Date();
    document.getElementById('lastUpdate').textContent = now.toLocaleTimeString('fr-FR');
}

// ============================================
// INITIALIZATION
// ============================================

async function initializeCAC40Page() {
    console.log('[CAC 40] Initializing page...');

    // Fetch data
    cac40StocksData = await fetchCAC40Stocks();
    filteredStocks = [...cac40StocksData];

    // Populate filters
    populateFilters();

    // Render
    renderMetrics();
    applyFilters();

    // Add data source badge
    addDataSourceBadge();

    // Update timestamp
    updateLastUpdate();

    // Attach event listeners
    document.getElementById('applyCAC40Filters').addEventListener('click', applyFilters);
    document.getElementById('resetCAC40Filters').addEventListener('click', resetFilters);

    // Auto-refresh every 60 seconds (longer interval to avoid rate limiting)
    setInterval(async () => {
        cac40StocksData = await fetchCAC40Stocks();
        filteredStocks = currentFilters.sector
            ? cac40StocksData.filter(s => s.sector === currentFilters.sector)
            : [...cac40StocksData];
        renderMetrics();
        renderStocksBySector();
        updateLastUpdate();
    }, 60000);

    console.log('[CAC 40] Initialization complete');
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCAC40Page);
} else {
    initializeCAC40Page();
}
