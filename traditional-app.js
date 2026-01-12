// ============================================
// TRADITIONAL COVERED BONDS - APP LOGIC
// Professional Market Data Management
// ============================================

// ============================================
// STATE MANAGEMENT
// ============================================
let traditionalFilteredData = [...traditionalBondsData];
let traditionalCurrentSort = { column: null, direction: 'asc' };
let traditionalCurrentView = 'primary'; // 'primary', 'secondary', 'news'

// ============================================
// INITIALIZATION
// ============================================
function initializeTraditionalSection() {
    populateTraditionalFilters();
    updateTraditionalMetrics();
    renderTraditionalTable();
    initializeTraditionalCharts();
    renderTraditionalNewsSection();
    renderTraditionalSecondaryMarketDashboard();
}

// ============================================
// FILTERS
// ============================================
function populateTraditionalFilters() {
    // Get unique values
    const issuers = [...new Set(traditionalBondsData.map(e => e.issuer))].sort();
    const countries = [...new Set(traditionalBondsData.map(e => e.country))].sort();
    const currencies = [...new Set(traditionalBondsData.map(e => e.currency))].sort();
    const types = [...new Set(traditionalBondsData.map(e => e.type))].sort();

    // Populate issuer filter
    const issuerSelect = document.getElementById('filterTraditionalIssuer');
    if (issuerSelect) {
        issuers.forEach(issuer => {
            const option = document.createElement('option');
            option.value = issuer;
            option.textContent = issuer;
            issuerSelect.appendChild(option);
        });
    }

    // Populate country filter
    const countrySelect = document.getElementById('filterTraditionalCountry');
    if (countrySelect) {
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            option.textContent = country;
            countrySelect.appendChild(option);
        });
    }

    // Populate currency filter
    const currencySelect = document.getElementById('filterTraditionalCurrency');
    if (currencySelect) {
        currencies.forEach(currency => {
            const option = document.createElement('option');
            option.value = currency;
            option.textContent = currency;
            currencySelect.appendChild(option);
        });
    }

    // Populate type filter
    const typeSelect = document.getElementById('filterTraditionalType');
    if (typeSelect) {
        types.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            typeSelect.appendChild(option);
        });
    }
}

function applyTraditionalFilters() {
    const issuerFilter = document.getElementById('filterTraditionalIssuer')?.value || '';
    const countryFilter = document.getElementById('filterTraditionalCountry')?.value || '';
    const currencyFilter = document.getElementById('filterTraditionalCurrency')?.value || '';
    const statusFilter = document.getElementById('filterTraditionalStatus')?.value || '';
    const typeFilter = document.getElementById('filterTraditionalType')?.value || '';
    const greenBondFilter = document.getElementById('filterTraditionalGreenBond')?.value || '';

    traditionalFilteredData = traditionalBondsData.filter(emission => {
        return (
            (!issuerFilter || emission.issuer === issuerFilter) &&
            (!countryFilter || emission.country === countryFilter) &&
            (!currencyFilter || emission.currency === currencyFilter) &&
            (!statusFilter || emission.status === statusFilter) &&
            (!typeFilter || emission.type === typeFilter) &&
            (!greenBondFilter || (greenBondFilter === 'true' ? emission.greenBond : !emission.greenBond))
        );
    });

    updateTraditionalMetrics();
    renderTraditionalTable();
    updateTraditionalCharts();
}

function resetTraditionalFilters() {
    const filterIds = [
        'filterTraditionalIssuer',
        'filterTraditionalCountry',
        'filterTraditionalCurrency',
        'filterTraditionalStatus',
        'filterTraditionalType',
        'filterTraditionalGreenBond'
    ];

    filterIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.value = '';
    });

    traditionalFilteredData = [...traditionalBondsData];
    traditionalCurrentSort = { column: null, direction: 'asc' };

    updateTraditionalMetrics();
    renderTraditionalTable();
    updateTraditionalCharts();
}

