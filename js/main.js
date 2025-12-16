// ==========================================
// NETFLIX CLONE - MAIN APPLICATION
// ==========================================

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    Header.init();
    Hero.init();
    Cards.init();
    Modal.init();
    
    // Update card states based on user preferences
    Cards.updateCardStates();
    
    console.log('Netflix Clone initialized successfully!');
});

// Header functionality
const Header = {
    header: null,
    searchBtn: null,
    searchInput: null,
    searchBox: null,
    isSearchOpen: false,
    lastScrollTop: 0,

    init: function() {
        this.header = document.getElementById('header');
        this.searchBtn = document.getElementById('searchBtn');
        this.searchInput = document.getElementById('searchInput');
        this.searchBox = document.querySelector('.search-box');
        
        if (!this.header) return;

        this.setupEventListeners();
        this.setupScrollBehavior();
    },

    setupEventListeners: function() {
        // Search toggle
        if (this.searchBtn && this.searchInput) {
            this.searchBtn.addEventListener('click', () => this.toggleSearch());
            
            // Close search when clicking outside
            document.addEventListener('click', (e) => {
                if (this.isSearchOpen && !this.searchBox.contains(e.target)) {
                    this.closeSearch();
                }
            });

            // Search input
            this.searchInput.addEventListener('input', Utils.debounce((e) => {
                this.handleSearch(e.target.value);
            }, 300));

            // Close search on escape
            this.searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeSearch();
                }
            });
        }

        // Profile menu
        const profileToggle = document.querySelector('.profile-toggle');
        const profileDropdown = document.querySelector('.profile-dropdown');
        
        if (profileToggle && profileDropdown) {
            profileToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                profileDropdown.classList.toggle('show');
            });

            document.addEventListener('click', () => {
                profileDropdown.classList.remove('show');
            });
        }

        // Browse dropdown
        const browseItem = document.querySelector('.browse-item');
        if (browseItem) {
            browseItem.addEventListener('mouseenter', () => {
                const dropdown = browseItem.querySelector('.browse-dropdown');
                if (dropdown) dropdown.classList.add('show');
            });

            browseItem.addEventListener('mouseleave', () => {
                const dropdown = browseItem.querySelector('.browse-dropdown');
                if (dropdown) dropdown.classList.remove('show');
            });
        }

        // Notification button
        const notificationBtn = document.getElementById('notificationBtn');
        if (notificationBtn) {
            notificationBtn.addEventListener('click', () => {
                Utils.showNotification('No new notifications', 'info');
            });
        }
    },

    setupScrollBehavior: function() {
        window.addEventListener('scroll', Utils.throttle(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Add background to header when scrolled
            if (scrollTop > 50) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }

            // Hide header on scroll down, show on scroll up
            if (scrollTop > this.lastScrollTop && scrollTop > 100) {
                this.header.style.transform = 'translateY(-100%)';
            } else {
                this.header.style.transform = 'translateY(0)';
            }

            // Update active nav link based on scroll position
            this.updateActiveNavLink(scrollTop);

            this.lastScrollTop = scrollTop;
        }, 100));
    },

    updateActiveNavLink: function(scrollTop) {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        let currentSection = 'home';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    },

    toggleSearch: function() {
        if (this.isSearchOpen) {
            this.closeSearch();
        } else {
            this.openSearch();
        }
    },

    openSearch: function() {
        this.isSearchOpen = true;
        this.searchInput.classList.add('active');
        this.searchInput.focus();
    },

    closeSearch: function() {
        this.isSearchOpen = false;
        this.searchInput.classList.remove('active');
        this.searchInput.value = '';
    },

    handleSearch: function(query) {
        if (!query || query.length < 2) return;

        // Simple search across all content
        const allContent = Object.values(CONFIG.content).flat();
        const results = allContent.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase()) ||
            item.genres.toLowerCase().includes(query.toLowerCase()) ||
            item.cast.toLowerCase().includes(query.toLowerCase())
        );

        console.log('Search results:', results);
        
        if (results.length > 0) {
            Utils.showNotification(`Found ${results.length} result${results.length > 1 ? 's' : ''}`, 'success');
        } else {
            Utils.showNotification('No results found', 'info');
        }
        
        // In a real app, would display results in a dropdown or results page
    }
};

// Window resize handler
window.addEventListener('resize', Utils.debounce(() => {
    // Update sliders on resize
    if (Cards.sliders) {
        Object.values(Cards.sliders).forEach(slider => {
            Cards.updateNavigationButtons(slider.container, slider.track);
        });
    }
}, 250));

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause videos when page is hidden
        console.log('Page hidden');
    } else {
        // Resume when page is visible
        console.log('Page visible');
    }
});

// Log errors
window.addEventListener('error', (e) => {
    console.error('Application error:', e.message);
});

// Service worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker code would go here
        // navigator.serviceWorker.register('/sw.js');
    });
}
