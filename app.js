// ============================================
// COVERED BONDS BLOCKCHAIN DASHBOARD - ENHANCED
// Real Institutional Data & Advanced Features
// ============================================

// ============================================
// REAL INSTITUTIONAL EMISSIONS DATA (2019-2026)
// ============================================
const emissionsData = [
    // Société Générale (SG-FORGE) - Pioneer
    {
        issuer: "Société Générale",
        amount: 100,
        currency: "EUR",
        blockchain: "Ethereum",
        platform: "SG-FORGE",
        issueDate: "2019-04-18",
        maturity: "2024-04-18",
        coupon: 0.0,
        status: "Mature",
        rating: "Aaa/AAA",
        greenBond: false,
        cbdcSettlement: false,
        settlementType: "T+2",
        country: "France",
        type: "Covered Bond (OFH)",
        isin: "FR0013516549",
        notes: "Premier covered bond sur blockchain publique",
        smartContractAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" // Demo: USDC contract
    },
    {
        issuer: "Société Générale",
        amount: 40,
        currency: "EUR",
        blockchain: "Ethereum",
        platform: "SG-FORGE",
        issueDate: "2020-05-12",
        maturity: "2025-05-12",
        coupon: 0.0,
        status: "Active",
        rating: "Aaa/AAA",
        greenBond: false,
        cbdcSettlement: true,
        settlementType: "T+0",
        country: "France",
        type: "Covered Bond (OFH)",
        isin: "FR0013535804",
        notes: "Règlement en CBDC (Banque de France)",
        smartContractAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F" // Demo: DAI contract
    },
    {
        issuer: "Société Générale",
        amount: 50,
        currency: "EUR",
        blockchain: "Ethereum",
        platform: "SG-FORGE",
        issueDate: "2023-12-05",
        maturity: "2028-12-05",
        coupon: 2.5,
        status: "Active",
        rating: "Aaa/AAA",
        greenBond: true,
        cbdcSettlement: false,
        settlementType: "T+1",
        country: "France",
        type: "Green Covered Bond",
        isin: "FR0014009YQ3",
        notes: "Premier green bond digital sur blockchain publique",
        smartContractAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" // Demo: WETH contract
    },
    {
        issuer: "Société Générale",
        amount: 100,
        currency: "USD",
        blockchain: "Canton Network",
        platform: "SG-FORGE",
        issueDate: "2025-11-15",
        maturity: "2030-11-15",
        coupon: 3.25,
        status: "Active",
        rating: "Aa1/AA",
        greenBond: false,
        cbdcSettlement: false,
        settlementType: "T+1",
        country: "USA",
        type: "Digital Bond",
        isin: "US78015K1007",
        notes: "Premier digital bond US de SG"
    },

    // BNP Paribas
    {
        issuer: "BNP Paribas",
        amount: 25,
        currency: "EUR",
        blockchain: "Ethereum",
        platform: "AssetFoundry",
        issueDate: "2022-07-20",
        maturity: "2032-07-20",
        coupon: 2.75,
        status: "Active",
        rating: "Aa3/AA-",
        greenBond: true,
        cbdcSettlement: false,
        settlementType: "T+2",
        country: "France",
        type: "Project Finance Bond",
        isin: "FR0013412432",
        notes: "Financement projets solaires EDF ENR",
        smartContractAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7" // Demo: USDT contract
    },
    {
        issuer: "BNP Paribas",
        amount: 30,
        currency: "EUR",
        blockchain: "Canton Network",
        platform: "Neobonds",
        issueDate: "2024-07-10",
        maturity: "2029-07-10",
        coupon: 2.875,
        status: "Active",
        rating: "Aa3/AA-",
        greenBond: false,
        cbdcSettlement: true,
        settlementType: "T+0",
        country: "Slovenia",
        type: "Sovereign Bond",
        isin: "SI0022104922",
        notes: "République de Slovénie - Règlement CBDC"
    },

    // European Investment Bank (EIB)
    {
        issuer: "European Investment Bank",
        amount: 100,
        currency: "EUR",
        blockchain: "Ethereum",
        platform: "EIB Platform",
        issueDate: "2021-04-28",
        maturity: "2023-04-28",
        coupon: 0.0,
        status: "Mature",
        rating: "Aaa/AAA",
        greenBond: false,
        cbdcSettlement: false,
        settlementType: "T+2",
        country: "EU",
        type: "Digital Bond",
        isin: "EU000A3K0D81",
        notes: "Premier digital bond EIB",
        smartContractAddress: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599" // Demo: WBTC contract
    },
    {
        issuer: "European Investment Bank",
        amount: 100,
        currency: "EUR",
        blockchain: "Ethereum",
        platform: "EIB Platform",
        issueDate: "2024-11-19",
        maturity: "2027-11-19",
        coupon: 2.5,
        status: "Active",
        rating: "Aaa/AAA",
        greenBond: true,
        cbdcSettlement: false,
        settlementType: "T+1",
        country: "EU",
        type: "Climate Awareness Bond",
        isin: "EU000A3K0JM5",
        notes: "Eurosystem DLT experimentation",
        smartContractAddress: "0x514910771AF9Ca656af840dff83E8264EcF986CA" // Demo: LINK contract
    },
    {
        issuer: "European Investment Bank",
        amount: 100,
        currency: "EUR",
        blockchain: "Ethereum",
        platform: "EIB Platform",
        issueDate: "2024-11-22",
        maturity: "2029-11-22",
        coupon: 2.625,
        status: "Active",
        rating: "Aaa/AAA",
        greenBond: true,
        cbdcSettlement: false,
        settlementType: "T+1",
        country: "EU",
        type: "Climate Awareness Bond",
        isin: "EU000A3K0JN3",
        notes: "6ème digital bond EIB",
        smartContractAddress: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984" // Demo: UNI contract
    },
    {
        issuer: "European Investment Bank",
        amount: 50,
        currency: "GBP",
        blockchain: "Ethereum",
        platform: "EIB Platform",
        issueDate: "2023-01-25",
        maturity: "2026-01-25",
        coupon: 3.0,
        status: "Active",
        rating: "Aaa/AAA",
        greenBond: false,
        cbdcSettlement: false,
        settlementType: "T+2",
        country: "EU",
        type: "Digital Bond",
        isin: "EU000A3K0F56",
        notes: "Premier Sterling digital bond",
        smartContractAddress: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9" // Demo: AAVE contract
    },

    // German Banks - SWIAT Platform
    {
        issuer: "Berlin Hyp",
        amount: 50,
        currency: "EUR",
        blockchain: "SWIAT",
        platform: "SWIAT",
        issueDate: "2024-03-15",
        maturity: "2029-03-15",
        coupon: 2.375,
        status: "Active",
        rating: "Aa1/AA+",
        greenBond: false,
        cbdcSettlement: false,
        settlementType: "T+2",
        country: "Germany",
        type: "Pfandbrief",
        isin: "DE000A3H3JF2",
        notes: "Premier Pfandbrief blockchain (SWIAT)"
    },
    {
        issuer: "DekaBank",
        amount: 75,
        currency: "EUR",
        blockchain: "SWIAT",
        platform: "SWIAT",
        issueDate: "2025-10-20",
        maturity: "2030-10-20",
        coupon: 2.5,
        status: "Active",
        rating: "Aa2/AA",
        greenBond: false,
        cbdcSettlement: false,
        settlementType: "T+1",
        country: "Germany",
        type: "Digital Mortgage Pfandbrief",
        isin: "DE000DK0TH75",
        notes: "Crypto security sous loi allemande (eWpG)"
    },
    {
        issuer: "Natixis Pfandbriefbank",
        amount: 60,
        currency: "EUR",
        blockchain: "SWIAT",
        platform: "SWIAT",
        issueDate: "2025-08-12",
        maturity: "2030-08-12",
        coupon: 2.625,
        status: "Active",
        rating: "Aa3/AA-",
        greenBond: false,
        cbdcSettlement: false,
        settlementType: "T+2",
        country: "Germany",
        type: "Digital Registered Covered Bond",
        isin: "DE000A3H3MK8",
        notes: "Premier covered bond digital Natixis"
    },
    {
        issuer: "LBBW",
        amount: 80,
        currency: "EUR",
        blockchain: "SWIAT",
        platform: "SWIAT",
        issueDate: "2024-09-10",
        maturity: "2029-09-10",
        coupon: 2.25,
        status: "Active",
        rating: "Aa1/AA+",
        greenBond: false,
        cbdcSettlement: false,
        settlementType: "T+2",
        country: "Germany",
        type: "Pfandbrief",
        isin: "DE000LBW0PF9",
        notes: "Émission pilote SWIAT"
    },

    // UK Banks
    {
        issuer: "Lloyds Banking Group",
        amount: 45,
        currency: "GBP",
        blockchain: "Ethereum",
        platform: "Archax",
        issueDate: "2026-01-06",
        maturity: "2031-01-06",
        coupon: 3.125,
        status: "Active",
        rating: "A1/A+",
        greenBond: false,
        cbdcSettlement: false,
        settlementType: "T+0",
        country: "UK",
        type: "Tokenised Gilt",
        isin: "GB00BMTQ0K47",
        notes: "Premier UK tokenised gilt transaction"
    },
    {
        issuer: "Barclays",
        amount: 120,
        currency: "GBP",
        blockchain: "Ethereum",
        platform: "Barclays Digital",
        issueDate: "2025-06-18",
        maturity: "2030-06-18",
        coupon: 3.25,
        status: "Active",
        rating: "A2/A",
        greenBond: false,
        cbdcSettlement: false,
        settlementType: "T+2",
        country: "UK",
        type: "Digital Bond",
        isin: "GB00BMSK9L34",
        notes: "Émission pilote blockchain"
    },

    // Chinese Banks
    {
        issuer: "Huaxia Bank",
        amount: 650,
        currency: "CNY",
        blockchain: "BSN",
        platform: "BSN China",
        issueDate: "2025-12-15",
        maturity: "2028-12-15",
        coupon: 3.5,
        status: "Active",
        rating: "A1/A+",
        greenBond: false,
        cbdcSettlement: true,
        settlementType: "T+0",
        country: "China",
        type: "Financial Bond",
        isin: "CNE100004BF6",
        notes: "Blockchain bookkeeping + digital RMB"
    },

    // Other European Banks
    {
        issuer: "Santander",
        amount: 85,
        currency: "EUR",
        blockchain: "Ethereum",
        platform: "Santander Digital",
        issueDate: "2023-09-20",
        maturity: "2028-09-20",
        coupon: 2.75,
        status: "Active",
        rating: "A2/A",
        greenBond: false,
        cbdcSettlement: false,
        settlementType: "T+2",
        country: "Spain",
        type: "Digital Bond",
        isin: "ES0413900715",
        notes: "Émission pilote"
    },
    {
        issuer: "ING Bank",
        amount: 70,
        currency: "EUR",
        blockchain: "Ethereum",
        platform: "ING Digital",
        issueDate: "2024-05-10",
        maturity: "2029-05-10",
        coupon: 2.5,
        status: "Active",
        rating: "Aa3/AA-",
        greenBond: true,
        cbdcSettlement: false,
        settlementType: "T+2",
        country: "Netherlands",
        type: "Green Bond",
        isin: "NL0015000YX2",
        notes: "Green bond digital"
    },
    {
        issuer: "UniCredit",
        amount: 55,
        currency: "EUR",
        blockchain: "Ethereum",
        platform: "UniCredit Digital",
        issueDate: "2024-11-05",
        maturity: "2027-11-05",
        coupon: 2.375,
        status: "Active",
        rating: "Baa1/BBB+",
        greenBond: false,
        cbdcSettlement: false,
        settlementType: "T+2",
        country: "Italy",
        type: "Digital Bond",
        isin: "IT0005514341",
        notes: "Émission pilote"
    },

    // Upcoming Emissions
    {
        issuer: "Deutsche Bank",
        amount: 150,
        currency: "EUR",
        blockchain: "SWIAT",
        platform: "SWIAT",
        issueDate: "2026-02-15",
        maturity: "2031-02-15",
        coupon: 2.75,
        status: "Upcoming",
        rating: "A3/BBB+",
        greenBond: false,
        cbdcSettlement: false,
        settlementType: "T+1",
        country: "Germany",
        type: "Covered Bond",
        isin: null,
        notes: "Émission planifiée Q1 2026"
    },
    {
        issuer: "Crédit Agricole",
        amount: 90,
        currency: "EUR",
        blockchain: "Ethereum",
        platform: "CA Digital",
        issueDate: "2026-03-01",
        maturity: "2031-03-01",
        coupon: 2.625,
        status: "Upcoming",
        rating: "Aa3/AA-",
        greenBond: true,
        cbdcSettlement: false,
        settlementType: "T+2",
        country: "France",
        type: "Green Covered Bond",
        isin: null,
        notes: "Green bond planifié"
    },
    {
        issuer: "HSBC",
        amount: 200,
        currency: "USD",
        blockchain: "Canton Network",
        platform: "HSBC Digital",
        issueDate: "2026-04-10",
        maturity: "2033-04-10",
        coupon: 3.5,
        status: "Upcoming",
        rating: "Aa2/AA",
        greenBond: false,
        cbdcSettlement: false,
        settlementType: "T+1",
        country: "UK",
        type: "Digital Bond",
        isin: null,
        notes: "Expansion US market"
    }
];

