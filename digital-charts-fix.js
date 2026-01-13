// ============================================
// DIGITAL BONDS CHARTS FIX
// This file fixes the chart rendering for Digital Bonds section
// ============================================

// Override the chart creation functions to use correct canvas IDs
(function () {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDigitalChartsFix);
    } else {
        initDigitalChartsFix();
    }

    function initDigitalChartsFix() {
        // Override createEmissionsTimelineChart to use blockchainChart
        window.createEmissionsTimelineChart = function () {
            const ctx = document.getElementById('blockchainChart');
            if (!ctx) {
                console.log('[CHARTS FIX] blockchainChart canvas not found');
                return;
            }

            const blockchainData = {};
            filteredData.forEach(emission => {
                if (!blockchainData[emission.blockchain]) {
                    blockchainData[emission.blockchain] = 0;
                }
                blockchainData[emission.blockchain] += emission.amount;
            });

            const labels = Object.keys(blockchainData);
            const data = Object.values(blockchainData);

            if (charts.blockchain) charts.blockchain.destroy();

            charts.blockchain = new Chart(ctx.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: [{
                        data: data,
                        backgroundColor: [
                            '#d4af37',
                            '#2563eb',
                            '#10b981',
                            '#f59e0b',
                            '#ef4444'
                        ],
                        borderWidth: 2,
                        borderColor: '#1a2332'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: { color: '#f8fafc', padding: 15 }
                        }
                    }
                }
            });
            console.log('[CHARTS FIX] Blockchain chart created successfully');
        };

        // Override createPlatformDistributionChart to use countryChart
        window.createPlatformDistributionChart = function () {
            const ctx = document.getElementById('countryChart');
            if (!ctx) {
                console.log('[CHARTS FIX] countryChart canvas not found');
                return;
            }

            const countryData = {};
            filteredData.forEach(emission => {
                if (!countryData[emission.country]) {
                    countryData[emission.country] = 0;
                }
                countryData[emission.country] += emission.amount;
            });

            const labels = Object.keys(countryData);
            const data = Object.values(countryData);

            if (charts.country) charts.country.destroy();

            charts.country = new Chart(ctx.getContext('2d'), {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        data: data,
                        backgroundColor: [
                            '#d4af37',
                            '#2563eb',
                            '#10b981',
                            '#f59e0b',
                            '#ef4444',
                            '#06b6d4',
                            '#8b5cf6',
                            '#ec4899'
                        ],
                        borderWidth: 2,
                        borderColor: '#1a2332'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: { color: '#f8fafc', padding: 10, font: { size: 11 } }
                        }
                    }
                }
            });
            console.log('[CHARTS FIX] Country chart created successfully');
        };

        // Override createMaturityWallChart to use maturityChart
        window.createMaturityWallChart = function () {
            const ctx = document.getElementById('maturityChart');
            if (!ctx) {
                console.log('[CHARTS FIX] maturityChart canvas not found');
                return;
            }

            const maturityData = {};
            filteredData.forEach(emission => {
                const maturityYear = new Date(emission.maturity).getFullYear();
                if (!maturityData[maturityYear]) {
                    maturityData[maturityYear] = 0;
                }
                maturityData[maturityYear] += emission.amount;
            });

            const sortedYears = Object.keys(maturityData).sort();
            const labels = sortedYears;
            const data = sortedYears.map(year => maturityData[year]);

            if (charts.maturity) charts.maturity.destroy();

            charts.maturity = new Chart(ctx.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Volume (M€)',
                        data: data,
                        backgroundColor: 'rgba(212, 175, 55, 0.8)',
                        borderColor: '#d4af37',
                        borderWidth: 1
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
                            beginAtZero: true,
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
            console.log('[CHARTS FIX] Maturity chart created successfully');
        };

        // Make other chart functions no-ops to avoid errors
        window.createTopIssuersChart = function () {
            console.log('[CHARTS FIX] createTopIssuersChart skipped (canvas not in HTML)');
        };
        window.createGreenBondsChart = function () {
            console.log('[CHARTS FIX] createGreenBondsChart skipped (canvas not in HTML)');
        };
        window.createSettlementSpeedChart = function () {
            console.log('[CHARTS FIX] createSettlementSpeedChart skipped (canvas not in HTML)');
        };

        console.log('[CHARTS FIX] Digital Bonds charts fix loaded successfully');
    }
})();
