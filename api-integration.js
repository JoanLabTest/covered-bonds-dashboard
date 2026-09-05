// ============================================
// DATA SOURCE INTEGRATION FUNCTIONS
// ============================================

function updateApiStatus() {
    if (!window.dataSourceManager) return;

    const status = window.dataSourceManager.getApiStatus();
    const statusText = document.getElementById('apiStatusText');

    if (!statusText) return;

    const etherscanEnabled = CONFIG.apis.etherscan.enabled && CONFIG.apis.etherscan.apiKey;
    const rwaEnabled = CONFIG.apis.rwaXyz.enabled && CONFIG.apis.rwaXyz.apiKey;

    let statusMessage = '';
    let statusColor = '';

    if (etherscanEnabled || rwaEnabled) {
        const connectedSources = [];
        if (etherscanEnabled) connectedSources.push('Etherscan');
        if (rwaEnabled) connectedSources.push('RWA.xyz');

        statusMessage = `✓ ${connectedSources.join(', ')}`;
        statusColor = '#10b981';
    } else {
        statusMessage = '⚠ Données statiques (configurez les API keys)';
        statusColor = '#f59e0b';
    }

    statusText.innerHTML = statusMessage;
    statusText.style.color = statusColor;
}

function startAutoUpdate() {
    // Auto-update on-chain data
    if (CONFIG.features.etherscanIntegration) {
        setInterval(() => {
            updateOnChainData();
        }, CONFIG.updateIntervals.onChainData);
    }

    // Auto-update secondary market
    setInterval(() => {
        updateSecondaryMarketData();
    }, CONFIG.updateIntervals.secondaryMarket);
}

async function updateOnChainData() {
    if (!window.dataSourceManager) return;

    console.log('🔄 Updating on-chain data...');

    // Enrich emissions with on-chain data
    const enrichedData = await window.dataSourceManager.enrichAllEmissions(emissionsData);

    // Update filtered data if needed
    if (enrichedData && enrichedData.length > 0) {
        // Merge enriched data back
        enrichedData.forEach(enriched => {
            const original = emissionsData.find(e => e.isin === enriched.isin);
            if (original) {
                Object.assign(original, enriched);
            }
        });

        // Re-render if needed
        applyFilters();

        window.dataSourceManager.updateLastUpdate('onChain');
        console.log('✓ On-chain data updated successfully');
    }
}

function updateSecondaryMarketData() {
    // Simulate small variations in secondary market data
    if (secondaryMarketData) {
        const variation = (Math.random() - 0.5) * 0.02; // ±1%
        secondaryMarketData.avgPrice = Math.max(100, secondaryMarketData.avgPrice * (1 + variation));

        // Update display
        renderSecondaryMarketDashboard();

        console.log('📊 Secondary market data updated');
    }
}

// Add data source badge to emission display
function addDataSourceBadge(emission) {
    if (!window.dataSourceManager || !CONFIG.display.showDataSourceBadges) {
        return '';
    }

    const dataSource = emission.dataSource || 'verified';
    return window.dataSourceManager.createBadgeHTML(dataSource);
}