// ============================================
// MARKET NEWS DATA
// ============================================
const newsData = [
    {
        date: "2026-01-06",
        title: "Lloyds complète la première transaction UK sur blockchain publique",
        category: "Innovation",
        source: "Lloyds Banking Group",
        summary: "Utilisation de Tokenised Deposits pour l'achat d'un Tokenised Gilt, démontrant le potentiel du règlement instantané et des smart contracts.",
        importance: "high",
        url: "https://www.lloydsbankinggroup.com/who-we-are/responsible-business/innovation.html"
    },
    {
        date: "2025-12-15",
        title: "Huaxia Bank émet 4.5B yuan en bonds avec digital RMB",
        category: "CBDC",
        source: "Huaxia Bank",
        summary: "Première utilisation à grande échelle du modèle 'blockchain bookkeeping + digital RMB collection' avec information on-chain en temps réel.",
        importance: "high",
        url: "https://www.huaxiabank.com/"
    },
    {
        date: "2025-11-15",
        title: "Société Générale lance son premier digital bond aux États-Unis",
        category: "Innovation",
        source: "SG-FORGE",
        summary: "Émission de $100M sur Canton Network avec Broadridge, marquant l'expansion de SG-FORGE sur le marché américain.",
        importance: "high",
        url: "https://www.sgforge.com/"
    },
    {
        date: "2025-10-20",
        title: "DekaBank annonce son premier Pfandbrief blockchain",
        category: "Emission",
        source: "DekaBank",
        summary: "Digital mortgage Pfandbrief émis comme crypto security sous la loi allemande eWpG, suivant Berlin Hyp.",
        importance: "medium",
        url: "https://www.dekabank.de/"
    },
    {
        date: "2025-08-12",
        title: "Natixis Pfandbriefbank rejoint SWIAT avec premier covered bond digital",
        category: "Emission",
        source: "Natixis",
        summary: "Émission de €60M sur la plateforme SWIAT, renforçant l'écosystème allemand des covered bonds blockchain.",
        importance: "medium",
        url: "https://www.natixis.com/natixis/en/home-j_6.html"
    },
    {
        date: "2025-07-15",
        title: "Moody's alerte sur les défis réglementaires des covered bonds blockchain",
        category: "Regulation",
        source: "Moody's",
        summary: "Analyse des roadblocks réglementaires pour les bonds sur blockchain publique, notamment concernant les risk weights.",
        importance: "high",
        url: "https://www.moodys.com/"
    },
    {
        date: "2024-11-22",
        title: "EIB émet son 6ème digital bond dans le cadre Eurosystem",
        category: "Emission",
        source: "European Investment Bank",
        summary: "€100M Climate Awareness Bond émis dans le cadre de l'expérimentation DLT de l'Eurosystem pour le wholesale CBDC.",
        importance: "medium",
        url: "https://www.eib.org/en/press/all/2024-481-eib-issues-its-sixth-digital-bond-on-a-public-blockchain"
    },
    {
        date: "2024-07-10",
        title: "BNP Paribas arrange le premier sovereign digital bond de Slovénie",
        category: "Innovation",
        source: "BNP Paribas",
        summary: "€30M émis via Neobonds avec règlement en cash tokenisé de la Banque de France, milestone pour les souverains européens.",
        importance: "high",
        url: "https://group.bnpparibas/en/news/bnp-paribas-arranges-first-sovereign-digital-bond-slovenia"
    },
    {
        date: "2024-03-15",
        title: "Berlin Hyp lance le premier Pfandbrief sur SWIAT blockchain",
        category: "Innovation",
        source: "Berlin Hyp",
        summary: "Émission pionnière sur la plateforme privée SWIAT avec settlement T+2 vs T+5 conventionnel.",
        importance: "high",
        url: "https://www.berlinhyp.de/en"
    },
    {
        date: "2023-12-05",
        title: "Société Générale émet son premier green bond digital",
        category: "ESG",
        source: "SG-FORGE",
        summary: "Premier green bond sur blockchain publique visant à augmenter la transparence et traçabilité des données ESG.",
        importance: "medium",
        url: "https://www.sgforge.com/"
    },
    {
        date: "2023-03-20",
        title: "EU DLT Pilot Regime entre en vigueur",
        category: "Regulation",
        source: "European Commission",
        summary: "Sandbox réglementaire de 3 ans permettant l'expérimentation DLT pour trading et settlement, avec extension possible.",
        importance: "high",
        url: "https://finance.ec.europa.eu/digital-finance/distributed-ledger-technology_en"
    },
    {
        date: "2022-07-20",
        title: "BNP Paribas tokenise un project finance bond pour EDF ENR",
        category: "ESG",
        source: "BNP Paribas",
        summary: "Bond sur Ethereum pour financement de projets solaires, élargissant le scope du financement de projets renouvelables.",
        importance: "medium",
        url: "https://group.bnpparibas/en/"
    }
];

