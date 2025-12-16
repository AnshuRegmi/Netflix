// ==========================================
// NETFLIX CLONE - CONTENT CARDS & SLIDERS
// ==========================================

const Cards = {
    sliders: {},
    
    init: function() {
        console.log('Cards.init starting...');
        this.populateAllRows();
        console.log('Cards populated');
        this.setupSliders();
        console.log('Sliders setup complete');
        this.setupCardEventListeners();
        console.log('Card event listeners setup complete');
    },

    populateAllRows: function() {
        // Trending Now
        const trendingSlider = document.querySelector('[data-row="trending"]');
        if (trendingSlider) {
            Utils.populateRow(trendingSlider, CONFIG.content.trending);
        }

        // Popular on Netflix
        const popularSlider = document.querySelector('[data-row="popular"]');
        if (popularSlider) {
            Utils.populateRow(popularSlider, CONFIG.content.popular);
        }

        // Top 10
        const top10Slider = document.querySelector('[data-row="top10"]');
        if (top10Slider) {
            Utils.populateRow(top10Slider, CONFIG.content.top10, true);
        }

        // Netflix Originals
        const originalsSlider = document.querySelector('[data-row="originals"]');
        if (originalsSlider) {
            Utils.populateRow(originalsSlider, CONFIG.content.originals);
        }

        // Action & Adventure
        const actionSlider = document.querySelector('[data-row="action"]');
        if (actionSlider) {
            Utils.populateRow(actionSlider, CONFIG.content.action);
        }
    },

    setupSliders: function() {
        const sliderContainers = document.querySelectorAll('.row-slider-container');
        
        sliderContainers.forEach(container => {
            // Find track properly inside slider-wrapper
            let track = container.querySelector('.slider-track');
            if (!track) {
                const wrapper = container.querySelector('.slider-wrapper');
                if (wrapper) {
                    track = wrapper.querySelector('.slider-track');
                }
            }
            
            const prevBtn = container.querySelector('.slider-nav-prev');
            const nextBtn = container.querySelector('.slider-nav-next');
            
            if (!track) return;

            let scrollPosition = 0;
            const cardWidth = 300; // Approximate card width
            const gap = 8; // Gap between cards
            const scrollAmount = (cardWidth + gap) * 6; // Scroll 6 cards at a time

            // Initialize button states
            this.updateNavigationButtons(container, track);

            // Previous button
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    scrollPosition = Math.max(0, scrollPosition - scrollAmount);
                    track.style.transform = `translateX(-${scrollPosition}px)`;
                    this.updateNavigationButtons(container, track);
                });
            }

            // Next button
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    const maxScroll = track.scrollWidth - container.clientWidth;
                    scrollPosition = Math.min(maxScroll, scrollPosition + scrollAmount);
                    track.style.transform = `translateX(-${scrollPosition}px)`;
                    this.updateNavigationButtons(container, track);
                });
            }

            // Touch/swipe support for mobile
            if (Utils.isTouchDevice()) {
                this.setupTouchSwipe(container, track);
            }

            // Mouse wheel scroll support
            this.setupMouseWheelScroll(container, track);

            // Store reference
            this.sliders[container.dataset.row] = {
                container,
                track,
                scrollPosition
            };
        });
    },

    setupMouseWheelScroll: function(container, track) {
        let isMouseDown = false;
        let startX = 0;
        let scrollLeft = 0;

        // Mouse wheel scroll
        container.addEventListener('wheel', (e) => {
            const isHovering = container.matches(':hover');
            if (!isHovering) return;

            e.preventDefault();

            const cardWidth = 300;
            const gap = 8;
            const scrollAmount = cardWidth + gap;
            const maxScroll = track.scrollWidth - container.clientWidth;
            
            let currentTransform = track.style.transform;
            let currentScroll = currentTransform ? 
                parseInt(currentTransform.match(/-?\d+/)?.[0] || 0) : 0;

            // Scroll left or right based on wheel direction
            if (e.deltaY > 0) {
                // Scroll down (mouse wheel down) = scroll right
                currentScroll = Math.min(maxScroll, currentScroll + scrollAmount);
            } else {
                // Scroll up (mouse wheel up) = scroll left
                currentScroll = Math.max(0, currentScroll - scrollAmount);
            }

            track.style.transform = `translateX(-${currentScroll}px)`;
            this.updateNavigationButtons(container, track);
        }, { passive: false });

        // Mouse drag support
        track.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            startX = e.pageX - container.offsetLeft;
            let currentTransform = track.style.transform;
            scrollLeft = currentTransform ? parseInt(currentTransform.match(/-?\d+/)?.[0] || 0) : 0;
            track.style.cursor = 'grabbing';
            track.style.transition = 'none';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isMouseDown) return;
            
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 1.5; // Multiplier for drag sensitivity
            const maxScroll = track.scrollWidth - container.clientWidth;
            const newScroll = Math.max(0, Math.min(maxScroll, scrollLeft - walk));
            
            track.style.transform = `translateX(-${newScroll}px)`;
            this.updateNavigationButtons(container, track);
        });

        document.addEventListener('mouseup', () => {
            if (isMouseDown) {
                isMouseDown = false;
                track.style.cursor = 'grab';
                track.style.transition = 'transform 0.3s ease-out';
            }
        });

        track.style.cursor = 'grab';
    },

    updateNavigationButtons: function(container, track) {
        const prevBtn = container.querySelector('.slider-nav-prev');
        const nextBtn = container.querySelector('.slider-nav-next');
        
        if (!prevBtn || !nextBtn) return;

        const currentTransform = track.style.transform;
        const currentScroll = currentTransform ? 
            parseInt(currentTransform.match(/-?\d+/)?.[0] || 0) : 0;
        
        const maxScroll = track.scrollWidth - container.clientWidth;

        // Update previous button
        if (currentScroll <= 0) {
            prevBtn.classList.add('disabled');
            prevBtn.disabled = true;
        } else {
            prevBtn.classList.remove('disabled');
            prevBtn.disabled = false;
        }

        // Update next button
        if (currentScroll >= maxScroll) {
            nextBtn.classList.add('disabled');
            nextBtn.disabled = true;
        } else {
            nextBtn.classList.remove('disabled');
            nextBtn.disabled = false;
        }
    },

    setupTouchSwipe: function(container, track) {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        let startTransform = 0;

        track.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].clientX;
            
            const transform = track.style.transform;
            startTransform = transform ? parseInt(transform.match(/-?\d+/)?.[0] || 0) : 0;
            
            track.style.transition = 'none';
        });

        track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            currentX = e.touches[0].clientX;
            const diff = startX - currentX;
            const newTransform = startTransform + diff;
            
            // Constrain within bounds
            const maxScroll = track.scrollWidth - container.clientWidth;
            const constrainedTransform = Math.max(0, Math.min(maxScroll, newTransform));
            
            track.style.transform = `translateX(-${constrainedTransform}px)`;
        });

        track.addEventListener('touchend', () => {
            isDragging = false;
            track.style.transition = '';
            this.updateNavigationButtons(container, track);
        });
    },

    setupCardEventListeners: function() {
        // Use event delegation for better performance
        document.addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            if (!card) return;

            const itemId = parseInt(card.dataset.id);
            const item = Utils.findContentById(itemId);
            
            console.log('Card clicked:', { itemId, item, target: e.target });
            
            if (!item) {
                console.warn('Item not found for ID:', itemId);
                return;
            }

            // Play button
            if (e.target.closest('.card-play-btn')) {
                e.stopPropagation();
                this.handlePlayClick(item);
                return;
            }

            // Add to list button
            if (e.target.closest('.card-add-btn')) {
                e.stopPropagation();
                this.handleAddToListClick(item, e.target.closest('.card-add-btn'));
                return;
            }

            // Like button
            if (e.target.closest('.card-like-btn')) {
                e.stopPropagation();
                this.handleLikeClick(item, e.target.closest('.card-like-btn'));
                return;
            }

            // Info button or card click
            if (e.target.closest('.card-info-btn') || e.target.closest('.card')) {
                e.stopPropagation();
                console.log('Opening modal for:', item.title);
                Modal.open(item);
                return;
            }
        });

        // Hover effects for desktop
        if (!Utils.isTouchDevice()) {
            document.addEventListener('mouseenter', (e) => {
                const card = e.target.closest('.card');
                if (card) {
                    this.handleCardHover(card);
                }
            }, true);
        }
    },

    handlePlayClick: function(item) {
        Utils.showNotification(`Playing ${item.title}...`, 'success');
        // In a real app, this would start playback
    },

    handleAddToListClick: function(item, button) {
        const isInList = Utils.preferences.isInMyList(item.id);
        
        if (isInList) {
            Utils.preferences.removeFromMyList(item.id);
            button.innerHTML = '<i class="fas fa-plus"></i>';
            button.title = 'Add to My List';
            Utils.showNotification(`Removed from My List`, 'info');
        } else {
            Utils.preferences.addToMyList(item.id);
            button.innerHTML = '<i class="fas fa-check"></i>';
            button.title = 'Remove from My List';
            Utils.showNotification(`Added to My List`, 'success');
        }
    },

    handleLikeClick: function(item, button) {
        const isLiked = Utils.preferences.toggleLike(item.id);
        
        if (isLiked) {
            button.classList.add('active');
            Utils.showNotification(`Thanks for rating!`, 'success');
        } else {
            button.classList.remove('active');
            Utils.showNotification(`Rating removed`, 'info');
        }
    },

    handleCardHover: function(card) {
        // Could add preview video or additional info on hover
        // For now, CSS handles the hover effects
    },

    // Update card buttons based on user preferences
    updateCardStates: function() {
        document.querySelectorAll('.card').forEach(card => {
            const itemId = parseInt(card.dataset.id);
            
            // Update add to list button
            const addBtn = card.querySelector('.card-add-btn');
            if (addBtn && Utils.preferences.isInMyList(itemId)) {
                addBtn.innerHTML = '<i class="fas fa-check"></i>';
                addBtn.title = 'Remove from My List';
            }
            
            // Update like button
            const likeBtn = card.querySelector('.card-like-btn');
            if (likeBtn && Utils.preferences.isLiked(itemId)) {
                likeBtn.classList.add('active');
            }
        });
    }
};
