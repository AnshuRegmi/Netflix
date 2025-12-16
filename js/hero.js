// ==========================================
// NETFLIX CLONE - HERO SECTION
// ==========================================

const Hero = {
    video: null,
    muteBtn: null,
    isMuted: true,

    init: function() {
        this.video = document.getElementById('heroVideo');
        this.muteBtn = document.getElementById('muteBtn');
        
        if (!this.video || !this.muteBtn) return;

        this.setupEventListeners();
        this.autoplayVideo();
    },

    setupEventListeners: function() {
        // Mute/Unmute button
        this.muteBtn.addEventListener('click', () => this.toggleMute());

        // Play button - scroll to first content row
        const playBtn = document.getElementById('playBtn');
        if (playBtn) {
            playBtn.addEventListener('click', () => {
                // In a real app, this would start playback
                Utils.showNotification('Playing Stranger Things...', 'success');
            });
        }

        // More Info button - open modal
        const moreInfoBtn = document.getElementById('moreInfoBtn');
        if (moreInfoBtn) {
            moreInfoBtn.addEventListener('click', () => {
                // Find Stranger Things data (id: 7 from config)
                const strangerThings = Utils.findContentById(7);
                if (strangerThings) {
                    Modal.open(strangerThings);
                }
            });
        }

        // Auto-hide hero controls on scroll
        window.addEventListener('scroll', Utils.throttle(() => {
            this.handleScroll();
        }, 100));
    },

    autoplayVideo: function() {
        // YouTube iframe will autoplay based on URL parameters
        // No additional action needed for iframe
    },

    toggleMute: function() {
        this.isMuted = !this.isMuted;
        
        // Update button icon
        const icon = this.muteBtn.querySelector('i');
        if (this.isMuted) {
            icon.classList.remove('fa-volume-up');
            icon.classList.add('fa-volume-mute');
            // For YouTube iframe, we'd need to use YouTube IFrame API
            // For now, URL is set to mute=1 by default
        } else {
            icon.classList.remove('fa-volume-mute');
            icon.classList.add('fa-volume-up');
            // Would unmute via YouTube API
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