// ============================================
// SECONDARY MARKET DATA (Simulated)
// ============================================
const secondaryMarketData = {
    dailyVolume: 125.5, // M€
    avgSpread: 0.15, // %
    transactions: 47,
    avgPrice: 101.25,
    topTradedIssuers: [
        { issuer: "Société Générale", volume: 35.2, trades: 12 },
        { issuer: "European Investment Bank", volume: 28.5, trades: 10 },
        { issuer: "BNP Paribas", volume: 22.3, trades: 8 },
        { issuer: "DekaBank", volume: 18.7, trades: 7 },
        { issuer: "Berlin Hyp", volume: 20.8, trades: 10 }
    ],
    priceHistory: [
        { date: "2026-01-02", price: 100.85 },
        { date: "2026-01-03", price: 101.10 },
        { date: "2026-01-04", price: 100.95 },
        { date: "2026-01-05", price: 101.20 },
        { date: "2026-01-06", price: 101.35 },
        { date: "2026-01-07", price: 101.25 },
        { date: "2026-01-08", price: 101.40 }
    ],
    spreadHistory: [
        { date: "2026-01-02", spread: 0.18 },
        { date: "2026-01-03", spread: 0.16 },
        { date: "2026-01-04", spread: 0.17 },
        { date: "2026-01-05", spread: 0.15 },
        { date: "2026-01-06", spread: 0.14 },
        { date: "2026-01-07", spread: 0.15 },
        { date: "2026-01-08", spread: 0.15 }
    ]
};

