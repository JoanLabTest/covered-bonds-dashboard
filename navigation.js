// ============================================
// NAVIGATION MANAGER
// Handles switching between Digital and Traditional sections
// ============================================

// ============================================
// STATE
// ============================================
let currentMainSection = 'digital'; // 'digital' or 'traditional'

// ============================================
// INITIALIZATION
// ============================================
window.addEventListener('load', () => {
    // Small delay to ensure all scripts are fully loaded
    setTimeout(() => {
        initializeNavigation();
    }, 100);
});

function initializeNavigation() {
    // Main section navigation (Digital vs Traditional)
    const mainTabBtns = document.querySelectorAll('.main-tab-btn');
    mainTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.getAttribute('data-section');
            switchMainSection(section);
        });
    });

    // Secondary navigation (Primary/Secondary/News) for Digital section
    const digitalTabBtns = document.querySelectorAll('#digitalBondsSection .tab-btn');
    digitalTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.getAttribute('data-view');
            switchDigitalView(view);
        });
    });

    // Secondary navigation for Traditional section
    const traditionalTabBtns = document.querySelectorAll('#traditionalBondsSection .tab-btn');
    traditionalTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.getAttribute('data-view');
            switchTraditionalView(view);
        });
    });

    // Filter buttons for Digital section
    const digitalApplyBtn = document.getElementById('applyFilters');
    if (digitalApplyBtn) {
        digitalApplyBtn.addEventListener('click', applyFilters);
    }

    const digitalResetBtn = document.getElementById('resetFilters');
    if (digitalResetBtn) {
        digitalResetBtn.addEventListener('click', resetFilters);
    }

    const digitalExportBtn = document.getElementById('exportData');
    if (digitalExportBtn) {
        digitalExportBtn.addEventListener('click', exportDataToCSV);
    }

    // Filter buttons for Traditional section
    const traditionalApplyBtn = document.getElementById('applyTraditionalFilters');
    if (traditionalApplyBtn) {
        traditionalApplyBtn.addEventListener('click', applyTraditionalFilters);
    }

    const traditionalResetBtn = document.getElementById('resetTraditionalFilters');
    if (traditionalResetBtn) {
        traditionalResetBtn.addEventListener('click', resetTraditionalFilters);
    }

    const traditionalExportBtn = document.getElementById('exportTraditionalData');
    if (traditionalExportBtn) {
        traditionalExportBtn.addEventListener('click', exportTraditionalDataToCSV);
    }

    // Initialize both sections
    console.log('[NAVIGATION] Initializing sections...');

    if (typeof initializeApp === 'function') {
        console.log('[NAVIGATION] Calling initializeApp() for Digital section');
        initializeApp(); // Digital section
    } else {
        console.warn('[NAVIGATION] initializeApp not found');
    }

    if (typeof traditionalBondsData !== 'undefined') {
        console.log(`[NAVIGATION] traditionalBondsData found with ${traditionalBondsData.length} emissions`);
    } else {
        console.error('[NAVIGATION] traditionalBondsData NOT found!');
    }

    // Try to initialize traditional section (Inline or External)
    if (typeof initializeTraditionalSectionInline === 'function') {
        console.log('[NAVIGATION] Calling initializeTraditionalSectionInline()');
        initializeTraditionalSectionInline();
    } else if (typeof initializeTraditionalSection === 'function') {
        console.log('[NAVIGATION] Calling initializeTraditionalSection()');
        initializeTraditionalSection();
    } else {
        console.error('[NAVIGATION] No initialization function found for Traditional section');
    }

    console.log('[NAVIGATION] Initialization complete');
}

// Global function to force re-initialization (for debugging)
window.forceInitTraditional = function () {
    console.log('[DEBUG] Force initializing traditional section...');
    if (typeof initializeTraditionalSection === 'function') {
        initializeTraditionalSection();
        console.log('[DEBUG] Done! Check the Traditional section now.');
    } else {
        console.error('[DEBUG] initializeTraditionalSection function not found!');
    }
};

// ============================================
// MAIN SECTION SWITCHING
// ============================================
function switchMainSection(section) {
    if (section === currentMainSection) return;

    currentMainSection = section;

    // Update tab buttons
    document.querySelectorAll('.main-tab-btn').forEach(btn => {
        if (btn.getAttribute('data-section') === section) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update sections visibility
    const digitalSection = document.getElementById('digitalBondsSection');
    const traditionalSection = document.getElementById('traditionalBondsSection');

    if (section === 'digital') {
        if (digitalSection) {
            digitalSection.classList.add('active');
            digitalSection.classList.remove('hidden');
        }
        if (traditionalSection) {
            traditionalSection.classList.remove('active');
            traditionalSection.classList.add('hidden');
        }
    } else {
        if (digitalSection) {
            digitalSection.classList.remove('active');
            digitalSection.classList.add('hidden');
        }
        if (traditionalSection) {
            traditionalSection.classList.add('active');
            traditionalSection.classList.remove('hidden');
        }
    }

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// DIGITAL SECTION VIEW SWITCHING
// ============================================
function switchDigitalView(view) {
    currentView = view;

    // Update tab buttons
    document.querySelectorAll('#digitalBondsSection .tab-btn').forEach(btn => {
        if (btn.getAttribute('data-view') === view) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update sections visibility
    const primarySection = document.getElementById('primaryMarketSection');
    const secondarySection = document.getElementById('secondaryMarketSection');
    const newsSection = document.getElementById('newsSection');

    if (primarySection) primarySection.classList.add('hidden');
    if (secondarySection) secondarySection.classList.add('hidden');
    if (newsSection) newsSection.classList.add('hidden');

    if (view === 'primary' && primarySection) {
        primarySection.classList.remove('hidden');
    } else if (view === 'secondary' && secondarySection) {
        secondarySection.classList.remove('hidden');
    } else if (view === 'news' && newsSection) {
        newsSection.classList.remove('hidden');
    }
}

// ============================================
// TRADITIONAL SECTION VIEW SWITCHING
// ============================================
function switchTraditionalView(view) {
    traditionalCurrentView = view;

    // Update tab buttons
    document.querySelectorAll('#traditionalBondsSection .tab-btn').forEach(btn => {
        if (btn.getAttribute('data-view') === view) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update sections visibility
    const primarySection = document.getElementById('traditionalPrimaryMarketSection');
    const secondarySection = document.getElementById('traditionalSecondaryMarketSection');
    const newsSection = document.getElementById('traditionalNewsSection');

    if (primarySection) primarySection.classList.add('hidden');
    if (secondarySection) secondarySection.classList.add('hidden');
    if (newsSection) newsSection.classList.add('hidden');

    if (view === 'primary' && primarySection) {
        primarySection.classList.remove('hidden');
    } else if (view === 'secondary' && secondarySection) {
        secondarySection.classList.remove('hidden');
    } else if (view === 'news' && newsSection) {
        newsSection.classList.remove('hidden');
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function exportDataToCSV() {
    const headers = ['Émetteur', 'Montant', 'Devise', 'Blockchain', 'Plateforme', 'Date Émission', 'Maturité', 'Coupon', 'Rating', 'ISIN', 'Statut'];
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
    link.setAttribute('download', `covered_bonds_digital_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
