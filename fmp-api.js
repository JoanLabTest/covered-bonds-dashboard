// ============================================
// FINANCIAL MODELING PREP API INTEGRATION
// Economic Calendar with Scheduled Updates
// ============================================

// Scheduled update times (8h, 12h, 16h, 18h)
const SCHEDULED_HOURS = [8, 12, 16, 18];
let lastUpdateTime = null;
let nextScheduledUpdate = null;

// Financial Modeling Prep API Integration
async function fetchFromFMPAPI() {
    if (!CONFIG || !CONFIG.economicCalendar || !CONFIG.economicCalendar.apiKey) {
        console.warn('[FMP API] ⚠️ API key not configured');
        console.log('[FMP API] Please add your API key in config.js');
        console.log('[FMP API] Get free API key at: https://site.financialmodelingprep.com/register');
        return null;
    }

    try {
        console.log('[FMP API] 🔄 Fetching real data from Financial Modeling Prep...');

        // Get date range (today to 7 days ahead)
        const today = new Date();
        const fromDate = today.toISOString().split('T')[0];
        const toDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

        const url = `${CONFIG.economicCalendar.baseUrl}?from=${fromDate}&to=${toDate}&apikey=${CONFIG.economicCalendar.apiKey}`;

        console.log(`[FMP API] 📡 Request: ${fromDate} to ${toDate}`);

        const response = await fetch(url);

        console.log(`[FMP API] 📥 Response status: ${response.status} ${response.statusText}`);

        if (!response.ok) {
            throw new Error(`FMP API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (!data || data.length === 0) {
            console.warn('[FMP API] ⚠️ No events found in API response');
            return null;
        }

        console.log(`[FMP API] 📄 Received ${data.length} events`);

        // Transform FMP data to our format
        const transformedEvents = data.map(event => ({
            date: event.date,
            country: mapCountryToCode(event.country),
            countryName: event.country,
            event: event.event,
            importance: mapFMPImpact(event.impact),
            category: categorizeFMPEvent(event.event),
            previous: event.previous || '-',
            forecast: event.estimate || '-',
            actual: event.actual || null,
            currency: getCurrencyFromCountry(event.country),
            impact: mapFMPImpact(event.impact)
        }));

        console.log(`[FMP API] ✅ Successfully transformed ${transformedEvents.length} events`);

        // Cache the data
        cacheEconomicData(transformedEvents);
        lastUpdateTime = new Date();

        return transformedEvents;

    } catch (error) {
        console.error('[FMP API] ❌ Request failed:', error.message);
        console.error('[FMP API] Error details:', error);
        return null;
    }
}

// Helper functions
function mapCountryToCode(countryName) {
    const mapping = {
        'United States': 'US',
        'USA': 'US',
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

function mapFMPImpact(impact) {
    if (!impact) return 'low';
    const impactLower = impact.toLowerCase();
    if (impactLower.includes('high') || impactLower === 'high') return 'high';
    if (impactLower.includes('medium') || impactLower === 'medium') return 'medium';
    return 'low';
}

function categorizeFMPEvent(eventName) {
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
    if (name.includes('rate') || name.includes('fed') || name.includes('ecb') || name.includes('boe')) {
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

function getCurrencyFromCountry(countryName) {
    const currencyMap = {
        'United States': 'USD',
        'USA': 'USD',
        'Euro Zone': 'EUR',
        'Eurozone': 'EUR',
        'Germany': 'EUR',
        'France': 'EUR',
        'Italy': 'EUR',
        'Spain': 'EUR',
        'United Kingdom': 'GBP',
        'UK': 'GBP',
        'Japan': 'JPY',
        'China': 'CNY',
        'Canada': 'CAD',
        'Australia': 'AUD',
        'Switzerland': 'CHF'
    };
    return currencyMap[countryName] || 'USD';
}

// Cache management
function cacheEconomicData(data) {
    try {
        const cacheData = {
            data: data,
            timestamp: Date.now()
        };
        localStorage.setItem('economicCalendarCache', JSON.stringify(cacheData));
        console.log('[FMP API] 💾 Data cached successfully');
    } catch (error) {
        console.warn('[FMP API] Failed to cache data:', error);
    }
}

function getCachedEconomicData() {
    try {
        const cached = localStorage.getItem('economicCalendarCache');
        if (!cached) return null;

        const cacheData = JSON.parse(cached);
        const now = Date.now();
        const cacheAge = now - cacheData.timestamp;

        // Check if cache is still valid (4 hours)
        const cacheExpiration = CONFIG?.economicCalendar?.cacheExpiration || 14400000;
        if (cacheAge < cacheExpiration) {
            console.log(`[FMP API] 📦 Cache valid (age: ${Math.round(cacheAge / 60000)} minutes)`);
            return cacheData.data;
        }

        console.log('[FMP API] ⏰ Cache expired');
        return null;
    } catch (error) {
        console.warn('[FMP API] Failed to read cache:', error);
        return null;
    }
}

// Scheduled updates logic
function getNextScheduledHour() {
    const now = new Date();
    const currentHour = now.getHours();

    // Find next scheduled hour
    for (const hour of SCHEDULED_HOURS) {
        if (hour > currentHour) {
            return hour;
        }
    }

    // If no hour found today, return first hour tomorrow
    return SCHEDULED_HOURS[0];
}

function shouldUpdateNow() {
    const now = new Date();
    const currentHour = now.getHours();

    // Check if current hour matches a scheduled hour
    if (!SCHEDULED_HOURS.includes(currentHour)) {
        return false;
    }

    // Check if we already updated this hour
    if (lastUpdateTime) {
        const lastHour = lastUpdateTime.getHours();
        const lastDate = lastUpdateTime.toDateString();
        const currentDate = now.toDateString();

        if (lastDate === currentDate && lastHour === currentHour) {
            return false; // Already updated this hour
        }
    }

    return true;
}

function scheduleNextUpdate() {
    const now = new Date();
    const nextHour = getNextScheduledHour();

    // Calculate time until next update
    let nextUpdate = new Date(now);
    nextUpdate.setHours(nextHour, 0, 0, 0);

    // If next hour is tomorrow
    if (nextHour <= now.getHours()) {
        nextUpdate.setDate(nextUpdate.getDate() + 1);
    }

    const timeUntilUpdate = nextUpdate - now;
    const hoursUntil = Math.floor(timeUntilUpdate / (1000 * 60 * 60));
    const minutesUntil = Math.floor((timeUntilUpdate % (1000 * 60 * 60)) / (1000 * 60));

    console.log(`[FMP API] ⏰ Next update scheduled for ${nextUpdate.toLocaleTimeString('fr-FR')} (in ${hoursUntil}h ${minutesUntil}m)`);

    nextScheduledUpdate = nextUpdate;

    // Set timeout for next update
    setTimeout(() => {
        console.log('[FMP API] 🔔 Scheduled update triggered');
        if (typeof window.initializeEconomicCalendar === 'function') {
            window.initializeEconomicCalendar();
        }
        scheduleNextUpdate(); // Schedule the next one
    }, timeUntilUpdate);
}

// Export functions
window.fetchFromFMPAPI = fetchFromFMPAPI;
window.getCachedEconomicData = getCachedEconomicData;
window.scheduleNextUpdate = scheduleNextUpdate;
window.shouldUpdateNow = shouldUpdateNow;
