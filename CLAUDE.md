# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Lemon Tattoo is a modern, static website for a French tattoo salon built with vanilla web technologies. The project emphasizes smooth animations, responsive design, and professional visual presentation without requiring a build system.

## How to Run

```bash
# Start local development server
python -m http.server 8000
# Then visit: http://localhost:8000

# Alternative: use any static file server
npx serve .
```

**No build process required** - this is a static website that runs directly in browsers.

## Technology Stack

- **HTML5**: Single-page application (`index.html`)
- **CSS3**: Modular stylesheet architecture with custom animations
- **Vanilla JavaScript**: No frameworks, pure DOM manipulation
- **External Libraries** (CDN):
  - GSAP 3.12.2 (animations)
  - Lenis 1.0.19 (smooth scrolling)
  - Google Fonts (Inter, Montserrat)

## Architecture

### Core File Structure
- `index.html` - Complete single-page application (559 lines)
- `styles.css` - Main stylesheet with comprehensive responsive design (2056 lines)
- `script.js` - Interactive functionality and form handling (418 lines)
- `lenis-scroll.js` - Smooth scrolling and parallax effects (164 lines)

### Modular CSS System
- `custom-scrollbar.css` - Branded yellow gradient scrollbars
- `footer.css` - Footer styling with lion sketch background
- `floating-cta.css` - Floating call button animations
- `mobile-hero.css` - Mobile-specific hero optimizations

### Component Architecture
```
Hero Section → Portfolio Gallery → About Timeline → Contact Form → Footer
```

### Animation Strategy
- **CSS keyframes**: Entrance animations and micro-interactions
- **GSAP integration**: Available but minimally used
- **Lenis smooth scrolling**: Professional scroll experience
- **Intersection Observer**: Scroll-triggered reveals

## Brand & Design System

### Colors
- Primary: Yellow `#FFD700` (signature lemon theme)
- Secondary: Black `#000000`
- Accent: Cream `#FFF8E7`

### Typography
- Headers: Montserrat
- Body: Inter

### Responsive Breakpoints
- Desktop: Default
- Tablet: `768px`
- Mobile: `480px`

## Development Patterns

### JavaScript Architecture
- Event-driven with proper cleanup
- Performance optimized with `requestAnimationFrame`
- Error handling for external library failures
- Mobile-first responsive behavior

### CSS Methodology
- Custom properties for brand consistency
- Mobile-first responsive design
- Component-based organization
- Transform/opacity animations for 60fps performance

### Key Interactive Features
1. **Portfolio filtering**: JavaScript-based image gallery
2. **Modal system**: Image gallery with keyboard navigation
3. **Contact form**: Client-side validation and submission
4. **Mobile navigation**: Hamburger menu with animations
5. **Floating CTA**: Scroll-triggered call button
6. **Smooth scrolling**: Lenis integration with anchor links

## File Organization

### Assets Structure
```
herovideo/     - Background video assets
Art/           - Tattoo portfolio images
logo/          - Brand assets (lemon logo)
staff/         - Team member photos
about-us/      - Timeline section images
contact-page/  - Contact section assets
icons/         - UI icons and favicons
```

### Documentation
- `instruction.json` - Animation specifications for planned features
- `project-understanding-and-recommendations.md` - Comprehensive project analysis
- Various `.md` files in subdirectories with content planning

## Performance Considerations

- **No bundling**: Direct file serving
- **CDN libraries**: External dependencies loaded from CDN
- **Image optimization**: Multiple formats and responsive images
- **Animation performance**: Hardware-accelerated transforms only
- **Lazy loading**: Intersection Observer for efficient resource loading

## Mobile Optimization

- Touch-friendly interaction targets
- Reduced hero video on mobile
- Hamburger navigation
- Context-sensitive UI elements (phone field visibility)
- Optimized scrolling performance

## Key Business Context

- **Location**: 575 Av. de l'Europe, 34170 Castelnau-le-Lez, France
- **Phone**: 07 81 16 68 06
- **Language**: French content
- **Target audience**: High-end tattoo clientele
- **Brand positioning**: Modern, professional, artistic