// EliteZone Configuration Logic
const defaultSettings = {
    profileName: "Md Naushad",
    profileEmail: "admin@elitezone.com",
    avatarChar: "EZ",
    themeColor: "linear-gradient(135deg, #D4AF37, #F6E27A, #C9A227)",
    darkMode: true,
    cardAnimations: true,
    compactMode: false,
    showShopping: true,
    showMovies: true,
    showGames: true,
    showFashion: true,
    searchEngine: "EliteZone Local Card Search",
    showWelcomeBanner: true,
    rememberSidebar: true,
    sidebarCollapsed: false
};

// Load or Initialize Settings
let userSettings = JSON.parse(localStorage.getItem('elitezone_settings'));
if (!userSettings) {
    userSettings = { ...defaultSettings };
} else if ((userSettings.themeColor || '').toLowerCase().includes('#c9db62') || (userSettings.themeColor || '').includes('201, 219, 98')) {
    userSettings.themeColor = defaultSettings.themeColor;
    localStorage.setItem('elitezone_settings', JSON.stringify(userSettings));
}

function saveSettings() {
    localStorage.setItem('elitezone_settings', JSON.stringify(userSettings));
}

function applySettings() {
    const isGoldTheme = userSettings.themeColor.toLowerCase().includes('#d4af37');
    let styleEl = document.getElementById('dynamic-elite-styles');
    if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'dynamic-elite-styles';
        document.head.appendChild(styleEl);
    }

    let cssRules = `
        :root {
            --accent: ${userSettings.themeColor};
        }
        .menu a:hover, .menu a.active {
            background: var(--accent) !important;
            color: black !important;
        }
        input:checked + .slider {
            background: var(--accent) !important;
        }
        .btn-primary {
            background: var(--accent) !important;
        }
        .avatar {
            border-color: ${isGoldTheme ? '#D4AF37' : userSettings.themeColor} !important;
            color: ${isGoldTheme ? '#D4AF37' : userSettings.themeColor} !important;
        }
        .logo {
            background: ${isGoldTheme ? 'linear-gradient(135deg, #D4AF37, #F6E27A, #C9A227)' : userSettings.themeColor} !important;
            -webkit-background-clip: ${isGoldTheme ? 'initial' : 'text'} !important;
            color: ${isGoldTheme ? 'black' : 'transparent'} !important;
        }
    `;

    // Dark Mode Logic
    if (!userSettings.darkMode) {
        cssRules += `
            body {
                background: linear-gradient(135deg, #e0e0e0, #ffffff) !important;
                color: #222 !important;
            }
            .sidebar {
                background: linear-gradient(135deg, #f5f5f5, #e8e8e8) !important;
                border-right: 1px solid rgba(0,0,0,0.1) !important;
            }
            .menu a { color: #333 !important; }
            .topbar { background: rgba(255,255,255,0.85) !important; color: #111 !important; border-bottom-color: rgba(0,0,0,0.1) !important; }
            .card, .settings-card {
                background: rgba(255, 255, 255, 0.9) !important;
                color: #222 !important;
                box-shadow: 0 4px 15px rgba(0,0,0,0.05) !important;
                border-color: rgba(0,0,0,0.1) !important;
            }
            .card p { color: #555 !important; }
            .card h4 { color: #0056b3 !important; }
            .settings-card h3 { color: ${userSettings.themeColor.includes('linear') ? '#b58500' : 'var(--accent)'} !important; border-bottom-color: rgba(0,0,0,0.1) !important;}
            .form-group label { color: #444 !important; }
            .form-control { background: #fff !important; color: #000 !important; border: 1px solid #ccc !important; }
            .toggle-info h4 { color: #222 !important; }
            .toggle-info p { color: #666 !important; }
            .search-input { background: #fff !important; color: #111 !important; border: 1px solid #ccc !important; }
            .page-header h1 { color: #111 !important; text-shadow: none !important; border-bottom-color: rgba(0,0,0,0.1) !important; }
            .page-header p { color: #666 !important; }
        `;
    }

    // Card Animations
    if (!userSettings.cardAnimations) {
        cssRules += `
            .card:hover { transform: none !important; box-shadow: none !important; }
            .settings-card:hover { transform: none !important; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important; }
        `;
    }

    // Compact Mode
    if (userSettings.compactMode) {
        cssRules += `
            .content { padding: 15px !important; }
            .cards { gap: 10px !important; }
            .card { padding: 10px !important; }
            .card-image { height: 130px !important; margin-bottom: 8px !important; }
            .card h3 { font-size: 16px !important; margin-bottom: 4px !important; }
            .card h4 { font-size: 13px !important; margin-bottom: 4px !important; }
            .btn { margin-top: 5px !important; padding: 6px 15px !important; }
        `;
    }

    styleEl.innerHTML = cssRules;

    // Apply Profile data
    const nameInputs = document.querySelectorAll('#set-name');
    if (nameInputs.length) nameInputs[0].value = userSettings.profileName;

    // Update Topbar Avatar Initial
    const avatars = document.querySelectorAll('.avatar');
    avatars.forEach(av => av.textContent = userSettings.avatarChar);

    // Sidebar State Memory
    if (userSettings.rememberSidebar) {
        const sidebar = document.getElementById("sidebar");
        const main = document.getElementById("main");
        if (sidebar && main && userSettings.sidebarCollapsed && window.innerWidth > 768) {
            sidebar.classList.add('collapsed');
            main.classList.add('full');
        }
    }
}

