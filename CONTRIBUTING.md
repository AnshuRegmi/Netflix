# Contributing to Netflix Clone

Thank you for your interest in contributing to this project! This document provides guidelines and instructions for contributing.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Architecture](#project-architecture)
- [Code Style Guidelines](#code-style-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)

---

## Code of Conduct

This project follows a simple code of conduct:
- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

---

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Code editor (VS Code recommended)
- Git
- Node.js (optional, for live server)

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork:
```bash
git clone https://github.com/YOUR_USERNAME/netflix-clone.git
cd netflix-clone
```

3. Add upstream remote:
```bash
git remote add upstream https://github.com/ORIGINAL_OWNER/netflix-clone.git
```

---

## Development Setup

### Local Server

Start a local development server:

```bash
# Using npx
npx live-server --port=3000

# Using Python
python -m http.server 3000

# Using PHP
php -S localhost:3000
```

### VS Code Extensions (Recommended)

- **Live Server**: Local development server
- **Prettier**: Code formatting
- **CSS Peek**: CSS class navigation
- **Auto Rename Tag**: HTML tag renaming
- **Color Highlight**: CSS color preview

---

## Project Architecture

### File Structure

```
├── css/
│   ├── variables.css   # Design tokens (edit first for theme changes)
│   ├── global.css      # Base styles (rarely needs changes)
│   ├── header.css      # Navigation component
│   ├── hero.css        # Hero section
│   ├── cards.css       # Card components
│   ├── modal.css       # Modal components
│   ├── footer.css      # Footer component
│   └── responsive.css  # All media queries (centralized)
│
├── js/
│   ├── config.js       # Content data (add new content here)
│   ├── utils.js        # Utility functions
│   ├── main.js         # App initialization
│   ├── hero.js         # Hero functionality
│   ├── cards.js        # Card sliders
│   └── modal.js        # Modal system
│
└── index.html          # Single-page structure
```

### Where to Make Changes

| Task | File(s) |
|------|---------|
| Add new content | `js/config.js` |
| Change colors/spacing | `css/variables.css` |
| Fix responsive issues | `css/responsive.css` |
| Add new component | Create `css/component.css` + `js/component.js` |
| Modify animations | `css/global.css` (keyframes) |

---

## Code Style Guidelines

### HTML

```html
<!-- Use semantic elements -->
<header>, <main>, <section>, <nav>, <footer>

<!-- Use descriptive class names -->
<div class="content-row" id="trending">

<!-- Include accessibility attributes -->
<button aria-label="Close modal">
```

### CSS

```css
/* BEM-inspired naming */
.block {}
.block-element {}
.block--modifier {}

/* Example */
.card {}
.card-overlay {}
.card-action-btn {}
.card--featured {}

/* Use CSS variables */
color: var(--netflix-red);
padding: var(--spacing-md);

/* Order properties logically */
.element {
    /* Positioning */
    position: relative;
    top: 0;
    
    /* Box model */
    display: flex;
    width: 100%;
    padding: 1rem;
    
    /* Typography */
    font-size: 1rem;
    color: white;
    
    /* Visual */
    background: black;
    border-radius: 4px;
    
    /* Animation */
    transition: all 0.3s ease;
}
```

### JavaScript

```javascript
// Module pattern
const ModuleName = {
    // Properties first
    element: null,
    isActive: false,
    
    // Init method
    init: function() {
        this.element = document.getElementById('...');
        this.setupEventListeners();
    },
    
    // Event setup
    setupEventListeners: function() {
        this.element.addEventListener('click', () => this.handleClick());
    },
    
    // Methods
    handleClick: function() {
        // Implementation
    }
};

// Use meaningful names
const cardWidth = 200;  // ✅
const cw = 200;         // ❌

// Comment complex logic
// Calculate visible cards based on container width
const visibleCards = Math.floor(containerWidth / cardWidth);
```

---

## Commit Guidelines

### Format

```
type: Short description (max 50 chars)

Optional longer description explaining the change.
Wrap at 72 characters.

Fixes #123
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `style` | CSS/styling changes |
| `refactor` | Code refactoring |
| `docs` | Documentation |
| `test` | Tests |
| `chore` | Build/config changes |

### Examples

```bash
# Good
feat: Add trailer popup modal for hero section
fix: Resolve card overlay z-index issue on hover
style: Update header gradient for smoother blend
docs: Add CONTRIBUTING.md guidelines

# Bad
update stuff
fixed bug
changes
```

---

## Pull Request Process

### Before Submitting

1. **Sync with upstream**:
```bash
git fetch upstream
git rebase upstream/main
```

2. **Test thoroughly**:
   - Desktop (Chrome, Firefox, Safari)
   - Tablet (responsive mode)
   - Mobile (responsive mode or real device)

3. **Check for errors**:
   - Open browser DevTools Console
   - Ensure no JavaScript errors
   - Validate HTML/CSS

### Creating PR

1. Push your branch:
```bash
git push origin feature/your-feature
```

2. Open Pull Request on GitHub

3. Fill out the PR template:
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Checklist
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] No console errors
- [ ] Updated documentation
- [ ] Added to CHANGELOG.md
```

### Review Process

1. Maintainers will review within 48-72 hours
2. Address any requested changes
3. Once approved, your PR will be merged

---

## Reporting Issues

### Bug Reports

Include:
- Browser and version
- Device type (desktop/tablet/mobile)
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

### Feature Requests

Include:
- Clear description of the feature
- Use case / why it's needed
- Examples from Netflix (if applicable)
- Any implementation ideas

### Issue Template

```markdown
## Bug / Feature Request

### Description
Clear description of the issue or feature

### Environment
- Browser: Chrome 120
- Device: Desktop / Mobile
- OS: Windows 11

### Steps to Reproduce (for bugs)
1. Go to...
2. Click on...
3. Observe...

### Expected Behavior
What should happen

### Actual Behavior
What actually happens

### Screenshots
If applicable
```

---

## Questions?

If you have questions, feel free to:
- Open an issue with the "question" label
- Check existing issues for answers
- Review the [DOCUMENTATION.md](DOCUMENTATION.md)

Thank you for contributing! 🎬
