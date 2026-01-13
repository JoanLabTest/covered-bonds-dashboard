// ============================================
// ECONOMIC CALENDAR MODULE
// Real-time economic events tracking
// ============================================

// ============================================
// SIMULATED ECONOMIC EVENTS DATA
// ============================================
const economicEventsData = [
    // Cette semaine - Événements majeurs
    {
        date: "2026-01-13T14:30:00",
        country: "US",
        countryName: "États-Unis",
        event: "Core CPI m/m",
        importance: "high",
        category: "Inflation",
        previous: "0.3%",
        forecast: "0.2%",
        actual: null,
        currency: "USD",
        impact: "high"
    },
    {
        date: "2026-01-13T14:30:00",
        country: "US",
        countryName: "États-Unis",
        event: "CPI y/y",
        importance: "high",
        category: "Inflation",
        previous: "2.7%",
        forecast: "2.8%",
        actual: null,
        currency: "USD",
        impact: "high"
    },
    {
        date: "2026-01-14T13:30:00",
        country: "EU",
        countryName: "Zone Euro",
        event: "ECB President Lagarde Speaks",
        importance: "high",
        category: "Central Banks",
        previous: "-",
        forecast: "-",
        actual: null,
        currency: "EUR",
        impact: "high"
    },
    {
        date: "2026-01-14T14:30:00",
        country: "US",
        countryName: "États-Unis",
        event: "Core PPI m/m",
        importance: "medium",
        category: "Inflation",
        previous: "0.2%",
        forecast: "0.3%",
        actual: null,
        currency: "USD",
        impact: "medium"
    },
    {
        date: "2026-01-15T08:00:00",
        country: "GB",
        countryName: "Royaume-Uni",
        event: "GDP m/m",
        importance: "high",
        category: "GDP",
        previous: "0.1%",
        forecast: "0.2%",
        actual: null,
        currency: "GBP",
        impact: "high"
    },
    {
        date: "2026-01-15T14:30:00",
        country: "US",
        countryName: "États-Unis",
        event: "Retail Sales m/m",
        importance: "high",
        category: "Consumer Spending",
        previous: "0.7%",
        forecast: "0.5%",
        actual: null,
        currency: "USD",
        impact: "high"
    },
    {
        date: "2026-01-15T14:30:00",
        country: "US",
        countryName: "États-Unis",
        event: "Core Retail Sales m/m",
        importance: "medium",
        category: "Consumer Spending",
        previous: "0.2%",
        forecast: "0.4%",
        actual: null,
        currency: "USD",
        impact: "medium"
    },
    {
        date: "2026-01-16T08:00:00",
        country: "EU",
        countryName: "Zone Euro",
        event: "CPI y/y",
        importance: "high",
        category: "Inflation",
        previous: "2.4%",
        forecast: "2.4%",
        actual: null,
        currency: "EUR",
        impact: "high"
    },
    {
        date: "2026-01-16T14:30:00",
        country: "US",
        countryName: "États-Unis",
        event: "Unemployment Claims",
        importance: "medium",
        category: "Employment",
        previous: "201K",
        forecast: "210K",
        actual: null,
        currency: "USD",
        impact: "medium"
    },
    {
        date: "2026-01-16T15:15:00",
        country: "US",
        countryName: "États-Unis",
        event: "Industrial Production m/m",
        importance: "medium",
        category: "Economic Activity",
        previous: "0.2%",
        forecast: "0.3%",
        actual: null,
        currency: "USD",
        impact: "medium"
    },
    {
        date: "2026-01-17T08:00:00",
        country: "GB",
        countryName: "Royaume-Uni",
        event: "Retail Sales m/m",
        importance: "medium",
        category: "Consumer Spending",
        previous: "-0.3%",
        forecast: "0.4%",
        actual: null,
        currency: "GBP",
        impact: "medium"
    },
    {
        date: "2026-01-17T14:30:00",
        country: "US",
        countryName: "États-Unis",
        event: "Building Permits",
        importance: "low",
        category: "Housing",
        previous: "1.505M",
        forecast: "1.520M",
        actual: null,
        currency: "USD",
        impact: "low"
    },
    {
        date: "2026-01-17T16:00:00",
        country: "US",
        countryName: "États-Unis",
        event: "Michigan Consumer Sentiment",
        importance: "medium",
        category: "Consumer Confidence",
        previous: "74.0",
        forecast: "73.5",
        actual: null,
        currency: "USD",
        impact: "medium"
    },

    // Semaine prochaine
    {
        date: "2026-01-20T00:30:00",
        country: "JP",
        countryName: "Japon",
        event: "National CPI y/y",
        importance: "high",
        category: "Inflation",
        previous: "2.9%",
        forecast: "3.0%",
        actual: null,
        currency: "JPY",
        impact: "high"
    },
    {
        date: "2026-01-20T10:00:00",
        country: "EU",
        countryName: "Zone Euro",
        event: "ECB Monetary Policy Meeting Accounts",
        importance: "medium",
        category: "Central Banks",
        previous: "-",
        forecast: "-",
        actual: null,
        currency: "EUR",
        impact: "medium"
    },
    {
        date: "2026-01-21T08:00:00",
        country: "DE",
        countryName: "Allemagne",
        event: "PPI m/m",
        importance: "low",
        category: "Inflation",
        previous: "-0.1%",
        forecast: "0.1%",
        actual: null,
        currency: "EUR",
        impact: "low"
    },
    {
        date: "2026-01-21T13:00:00",
        country: "GB",
        countryName: "Royaume-Uni",
        event: "BoE Gov Bailey Speaks",
        importance: "high",
        category: "Central Banks",
        previous: "-",
        forecast: "-",
        actual: null,
        currency: "GBP",
        impact: "high"
    },
    {
        date: "2026-01-22T08:45:00",
        country: "FR",
        countryName: "France",
        event: "Flash Manufacturing PMI",
        importance: "medium",
        category: "Economic Activity",
        previous: "42.1",
        forecast: "43.0",
        actual: null,
        currency: "EUR",
        impact: "medium"
    },
    {
        date: "2026-01-22T09:30:00",
        country: "DE",
        countryName: "Allemagne",
        event: "Flash Manufacturing PMI",
        importance: "high",
        category: "Economic Activity",
        previous: "42.5",
        forecast: "43.2",
        actual: null,
        currency: "EUR",
        impact: "high"
    },
    {
        date: "2026-01-22T10:00:00",
        country: "EU",
        countryName: "Zone Euro",
        event: "Flash Manufacturing PMI",
        importance: "high",
        category: "Economic Activity",
        previous: "45.1",
        forecast: "45.8",
        actual: null,
        currency: "EUR",
        impact: "high"
    },
    {
        date: "2026-01-22T14:30:00",
        country: "US",
        countryName: "États-Unis",
        event: "Durable Goods Orders m/m",
        importance: "medium",
        category: "Economic Activity",
        previous: "0.8%",
        forecast: "0.5%",
        actual: null,
        currency: "USD",
        impact: "medium"
    },
    {
        date: "2026-01-23T01:30:00",
        country: "JP",
        countryName: "Japon",
        event: "Flash Manufacturing PMI",
        importance: "medium",
        category: "Economic Activity",
        previous: "49.6",
        forecast: "50.0",
        actual: null,
        currency: "JPY",
        impact: "medium"
    },
    {
        date: "2026-01-23T14:30:00",
        country: "US",
        countryName: "États-Unis",
        event: "GDP q/q",
        importance: "high",
        category: "GDP",
        previous: "3.1%",
        forecast: "2.8%",
        actual: null,
        currency: "USD",
        impact: "high"
    },
    {
        date: "2026-01-23T14:30:00",
        country: "US",
        countryName: "États-Unis",
        event: "Unemployment Claims",
        importance: "medium",
        category: "Employment",
        previous: "210K",
        forecast: "215K",
        actual: null,
        currency: "USD",
        impact: "medium"
    },
    {
        date: "2026-01-24T08:00:00",
        country: "DE",
        countryName: "Allemagne",
        event: "GfK Consumer Climate",
        importance: "low",
        category: "Consumer Confidence",
        previous: "-23.3",
        forecast: "-22.5",
        actual: null,
        currency: "EUR",
        impact: "low"
    },

    // Événements passés (pour référence)
    {
        date: "2026-01-10T14:30:00",
        country: "US",
        countryName: "États-Unis",
        event: "Non-Farm Payrolls",
        importance: "high",
        category: "Employment",
        previous: "227K",
        forecast: "160K",
        actual: "256K",
        currency: "USD",
        impact: "high"
    },
    {
        date: "2026-01-10T14:30:00",
        country: "US",
        countryName: "États-Unis",
        event: "Unemployment Rate",
        importance: "high",
        category: "Employment",
        previous: "4.2%",
        forecast: "4.2%",
        actual: "4.1%",
        currency: "USD",
        impact: "high"
    },
    {
        date: "2026-01-09T13:45:00",
        country: "EU",
        countryName: "Zone Euro",
        event: "ECB Interest Rate Decision",
        importance: "high",
        category: "Central Banks",
        previous: "3.00%",
        forecast: "2.75%",
        actual: "2.75%",
        currency: "EUR",
        impact: "high"
    },
    {
        date: "2026-01-08T08:00:00",
        country: "DE",
        countryName: "Allemagne",
        event: "Industrial Production m/m",
        importance: "medium",
        category: "Economic Activity",
        previous: "-1.0%",
        forecast: "0.5%",
        actual: "1.5%",
        currency: "EUR",
        impact: "medium"
    }
];