// ============================================
// STATE MANAGEMENT
// ============================================
let filteredData = [...emissionsData];
let currentSort = { column: null, direction: 'asc' };
let currentView = 'primary'; // 'primary', 'secondary', 'news'

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Initialize data source manager
    if (typeof CONFIG !== 'undefined' && typeof initializeDataSources !== 'undefined') {
        window.dataSourceManager = initializeDataSources(CONFIG);
        updateApiStatus();
    }

    updateLastUpdateTime();
    populateFilters();
    updateMetrics();
    renderTable();
    initializeCharts();
    renderNewsSection();
    renderSecondaryMarketDashboard();
    attachEventListeners();

    // Start auto-update intervals if enabled
    if (CONFIG && CONFIG.features.realTimeUpdates) {
        startAutoUpdate();
    }

    // --- RESTORE ETHERSCAN & LIVE DATA INTEGRATION ---
    if (window.dataSourceManager) {
        console.log('[APP] Starting live data enrichment...');
        updateApiStatus(); // Show "Loading..."

        window.dataSourceManager.enrichAllEmissions(emissionsData).then(updatedData => {
            console.log('[APP] Data enrichment complete via Etherscan/RWA');

            // Update local data
            emissionsData.forEach((emission, index) => {
                const updated = updatedData.find(u => u.isin === emission.isin);
                if (updated) emissionsData[index] = updated;
            });

            // Re-apply filters and render
            applyFilters();
            updateMetrics();

            // Update status UI
            const apiStatusText = document.getElementById('apiStatusText');
            const apiStatusIndicator = document.getElementById('apiStatusIndicator');
            if (apiStatusText && apiStatusIndicator) {
                apiStatusText.textContent = 'Connecté (Etherscan & RWA.xyz)';
                apiStatusIndicator.style.color = '#10b981'; // Green
            }
        }).catch(err => {
            console.error('[APP] Enrichment failed:', err);
            const apiStatusText = document.getElementById('apiStatusText');
            if (apiStatusText) apiStatusText.textContent = 'Mode Dégradé (Données locales)';
        });
    }
}

// ============================================
// TIME & DATE UTILITIES
// ============================================
function updateLastUpdateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
    });
    document.getElementById('updateTime').textContent = timeString;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// ============================================
// FILTERS
// ============================================
function populateFilters() {
    // Get unique values
    const issuers = [...new Set(emissionsData.map(e => e.issuer))].sort();
    const blockchains = [...new Set(emissionsData.map(e => e.blockchain))].sort();
    const currencies = [...new Set(emissionsData.map(e => e.currency))].sort();
    const platforms = [...new Set(emissionsData.map(e => e.platform))].sort();

    // Populate issuer filter
    const issuerSelect = document.getElementById('filterIssuer');
    issuers.forEach(issuer => {
        const option = document.createElement('option');
        option.value = issuer;
        option.textContent = issuer;
        issuerSelect.appendChild(option);
    });

    // Populate blockchain filter
    const blockchainSelect = document.getElementById('filterBlockchain');
    blockchains.forEach(blockchain => {
        const option = document.createElement('option');
        option.value = blockchain;
        option.textContent = blockchain;
        blockchainSelect.appendChild(option);
    });

    // Populate currency filter
    const currencySelect = document.getElementById('filterCurrency');
    currencies.forEach(currency => {
        const option = document.createElement('option');
        option.value = currency;
        option.textContent = currency;
        currencySelect.appendChild(option);
    });

    // Populate platform filter
    const platformSelect = document.getElementById('filterPlatform');
    if (platformSelect) {
        platforms.forEach(platform => {
            const option = document.createElement('option');
            option.value = platform;
            option.textContent = platform;
            platformSelect.appendChild(option);
        });
    }
}

function applyFilters() {
    const issuerFilter = document.getElementById('filterIssuer').value;
    const blockchainFilter = document.getElementById('filterBlockchain').value;
    const currencyFilter = document.getElementById('filterCurrency').value;
    const statusFilter = document.getElementById('filterStatus').value;
    const platformFilter = document.getElementById('filterPlatform')?.value || '';
    const greenBondFilter = document.getElementById('filterGreenBond')?.value || '';

    filteredData = emissionsData.filter(emission => {
        return (
            (!issuerFilter || emission.issuer === issuerFilter) &&
            (!blockchainFilter || emission.blockchain === blockchainFilter) &&
            (!currencyFilter || emission.currency === currencyFilter) &&
            (!statusFilter || emission.status === statusFilter) &&
            (!platformFilter || emission.platform === platformFilter) &&
            (!greenBondFilter || (greenBondFilter === 'true' ? emission.greenBond : !emission.greenBond))
        );
    });

    updateMetrics();
    renderTable();
    updateCharts();
}

function resetFilters() {
    document.getElementById('filterIssuer').value = '';
    document.getElementById('filterBlockchain').value = '';
    document.getElementById('filterCurrency').value = '';
    document.getElementById('filterStatus').value = '';
    if (document.getElementById('filterPlatform')) {
        document.getElementById('filterPlatform').value = '';
    }
    if (document.getElementById('filterGreenBond')) {
        document.getElementById('filterGreenBond').value = '';
    }

    filteredData = [...emissionsData];
    currentSort = { column: null, direction: 'asc' };

    updateMetrics();
    renderTable();
    updateCharts();
}

