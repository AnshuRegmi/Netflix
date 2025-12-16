// ==========================================
// NETFLIX CLONE - HERO SECTION
// ==========================================

const Hero = {
    video: null,
    muteBtn: null,
    player: null,
    isMuted: true,
    trailerPopup: null,
    trailerPlayer: null,

    init: function() {
        this.video = document.getElementById('heroVideo');
        this.muteBtn = document.getElementById('muteBtn');
        
        this.createTrailerPopup();
        this.setupEventListeners();
        this.loadYouTubeAPI();
    },

    loadYouTubeAPI: function() {
        // Load YouTube IFrame API
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
        
        // Initialize player when API is ready
        window.onYouTubeIframeAPIReady = () => {
            this.initYouTubePlayer();
        };
        
        // If API already loaded
        if (window.YT && window.YT.Player) {
            this.initYouTubePlayer();
        }
    },

    initYouTubePlayer: function() {
        // Replace iframe with YouTube player for mute control
        const iframe = document.getElementById('heroVideo');
        if (iframe && window.YT && window.YT.Player) {
            this.player = new YT.Player('heroVideo', {
                events: {
                    'onReady': (event) => {
                        event.target.mute();
                        event.target.playVideo();
                    }
                }
            });
        }
    },

    createTrailerPopup: function() {
        // Create trailer popup modal
        const popup = document.createElement('div');
        popup.id = 'trailerPopup';
        popup.className = 'trailer-popup';
        popup.innerHTML = `
            <div class="trailer-popup-backdrop"></div>
            <div class="trailer-popup-content">
                <button class="trailer-popup-close" aria-label="Close">
                    <i class="fas fa-times"></i>
                </button>
                <div class="trailer-popup-video">
                    <div id="trailerPopupPlayer"></div>
                </div>
            </div>
        `;
        document.body.appendChild(popup);
        this.trailerPopup = popup;
        
        // Close on backdrop click
        popup.querySelector('.trailer-popup-backdrop').addEventListener('click', () => {
            this.closeTrailerPopup();
        });
        
        // Close on button click
        popup.querySelector('.trailer-popup-close').addEventListener('click', () => {
            this.closeTrailerPopup();
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.trailerPopup.classList.contains('active')) {
                this.closeTrailerPopup();
            }
        });
    },

    openTrailerPopup: function(videoId) {
        this.trailerPopup.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Create iframe for trailer
        const container = document.getElementById('trailerPopupPlayer');
        container.innerHTML = `
            <iframe
                src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1"
                title="Trailer"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
        `;
    },

    closeTrailerPopup: function() {
        this.trailerPopup.classList.remove('active');
        document.body.style.overflow = '';
        
        // Stop video
        const container = document.getElementById('trailerPopupPlayer');
        container.innerHTML = '';
    },

    setupEventListeners: function() {
        // Mute/Unmute button
        if (this.muteBtn) {
            this.muteBtn.addEventListener('click', () => this.toggleMute());
        }

        // Play button - open trailer popup
        const playBtn = document.getElementById('playBtn');
        if (playBtn) {
            playBtn.addEventListener('click', () => {
                // Stranger Things trailer ID
                this.openTrailerPopup('b9EkMc79ZSU');
            });
        }

        // More Info button - open modal with Stranger Things data
        const moreInfoBtn = document.getElementById('moreInfoBtn');
        if (moreInfoBtn) {
            moreInfoBtn.addEventListener('click', () => {
                // Stranger Things data
                const strangerThings = {
                    id: 'stranger-things',
                    title: 'Stranger Things',
                    image: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
                    trailer: 'b9EkMc79ZSU',
                    year: 2016,
                    rating: 'TV-14',
                    duration: '4 Seasons',
                    match: 98,
                    description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.',
                    cast: 'Millie Bobby Brown, Finn Wolfhard, Winona Ryder, David Harbour',
                    genres: 'Sci-Fi, Horror, Drama',
                    tags: 'Suspenseful, Scary, 80s Nostalgia'
                };
                Modal.open(strangerThings);
            });
        }

        // Auto-hide hero controls on scroll
        window.addEventListener('scroll', Utils.throttle(() => {
            this.handleScroll();
        }, 100));
    },

    toggleMute: function() {
        this.isMuted = !this.isMuted;
        
        // Update button icon
        const icon = this.muteBtn.querySelector('i');
        
        if (this.isMuted) {
            icon.classList.remove('fa-volume-up');
            icon.classList.add('fa-volume-mute');
            // Mute YouTube player
            if (this.player && this.player.mute) {
                this.player.mute();
            }
        } else {
            icon.classList.remove('fa-volume-mute');
            icon.classList.add('fa-volume-up');
            // Unmute YouTube player
            if (this.player && this.player.unMute) {
                this.player.unMute();
                this.player.setVolume(50);
            }
        }
    },

    handleScroll: function() {
        const scrollPosition = window.scrollY;
        const heroControls = document.querySelector('.hero-controls');
        
        if (!heroControls) return;

        // Fade out controls when scrolling down
        if (scrollPosition > 300) {
            heroControls.style.opacity = '0';
            heroControls.style.pointerEvents = 'none';
        } else {
            const opacity = 1 - (scrollPosition / 300);
            heroControls.style.opacity = opacity.toString();
            heroControls.style.pointerEvents = 'auto';
        }
    }
};
