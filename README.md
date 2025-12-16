# Netflix Clone Project

A fully responsive Netflix clone built with HTML, CSS, JavaScript, Bootstrap, and Slick Carousel.

## 📋 Project Overview

This project is a pixel-perfect Netflix clone that replicates the core UI/UX features of Netflix's streaming platform. It includes a dynamic hero section with video background, content carousels, modal video player, and fully responsive design.

## ✨ Features

### 🎬 Core Features
- **Hero Section**: Full-screen video background with content information
- **Dynamic Navigation**: Sticky header with scroll effects
- **Content Carousels**: Multiple rows of content with smooth scrolling
- **Modal Video Player**: Detailed content view with video playback
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Interactive Elements**: Hover effects, animations, and transitions

### 🎨 Design Features
- Netflix-inspired color scheme (Red: #e50914, Black: #141414)
- Smooth animations and transitions
- Custom video controls (mute/unmute)
- Recently added badges
- Age rating badges
- Episode listings with thumbnails

### 📱 Responsive Breakpoints
- **Extra Large**: ≥1400px
- **Large**: 992px - 1399px
- **Medium (Tablet)**: 768px - 991px
- **Small (Mobile)**: 576px - 767px
- **Extra Small**: <576px

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Interactive functionality
- **jQuery**: DOM manipulation
- **Bootstrap 5.3.2**: Responsive framework
- **Slick Carousel 1.8.1**: Content sliders
- **Font Awesome 6.5.1**: Icons

## 📁 Project Structure

```
Netfilx Project/
│
├── index.html              # Main HTML file
├── css/
│   ├── styles.css          # Main stylesheet
│   └── responsive.css      # Responsive styles
├── js/
│   ├── main.js             # Main JavaScript functionality
│   └── modal.js            # Modal-specific functionality
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for CDN resources)

### Installation

1. **Clone or download the project**
   ```bash
   cd "Netfilx Project"
   ```

2. **Open the project**
   - Simply open `index.html` in your web browser
   - Or use a local server (recommended):
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server
     ```

3. **Access the application**
   - Direct: Open `index.html` in browser
   - Server: Navigate to `http://localhost:8000`

## 💻 Features Breakdown

### Header/Navigation
- Fixed sticky header with scroll effect
- Netflix logo
- Navigation menu (Home, Shows, Movies, Genre, etc.)
- Search functionality
- Notifications
- Profile menu

### Hero Section
- Auto-playing background video
- Content title and description
- Play and More Info buttons
- Mute/Unmute control
- Age rating badge

### Content Rows
- Multiple content rows with titles
- Slick carousel sliders
- Recently Added badges
- Hover effects with scale animation
- Responsive slide counts

### Modal
- Full-screen video player
- Content details (match score, year, rating)
- Play button
- Add to List button
- Like/Dislike buttons
- Episode listings with thumbnails
- Season selector

### Footer
- Social media links
- Multiple footer link sections
- Service code button
- Copyright information

## 🎮 User Interactions

### Keyboard Shortcuts
- **Space**: Play/Pause video
- **M**: Mute/Unmute video
- **Arrow Left/Right**: Navigate sliders
- **ESC**: Close modal
- **F**: Fullscreen (in modal)

### Mouse Interactions
- Click slider items to open modal
- Hover over items for scale effect
- Click profile icon for menu
- Click search icon to open search

## 🎨 Customization

### Colors
Update CSS variables in `styles.css`:
```css
:root {
    --netflix-red: #e50914;
    --netflix-black: #141414;
    --netflix-dark: #000000;
    --netflix-gray: #808080;
    --netflix-light-gray: #b3b3b3;
    --netflix-white: #ffffff;
    --netflix-green: #46d369;
    --transition-speed: 0.3s;
}
```

### Slider Settings
Modify in `main.js`:
```javascript
$('.row-slider').slick({
    slidesToShow: 6,      // Number of slides to show
    slidesToScroll: 3,    // Number of slides to scroll
    speed: 500,           // Animation speed
    // ... more options
});
```

## 📱 Responsive Design

The project includes comprehensive responsive styles:

### Desktop (≥992px)
- 6 slides per row
- Full hero section
- Large fonts and spacing

### Tablet (768px - 991px)
- 3-4 slides per row
- Adjusted hero height
- Medium fonts

### Mobile (<768px)
- 2 slides per row
- Compact layout
- Optimized for touch
- Full-screen modal

## 🔧 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Opera (latest)

## 📈 Performance Features

- Lazy loading for images
- Intersection Observer for animations
- Debounced scroll events
- Optimized video loading
- Efficient slider rendering

## 🐛 Known Issues & Limitations

- Video sources use external CDN (may expire)
- No backend integration (static content)
- No actual video streaming functionality
- Local storage used for My List (browser-based)

## 🔜 Future Enhancements

- [ ] Backend integration with API
- [ ] User authentication
- [ ] Real video streaming
- [ ] Content search functionality
- [ ] Filter by genre/category
- [ ] Continue watching feature
- [ ] Multiple profiles
- [ ] Download functionality

## 📝 Code Quality

### HTML
- Semantic HTML5 elements
- Proper ARIA attributes
- SEO-friendly structure

### CSS
- BEM-like naming convention
- Organized by sections
- Mobile-first approach
- CSS variables for consistency

### JavaScript
- ES6+ features
- Modular code structure
- Extensive comments
- Error handling

## 🎓 Learning Resources

This project demonstrates:
- Responsive web design
- CSS animations and transitions
- JavaScript DOM manipulation
- jQuery event handling
- Bootstrap framework usage
- Slick carousel implementation
- Video element control

## 📄 License

This is an educational project created for learning purposes. Netflix and all related trademarks are property of Netflix, Inc.

## 👨‍💻 Development

### File Descriptions

#### `index.html`
Main HTML structure containing:
- Header/Navigation
- Hero section
- Content rows
- Modal
- Footer

#### `css/styles.css` (1000+ lines)
Comprehensive styling including:
- Global styles and variables
- Header/navigation styles
- Hero section with video
- Content carousel styles
- Modal styles
- Footer styles
- Utility classes

#### `css/responsive.css` (700+ lines)
Responsive styles for:
- Extra large devices (≥1400px)
- Large devices (992px - 1399px)
- Medium devices - Tablets (768px - 991px)
- Small devices - Mobile (576px - 767px)
- Extra small devices (<576px)
- Landscape mode
- Print styles
- Accessibility features

#### `js/main.js` (600+ lines)
Main functionality including:
- Header scroll effects
- Video controls
- Slick carousel initialization
- Search functionality
- Profile menu
- Keyboard shortcuts
- Performance monitoring
- Utility functions

#### `js/modal.js`
Modal-specific features:
- Modal open/close
- Video playback control
- Episode selection
- Add to list functionality
- Like/dislike features

## 🤝 Contributing

This is an educational project. Feel free to fork and enhance!

## 📞 Support

For issues or questions, please check:
1. Browser console for errors
2. All files are properly linked
3. Internet connection for CDN resources

## 🎉 Acknowledgments

- Netflix for design inspiration
- Bootstrap team
- Slick Carousel developers
- Font Awesome team
- Unsplash for placeholder images
- Coverr for video content

---

**Built with ❤️ for learning purposes**

*Last Updated: December 2025*
# Netflix
