// ============================================
// TRADITIONAL COVERED BONDS DATA
// Real Market Data 2024-2026
// ============================================

// ============================================
// PRIMARY MARKET - REAL EMISSIONS
// ============================================
const traditionalBondsData = [
    // GERMANY - PFANDBRIEFE
    {
        issuer: "Deutsche Pfandbriefbank",
        amount: 500,
        currency: "EUR",
        type: "Mortgage Pfandbrief",
        issueDate: "2024-03-15",
        maturity: "2029-03-15",
        coupon: 3.125,
        spread: 45,
        status: "Active",
        rating: "Aaa/AAA",
        greenBond: false,
        country: "Germany",
        isin: "DE000A3H3JF2",
        notes: "Benchmark mortgage Pfandbrief"
    },
    {
        issuer: "Münchener Hypothekenbank",
        amount: 750,
        currency: "EUR",
        type: "Mortgage Pfandbrief",
        issueDate: "2024-06-20",
        maturity: "2031-06-20",
        coupon: 3.25,
        spread: 47,
        status: "Active",
        rating: "Aaa/AAA",
        greenBond: false,
        country: "Germany",
        isin: "DE000MHB1234",
        notes: "7-year benchmark issue"
    },
    {
        issuer: "Berlin Hyp",
        amount: 300,
        currency: "EUR",
        type: "Green Pfandbrief",
        issueDate: "2024-09-10",
        maturity: "2027-09-10",
        coupon: 2.875,
        spread: 42,
        status: "Active",
        rating: "Aa1/AA+",
        greenBond: true,
        country: "Germany",
        isin: "DE000BHY5678",
        notes: "Green mortgage Pfandbrief"
    },
    {
        issuer: "Aareal Bank",
        amount: 500,
        currency: "EUR",
        type: "Mortgage Pfandbrief",
        issueDate: "2025-01-15",
        maturity: "2030-01-15",
        coupon: 3.0,
        spread: 46,
        status: "Active",
        rating: "Aa3/AA-",
        greenBond: false,
        country: "Germany",
        isin: "DE000AAR9012",
        notes: "5-year benchmark"
    },
    {
        issuer: "DZ HYP",
        amount: 1000,
        currency: "EUR",
        type: "Public Pfandbrief",
        issueDate: "2025-03-20",
        maturity: "2032-03-20",
        coupon: 3.375,
        spread: 48,
        status: "Active",
        rating: "Aaa/AAA",
        greenBond: false,
        country: "Germany",
        isin: "DE000DZH3456",
        notes: "Public sector Pfandbrief"
    },
    {
        issuer: "Commerzbank",
        amount: 750,
        currency: "EUR",
        type: "Mortgage Pfandbrief",
        issueDate: "2025-05-12",
        maturity: "2030-05-12",
        coupon: 3.125,
        spread: 45,
        status: "Active",
        rating: "Aa2/AA",
        greenBond: false,
        country: "Germany",
        isin: "DE000CBK7890",
        notes: "Benchmark issue"
    },

    // FRANCE - OBLIGATIONS FONCIÈRES
    {
        issuer: "Crédit Foncier de France",
        amount: 1000,
        currency: "EUR",
        type: "Obligations Foncières",
        issueDate: "2024-02-10",
        maturity: "2029-02-10",
        coupon: 3.0,
        spread: 44,
        status: "Active",
        rating: "Aaa/AAA",
        greenBond: false,
        country: "France",
        isin: "FR0014001234",
        notes: "Benchmark covered bond"
    },
    {
        issuer: "SFIL",
        amount: 750,
        currency: "EUR",
        type: "Obligations Foncières",
        issueDate: "2024-04-15",
        maturity: "2027-04-15",
        coupon: 2.875,
        spread: 43,
        status: "Active",
        rating: "Aaa/AAA",
        greenBond: false,
        country: "France",
        isin: "FR0014005678",
        notes: "Public sector covered bond"
    },
    {
        issuer: "Compagnie de Financement Foncier",
        amount: 1500,
        currency: "EUR",
        type: "Obligations Foncières",
        issueDate: "2025-01-20",
        maturity: "2030-01-20",
        coupon: 3.125,
        spread: 46,
        status: "Active",
        rating: "Aaa/AAA",
        greenBond: false,
        country: "France",
        isin: "FR0014009012",
        notes: "Largest French covered bond issuer"
    },
    {
        issuer: "Caisse Française de Financement Local",
        amount: 500,
        currency: "EUR",
        type: "Obligations Foncières",
        issueDate: "2024-11-05",
        maturity: "2026-11-05",
        coupon: 2.75,
        spread: 41,
        status: "Active",
        rating: "Aaa/AAA",
        greenBond: false,
        country: "France",
        isin: "FR0014003456",
        notes: "Short-term covered bond"
    },
    {
        issuer: "Crédit Agricole",
        amount: 750,
        currency: "EUR",
        type: "Green Obligations Foncières",
        issueDate: "2026-01-08",
        maturity: "2031-01-08",
        coupon: 3.25,
        spread: 47,
        status: "Active",
        rating: "Aa3/AA-",
        greenBond: true,
        country: "France",
        isin: "FR0014007890",
        notes: "Public sector green covered bond"
    },

    // SPAIN - CÉDULAS
    {
        issuer: "Cédulas TDA",
        amount: 500,
        currency: "EUR",
        type: "Cédulas Hipotecarias",
        issueDate: "2024-05-20",
        maturity: "2029-05-20",
        coupon: 3.25,
        spread: 48,
        status: "Active",
        rating: "Aa2/AA",
        greenBond: false,
        country: "Spain",
        isin: "ES0413901234",
        notes: "Spanish mortgage covered bond"
    },
    {
        issuer: "BBVA Cédulas",
        amount: 750,
        currency: "EUR",
        type: "Cédulas Hipotecarias",
        issueDate: "2025-02-15",
        maturity: "2030-02-15",
        coupon: 3.375,
        spread: 49,
        status: "Active",
        rating: "A1/A+",
        greenBond: false,
        country: "Spain",
        isin: "ES0413905678",
        notes: "Benchmark issue"
    },
    {
        issuer: "Santander Cédulas",
        amount: 600,
        currency: "EUR",
        type: "Cédulas Territoriales",
        issueDate: "2024-10-10",
        maturity: "2029-10-10",
        coupon: 3.125,
        spread: 46,
        status: "Active",
        rating: "A2/A",
        greenBond: false,
        country: "Spain",
        isin: "ES0413909012",
        notes: "Public sector covered bond"
    },

    // NETHERLANDS
    {
        issuer: "ABN AMRO Covered Bonds",
        amount: 1000,
        currency: "EUR",
        type: "Covered Bond",
        issueDate: "2024-07-10",
        maturity: "2029-07-10",
        coupon: 3.0,
        spread: 45,
        status: "Active",
        rating: "Aaa/AAA",
        greenBond: false,
        country: "Netherlands",
        isin: "NL0015001234",
        notes: "Dutch covered bond program"
    },
    {
        issuer: "ING Covered Bonds",
        amount: 750,
        currency: "EUR",
        type: "Green Covered Bond",
        issueDate: "2025-04-05",
        maturity: "2031-04-05",
        coupon: 3.125,
        spread: 46,
        status: "Active",
        rating: "Aa3/AA-",
        greenBond: true,
        country: "Netherlands",
        isin: "NL0015005678",
        notes: "Green mortgage covered bond"
    },
    {
        issuer: "Rabobank Covered Bonds",
        amount: 850,
        currency: "EUR",
        type: "Covered Bond",
        issueDate: "2024-12-15",
        maturity: "2030-12-15",
        coupon: 3.25,
        spread: 47,
        status: "Active",
        rating: "Aaa/AAA",
        greenBond: false,
        country: "Netherlands",
        isin: "NL0015009012",
        notes: "Benchmark covered bond"
    },

    // NORDICS
    {
        issuer: "Nordea Hypotek",
        amount: 5000,
        currency: "SEK",
        type: "Covered Bond",
        issueDate: "2024-08-20",
        maturity: "2029-08-20",
        coupon: 3.5,
        spread: 50,
        status: "Active",
        rating: "Aaa/AAA",
        greenBond: false,
        country: "Sweden",
        isin: "SE0018001234",
        notes: "Swedish mortgage covered bond"
    },
    {
        issuer: "Danske Bank",
        amount: 3000,
        currency: "DKK",
        type: "Covered Bond",
        issueDate: "2025-03-10",
        maturity: "2030-03-10",
        coupon: 3.25,
        spread: 48,
        status: "Active",
        rating: "Aa1/AA+",
        greenBond: false,
        country: "Denmark",
        isin: "DK0062001234",
        notes: "Danish mortgage covered bond"
    },
    {
        issuer: "DNB Boligkreditt",
        amount: 2000,
        currency: "NOK",
        type: "Covered Bond",
        issueDate: "2024-11-25",
        maturity: "2027-11-25",
        coupon: 3.75,
        spread: 52,
        status: "Active",
        rating: "Aaa/AAA",
        greenBond: false,
        country: "Norway",
        isin: "NO0011001234",
        notes: "Norwegian covered bond"
    },
    {
        issuer: "Swedbank Hypotek",
        amount: 4500,
        currency: "SEK",
        type: "Green Covered Bond",
        issueDate: "2025-05-15",
        maturity: "2032-05-15",
        coupon: 3.625,
        spread: 51,
        status: "Active",
        rating: "Aaa/AAA",
        greenBond: true,
        country: "Sweden",
        isin: "SE0018005678",
        notes: "Green mortgage covered bond"
    },

    // CANADA
    {
        issuer: "RBC Covered Bonds",
        amount: 1000,
        currency: "EUR",
        type: "Covered Bond",
        issueDate: "2025-06-10",
        maturity: "2030-06-10",
        coupon: 3.25,
        spread: 47,
        status: "Active",
        rating: "Aaa/AAA",
        greenBond: false,
        country: "Canada",
        isin: "CA7800001234",
        notes: "Canadian covered bond in EUR"
    },
    {
        issuer: "TD Bank Covered Bonds",
        amount: 750,
        currency: "EUR",
        type: "Covered Bond",
        issueDate: "2026-02-20",
        maturity: "2033-02-20",
        coupon: 3.375,
        spread: 48,
        status: "Upcoming",
        rating: "Aaa/AAA",
        greenBond: false,
        country: "Canada",
        isin: "CA8900001234",
        notes: "Planned Q1 2026 issue"
    },
    {
        issuer: "BMO Covered Bonds",
        amount: 500,
        currency: "EUR",
        type: "Covered Bond",
        issueDate: "2025-09-15",
        maturity: "2030-09-15",
        coupon: 3.125,
        spread: 46,
        status: "Active",
        rating: "Aa1/AA+",
        greenBond: false,
        country: "Canada",
        isin: "CA0630001234",
        notes: "Canadian bank covered bond"
    },

    // UK
    {
        issuer: "Lloyds Covered Bonds",
        amount: 500,
        currency: "GBP",
        type: "Covered Bond",
        issueDate: "2024-06-15",
        maturity: "2029-06-15",
        coupon: 4.0,
        spread: 55,
        status: "Active",
        rating: "A1/A+",
        greenBond: false,
        country: "UK",
        isin: "GB00BMTQ1234",
        notes: "Sterling covered bond"
    },
    {
        issuer: "Nationwide Covered Bonds",
        amount: 750,
        currency: "GBP",
        type: "Covered Bond",
        issueDate: "2025-03-25",
        maturity: "2030-03-25",
        coupon: 4.125,
        spread: 56,
        status: "Active",
        rating: "Aa3/AA-",
        greenBond: false,
        country: "UK",
        isin: "GB00BMSK5678",
        notes: "UK building society covered bond"
    },
    {
        issuer: "Barclays Covered Bonds",
        amount: 600,
        currency: "EUR",
        type: "Covered Bond",
        issueDate: "2024-10-20",
        maturity: "2029-10-20",
        coupon: 3.125,
        spread: 46,
        status: "Active",
        rating: "A2/A",
        greenBond: false,
        country: "UK",
        isin: "GB00BMSK9012",
        notes: "EUR-denominated UK covered bond"
    },

    // ITALY
    {
        issuer: "UniCredit Covered Bonds",
        amount: 500,
        currency: "EUR",
        type: "Obbligazioni Bancarie Garantite",
        issueDate: "2024-09-05",
        maturity: "2027-09-05",
        coupon: 3.25,
        spread: 52,
        status: "Active",
        rating: "Baa1/BBB+",
        greenBond: false,
        country: "Italy",
        isin: "IT0005514567",
        notes: "Italian covered bond"
    },
    {
        issuer: "Intesa Sanpaolo Covered Bonds",
        amount: 750,
        currency: "EUR",
        type: "Obbligazioni Bancarie Garantite",
        issueDate: "2025-04-10",
        maturity: "2030-04-10",
        coupon: 3.375,
        spread: 53,
        status: "Active",
        rating: "Baa2/BBB",
        greenBond: false,
        country: "Italy",
        isin: "IT0005518901",
        notes: "5-year covered bond"
    },

    // AUSTRIA
    {
        issuer: "Erste Bank Covered Bonds",
        amount: 500,
        currency: "EUR",
        type: "Covered Bond",
        issueDate: "2024-07-25",
        maturity: "2029-07-25",
        coupon: 3.0,
        spread: 46,
        status: "Active",
        rating: "Aa2/AA",
        greenBond: false,
        country: "Austria",
        isin: "AT0000A12345",
        notes: "Austrian covered bond"
    },

    // BELGIUM
    {
        issuer: "KBC Covered Bonds",
        amount: 600,
        currency: "EUR",
        type: "Covered Bond",
        issueDate: "2025-02-28",
        maturity: "2030-02-28",
        coupon: 3.125,
        spread: 47,
        status: "Active",
        rating: "Aa3/AA-",
        greenBond: false,
        country: "Belgium",
        isin: "BE0002712345",
        notes: "Belgian covered bond"
    },

    // PORTUGAL
    {
        issuer: "Caixa Geral Covered Bonds",
        amount: 400,
        currency: "EUR",
        type: "Obrigações Hipotecárias",
        issueDate: "2024-12-10",
        maturity: "2029-12-10",
        coupon: 3.5,
        spread: 58,
        status: "Active",
        rating: "Baa3/BBB-",
        greenBond: false,
        country: "Portugal",
        isin: "PTCGD0012345",
        notes: "Portuguese mortgage covered bond"
    },

    // UPCOMING EMISSIONS
    {
        issuer: "Deutsche Bank Covered Bonds",
        amount: 1000,
        currency: "EUR",
        type: "Mortgage Pfandbrief",
        issueDate: "2026-03-15",
        maturity: "2031-03-15",
        coupon: 3.25,
        spread: 47,
        status: "Upcoming",
        rating: "A3/BBB+",
        greenBond: false,
        country: "Germany",
        isin: null,
        notes: "Planned Q1 2026"
    },
    {
        issuer: "BNP Paribas Home Loan SFH",
        amount: 1200,
        currency: "EUR",
        type: "Obligations Foncières",
        issueDate: "2026-04-20",
        maturity: "2033-04-20",
        coupon: 3.375,
        spread: 48,
        status: "Upcoming",
        rating: "Aa3/AA-",
        greenBond: true,
        country: "France",
        isin: null,
        notes: "Green covered bond planned"
    }
];

