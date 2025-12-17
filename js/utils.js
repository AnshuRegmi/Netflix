
const Utils = {
    // Debounce function for performance optimization
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll/resize events
    throttle: function(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Generate YouTube embed URL
    getYouTubeEmbedUrl: function(videoId, autoplay = false, mute = true, loop = false) {
        const params = new URLSearchParams({
            autoplay: autoplay ? '1' : '0',
            mute: mute ? '1' : '0',
            controls: '0',
            showinfo: '0',
            rel: '0',
            modestbranding: '1',
            playsinline: '1'
        });
        
        if (loop) {
            params.append('loop', '1');
            params.append('playlist', videoId);
        }
        
        return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
    },

    // Format duration (minutes to readable format)
    formatDuration: function(minutes) {
        if (minutes < 60) {
            return `${minutes}m`;
        }
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    },

    // Create card element
    createCard: function(item, isTop10 = false) {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.id = item.id;
        
        let badgeHtml = '';
        if (item.badge === 'new') {
            badgeHtml = '<span class="card-badge badge-new">NEW</span>';
        } else if (item.badge === 'trending') {
            badgeHtml = '<span class="card-badge badge-trending">TRENDING</span>';
        } else if (item.badge === 'top10' && item.rank) {
            badgeHtml = `<span class="card-badge badge-top10">#${item.rank}</span>`;
        }
        
        const fallbackImage = 'https://placehold.co/300x450?text=Poster';
        const imageUrl = item.image || fallbackImage;
        const title = item.title || 'Unknown Title';
        const match = item.match || 0;
        const rating = item.rating || 'NR';
        const genres = item.genres || '';

        card.innerHTML = `
            ${badgeHtml}
            <img src="${imageUrl}" alt="${title}" class="card-image" loading="eager" crossorigin="anonymous" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='https://placehold.co/300x450?text=Poster'; this.classList.add('image-fallback');">
            <div class="card-overlay">
                <div class="card-info">
                    <h3 class="card-title">${title}</h3>
                    <div class="card-meta">
                        <span class="card-match">${match}% Match</span>
                        <span class="card-rating">${rating}</span>
                    </div>
                    <div class="card-genres">${this.getGenresList(genres)}</div>
                </div>
                <div class="card-actions">
                    <button class="card-action-btn card-play-btn" title="Play">
                        <i class="fas fa-play"></i>
                    </button>
                    <button class="card-action-btn card-add-btn" title="Add to My List">
                        <i class="fas fa-plus"></i>
                    </button>
                    <button class="card-action-btn card-like-btn" title="I like this">
                        <i class="fas fa-thumbs-up"></i>
                    </button>
                    <button class="card-action-btn card-dislike-btn" title="Not for me">
                        <i class="fas fa-thumbs-down"></i>
                    </button>
                    <button class="card-action-btn card-info-btn" title="More Info">
                        <i class="fas fa-chevron-down"></i>
                    </button>
                </div>
            </div>
        `;
        
        return card;
    },

    // Get first 3 genres as list
    getGenresList: function(genresString) {
        const genres = genresString.split(',').map(g => g.trim()).slice(0, 3);
        return genres.join(' • ');
    },

    // Create skeleton card for loading state
    createSkeletonCard: function() {
        const card = document.createElement('div');
        card.className = 'card card-skeleton';
        card.innerHTML = `
            <div class="skeleton-image"></div>
            <div class="card-overlay">
                <div class="skeleton-text"></div>
                <div class="skeleton-text skeleton-text-short"></div>
            </div>
        `;
        return card;
    },

    // Populate content row with cards
    populateRow: function(container, items, isTop10 = false) {
        // Find or create slider-track to ensure rows always render
        let sliderTrack = container.querySelector('.slider-track');
        
        if (!sliderTrack) {
            let sliderWrapper = container.querySelector('.slider-wrapper');
            if (!sliderWrapper) {
                sliderWrapper = document.createElement('div');
                sliderWrapper.className = 'slider-wrapper';
                // Insert before next/prev nav if present, else append
                const nextNav = container.querySelector('.slider-nav-next');
                if (nextNav) {
                    container.insertBefore(sliderWrapper, nextNav);
                } else {
                    container.appendChild(sliderWrapper);
                }
            }
            sliderTrack = document.createElement('div');
            sliderTrack.className = 'slider-track';
            sliderWrapper.appendChild(sliderTrack);
        }
        
        // Clear only the slider track content, not the entire container
        sliderTrack.innerHTML = '';
        
        console.log(`Populating row with ${items.length} items`, { container, sliderTrack });
        
        items.forEach(item => {
            const card = this.createCard(item, isTop10);
            sliderTrack.appendChild(card);
        });
        
        console.log(`Row populated with ${items.length} cards`);
    },

    // Animate element on scroll into view
    animateOnScroll: function(elements) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        elements.forEach(el => observer.observe(el));
    },

    // Check if device is touch-enabled
    isTouchDevice: function() {
        return ('ontouchstart' in window) || 
               (navigator.maxTouchPoints > 0) || 
               (navigator.msMaxTouchPoints > 0);
    },

    // Get random items from array
    getRandomItems: function(array, count) {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    },

    // Smooth scroll to element
    smoothScroll: function(target, offset = 0) {
        const element = typeof target === 'string' ? document.querySelector(target) : target;
        if (!element) return;
        
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    },

    // Add loading state to element
    addLoadingState: function(element) {
        element.classList.add('loading');
        element.disabled = true;
    },

    // Remove loading state from element
    removeLoadingState: function(element) {
        element.classList.remove('loading');
        element.disabled = false;
    },

    // Show notification/toast
    showNotification: function(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, duration);
    },

    // Local storage helpers
    storage: {
        get: function(key) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : null;
            } catch (e) {
                console.error('Error reading from localStorage:', e);
                return null;
            }
        },
        
        set: function(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (e) {
                console.error('Error writing to localStorage:', e);
                return false;
            }
        },
        
        remove: function(key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (e) {
                console.error('Error removing from localStorage:', e);
                return false;
            }
        }
    },

    // Get/Set user preferences
    preferences: {
        getMyList: function() {
            return Utils.storage.get('myList') || [];
        },
        
        addToMyList: function(itemId) {
            const myList = this.getMyList();
            if (!myList.includes(itemId)) {
                myList.push(itemId);
                Utils.storage.set('myList', myList);
                return true;
            }
            return false;
        },
        
        removeFromMyList: function(itemId) {
            let myList = this.getMyList();
            myList = myList.filter(id => id !== itemId);
            Utils.storage.set('myList', myList);
            return true;
        },
        
        isInMyList: function(itemId) {
            return this.getMyList().includes(itemId);
        },

        getLikedItems: function() {
            return Utils.storage.get('likedItems') || [];
        },

        toggleLike: function(itemId) {
            const liked = this.getLikedItems();
            const index = liked.indexOf(itemId);
            
            if (index > -1) {
                liked.splice(index, 1);
            } else {
                liked.push(itemId);
            }
            
            Utils.storage.set('likedItems', liked);
            return index === -1; // returns true if liked, false if unliked
        },

        isLiked: function(itemId) {
            return this.getLikedItems().includes(itemId);
        },

        removeLike: function(itemId) {
            let liked = this.getLikedItems();
            liked = liked.filter(id => id !== itemId);
            Utils.storage.set('likedItems', liked);
        },

        getDislikedItems: function() {
            return Utils.storage.get('dislikedItems') || [];
        },

        toggleDislike: function(itemId) {
            const disliked = this.getDislikedItems();
            const index = disliked.indexOf(itemId);
            
            if (index > -1) {
                disliked.splice(index, 1);
            } else {
                disliked.push(itemId);
            }
            
            Utils.storage.set('dislikedItems', disliked);
            return index === -1; // returns true if disliked, false if undisliked
        },

        isDisliked: function(itemId) {
            return this.getDislikedItems().includes(itemId);
        },

        removeDislike: function(itemId) {
            let disliked = this.getDislikedItems();
            disliked = disliked.filter(id => id !== itemId);
            Utils.storage.set('dislikedItems', disliked);
        }
    },

    // Find content by ID across all categories
    findContentById: function(id) {
        for (const category in CONFIG.content) {
            const item = CONFIG.content[category].find(item => item.id === parseInt(id));
            if (item) return item;
        }
        return null;
    },

    // Get similar content based on genres
    getSimilarContent: function(item, count = 6) {
        const allContent = Object.values(CONFIG.content).flat();
        const itemGenres = item.genres.toLowerCase().split(',').map(g => g.trim());
        
        // Filter and score similar items
        const similar = allContent
            .filter(content => content.id !== item.id)
            .map(content => {
                const contentGenres = content.genres.toLowerCase().split(',').map(g => g.trim());
                const matchCount = itemGenres.filter(g => contentGenres.includes(g)).length;
                return { content, score: matchCount };
            })
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, count)
            .map(item => item.content);
        
        // If not enough similar items, fill with random
        if (similar.length < count) {
            const remaining = count - similar.length;
            const randomItems = this.getRandomItems(
                allContent.filter(c => c.id !== item.id && !similar.includes(c)),
                remaining
            );
            similar.push(...randomItems);
        }
        
        return similar;
    }
};