// ============================================
// METRICS CALCULATION
// ============================================
function updateTraditionalMetrics() {
    // Convert all amounts to EUR for consistent calculation
    const eurRates = { EUR: 1, GBP: 1.17, SEK: 0.09, DKK: 0.13, NOK: 0.09 };

    // Total volume in EUR
    const totalVolume = traditionalFilteredData.reduce((sum, e) => {
        const rate = eurRates[e.currency] || 1;
        return sum + (e.amount * rate);
    }, 0);

    const totalVolumeElement = document.getElementById('totalTraditionalVolume');
    if (totalVolumeElement) {
        totalVolumeElement.textContent = `€${Math.round(totalVolume).toLocaleString('fr-FR')}M`;
    }

    // Total emissions
    const totalEmissions = traditionalFilteredData.length;
    const totalEmissionsElement = document.getElementById('totalTraditionalEmissions');
    if (totalEmissionsElement) {
        totalEmissionsElement.textContent = totalEmissions;
    }

    // Active issuers
    const activeIssuers = new Set(traditionalFilteredData.map(e => e.issuer)).size;
    const activeIssuersElement = document.getElementById('activeTraditionalIssuers');
    if (activeIssuersElement) {
        activeIssuersElement.textContent = activeIssuers;
    }

    // Countries
    const countries = new Set(traditionalFilteredData.map(e => e.country)).size;
    const countriesElement = document.getElementById('totalTraditionalCountries');
    if (countriesElement) {
        countriesElement.textContent = countries;
    }

    // Average spread
    const avgSpread = traditionalFilteredData.length > 0
        ? (traditionalFilteredData.reduce((sum, e) => sum + (e.spread || 0), 0) / traditionalFilteredData.length).toFixed(1)
        : 0;
    const avgSpreadElement = document.getElementById('avgTraditionalSpread');
    if (avgSpreadElement) {
        avgSpreadElement.textContent = `${avgSpread} bps`;
    }

    // Update displayed count
    const displayedCountElement = document.getElementById('displayedTraditionalCount');
    if (displayedCountElement) {
        displayedCountElement.textContent = totalEmissions;
    }
}

// ============================================
// TABLE RENDERING
// ============================================
function renderTraditionalTable() {
    const tbody = document.getElementById('traditionalEmissionsTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    traditionalFilteredData.forEach(emission => {
        const row = document.createElement('tr');

        const greenIndicator = emission.greenBond ? '<span style="color: #10b981; margin-left: 4px;">🌱</span>' : '';
        const isinDisplay = emission.isin
            ? `<span class="badge" style="background: rgba(212, 175, 55, 0.1); color: var(--color-accent);">${emission.isin}</span>`
            : '<span style="color: var(--color-text-muted); font-style: italic;">En attente</span>';

        row.innerHTML = `
            <td class="font-bold">${emission.issuer}${greenIndicator}</td>
            <td class="font-bold">${emission.amount.toLocaleString('fr-FR')} ${emission.currency}</td>
            <td>${emission.currency}</td>
            <td><span class="badge" style="background: rgba(100, 116, 139, 0.15); color: var(--color-text-secondary); border: 1px solid rgba(100, 116, 139, 0.3);">${emission.country}</span></td>
            <td><span class="badge platform-badge">${emission.type}</span></td>
            <td>${formatDate(emission.issueDate)}</td>
            <td>${formatDate(emission.maturity)}</td>
            <td>${emission.coupon}%</td>
            <td>${emission.spread} bps</td>
            <td><span class="badge rating-badge">${emission.rating}</span></td>
            <td>${isinDisplay}</td>
            <td><span class="badge badge-${emission.status.toLowerCase()}">${emission.status}</span></td>
        `;

        tbody.appendChild(row);
    });
}

// ============================================
// CHARTS
// ============================================
function initializeTraditionalCharts() {
    renderTraditionalTimelineChart();
    renderTraditionalCountryChart();
    renderTraditionalTopIssuersChart();
    renderTraditionalGreenBondsChart();
    renderTraditionalSpreadChart();
    renderTraditionalMaturityWallChart();
}