// ============================================
// STATE MANAGEMENT
// ============================================
let filteredEconomicEvents = [...economicEventsData];
let currentEconomicFilters = {
    country: '',
    importance: '',
    category: '',
    dateRange: 'upcoming' // 'upcoming', 'today', 'week', 'all'
};

// ============================================
// WEB SCRAPING INTEGRATION (Investing.com)
// ============================================

// Global variable to track data source
let isUsingRealData = false;

async function fetchEconomicCalendarFromAPI() {
    // Check if scraping is configured
    if (!CONFIG || !CONFIG.economicCalendar || CONFIG.economicCalendar.provider !== 'investing-scraper') {
        console.log('[ECONOMIC CALENDAR] Scraping not configured, using simulated data');
        isUsingRealData = false;
        return economicEventsData;
    }

    try {
        console.log('[ECONOMIC CALENDAR] Fetching real data from Investing.com...');
        const corsProxy = CONFIG.economicCalendar.corsProxy;
        const targetUrl = encodeURIComponent(CONFIG.economicCalendar.targetUrl);

        const response = await fetch(`${corsProxy}${targetUrl}`, {
            method: 'GET',
            headers: {
                'Accept': 'text/html'
            }
        });

        if (!response.ok) {
            throw new Error(`Scraping request failed: ${response.status}`);
        }

        const html = await response.text();
        const scrapedEvents = parseInvestingHTML(html);

        if (scrapedEvents && scrapedEvents.length > 0) {
            console.log(`[ECONOMIC CALENDAR] Successfully scraped ${scrapedEvents.length} events from Investing.com`);
            isUsingRealData = true;
            return scrapedEvents;
        } else {
            throw new Error('No events found in scraped data');
        }
    } catch (error) {
        console.error('[ECONOMIC CALENDAR] Scraping failed, using simulated data:', error);
        isUsingRealData = false;
        return economicEventsData;
    }
}