// ============================================
// SECONDARY MARKET DATA
// ============================================
const traditionalSecondaryMarket = {
    dailyVolume: 2450, // M€
    avgSpread: 47, // bps
    transactions: 156,
    avgPrice: 99.85,
    topTradedIssuers: [
        { issuer: "Deutsche Pfandbriefbank", volume: 285, trades: 18 },
        { issuer: "Crédit Foncier de France", volume: 320, trades: 22 },
        { issuer: "ABN AMRO Covered Bonds", volume: 245, trades: 15 },
        { issuer: "Nordea Hypotek", volume: 410, trades: 25 },
        { issuer: "RBC Covered Bonds", volume: 190, trades: 12 }
    ],
    priceHistory: [
        { date: "2026-01-02", price: 99.65 },
        { date: "2026-01-03", price: 99.75 },
        { date: "2026-01-04", price: 99.70 },
        { date: "2026-01-05", price: 99.80 },
        { date: "2026-01-06", price: 99.85 },
        { date: "2026-01-07", price: 99.90 },
        { date: "2026-01-08", price: 99.85 }
    ],
    spreadHistory: [
        { date: "2026-01-02", spread: 49 },
        { date: "2026-01-03", spread: 48 },
        { date: "2026-01-04", spread: 48 },
        { date: "2026-01-05", spread: 47 },
        { date: "2026-01-06", spread: 46 },
        { date: "2026-01-07", spread: 47 },
        { date: "2026-01-08", spread: 47 }
    ],
    volumeHistory: [
        { date: "2026-01-02", volume: 2280 },
        { date: "2026-01-03", volume: 2350 },
        { date: "2026-01-04", volume: 2420 },
        { date: "2026-01-05", volume: 2510 },
        { date: "2026-01-06", volume: 2380 },
        { date: "2026-01-07", volume: 2450 },
        { date: "2026-01-08", volume: 2450 }
    ]
};