function updateTraditionalCharts() {
    // Destroy existing charts and recreate
    initializeTraditionalCharts();
}

function renderTraditionalTimelineChart() {
    const ctx = document.getElementById('traditionalTimelineChart');
    if (!ctx) return;

    // Group by year
    const yearData = {};
    traditionalFilteredData.forEach(e => {
        const year = new Date(e.issueDate).getFullYear();
        yearData[year] = (yearData[year] || 0) + 1;
    });

    const years = Object.keys(yearData).sort();
    const counts = years.map(y => yearData[y]);

    new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
            labels: years,
            datasets: [{
                label: 'Nombre d\'émissions',
                data: counts,
                borderColor: '#d4af37',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#f8fafc' } }
            },
            scales: {
                y: {
                    ticks: { color: '#cbd5e1' },
                    grid: { color: 'rgba(45, 55, 72, 0.5)' }
                },
                x: {
                    ticks: { color: '#cbd5e1' },
                    grid: { color: 'rgba(45, 55, 72, 0.5)' }
                }
            }
        }
    });
}

function renderTraditionalCountryChart() {
    const ctx = document.getElementById('traditionalCountryChart');
    if (!ctx) return;

    const countryData = {};
    traditionalFilteredData.forEach(e => {
        countryData[e.country] = (countryData[e.country] || 0) + 1;
    });

    const countries = Object.keys(countryData);
    const counts = countries.map(c => countryData[c]);

    new Chart(ctx.getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: countries,
            datasets: [{
                data: counts,
                backgroundColor: [
                    '#d4af37', '#2563eb', '#10b981', '#f59e0b', '#ef4444',
                    '#06b6d4', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#f8fafc' } }
            }
        }
    });
}

function renderTraditionalTopIssuersChart() {
    const ctx = document.getElementById('traditionalTopIssuersChart');
    if (!ctx) return;

    const issuerData = {};
    const eurRates = { EUR: 1, GBP: 1.17, SEK: 0.09, DKK: 0.13, NOK: 0.09 };

    traditionalFilteredData.forEach(e => {
        const rate = eurRates[e.currency] || 1;
        const volumeEur = e.amount * rate;
        issuerData[e.issuer] = (issuerData[e.issuer] || 0) + volumeEur;
    });

    const sorted = Object.entries(issuerData).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const issuers = sorted.map(s => s[0]);
    const volumes = sorted.map(s => Math.round(s[1]));

    new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: issuers,
            datasets: [{
                label: 'Volume (M€)',
                data: volumes,
                backgroundColor: '#d4af37'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#f8fafc' } }
            },
            scales: {
                y: {
                    ticks: { color: '#cbd5e1' },
                    grid: { color: 'rgba(45, 55, 72, 0.5)' }
                },
                x: {
                    ticks: { color: '#cbd5e1' },
                    grid: { color: 'rgba(45, 55, 72, 0.5)' }
                }
            }
        }
    });
}