function parseInvestingHTML(html) {
    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const events = [];

        // Find all event rows - they have IDs like "1585-539626-UnitedStates-0"
        const rows = doc.querySelectorAll('tr[id*="-"]');

        console.log(`[ECONOMIC CALENDAR] Found ${rows.length} potential event rows`);

        // Get current date for building full datetime
        const now = new Date();
        let currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        rows.forEach((row, index) => {
            try {
                const cells = row.querySelectorAll('td');

                // Skip if not enough cells
                if (cells.length < 7) return;

                // Extract time (first cell) using Regex to handle formats like "14:30", "14:3014:15", etc.
                const timeText = cells[0]?.textContent?.trim();
                const timeMatch = timeText ? timeText.match(/(\d{2}):(\d{2})/) : null;

                // If no time found (e.g. "Tentative", "All Day", or ongoing countdown), default to 00:00 or try to parse
                // For countdowns (e.g. "26min"), investing.com usually puts the time in a data attribute or tooltip, 
                // but scraping simple HTML might not get it. We'll stick to regex match.

                let hours = 0;
                let minutes = 0;
                let hasTime = false;

                if (timeMatch) {
                    hours = parseInt(timeMatch[1]);
                    minutes = parseInt(timeMatch[2]);
                    hasTime = true;
                }

                // Build full datetime
                const eventDateTime = new Date(currentDate);
                eventDateTime.setHours(hours, minutes, 0, 0);

                // Map country name to code
                const countryCode = mapCountryNameToCode(countryName);

                events.push({
                    date: eventDateTime.toISOString(),
                    country: countryCode,
                    countryName: getCountryName(countryCode),
                    event: eventName,
                    importance: importance,
                    category: categorizeEvent(eventName),
                    previous: previous === '' ? '-' : previous,
                    forecast: forecast === '' ? '-' : forecast,
                    actual: actual === '' ? null : actual,
                    currency: currencyText,
                    impact: importance
                });
            } catch (err) {
                console.warn(`[ECONOMIC CALENDAR] Failed to parse row ${index}:`, err);
            }
        });

        console.log(`[ECONOMIC CALENDAR] Successfully parsed ${events.length} events`);
        return events;
    } catch (error) {
        console.error('[ECONOMIC CALENDAR] HTML parsing failed:', error);
        return [];
    }
}