function initSettingsPage() {
    if (!document.querySelector('.settings-grid')) return;

    document.getElementById('set-name').value = userSettings.profileName;
    document.getElementById('set-email').value = userSettings.profileEmail;
    document.getElementById('set-engine').value = userSettings.searchEngine;

    document.getElementById('tog-dark').checked = userSettings.darkMode;
    document.getElementById('tog-anim').checked = userSettings.cardAnimations;
    document.getElementById('tog-compact').checked = userSettings.compactMode;
    document.getElementById('tog-shop').checked = userSettings.showShopping;
    document.getElementById('tog-movies').checked = userSettings.showMovies;
    document.getElementById('tog-games').checked = userSettings.showGames;
    document.getElementById('tog-fashion').checked = userSettings.showFashion;
    document.getElementById('tog-banner').checked = userSettings.showWelcomeBanner;
    document.getElementById('tog-sidebar').checked = userSettings.rememberSidebar;

    const colors = document.querySelectorAll('.color-circle');
    colors.forEach(c => {
        if (c.style.background.replace(/\s+/g, '').includes(userSettings.themeColor.replace(/\s+/g, ''))) {
            colors.forEach(x => x.classList.remove('active'));
            c.classList.add('active');
        }
        c.addEventListener('click', (e) => {
            colors.forEach(x => x.classList.remove('active'));
            e.target.classList.add('active');
            userSettings.themeColor = e.target.style.background;
            saveSettings();
            applySettings();
        });
    });

    document.getElementById('btn-save-profile').addEventListener('click', () => {
        userSettings.profileName = document.getElementById('set-name').value;
        userSettings.profileEmail = document.getElementById('set-email').value;
        let initials = userSettings.profileName.match(/\b\w/g) || [];
        userSettings.avatarChar = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase() || 'U';
        saveSettings();
        applySettings();
        alert('Profile saved!');
    });

    const bindToggle = (id, key) => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('change', (e) => {
                userSettings[key] = e.target.checked;
                saveSettings();
                applySettings();
            });
        }
    };

    bindToggle('tog-dark', 'darkMode');
    bindToggle('tog-anim', 'cardAnimations');
    bindToggle('tog-compact', 'compactMode');
    bindToggle('tog-shop', 'showShopping');
    bindToggle('tog-movies', 'showMovies');
    bindToggle('tog-games', 'showGames');
    bindToggle('tog-fashion', 'showFashion');
    bindToggle('tog-banner', 'showWelcomeBanner');
    bindToggle('tog-sidebar', 'rememberSidebar');

    const engineSelect = document.getElementById('set-engine');
    engineSelect.addEventListener('change', (e) => {
        userSettings.searchEngine = e.target.value;
        saveSettings();
    });
}