function renderTraditionalGreenBondsChart() {
    const ctx = document.getElementById('traditionalGreenBondsChart');
    if (!ctx) return;

    const greenCount = traditionalFilteredData.filter(e => e.greenBond).length;
    const traditionalCount = traditionalFilteredData.length - greenCount;

    new Chart(ctx.getContext('2d'), {
        type: 'pie',
        data: {
            labels: ['Green Bonds', 'Traditional'],
            datasets: [{
                data: [greenCount, traditionalCount],
                backgroundColor: ['#10b981', '#94a3b8']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#f8fafc' } }
            }
        }
    });
}

function renderTraditionalSpreadChart() {
    const ctx = document.getElementById('traditionalSpreadChart');
    if (!ctx) return;

    const spreadRanges = { '0-40': 0, '40-50': 0, '50-60': 0, '60+': 0 };
    traditionalFilteredData.forEach(e => {
        if (e.spread < 40) spreadRanges['0-40']++;
        else if (e.spread < 50) spreadRanges['40-50']++;
        else if (e.spread < 60) spreadRanges['50-60']++;
        else spreadRanges['60+']++;
    });

    new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: Object.keys(spreadRanges),
            datasets: [{
                label: 'Nombre d\'émissions',
                data: Object.values(spreadRanges),
                backgroundColor: '#2563eb'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#f8fafc' } }
            },
            scales: {
                y: {
                    ticks: { color: '#cbd5e1' },
                    grid: { color: 'rgba(45, 55, 72, 0.5)' }
                },
                x: {
                    ticks: { color: '#cbd5e1' },
                    grid: { color: 'rgba(45, 55, 72, 0.5)' }
                }
            }
        }
    });
}

function renderTraditionalMaturityWallChart() {
    const ctx = document.getElementById('traditionalMaturityWallChart');
    if (!ctx) return;

    const yearData = {};
    traditionalFilteredData.forEach(e => {
        const year = new Date(e.maturity).getFullYear();
        yearData[year] = (yearData[year] || 0) + 1;
    });

    const years = Object.keys(yearData).sort();
    const counts = years.map(y => yearData[y]);

    new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: years,
            datasets: [{
                label: 'Échéances',
                data: counts,
                backgroundColor: '#f59e0b'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#f8fafc' } }
            },
            scales: {
                y: {
                    ticks: { color: '#cbd5e1' },
                    grid: { color: 'rgba(45, 55, 72, 0.5)' }
                },
                x: {
                    ticks: { color: '#cbd5e1' },
                    grid: { color: 'rgba(45, 55, 72, 0.5)' }
                }
            }
        }
    });
}

// ============================================
// SECONDARY MARKET
// ============================================
function renderTraditionalSecondaryMarketDashboard() {
    // Update metrics
    if (document.getElementById('traditionalSecondaryVolume')) {
        document.getElementById('traditionalSecondaryVolume').textContent = `€${traditionalSecondaryMarket.dailyVolume}M`;
    }
    if (document.getElementById('traditionalSecondarySpread')) {
        document.getElementById('traditionalSecondarySpread').textContent = `${traditionalSecondaryMarket.avgSpread} bps`;
    }
    if (document.getElementById('traditionalSecondaryTransactions')) {
        document.getElementById('traditionalSecondaryTransactions').textContent = traditionalSecondaryMarket.transactions;
    }
    if (document.getElementById('traditionalSecondaryPrice')) {
        document.getElementById('traditionalSecondaryPrice').textContent = traditionalSecondaryMarket.avgPrice.toFixed(2);
    }

    // Render charts
    renderTraditionalSecondaryMarketCharts();
}