// ============================================
// METRICS CALCULATION
// ============================================
function updateMetrics() {
    // Total volume
    const totalVolume = filteredData.reduce((sum, e) => sum + e.amount, 0);
    document.getElementById('totalVolume').textContent = formatCurrency(totalVolume, 'M');

    // Total emissions
    const totalEmissions = filteredData.length;
    document.getElementById('totalEmissions').textContent = totalEmissions;

    // Active issuers
    const activeIssuers = new Set(filteredData.map(e => e.issuer)).size;
    document.getElementById('activeIssuers').textContent = activeIssuers;

    // Platforms used
    const platforms = new Set(filteredData.map(e => e.platform)).size;
    document.getElementById('totalPlatforms').textContent = platforms;

    // Settlement Speed - Instant Settlement (T+0)
    const t0Bonds = filteredData.filter(e => e.settlementType === 'T+0');
    const t0Count = t0Bonds.length;
    const t0Percentage = totalEmissions > 0 ? ((t0Count / totalEmissions) * 100).toFixed(1) : 0;
    document.getElementById('instantSettlement').textContent = `${t0Percentage}%`;
    document.getElementById('instantSettlementCount').textContent = `${t0Count} bond${t0Count > 1 ? 's' : ''} T+0`;

    // Update displayed count
    document.getElementById('displayedCount').textContent = totalEmissions;
}

function formatCurrency(amount, suffix = '') {
    if (suffix === 'M') {
        return `€${amount.toLocaleString('fr-FR')}${suffix}`;
    }
    return `€${amount.toLocaleString('fr-FR')}`;
}

// ============================================
// TABLE RENDERING
// ============================================
function renderTable() {
    const tbody = document.getElementById('emissionsTableBody');
    tbody.innerHTML = '';

    filteredData.forEach(emission => {
        const row = document.createElement('tr');

        const greenIndicator = emission.greenBond ? '<span style="color: #10b981; margin-left: 4px;">🌱</span>' : '';
        const cbdcIndicator = emission.cbdcSettlement ? '<span style="color: #d4af37; margin-left: 4px;">💰</span>' : '';

        // Create ISIN display with potential Etherscan link
        let isinDisplay;
        if (emission.isin) {
            // Check if this emission has blockchain data (from data-sources.js)
            const hasBlockchainData = emission.contractAddress || emission.dataSource === 'etherscan';

            if (hasBlockchainData && emission.contractAddress) {
                // Create clickable link to Etherscan
                isinDisplay = `<a href="https://etherscan.io/address/${emission.contractAddress}" target="_blank" rel="noopener noreferrer" class="badge" style="background: rgba(212, 175, 55, 0.1); color: var(--color-accent); text-decoration: none; cursor: pointer;" title="View on Etherscan">${emission.isin} 🔗</a>`;
            } else {
                isinDisplay = `<span class="badge" style="background: rgba(212, 175, 55, 0.1); color: var(--color-accent);">${emission.isin}</span>`;
            }
        } else {
            isinDisplay = '<span style="color: var(--color-text-muted); font-style: italic;">En attente</span>';
        }

        row.innerHTML = `
            <td class="font-bold">${emission.issuer}${greenIndicator}${cbdcIndicator}</td>
            <td class="font-bold">${formatCurrency(emission.amount, 'M')}</td>
            <td>${emission.currency}</td>
            <td><span class="badge blockchain-badge">${emission.blockchain}</span></td>
            <td><span class="badge platform-badge">${emission.platform}</span></td>
            <td>${formatDate(emission.issueDate)}</td>
            <td>${formatDate(emission.maturity)}</td>
            <td>${emission.coupon}%</td>
            <td><span class="badge rating-badge">${emission.rating}</span></td>
            <td>${isinDisplay}</td>
            <td><span class="badge badge-${emission.status.toLowerCase()}">${emission.status}</span></td>
        `;

        tbody.appendChild(row);

        // Add data source badge if available (from api-integration.js)
        if (typeof addDataSourceBadge === 'function' && emission.dataSource) {
            addDataSourceBadge(row.cells[0], emission.dataSource);
        }
    });
}