function mapCountryNameToCode(countryName) {
    const mapping = {
        'USA': 'US',
        'United States': 'US',
        'Euro Zone': 'EU',
        'Eurozone': 'EU',
        'European Union': 'EU',
        'United Kingdom': 'GB',
        'UK': 'GB',
        'Japan': 'JP',
        'China': 'CN',
        'Germany': 'DE',
        'France': 'FR',
        'Italy': 'IT',
        'Spain': 'ES',
        'Canada': 'CA',
        'Australia': 'AU',
        'Switzerland': 'CH'
    };
    return mapping[countryName] || 'US';
}

function categorizeEvent(eventName) {
    const name = eventName.toLowerCase();

    if (name.includes('cpi') || name.includes('inflation') || name.includes('ppi')) {
        return 'Inflation';
    }
    if (name.includes('gdp') || name.includes('gross domestic')) {
        return 'GDP';
    }
    if (name.includes('employment') || name.includes('payroll') || name.includes('unemployment') || name.includes('jobless')) {
        return 'Employment';
    }
    if (name.includes('pmi') || name.includes('manufacturing') || name.includes('services')) {
        return 'Economic Activity';
    }
    if (name.includes('rate') || name.includes('ecb') || name.includes('fed') || name.includes('boe') || name.includes('speaks')) {
        return 'Central Banks';
    }
    if (name.includes('retail') || name.includes('sales') || name.includes('consumer')) {
        return 'Consumer Spending';
    }
    if (name.includes('housing') || name.includes('building') || name.includes('permits')) {
        return 'Housing';
    }

    return 'Other';
}

function mapImportance(impact) {
    if (!impact) return 'low';
    const impactLower = impact.toLowerCase();
    if (impactLower.includes('high') || impactLower === 'high') return 'high';
    if (impactLower.includes('medium') || impactLower === 'medium') return 'medium';
    return 'low';
}

function getCountryName(code) {
    const countryNames = {
        'US': 'États-Unis',
        'EU': 'Zone Euro',
        'GB': 'Royaume-Uni',
        'JP': 'Japon',
        'CN': 'Chine',
        'DE': 'Allemagne',
        'FR': 'France',
        'IT': 'Italie',
        'ES': 'Espagne',
        'CA': 'Canada',
        'AU': 'Australie',
        'CH': 'Suisse'
    };
    return countryNames[code] || code;
}


// ============================================
// FILTERS
// ============================================
function populateEconomicFilters() {
    // Get unique values
    const countries = [...new Set(economicEventsData.map(e => e.country))].sort();
    const categories = [...new Set(economicEventsData.map(e => e.category))].sort();

    // Populate country filter
    const countrySelect = document.getElementById('filterEconomicCountry');
    if (countrySelect) {
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            option.textContent = getCountryName(country);
            countrySelect.appendChild(option);
        });
    }

    // Populate category filter
    const categorySelect = document.getElementById('filterEconomicCategory');
    if (categorySelect) {
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
    }
}

