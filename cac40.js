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

    try {
        // Get all symbols from config
        const sectors = CONFIG.marketData.cac40Stocks;
        const allSymbols = [];

        Object.values(sectors).forEach(sectorSymbols => {
            allSymbols.push(...sectorSymbols);
        });

        console.log(`[CAC 40] Fetching ${allSymbols.length} stocks...`);

        const baseUrl = CONFIG.marketData.baseUrl;
        const allData = [];

        // Fetch stocks individually (Yahoo Finance doesn't batch well)
        for (const symbol of allSymbols) {
            try {
                const url = `${baseUrl}/${symbol}`;
                const response = await fetch(url);

                if (!response.ok) {
                    console.warn(`[CAC 40] Failed to fetch ${symbol}: ${response.status}`);
                    continue;
                }

                const data = await response.json();

                if (data && data.chart && data.chart.result && data.chart.result.length > 0) {
                    const result = data.chart.result[0];
                    const meta = result.meta;
                    const quote = result.indicators?.quote?.[0];

                    const stockData = {
                        symbol: symbol,
                        name: meta.longName || meta.shortName || symbol.replace('.PA', ''),
                        price: meta.regularMarketPrice || meta.previousClose,
                        change: (meta.regularMarketPrice || meta.previousClose) - meta.previousClose,
                        changesPercentage: ((meta.regularMarketPrice || meta.previousClose) - meta.previousClose) / meta.previousClose * 100,
                        dayLow: meta.regularMarketDayLow || quote?.low?.[quote.low.length - 1] || 0,
                        dayHigh: meta.regularMarketDayHigh || quote?.high?.[quote.high.length - 1] || 0,
                        volume: meta.regularMarketVolume || quote?.volume?.[quote.volume.length - 1] || 0,
                        previousClose: meta.previousClose
                    };

                    allData.push(stockData);
                }

                // Small delay to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 150));

            } catch (error) {
                console.error(`[CAC 40] Error fetching ${symbol}:`, error);
            }
        }

        // Enrich with sector information
        const enrichedData = allData.map(stock => {
            let sector = 'Autre';

            for (const [sectorName, symbols] of Object.entries(sectors)) {
                if (symbols.includes(stock.symbol)) {
                    sector = sectorName;
                    break;
                }
            }

            return {
                ...stock,
                sector: sector
            };
        });

        console.log(`[CAC 40] Successfully fetched ${enrichedData.length} stocks`);
        return enrichedData;

    } catch (error) {
        console.error('[CAC 40] Failed to fetch data:', error);
        return [];
    }
}

// ============================================
// RENDERING FUNCTIONS
// ============================================

function renderMetrics() {
    // CAC 40 Index
    const cac40Index = cac40StocksData.find(s => s.symbol === '^FCHI');
    if (cac40Index) {
        document.getElementById('cac40IndexValue').textContent = formatNumber(cac40Index.price, 2);
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
