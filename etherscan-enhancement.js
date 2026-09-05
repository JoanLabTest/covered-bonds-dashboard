// ============================================
// ETHERSCAN INTEGRATION ENHANCEMENT
// Adds visual indicators and links for blockchain data
// ============================================

(function () {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initEtherscanEnhancement);
    } else {
        initEtherscanEnhancement();
    }

    function initEtherscanEnhancement() {
        console.log('🔗 Etherscan Enhancement Module Loaded');

        // Add demo mode banner
        addDemoModeBanner();

        // Enhance API status display
        enhanceApiStatus();
    }

    function addDemoModeBanner() {
        // Add a subtle banner to indicate demo mode for blockchain data
        const header = document.querySelector('.header-content');
        if (!header) return;

        const demoBanner = document.createElement('div');
        demoBanner.style.cssText = `
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%);
            border: 1px solid rgba(16, 185, 129, 0.3);
            border-radius: 0.5rem;
            padding: 0.5rem 1rem;
            margin-top: 0.5rem;
            font-size: 0.875rem;
            color: #10b981;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        `;

        demoBanner.innerHTML = `
            <span>🔗</span>
            <span><strong>Live Blockchain Data:</strong> Etherscan API active - Using demo ERC-20 contracts for demonstration</span>
        `;

        // Insert after header meta
        const headerMeta = header.querySelector('.header-meta');
        if (headerMeta) {
            headerMeta.appendChild(demoBanner);
        }
    }

    function enhanceApiStatus() {
        // Check if CONFIG is available
        if (typeof CONFIG === 'undefined') {
            console.warn('CONFIG not loaded yet');
            return;
        }

        const statusText = document.getElementById('apiStatusText');
        if (!statusText) return;

        const etherscanEnabled = CONFIG.apis && CONFIG.apis.etherscan &&
            CONFIG.apis.etherscan.enabled &&
            CONFIG.apis.etherscan.apiKey;

        if (etherscanEnabled) {
            statusText.innerHTML = '✓ Etherscan - Live Blockchain Data';
            statusText.style.color = '#10b981';
            statusText.style.fontWeight = '600';
        }
    }

    // Export for use in other modules
    window.EtherscanEnhancement = {
        addDemoModeBanner,
        enhanceApiStatus
    };
})();