function applyEconomicFilters() {
    const countryFilter = document.getElementById('filterEconomicCountry')?.value || '';
    const importanceFilter = document.getElementById('filterEconomicImportance')?.value || '';
    const categoryFilter = document.getElementById('filterEconomicCategory')?.value || '';
    const dateRangeFilter = document.getElementById('filterEconomicDateRange')?.value || 'upcoming';

    currentEconomicFilters = {
        country: countryFilter,
        importance: importanceFilter,
        category: categoryFilter,
        dateRange: dateRangeFilter
    };

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    filteredEconomicEvents = economicEventsData.filter(event => {
        const eventDate = new Date(event.date);

        // Date range filter
        let dateMatch = true;
        if (dateRangeFilter === 'today') {
            dateMatch = eventDate >= today && eventDate < new Date(today.getTime() + 24 * 60 * 60 * 1000);
        } else if (dateRangeFilter === 'upcoming') {
            dateMatch = eventDate >= now;
        } else if (dateRangeFilter === 'week') {
            dateMatch = eventDate >= now && eventDate <= weekFromNow;
        }
        // 'all' shows everything

        return (
            (!countryFilter || event.country === countryFilter) &&
            (!importanceFilter || event.importance === importanceFilter) &&
            (!categoryFilter || event.category === categoryFilter) &&
            dateMatch
        );
    });

    // Sort by date
    filteredEconomicEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    updateEconomicMetrics();
    renderEconomicCalendarTable();
}

function resetEconomicFilters() {
    if (document.getElementById('filterEconomicCountry')) {
        document.getElementById('filterEconomicCountry').value = '';
    }
    if (document.getElementById('filterEconomicImportance')) {
        document.getElementById('filterEconomicImportance').value = '';
    }
    if (document.getElementById('filterEconomicCategory')) {
        document.getElementById('filterEconomicCategory').value = '';
    }
    if (document.getElementById('filterEconomicDateRange')) {
        document.getElementById('filterEconomicDateRange').value = 'upcoming';
    }

    currentEconomicFilters = {
        country: '',
        importance: '',
        category: '',
        dateRange: 'upcoming'
    };

    applyEconomicFilters();
}

// ============================================
// METRICS
// ============================================
function updateEconomicMetrics() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    // Events today
    const eventsToday = economicEventsData.filter(e => {
        const eventDate = new Date(e.date);
        return eventDate >= today && eventDate < new Date(today.getTime() + 24 * 60 * 60 * 1000);
    }).length;

    // Events this week
    const eventsThisWeek = economicEventsData.filter(e => {
        const eventDate = new Date(e.date);
        return eventDate >= now && eventDate <= weekFromNow;
    }).length;

    // High importance upcoming
    const highImportanceUpcoming = economicEventsData.filter(e => {
        const eventDate = new Date(e.date);
        return eventDate >= now && e.importance === 'high';
    }).length;

    // Update UI
    const todayElement = document.getElementById('economicEventsToday');
    if (todayElement) todayElement.textContent = eventsToday;

    const weekElement = document.getElementById('economicEventsWeek');
    if (weekElement) weekElement.textContent = eventsThisWeek;

    const highImportanceElement = document.getElementById('economicHighImportance');
    if (highImportanceElement) highImportanceElement.textContent = highImportanceUpcoming;

    const displayedCountElement = document.getElementById('displayedEconomicCount');
    if (displayedCountElement) displayedCountElement.textContent = filteredEconomicEvents.length;
}