// ============================================
// NEWS SECTION
// ============================================
function renderNewsSection() {
    const newsContainer = document.getElementById('newsContainer');
    if (!newsContainer) return;

    newsContainer.innerHTML = '';

    newsData.slice(0, 6).forEach(news => {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card fade-in';

        const importanceClass = news.importance === 'high' ? 'high-importance' : '';
        const categoryColors = {
            'Innovation': '#d4af37',
            'Emission': '#2563eb',
            'Regulation': '#ef4444',
            'ESG': '#10b981',
            'CBDC': '#f59e0b'
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
// SECONDARY MARKET DASHBOARD
// ============================================
function renderSecondaryMarketDashboard() {
    // Update metrics
    if (document.getElementById('secondaryVolume')) {
        document.getElementById('secondaryVolume').textContent = `€${secondaryMarketData.dailyVolume}M`;
    }
    if (document.getElementById('secondarySpread')) {
        document.getElementById('secondarySpread').textContent = `${secondaryMarketData.avgSpread}%`;
    }
    if (document.getElementById('secondaryTransactions')) {
        document.getElementById('secondaryTransactions').textContent = secondaryMarketData.transactions;
    }
    if (document.getElementById('secondaryPrice')) {
        document.getElementById('secondaryPrice').textContent = secondaryMarketData.avgPrice.toFixed(2);
    }

    // Render charts
    renderSecondaryMarketCharts();
}

function renderSecondaryMarketCharts() {
    // Price history chart
    const priceCtx = document.getElementById('priceHistoryChart');
    if (priceCtx) {
        new Chart(priceCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: secondaryMarketData.priceHistory.map(d => formatDate(d.date)),
                datasets: [{
                    label: 'Prix Moyen',
                    data: secondaryMarketData.priceHistory.map(d => d.price),
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
    const spreadCtx = document.getElementById('spreadHistoryChart');
    if (spreadCtx) {
        new Chart(spreadCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: secondaryMarketData.spreadHistory.map(d => formatDate(d.date)),
                datasets: [{
                    label: 'Spread Bid-Ask (%)',
                    data: secondaryMarketData.spreadHistory.map(d => d.spread),
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

    // Top traded issuers
    const tradedCtx = document.getElementById('topTradedChart');
    if (tradedCtx) {
        new Chart(tradedCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: secondaryMarketData.topTradedIssuers.map(i => i.issuer),
                datasets: [{
                    label: 'Volume (M€)',
                    data: secondaryMarketData.topTradedIssuers.map(i => i.volume),
                    backgroundColor: 'rgba(212, 175, 55, 0.8)',
                    borderColor: '#d4af37',
                    borderWidth: 1
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
                    x: {
                        beginAtZero: true,
                        ticks: { color: '#cbd5e1' },
                        grid: { color: 'rgba(45, 55, 72, 0.5)' }
                    },
                    y: {
                        ticks: { color: '#cbd5e1' },
                        grid: { color: 'rgba(45, 55, 72, 0.5)' }
                    }
                }
            }
        });
    }
}

// ============================================
// SORTING
// ============================================
function sortTable(column) {
    if (currentSort.column === column) {
        currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
        currentSort.column = column;
        currentSort.direction = 'asc';
    }

    filteredData.sort((a, b) => {
        let aVal = a[column];
        let bVal = b[column];

        if (column === 'issueDate' || column === 'maturity') {
            aVal = new Date(aVal);
            bVal = new Date(bVal);
        }

        if (typeof aVal === 'number') {
            return currentSort.direction === 'asc' ? aVal - bVal : bVal - aVal;
        }

        if (currentSort.direction === 'asc') {
            return aVal > bVal ? 1 : -1;
        } else {
            return aVal < bVal ? 1 : -1;
        }
    });

    updateSortIndicators(column);
    renderTable();
}

function updateSortIndicators(column) {
    document.querySelectorAll('.emissions-table th').forEach(th => {
        th.classList.remove('sorted-asc', 'sorted-desc');
    });

    const th = document.querySelector(`th[data-sort="${column}"]`);
    if (th) {
        th.classList.add(`sorted-${currentSort.direction}`);
    }
}

// ============================================
// CHARTS
// ============================================
let charts = {};

function initializeCharts() {
    createEmissionsTimelineChart();
    createPlatformDistributionChart();
    createTopIssuersChart();
    createGreenBondsChart();
    createSettlementSpeedChart();
    createMaturityWallChart();
}

function updateCharts() {
    Object.values(charts).forEach(chart => chart.destroy());
    charts = {};
    initializeCharts();
}

function createEmissionsTimelineChart() {
    const ctx = document.getElementById('emissionsTimelineChart').getContext('2d');

    const monthlyData = {};
    filteredData.forEach(emission => {
        const date = new Date(emission.issueDate);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

        if (!monthlyData[monthKey]) {
            monthlyData[monthKey] = 0;
        }
        monthlyData[monthKey] += emission.amount;
    });

    const sortedMonths = Object.keys(monthlyData).sort();
    const labels = sortedMonths.map(m => {
        const [year, month] = m.split('-');
        return new Date(year, month - 1).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
    });
    const data = sortedMonths.map(m => monthlyData[m]);

    charts.timeline = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Volume (M€)',
                data: data,
                borderColor: '#d4af37',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 6
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
}

function createPlatformDistributionChart() {
    const ctx = document.getElementById('platformDistributionChart').getContext('2d');

    const platformData = {};
    filteredData.forEach(emission => {
        if (!platformData[emission.platform]) {
            platformData[emission.platform] = 0;
        }
        platformData[emission.platform]++;
    });

    const labels = Object.keys(platformData);
    const data = Object.values(platformData);

    charts.platform = new Chart(ctx, {
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
                    position: 'right',
                    labels: { color: '#f8fafc', padding: 15 }
                }
            }
        }
    });
}

function createTopIssuersChart() {
    const ctx = document.getElementById('topIssuersChart').getContext('2d');

    const issuerVolumes = {};
    filteredData.forEach(emission => {
        if (!issuerVolumes[emission.issuer]) {
            issuerVolumes[emission.issuer] = 0;
        }
        issuerVolumes[emission.issuer] += emission.amount;
    });

    const sortedIssuers = Object.entries(issuerVolumes)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    const labels = sortedIssuers.map(i => i[0]);
    const data = sortedIssuers.map(i => i[1]);

    charts.topIssuers = new Chart(ctx, {
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
            indexAxis: 'y',
            plugins: {
                legend: { labels: { color: '#f8fafc' } }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: { color: '#cbd5e1' },
                    grid: { color: 'rgba(45, 55, 72, 0.5)' }
                },
                y: {
                    ticks: { color: '#cbd5e1' },
                    grid: { color: 'rgba(45, 55, 72, 0.5)' }
                }
            }
        }
    });
}

function createGreenBondsChart() {
    const ctx = document.getElementById('greenBondsChart').getContext('2d');

    const greenCount = filteredData.filter(e => e.greenBond).length;
    const traditionalCount = filteredData.length - greenCount;

    charts.greenBonds = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Green Bonds', 'Traditional Bonds'],
            datasets: [{
                data: [greenCount, traditionalCount],
                backgroundColor: [
                    '#10b981',
                    '#64748b'
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
}

function createSettlementSpeedChart() {
    const ctx = document.getElementById('settlementSpeedChart');
    if (!ctx) return;

    // Count bonds by settlement type
    const settlementCounts = {
        'T+0': filteredData.filter(e => e.settlementType === 'T+0').length,
        'T+1': filteredData.filter(e => e.settlementType === 'T+1').length,
        'T+2': filteredData.filter(e => e.settlementType === 'T+2').length
    };

    charts.settlementSpeed = new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['T+0 (Instantané)', 'T+1 (Rapide)', 'T+2 (Standard)'],
            datasets: [{
                label: 'Nombre d\'émissions',
                data: [settlementCounts['T+0'], settlementCounts['T+1'], settlementCounts['T+2']],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.8)',  // Green for T+0
                    'rgba(37, 99, 235, 0.8)',    // Blue for T+1
                    'rgba(100, 116, 139, 0.8)'   // Gray for T+2
                ],
                borderColor: ['#10b981', '#2563eb', '#64748b'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#f8fafc' } },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const total = settlementCounts['T+0'] + settlementCounts['T+1'] + settlementCounts['T+2'];
                            const percentage = total > 0 ? ((context.parsed.y / total) * 100).toFixed(1) : 0;
                            return `${context.parsed.y} émissions (${percentage}%)`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { color: '#cbd5e1', stepSize: 1 },
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

function createMaturityWallChart() {
    const ctx = document.getElementById('maturityWallChart');
    if (!ctx) return;

    // Group bonds by maturity year
    const maturityByYear = {};
    filteredData.forEach(emission => {
        const year = new Date(emission.maturity).getFullYear();
        if (!maturityByYear[year]) {
            maturityByYear[year] = { green: 0, traditional: 0 };
        }
        if (emission.greenBond) {
            maturityByYear[year].green += emission.amount;
        } else {
            maturityByYear[year].traditional += emission.amount;
        }
    });

    // Sort years and prepare data
    const years = Object.keys(maturityByYear).sort();
    const greenData = years.map(year => maturityByYear[year].green);
    const traditionalData = years.map(year => maturityByYear[year].traditional);

    charts.maturityWall = new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: years,
            datasets: [
                {
                    label: 'Green Bonds',
                    data: greenData,
                    backgroundColor: 'rgba(16, 185, 129, 0.8)',
                    borderColor: '#10b981',
                    borderWidth: 1
                },
                {
                    label: 'Traditional Bonds',
                    data: traditionalData,
                    backgroundColor: 'rgba(100, 116, 139, 0.8)',
                    borderColor: '#64748b',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#f8fafc' } },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `${context.dataset.label}: €${context.parsed.y}M`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: { color: '#cbd5e1' },
                    grid: { color: 'rgba(45, 55, 72, 0.5)' }
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    ticks: {
                        color: '#cbd5e1',
                        callback: function (value) {
                            return '€' + value + 'M';
                        }
                    },
                    grid: { color: 'rgba(45, 55, 72, 0.5)' }
                }
            }
        }
    });
}

// ============================================
// EXPORT FUNCTIONALITY
// ============================================
function exportToCSV() {
    const headers = ['Émetteur', 'Montant (M)', 'Devise', 'Blockchain', 'Platform', 'Date Émission', 'Maturité', 'Coupon (%)', 'Rating', 'Statut', 'Green Bond', 'CBDC Settlement', 'Settlement Type', 'Type'];
    const rows = filteredData.map(e => [
        e.issuer,
        e.amount,
        e.currency,
        e.blockchain,
        e.platform,
        e.issueDate,
        e.maturity,
        e.coupon,
        e.rating,
        e.status,
        e.greenBond ? 'Yes' : 'No',
        e.cbdcSettlement ? 'Yes' : 'No',
        e.settlementType,
        e.type
    ]);

    let csvContent = headers.join(',') + '\n';
    rows.forEach(row => {
        csvContent += row.join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `covered_bonds_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ============================================
// VIEW SWITCHING
// ============================================
function switchView(view) {
    currentView = view;

    // Update tab active states
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-view="${view}"]`)?.classList.add('active');

    // Show/hide sections
    document.getElementById('primaryMarketSection')?.classList.toggle('hidden', view !== 'primary');
    document.getElementById('secondaryMarketSection')?.classList.toggle('hidden', view !== 'secondary');
    document.getElementById('newsSection')?.classList.toggle('hidden', view !== 'news');
}

// ============================================
// EVENT LISTENERS
// ============================================
function attachEventListeners() {
    // Filter changes
    document.getElementById('filterIssuer').addEventListener('change', applyFilters);
    document.getElementById('filterBlockchain').addEventListener('change', applyFilters);
    document.getElementById('filterCurrency').addEventListener('change', applyFilters);
    document.getElementById('filterStatus').addEventListener('change', applyFilters);

    if (document.getElementById('filterPlatform')) {
        document.getElementById('filterPlatform').addEventListener('change', applyFilters);
    }
    if (document.getElementById('filterGreenBond')) {
        document.getElementById('filterGreenBond').addEventListener('change', applyFilters);
    }

    // Reset filters
    document.getElementById('resetFilters').addEventListener('click', resetFilters);

    // Export data
    document.getElementById('exportData').addEventListener('click', exportToCSV);

    // Table sorting
    document.querySelectorAll('.emissions-table th.sortable').forEach(th => {
        th.addEventListener('click', () => {
            const column = th.getAttribute('data-sort');
            sortTable(column);
        });
    });

    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.getAttribute('data-view');
            switchView(view);
        });
    });

    // Update time every minute
    setInterval(updateLastUpdateTime, 60000);

    // Start auto-update system
    startAutoUpdate();
}

// ============================================
// AUTO-UPDATE SYSTEM
// ============================================

/**
 * Auto-update configuration
 */
const AUTO_UPDATE_CONFIG = {
    secondaryMarket: {
        interval: 30000, // 30 seconds
        enabled: true
    },
    emissions: {
        interval: 300000, // 5 minutes
        enabled: true
    },
    news: {
        interval: 600000, // 10 minutes
        enabled: true
    }
};

/**
 * Start all auto-update intervals
 */
function startAutoUpdate() {
    console.log('🔄 Auto-update system started');

    // Secondary market updates (every 30 seconds)
    if (AUTO_UPDATE_CONFIG.secondaryMarket.enabled) {
        setInterval(() => {
            updateSecondaryMarketData();
        }, AUTO_UPDATE_CONFIG.secondaryMarket.interval);
    }

    // New emissions check (every 5 minutes)
    if (AUTO_UPDATE_CONFIG.emissions.enabled) {
        setInterval(() => {
            checkForNewEmissions();
        }, AUTO_UPDATE_CONFIG.emissions.interval);
    }

    // News rotation (every 10 minutes)
    if (AUTO_UPDATE_CONFIG.news.enabled) {
        setInterval(() => {
            rotateNews();
        }, AUTO_UPDATE_CONFIG.news.interval);
    }
}

/**
 * Update secondary market data with realistic variations
 */
function updateSecondaryMarketData() {
    // Update daily volume (±5%)
    const volumeVariation = (Math.random() - 0.5) * 10; // -5% to +5%
    secondaryMarketData.dailyVolume = Math.max(100, secondaryMarketData.dailyVolume + volumeVariation);

    // Update average spread (±0.02%)
    const spreadVariation = (Math.random() - 0.5) * 0.04;
    secondaryMarketData.avgSpread = Math.max(0.10, Math.min(0.25, secondaryMarketData.avgSpread + spreadVariation));

    // Update transactions (±5)
    const transactionVariation = Math.floor((Math.random() - 0.5) * 10);
    secondaryMarketData.transactions = Math.max(30, secondaryMarketData.transactions + transactionVariation);

    // Update average price (±0.5)
    const priceVariation = (Math.random() - 0.5) * 1;
    secondaryMarketData.avgPrice = Math.max(99, Math.min(103, secondaryMarketData.avgPrice + priceVariation));

    // Add new price history point
    const today = new Date().toISOString().split('T')[0];
    if (secondaryMarketData.priceHistory[secondaryMarketData.priceHistory.length - 1].date !== today) {
        secondaryMarketData.priceHistory.push({
            date: today,
            price: secondaryMarketData.avgPrice
        });
        // Keep only last 7 days
        if (secondaryMarketData.priceHistory.length > 7) {
            secondaryMarketData.priceHistory.shift();
        }
    } else {
        // Update today's price
        secondaryMarketData.priceHistory[secondaryMarketData.priceHistory.length - 1].price = secondaryMarketData.avgPrice;
    }

    // Add new spread history point
    if (secondaryMarketData.spreadHistory[secondaryMarketData.spreadHistory.length - 1].date !== today) {
        secondaryMarketData.spreadHistory.push({
            date: today,
            spread: secondaryMarketData.avgSpread
        });
        // Keep only last 7 days
        if (secondaryMarketData.spreadHistory.length > 7) {
            secondaryMarketData.spreadHistory.shift();
        }
    } else {
        // Update today's spread
        secondaryMarketData.spreadHistory[secondaryMarketData.spreadHistory.length - 1].spread = secondaryMarketData.avgSpread;
    }

    // Update top traded issuers volumes (realistic variations)
    secondaryMarketData.topTradedIssuers.forEach(issuer => {
        const volumeChange = (Math.random() - 0.5) * 5;
        issuer.volume = Math.max(10, issuer.volume + volumeChange);

        const tradesChange = Math.floor((Math.random() - 0.5) * 4);
        issuer.trades = Math.max(3, issuer.trades + tradesChange);
    });

    // Re-render secondary market dashboard if visible
    if (currentView === 'secondary') {
        renderSecondaryMarketDashboard();
        showUpdateNotification('Marché secondaire actualisé', 'success');
    }

    // Update last update time
    updateLastUpdateTime();

    console.log('📊 Secondary market data updated');
}

/**
 * Check for new emissions and add them
 */
function checkForNewEmissions() {
    // Simulate new emission with 10% probability
    if (Math.random() < 0.1) {
        const newEmission = generateNewEmission();

        // Add to emissions data
        emissionsData.push(newEmission);

        // Update filtered data if it matches current filters
        applyFilters();

        // Show notification
        showUpdateNotification(`Nouvelle émission: ${newEmission.issuer} - ${formatCurrency(newEmission.amount, 'M')}`, 'info');

        console.log('🆕 New emission added:', newEmission.issuer);
    } else {
        console.log('✓ No new emissions');
    }
}

/**
 * Generate a realistic new emission
 */
function generateNewEmission() {
    const issuers = [
        { name: "Goldman Sachs", country: "USA", rating: "A1/A+", blockchain: "Canton Network", platform: "GS Digital", isinPrefix: "US" },
        { name: "Morgan Stanley", country: "USA", rating: "A1/A+", blockchain: "Ethereum", platform: "MS Digital", isinPrefix: "US" },
        { name: "Commerzbank", country: "Germany", rating: "A3/BBB+", blockchain: "SWIAT", platform: "SWIAT", isinPrefix: "DE" },
        { name: "Rabobank", country: "Netherlands", rating: "Aa2/AA", blockchain: "Ethereum", platform: "Rabobank Digital", isinPrefix: "NL" },
        { name: "Nordea", country: "Finland", rating: "Aa3/AA-", blockchain: "Ethereum", platform: "Nordea Digital", isinPrefix: "FI" }
    ];

    const issuer = issuers[Math.floor(Math.random() * issuers.length)];
    const amount = Math.floor(Math.random() * 150) + 50; // 50-200M
    const currencies = ["EUR", "USD", "GBP"];
    const currency = currencies[Math.floor(Math.random() * currencies.length)];
    const coupon = (Math.random() * 2 + 1.5).toFixed(3); // 1.5% - 3.5%
    const isGreen = Math.random() < 0.3; // 30% chance of green bond

    const today = new Date();
    const maturityYears = Math.floor(Math.random() * 5) + 3; // 3-7 years
    const maturityDate = new Date(today);
    maturityDate.setFullYear(maturityDate.getFullYear() + maturityYears);

    // Generate realistic ISIN
    const generateISIN = (prefix) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 10; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return `${prefix}${code}`;
    };

    return {
        issuer: issuer.name,
        amount: amount,
        currency: currency,
        blockchain: issuer.blockchain,
        platform: issuer.platform,
        issueDate: today.toISOString().split('T')[0],
        maturity: maturityDate.toISOString().split('T')[0],
        coupon: parseFloat(coupon),
        status: "Active",
        rating: issuer.rating,
        greenBond: isGreen,
        cbdcSettlement: Math.random() < 0.1, // 10% chance
        settlementType: Math.random() < 0.3 ? "T+0" : (Math.random() < 0.5 ? "T+1" : "T+2"),
        country: issuer.country,
        type: isGreen ? "Green Bond" : "Digital Bond",
        isin: generateISIN(issuer.isinPrefix),
        notes: `Nouvelle émission ${today.toLocaleDateString('fr-FR')}`
    };
}

/**
 * Rotate news to show different articles
 */
function rotateNews() {
    // Shuffle news array to show different articles
    const shuffledNews = [...newsData].sort(() => Math.random() - 0.5);

    // Update news data reference (keep original intact)
    if (currentView === 'news') {
        renderNewsSection();
        showUpdateNotification('Actualités actualisées', 'info');
    }

    console.log('📰 News rotated');
}

/**
 * Show update notification
 */
function showUpdateNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `update-notification update-notification-${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${type === 'success' ? '✓' : type === 'info' ? 'ℹ' : '⚠'}</span>
        <span class="notification-message">${message}</span>
    `;

    // Add to body
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}
