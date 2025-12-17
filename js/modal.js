
const Modal = {
    modal: null,
    backdrop: null,
    video: null,
    volumeBtn: null,
    currentItem: null,
    isMuted: true,

    init: function() {
        this.modal = document.getElementById('infoModal');
        this.backdrop = document.getElementById('modalBackdrop');
        this.video = document.getElementById('modalVideo');
        this.volumeBtn = document.getElementById('modalVolumeBtn');
        
        console.log('Modal.init:', {
            modal: this.modal ? 'found' : 'NOT FOUND',
            backdrop: this.backdrop ? 'found' : 'NOT FOUND',
            video: this.video ? 'found' : 'NOT FOUND',
            volumeBtn: this.volumeBtn ? 'found' : 'NOT FOUND'
        });
        
        if (!this.modal || !this.backdrop) {
            console.error('Modal or backdrop not found in DOM');
            return;
        }

        this.setupEventListeners();
    },

    setupEventListeners: function() {
        // Close button
        const closeBtn = document.getElementById('modalClose');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }

        // Backdrop click
        this.backdrop.addEventListener('click', () => this.close());

        // Volume button
        if (this.volumeBtn) {
            this.volumeBtn.addEventListener('click', () => this.toggleVolume());
        }

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });

        // Prevent body scroll when modal is open
        this.modal.addEventListener('wheel', (e) => {
            const modalContent = this.modal.querySelector('.modal-content');
            const atTop = modalContent.scrollTop === 0;
            const atBottom = modalContent.scrollHeight - modalContent.scrollTop === modalContent.clientHeight;
            
            if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
                e.preventDefault();
            }
        });
    },

    open: function(item) {
        if (!item) {
            console.error('Modal.open called with null/undefined item');
            return;
        }
        
        if (!this.modal || !this.backdrop) {
            console.error('Modal elements not initialized');
            return;
        }
        
        console.log('Modal.open triggered for:', item.title);
        
        this.currentItem = item;
        this.populateModal(item);
        
        // Show modal
        this.backdrop.classList.add('active');
        this.modal.classList.add('active');
        document.body.classList.add('modal-open');

        // Load video
        if (this.video && item.trailer) {
            const videoUrl = Utils.getYouTubeEmbedUrl(item.trailer, true, true, true);
            this.video.src = videoUrl;
        }
    },

    close: function() {
        this.backdrop.classList.remove('active');
        this.modal.classList.remove('active');
        document.body.classList.remove('modal-open');

        // Stop video
        if (this.video) {
            this.video.src = '';
        }

        this.currentItem = null;
    },

    populateModal: function(item) {
        // Title
        const titleEl = document.getElementById('modalTitle');
        if (titleEl) titleEl.textContent = item.title;

        // Match score
        const matchEl = document.getElementById('modalMatch');
        if (matchEl) matchEl.textContent = `${item.match}% Match`;

        // Year
        const yearEl = document.getElementById('modalYear');
        if (yearEl) yearEl.textContent = item.year;

        // Rating
        const ratingEl = document.getElementById('modalRating');
        if (ratingEl) ratingEl.textContent = item.rating;

        // Duration
        const durationEl = document.getElementById('modalDuration');
        if (durationEl) durationEl.textContent = item.duration;

        // Description
        const descEl = document.getElementById('modalDescription');
        if (descEl) descEl.textContent = item.description;

        // Cast
        const castEl = document.getElementById('modalCast');
        if (castEl) castEl.textContent = item.cast;

        // Genres
        const genresEl = document.getElementById('modalGenres');
        if (genresEl) genresEl.textContent = item.genres;

        // Tags
        const tagsEl = document.getElementById('modalTags');
        if (tagsEl) tagsEl.textContent = item.tags;

        // Similar content
        this.populateSimilarContent(item);

        // Update action buttons
        this.updateActionButtons(item);
    },

    populateSimilarContent: function(item) {
        const similarGrid = document.getElementById('similarGrid');
        if (!similarGrid) return;

        const similarItems = Utils.getSimilarContent(item, 6);
        similarGrid.innerHTML = '';

        similarItems.forEach(similar => {
            const similarCard = document.createElement('div');
            similarCard.className = 'similar-item';
            similarCard.dataset.id = similar.id;
            
            similarCard.innerHTML = `
                <img src="${similar.image}" alt="${similar.title}" class="similar-image">
                <div class="similar-info">
                    <div class="similar-header">
                        <h4 class="similar-title">${similar.title}</h4>
                        <button class="modal-icon-btn similar-add-btn" title="Add to My List">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <div class="similar-meta">
                        <span class="similar-match">${similar.match}% Match</span>
                        <span class="similar-year">${similar.year}</span>
                        <span class="similar-rating">${similar.rating}</span>
                    </div>
                    <p class="similar-description">${similar.description}</p>
                    <div class="similar-genres">${Utils.getGenresList(similar.genres)}</div>
                </div>
            `;

            // Click to open new modal
            similarCard.addEventListener('click', (e) => {
                if (!e.target.closest('.similar-add-btn')) {
                    this.open(similar);
                }
            });

            // Add to list button
            const addBtn = similarCard.querySelector('.similar-add-btn');
            if (addBtn) {
                addBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const isInList = Utils.preferences.isInMyList(similar.id);
                    
                    if (isInList) {
                        Utils.preferences.removeFromMyList(similar.id);
                        addBtn.innerHTML = '<i class="fas fa-plus"></i>';
                        Utils.showNotification(`Removed from My List`, 'info');
                    } else {
                        Utils.preferences.addToMyList(similar.id);
                        addBtn.innerHTML = '<i class="fas fa-check"></i>';
                        Utils.showNotification(`Added to My List`, 'success');
                    }
                });

                // Update button if already in list
                if (Utils.preferences.isInMyList(similar.id)) {
                    addBtn.innerHTML = '<i class="fas fa-check"></i>';
                }
            }

            similarGrid.appendChild(similarCard);
        });
    },

    updateActionButtons: function(item) {
        // Play button
        const playBtn = this.modal.querySelector('.modal-play-btn');
        if (playBtn) {
            playBtn.onclick = () => {
                Utils.showNotification(`Playing ${item.title}...`, 'success');
                this.close();
            };
        }

        // Add to list button
        const addBtn = this.modal.querySelector('.modal-icon-btn[title="Add to My List"]');
        if (addBtn) {
            const isInList = Utils.preferences.isInMyList(item.id);
            addBtn.innerHTML = isInList ? '<i class="fas fa-check"></i>' : '<i class="fas fa-plus"></i>';
            addBtn.title = isInList ? 'Remove from My List' : 'Add to My List';
            
            addBtn.onclick = () => {
                const nowInList = Utils.preferences.isInMyList(item.id);
                
                if (nowInList) {
                    Utils.preferences.removeFromMyList(item.id);
                    addBtn.innerHTML = '<i class="fas fa-plus"></i>';
                    addBtn.title = 'Add to My List';
                    Utils.showNotification(`Removed from My List`, 'info');
                } else {
                    Utils.preferences.addToMyList(item.id);
                    addBtn.innerHTML = '<i class="fas fa-check"></i>';
                    addBtn.title = 'Remove from My List';
                    Utils.showNotification(`Added to My List`, 'success');
                }
            };
        }

        // Like button
        const likeBtn = this.modal.querySelector('.modal-icon-btn[title="I like this"]');
        if (likeBtn) {
            const isLiked = Utils.preferences.isLiked(item.id);
            if (isLiked) likeBtn.classList.add('active');
            
            likeBtn.onclick = () => {
                const nowLiked = Utils.preferences.toggleLike(item.id);
                
                if (nowLiked) {
                    likeBtn.classList.add('active');
                    Utils.showNotification(`Thanks for rating!`, 'success');
                } else {
                    likeBtn.classList.remove('active');
                    Utils.showNotification(`Rating removed`, 'info');
                }
            };
        }
    },

    toggleVolume: function() {
        this.isMuted = !this.isMuted;
        
        const icon = this.volumeBtn.querySelector('i');
        if (this.isMuted) {
            icon.classList.remove('fa-volume-up');
            icon.classList.add('fa-volume-mute');
        } else {
            icon.classList.remove('fa-volume-mute');
            icon.classList.add('fa-volume-up');
        }
        
        // For YouTube iframe, would need YouTube IFrame API
    }
};
