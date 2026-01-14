// ============================================
// ALPHA VANTAGE API INTEGRATION
// Real Economic Indicators Data
// ============================================

// Alpha Vantage API Configuration
const ALPHA_VANTAGE_CONFIG = {
    baseUrl: 'https://www.alphavantage.co/query',
    apiKey: '', // Will be set from CONFIG
    indicators: {
        'REAL_GDP': 'REAL_GDP',
        'CPI': 'CPI',
        'INFLATION': 'INFLATION',
        'RETAIL_SALES': 'RETAIL_SALES',
        'DURABLES': 'DURABLES',
        'UNEMPLOYMENT': 'UNEMPLOYMENT',
        'NONFARM_PAYROLL': 'NONFARM_PAYROLL'
    }
};

// Fetch real economic indicator data from Alpha Vantage
async function fetchAlphaVantageIndicator(indicator) {
    if (!CONFIG || !CONFIG.alphaVantage || !CONFIG.alphaVantage.apiKey) {
        console.warn('[ALPHA VANTAGE] API key not configured');
        return null;
    }

    try {
        const url = `${ALPHA_VANTAGE_CONFIG.baseUrl}?function=${indicator}&apikey=${CONFIG.alphaVantage.apiKey}`;

        console.log(`[ALPHA VANTAGE] 📡 Fetching ${indicator}...`);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Alpha Vantage API request failed: ${response.status}`);
        }

        const data = await response.json();

        // Check for API errors
        if (data['Error Message']) {
            throw new Error(data['Error Message']);
        }

        if (data['Note']) {
            console.warn(`[ALPHA VANTAGE] ⚠️ Rate limit: ${data['Note']}`);
            return null;
        }

        console.log(`[ALPHA VANTAGE] ✅ Successfully fetched ${indicator}`);
        return data;

    } catch (error) {
        console.error(`[ALPHA VANTAGE] ❌ Failed to fetch ${indicator}:`, error.message);
        return null;
    }
}

// Update calendar events with real values from Alpha Vantage
async function enrichCalendarWithRealData(calendarEvents) {
    console.log('[ALPHA VANTAGE] 🔄 Enriching calendar with real data...');

    // Fetch key indicators (respecting rate limits - 5 per minute)
    const indicators = ['CPI', 'UNEMPLOYMENT', 'REAL_GDP'];
    const realData = {};

    for (const indicator of indicators) {
        const data = await fetchAlphaVantageIndicator(indicator);
        if (data) {
            realData[indicator] = data;
        }
        // Rate limiting: wait 12 seconds between requests (5 requests/minute)
        await sleep(12000);
    }

    // Update calendar events with real values
    const enrichedEvents = calendarEvents.map(event => {
        const enrichedEvent = { ...event };

        // Match CPI events
        if (event.event.includes('CPI') && realData['CPI']) {
            const latestValue = getLatestValue(realData['CPI']);
            if (latestValue) {
                enrichedEvent.actual = latestValue.value;
                enrichedEvent.dataSource = 'Alpha Vantage';
            }
        }

        // Match Unemployment events
        if (event.event.includes('Unemployment') && realData['UNEMPLOYMENT']) {
            const latestValue = getLatestValue(realData['UNEMPLOYMENT']);
            if (latestValue) {
                enrichedEvent.actual = latestValue.value;
                enrichedEvent.dataSource = 'Alpha Vantage';
            }
        }

        // Match GDP events
        if (event.event.includes('GDP') && realData['REAL_GDP']) {
            const latestValue = getLatestValue(realData['REAL_GDP']);
            if (latestValue) {
                enrichedEvent.actual = latestValue.value;
                enrichedEvent.dataSource = 'Alpha Vantage';
            }
        }

        return enrichedEvent;
    });

    console.log('[ALPHA VANTAGE] ✅ Calendar enrichment complete');
    return enrichedEvents;
}

// Extract latest value from Alpha Vantage response
function getLatestValue(apiResponse) {
    try {
        const dataKey = Object.keys(apiResponse).find(key => key !== 'name' && key !== 'interval' && key !== 'unit');
        if (!dataKey) return null;

        const dataArray = apiResponse[dataKey];
        if (!Array.isArray(dataArray) || dataArray.length === 0) return null;

        const latest = dataArray[0];
        return {
            date: latest.date,
            value: latest.value
        };
    } catch (error) {
        console.error('[ALPHA VANTAGE] Error parsing response:', error);
        return null;
    }
}

// Helper function for rate limiting
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Cache management for Alpha Vantage data
function cacheAlphaVantageData(data) {
    try {
        const cacheData = {
            data: data,
            timestamp: Date.now()
        };
        localStorage.setItem('alphaVantageCache', JSON.stringify(cacheData));
        console.log('[ALPHA VANTAGE] 💾 Data cached successfully');
    } catch (error) {
        console.warn('[ALPHA VANTAGE] Failed to cache data:', error);
    }
}

function getCachedAlphaVantageData() {
    try {
        const cached = localStorage.getItem('alphaVantageCache');
        if (!cached) return null;

        const cacheData = JSON.parse(cached);
        const now = Date.now();
        const cacheAge = now - cacheData.timestamp;

        // Cache valid for 4 hours (same as scheduled updates)
        const cacheExpiration = 14400000; // 4 hours
        if (cacheAge < cacheExpiration) {
            console.log(`[ALPHA VANTAGE] 📦 Using cached data (age: ${Math.round(cacheAge / 60000)} minutes)`);
            return cacheData.data;
        }

        console.log('[ALPHA VANTAGE] ⏰ Cache expired');
        return null;
    } catch (error) {
        console.warn('[ALPHA VANTAGE] Failed to read cache:', error);
        return null;
    }
}

// Export functions
window.fetchAlphaVantageIndicator = fetchAlphaVantageIndicator;
window.enrichCalendarWithRealData = enrichCalendarWithRealData;
window.getCachedAlphaVantageData = getCachedAlphaVantageData;
window.cacheAlphaVantageData = cacheAlphaVantageData;
