document.addEventListener('DOMContentLoaded', () => {
    const langToggleBtn = document.getElementById('lang-toggle-btn');
    const langSelect = document.getElementById('lang-select'); // Assuming a select dropdown for language
    let translations = {}; // To store loaded translations

    // Function to set the language
    async function setLanguage(lang) {
        try {
            const response = await fetch(`mode-language/translations/${lang}.json`);
            translations = await response.json();
            applyTranslations();
            localStorage.setItem('language', lang);
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    }

    // Function to apply translations to the DOM
    function applyTranslations() {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[key]) {
                element.textContent = translations[key];
            }
        });

        // Handle placeholders
        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            if (translations[key]) {
                element.placeholder = translations[key];
            }
        });

        // Handle specific cases like hero title with span
        const heroTitlePart1 = document.querySelector('[data-translate="hero_title_part1"]');
        const heroTitlePart2 = document.getElementById('typing-text');
        if (heroTitlePart1 && heroTitlePart2) {
            heroTitlePart1.textContent = translations['hero_title_part1'];
            heroTitlePart2.textContent = translations['hero_title_part2'];
        }

        // Handle app title
        const appTitle = document.querySelector('title');
        if (appTitle && translations['app_title']) {
            appTitle.textContent = translations['app_title'];
        }
    }

    // Event listener for language change (if using a select dropdown)
    if (langSelect) {
        langSelect.addEventListener('change', (event) => {
            setLanguage(event.target.value);
        });
    }

    // Event listener for language toggle button (if using a button to switch between two languages)
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            const currentLang = localStorage.getItem('language') || 'es';
            const newLang = currentLang === 'es' ? 'en' : 'es';
            setLanguage(newLang);
            // Update button text/icon if needed
            langToggleBtn.textContent = newLang.toUpperCase(); // Example: show "EN" or "ES"
        });
    }

    // Load saved language or default to Spanish
    const savedLanguage = localStorage.getItem('language') || 'es';
    if (langSelect) {
        langSelect.value = savedLanguage;
    }
    setLanguage(savedLanguage);
});