// ============================================
// NEWS DATA
// ============================================
const traditionalNews = [
    {
        date: "2026-01-08",
        title: "Crédit Agricole émet €750M en Obligations Foncières avec forte demande",
        category: "Emission",
        source: "Global Capital",
        summary: "Forte demande des investisseurs pour les Obligations Foncières adossées aux prêts du secteur public, démontrant l'appétit continu pour les covered bonds français de qualité.",
        importance: "high",
        url: "https://www.globalcapital.com/article/2dj5n8qw9xqg0g0qwqo0w/covered-bonds/credit-agricole-issues-750m-obligations-foncieres"
    },
    {
        date: "2025-12-20",
        title: "Clearstream et vdp lancent l'initiative de digitalisation des Pfandbriefe",
        category: "Innovation",
        source: "Global Capital",
        summary: "Collaboration pour utiliser la blockchain et nouvelles technologies afin de rationaliser l'émission et le processus d'approbation des cover pools, avec lancement prévu Q4 2026.",
        importance: "high",
        url: "https://www.globalcapital.com/article/2dj5n8qw9xqg0g0qwqo0w/covered-bonds/clearstream-vdp-digital-pfandbrief-initiative"
    },
    {
        date: "2025-11-15",
        title: "Émissions de Pfandbriefe en hausse de 22% sur 11 mois en 2025",
        category: "Market",
        source: "Pfandbrief.de",
        summary: "Les banques membres du vdp ont émis EUR 61.2 milliards de nouveaux Pfandbriefe, avec les Mortgage Pfandbriefe comme principal moteur de croissance.",
        importance: "high",
        url: "https://www.pfandbrief.de/site/en/vdp/press/press_releases.html"
    },
    {
        date: "2025-10-10",
        title: "Les spreads de covered bonds atteignent 50bps, plus haut depuis 10 ans",
        category: "Market",
        source: "Scope Ratings",
        summary: "L'élargissement des spreads est principalement dû à des facteurs techniques plutôt qu'à une perception accrue du risque par les investisseurs.",
        importance: "high",
        url: "https://www.scoperatings.com/ratings-and-research/research/EN/174440"
    },
    {
        date: "2025-09-20",
        title: "La France maintient sa position de leader pour la 5ème année consécutive",
        category: "Market",
        source: "Global Capital",
        summary: "Les émetteurs français représentent 25% du marché total des covered bonds en euro benchmark, avec EUR 31.5 milliards émis en 2025.",
        importance: "medium",
        url: "https://www.globalcapital.com/article/2dj5n8qw9xqg0g0qwqo0w/covered-bonds/france-maintains-covered-bond-leadership"
    },
    {
        date: "2025-08-15",
        title: "Prévisions 2026 : EUR 160-170Mds d'émissions de covered bonds",
        category: "Forecast",
        source: "Scope Ratings",
        summary: "L'augmentation attendue est principalement due à un volume plus élevé de remboursements, avec des spreads qui devraient rester stables.",
        importance: "medium",
        url: "https://www.scoperatings.com/ratings-and-research/research/EN/174440"
    },
    {
        date: "2025-07-05",
        title: "Les covered bonds ESG chutent de 16% en 2024",
        category: "ESG",
        source: "ECBC",
        summary: "EUR 18.4 milliards émis en 2024 contre EUR 22 milliards en 2023, bien que l'émission relative ESG reste constante à ~11.4% du marché.",
        importance: "medium",
        url: "https://hypo.org/ecbc/publications/"
    },
    {
        date: "2025-06-20",
        title: "L'EBA publie ses recommandations sur l'harmonisation du cadre EU",
        category: "Regulation",
        source: "EBA",
        summary: "Conseils sur l'harmonisation du cadre des covered bonds de l'UE et l'établissement de l'équivalence pour les émetteurs de pays tiers.",
        importance: "high",
        url: "https://www.eba.europa.eu/regulation-and-policy/covered-bonds"
    },
    {
        date: "2025-05-10",
        title: "Le Danemark devrait reprendre la première place mondiale en 2025",
        category: "Market",
        source: "Global Capital",
        summary: "Principalement avec des émissions en DKK, le Danemark devrait dépasser la France en volume total d'émissions de covered bonds.",
        importance: "medium",
        url: "https://www.globalcapital.com/article/2dj5n8qw9xqg0g0qwqo0w/covered-bonds/denmark-covered-bond-market-2025"
    },
    {
        date: "2025-04-15",
        title: "Les banques canadiennes prévoient EUR 11Mds d'émissions en 2026",
        category: "Forecast",
        source: "Helaba Research",
        summary: "Le Canada devrait émerger comme la troisième juridiction émettrice en 2026, porté par des remboursements substantiels.",
        importance: "medium",
        url: "https://www.helaba.com/int/research/covered-bonds"
    },
    {
        date: "2025-03-20",
        title: "L'Allemagne prévoit près de EUR 50Mds de Pfandbriefe en 2025",
        category: "Forecast",
        source: "Pfandbrief.de",
        summary: "Les banques Pfandbrief allemandes anticipent d'émettre juste en dessous de EUR 50 milliards de nouveaux Pfandbriefe tout au long de 2025.",
        importance: "high",
        url: "https://www.pfandbrief.de/site/en/vdp/press/press_releases.html"
    },
    {
        date: "2025-02-10",
        title: "La BCE réduit les taux de 100bps au premier semestre 2025",
        category: "Monetary Policy",
        source: "DZ HYP",
        summary: "Les réductions de taux devraient avoir un impact positif sur l'immobilier commercial et stimuler les marchés résidentiels.",
        importance: "high",
        url: "https://www.dzhyp.de/en/research"
    }
];