function initMenuPage() {
    if (!document.querySelector('.cards')) return;

    // Welcome Banner Hide Logic
    const welcomePanel = document.querySelector('.welcome-panel');
    if (welcomePanel && !userSettings.showWelcomeBanner) {
        welcomePanel.style.display = 'none';
        const pTags = document.querySelectorAll('.content p');
        if (pTags.length && pTags[0].innerText.includes('all-in-one')) pTags[0].style.display = 'none';
    }

    // Filter cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        let text = card.textContent.toLowerCase();
        if (!userSettings.showShopping && (text.includes('shopping') || text.includes('amazon') || text.includes('flipkart') || text.includes('myntra'))) {
            card.style.display = 'none';
        } else if (!userSettings.showMovies && (text.includes('movie') || text.includes('vegamovies'))) {
            card.style.display = 'none';
        } else if (!userSettings.showGames && (text.includes('game') || text.includes('poki') || text.includes('fitgirl'))) {
            card.style.display = 'none';
        } else if (!userSettings.showFashion && (text.includes('sneaker') || text.includes('cloths') || text.includes('bewakoof') || text.includes('max fashion'))) {
            card.style.display = 'none';
        } else {
            card.style.display = '';
        }
    });

    // Custom Search
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        const newSearchInput = searchInput.cloneNode(true);
        searchInput.parentNode.replaceChild(newSearchInput, searchInput);

        if (userSettings.searchEngine.includes("Google") || userSettings.searchEngine.includes("Bing") || userSettings.searchEngine.includes("DuckDuckGo")) {
            newSearchInput.placeholder = "Press Enter to web search...";
        }

        newSearchInput.addEventListener("keydown", function (e) {
            if (e.key === 'Enter') {
                let q = newSearchInput.value;
                if (userSettings.searchEngine.includes("Google")) window.open("https://www.google.com/search?q=" + q, "_blank");
                else if (userSettings.searchEngine.includes("Bing")) window.open("https://www.bing.com/search?q=" + q, "_blank");
                else if (userSettings.searchEngine.includes("DuckDuckGo")) window.open("https://duckduckgo.com/?q=" + q, "_blank");
            }
        });

        newSearchInput.addEventListener("input", function () {
            if (!userSettings.searchEngine.toLowerCase().includes("local")) return;

            let filter = newSearchInput.value.toLowerCase();
            let p_cards = document.querySelectorAll(".card");
            p_cards.forEach(card => {
                let textValue = card.textContent || card.innerText;
                if (textValue.toLowerCase().indexOf(filter) > -1) {
                    let t = textValue.toLowerCase();
                    let isShopping = t.includes('shopping') || t.includes('amazon') || t.includes('flipkart') || t.includes('myntra');
                    let isMovie = t.includes('movie') || t.includes('vegamovies');
                    let isGame = t.includes('game') || t.includes('fitgirl') || t.includes('poki');
                    let isFashion = t.includes('sneaker') || t.includes('cloths') || t.includes('max');

                    if (!userSettings.showShopping && isShopping) return;
                    if (!userSettings.showMovies && isMovie) return;
                    if (!userSettings.showGames && isGame) return;
                    if (!userSettings.showFashion && isFashion) return;

                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }
}

// ✅ FIXED: toggleMenu now handles mobile overlay open/close correctly
window.toggleMenu = function () {
    const sidebar = document.getElementById("sidebar");
    const main = document.getElementById("main");
    const overlay = document.getElementById("sidebarOverlay");
    if (!sidebar || !main) return;

    if (window.innerWidth <= 768) {
        // Mobile: toggle active class on sidebar + show/hide overlay
        const isOpen = sidebar.classList.contains("active");
        if (isOpen) {
            sidebar.classList.remove("active");
            if (overlay) overlay.classList.remove("active");
        } else {
            sidebar.classList.add("active");
            if (overlay) overlay.classList.add("active");
        }
    } else {
        // Desktop: collapse/expand with memory
        sidebar.classList.toggle("collapsed");
        main.classList.toggle("full");
        if (userSettings.rememberSidebar) {
            userSettings.sidebarCollapsed = sidebar.classList.contains("collapsed");
            saveSettings();
        }
    }
}

window.clearAppCache = function () {
    if (confirm('Are you sure you want to clear all browser cache and local stored data?')) {
        localStorage.removeItem('elitezone_settings');
        alert('Data cleared! Reloading...');
        window.location.reload();
    }
}

window.resetAppDefaults = function () {
    if (confirm('This will reset all your theme colors, toggles, and preferences back to default. Continue?')) {
        localStorage.setItem('elitezone_settings', JSON.stringify(defaultSettings));
        alert('Settings wiped! Reloading...');
        window.location.reload();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    applySettings();
    initSettingsPage();
    initMenuPage();
});