function renderTraditionalSecondaryMarketCharts() {
    // Price history chart
    const priceCtx = document.getElementById('traditionalPriceHistoryChart');
    if (priceCtx) {
        new Chart(priceCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: traditionalSecondaryMarket.priceHistory.map(d => formatDate(d.date)),
                datasets: [{
                    label: 'Prix Moyen',
                    data: traditionalSecondaryMarket.priceHistory.map(d => d.price),
                    borderColor: '#d4af37',
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#f8fafc' } }
                },
                scales: {
                    y: {
                        ticks: { color: '#cbd5e1' },
                        grid: { color: 'rgba(45, 55, 72, 0.5)' }
                    },
                    x: {
                        ticks: { color: '#cbd5e1' },
                        grid: { color: 'rgba(45, 55, 72, 0.5)' }
                    }
                }
            }
        });
    }

    // Spread history chart
    const spreadCtx = document.getElementById('traditionalSpreadHistoryChart');
    if (spreadCtx) {
        new Chart(spreadCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: traditionalSecondaryMarket.spreadHistory.map(d => formatDate(d.date)),
                datasets: [{
                    label: 'Spread (bps)',
                    data: traditionalSecondaryMarket.spreadHistory.map(d => d.spread),
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#f8fafc' } }
                },
                scales: {
                    y: {
                        ticks: { color: '#cbd5e1' },
                        grid: { color: 'rgba(45, 55, 72, 0.5)' }
                    },
                    x: {
                        ticks: { color: '#cbd5e1' },
                        grid: { color: 'rgba(45, 55, 72, 0.5)' }
                    }
                }
            }
        });
    }

    // Top traded chart
    const topTradedCtx = document.getElementById('traditionalTopTradedChart');
    if (topTradedCtx) {
        new Chart(topTradedCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: traditionalSecondaryMarket.topTradedIssuers.map(i => i.issuer),
                datasets: [{
                    label: 'Volume (M€)',
                    data: traditionalSecondaryMarket.topTradedIssuers.map(i => i.volume),
                    backgroundColor: '#d4af37'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: { labels: { color: '#f8fafc' } }
                },
                scales: {
                    y: {
                        ticks: { color: '#cbd5e1' },
                        grid: { color: 'rgba(45, 55, 72, 0.5)' }
                    },
                    x: {
                        ticks: { color: '#cbd5e1' },
                        grid: { color: 'rgba(45, 55, 72, 0.5)' }
                    }
                }
            }
        });
    }
}

// ============================================
// NEWS SECTION
// ============================================
function renderTraditionalNewsSection() {
    const newsContainer = document.getElementById('traditionalNewsContainer');
    if (!newsContainer) return;

    newsContainer.innerHTML = '';

    traditionalNews.slice(0, 12).forEach(news => {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card fade-in';

        const importanceClass = news.importance === 'high' ? 'high-importance' : '';
        const categoryColors = {
            'Emission': '#2563eb',
            'Market': '#d4af37',
            'Regulation': '#ef4444',
            'ESG': '#10b981',
            'Forecast': '#f59e0b',
            'Innovation': '#8b5cf6',
            'Monetary Policy': '#06b6d4'
        };

        const linkIcon = '🔗';

        newsCard.innerHTML = `
            <div class="news-header">
                <span class="news-category" style="background: ${categoryColors[news.category]}20; color: ${categoryColors[news.category]}; border: 1px solid ${categoryColors[news.category]}40;">
                    ${news.category}
                </span>
                <span class="news-date">${formatDate(news.date)}</span>
            </div>
            <h3 class="news-title ${importanceClass}">${news.title}</h3>
            <p class="news-summary">${news.summary}</p>
            <div class="news-footer">
                <span class="news-source">📰 ${news.source}</span>
                ${news.url ? `<a href="${news.url}" target="_blank" rel="noopener noreferrer" class="news-link" style="color: var(--color-accent); text-decoration: none; font-size: 0.875rem; display: flex; align-items: center; gap: 0.25rem; transition: opacity 0.2s;" onmouseover="this.style.opacity='0.7'" onmouseout="this.style.opacity='1'">${linkIcon} Lire l'article</a>` : ''}
            </div>
        `;

        newsContainer.appendChild(newsCard);
    });
}

// ============================================
// EXPORT FUNCTIONALITY
// ============================================
function exportTraditionalDataToCSV() {
    const headers = ['Émetteur', 'Montant', 'Devise', 'Pays', 'Type', 'Date Émission', 'Maturité', 'Coupon', 'Spread', 'Rating', 'ISIN', 'Statut'];
    const rows = traditionalFilteredData.map(e => [
        e.issuer,
        e.amount,
        e.currency,
        e.country,
        e.type,
        e.issueDate,
        e.maturity,
        e.coupon,
        e.spread,
        e.rating,
        e.isin || 'N/A',
        e.status
    ]);

    let csvContent = headers.join(',') + '\n';
    rows.forEach(row => {
        csvContent += row.map(cell => `"${cell}"`).join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `covered_bonds_traditional_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