// ============================================
// TABLE RENDERING
// ============================================
function renderEconomicCalendarTable() {
    const tbody = document.getElementById('economicCalendarTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (filteredEconomicEvents.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 2rem; color: var(--color-text-muted);">
                    Aucun événement économique trouvé pour les filtres sélectionnés
                </td>
            </tr>
        `;
        return;
    }

    filteredEconomicEvents.forEach(event => {
        const row = document.createElement('tr');
        row.className = 'economic-event-row';

        const eventDate = new Date(event.date);
        const now = new Date();
        const isPast = eventDate < now;

        if (isPast) {
            row.classList.add('past-event');
        }

        // Format date and time
        const dateStr = eventDate.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
        const timeStr = eventDate.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        });

        // Importance badge
        const importanceBadge = `<span class="importance-badge importance-${event.importance}">${getImportanceStars(event.importance)}</span>`;

        // Country flag
        const countryFlag = getCountryFlag(event.country);

        // Impact indicator
        let impactIndicator = '';
        if (event.actual !== null && event.previous !== '-') {
            const actualNum = parseFloat(event.actual);
            const previousNum = parseFloat(event.previous);
            if (!isNaN(actualNum) && !isNaN(previousNum)) {
                if (actualNum > previousNum) {
                    impactIndicator = '<span class="impact-positive">▲</span>';
                } else if (actualNum < previousNum) {
                    impactIndicator = '<span class="impact-negative">▼</span>';
                } else {
                    impactIndicator = '<span class="impact-neutral">●</span>';
                }
            }
        }

        row.innerHTML = `
            <td>${dateStr}<br><small style="color: var(--color-text-muted);">${timeStr}</small></td>
            <td>${countryFlag} ${event.countryName}</td>
            <td><strong>${event.event}</strong><br><small style="color: var(--color-text-muted);">${event.category}</small></td>
            <td style="text-align: center;">${importanceBadge}</td>
            <td style="text-align: center;">${event.previous}</td>
            <td style="text-align: center;"><strong>${event.forecast}</strong></td>
            <td style="text-align: center;">${event.actual !== null ? `<strong>${event.actual}</strong>` : '-'}</td>
            <td style="text-align: center;">${impactIndicator}</td>
        `;

        tbody.appendChild(row);
    });

    updateEconomicMetrics();
}

function getImportanceStars(importance) {
    switch (importance) {
        case 'high': return '⭐⭐⭐';
        case 'medium': return '⭐⭐';
        case 'low': return '⭐';
        default: return '';
    }
}

function getCountryFlag(countryCode) {
    const flags = {
        'US': '🇺🇸',
        'EU': '🇪🇺',
        'GB': '🇬🇧',
        'JP': '🇯🇵',
        'CN': '🇨🇳',
        'DE': '🇩🇪',
        'FR': '🇫🇷',
        'IT': '🇮🇹',
        'ES': '🇪🇸',
        'CA': '🇨🇦',
        'AU': '🇦🇺',
        'CH': '🇨🇭'
    };
    return flags[countryCode] || '🌍';
}

// ============================================
// DATA SOURCE BADGE
// ============================================
function addDataSourceBadge() {
    // Remove existing badge if any
    const existingBadge = document.querySelector('.economic-data-source-badge');
    if (existingBadge) {
        existingBadge.remove();
    }

    // Create new badge
    const badge = document.createElement('div');
    badge.className = isUsingRealData ? 'economic-data-source-badge real' : 'economic-data-source-badge simulated';
    badge.innerHTML = isUsingRealData
        ? '✅ <strong>Données Réelles</strong> - Investing.com'
        : '📊 <strong>Données Simulées</strong> - Mode Fallback';

    // Insert badge before filters section
    const filtersSection = document.querySelector('#economicCalendarSection .filters-section');
    if (filtersSection) {
        filtersSection.parentNode.insertBefore(badge, filtersSection);
    }
}

// ============================================
// INITIALIZATION
// ============================================
function initializeEconomicCalendar() {
    console.log('[ECONOMIC CALENDAR] Initializing...');

    // Fetch real data from Investing.com
    fetchEconomicCalendarFromAPI().then(data => {
        economicEventsData.length = 0;
        economicEventsData.push(...data);

        // Add data source badge
        addDataSourceBadge();

        // Populate filters and render
        populateEconomicFilters();
        applyEconomicFilters();
    });

    // Attach event listeners
    const applyButton = document.getElementById('applyEconomicFilters');
    if (applyButton) {
        applyButton.addEventListener('click', applyEconomicFilters);
    }

    const resetButton = document.getElementById('resetEconomicFilters');
    if (resetButton) {
        resetButton.addEventListener('click', resetEconomicFilters);
    }

    // Auto-update every 10 minutes
    if (CONFIG && CONFIG.economicCalendar && CONFIG.economicCalendar.updateInterval) {
        setInterval(() => {
            fetchEconomicCalendarFromAPI().then(data => {
                economicEventsData.length = 0;
                economicEventsData.push(...data);
                addDataSourceBadge(); // Update badge
                applyEconomicFilters();
            });
        }, CONFIG.economicCalendar.updateInterval);
    }

    console.log('[ECONOMIC CALENDAR] Initialization complete');
}

// Export functions for global access
window.initializeEconomicCalendar = initializeEconomicCalendar;
window.applyEconomicFilters = applyEconomicFilters;
window.resetEconomicFilters = resetEconomicFilters;
