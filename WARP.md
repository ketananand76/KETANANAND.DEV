# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a professional portfolio website for Ketan Anand (Ketan Paswan), built with vanilla JavaScript, HTML, CSS, and a Node.js/Express backend. The portfolio features modern animations, multi-theme support, email functionality, and visitor analytics.

## Common Development Commands

### Starting the Development Server
```bash
# Start server with nodemon (auto-reload)
npm run dev

# Start server in production mode
npm start

# Start on specific port
PORT=3000 npm start
```

### Environment Setup
```bash
# Install dependencies
npm install

# Create .env file with required variables
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
ADMIN_KEY=your-secret-admin-key
PORT=3000
```

## Architecture & Structure

### Backend Architecture (server.js)
- **Express Server**: Serves static files from `/public` and handles API routes
- **Email Service**: Uses Nodemailer with Gmail SMTP for contact form submissions
- **API Endpoints**:
  - `POST /api/send-email` - Handles both contact forms and visitor profile submissions
  - Differentiates between form types using `type` field (`contact` or `visitor_profile`)
- **Email Configuration**: Requires Gmail App Password (not regular password) for security

### Frontend Architecture

#### File Organization
```
public/
├── index.html              # Main HTML file with all sections
├── css/
│   ├── style.css          # Core styles and responsive design
│   ├── themes.css         # Theme system (light/dark/custom)
│   ├── animations.css     # Advanced animation classes
│   └── chatbot.css        # AI chatbot styling
├── js/
│   ├── main.js            # Core functionality & initialization
│   ├── themes.js          # Theme management system
│   ├── animations.js      # Animation manager & effects
│   ├── chatbot.js         # AI assistant chatbot
│   └── bottle-3d.js       # Three.js 3D model viewer
└── images/
    ├── projects/          # Project screenshots
    └── certificates/      # Certificate images
```

#### JavaScript Module System
The codebase uses a modular approach with separate initialization functions:
- **main.js**: Orchestrates all modules via `DOMContentLoaded` event
- Each feature has its own `init*()` function (e.g., `initNavigation()`, `initContactForm()`)
- Functions are called in specific order to ensure proper dependency loading

#### Key JavaScript Functions
- `initLoader()` - Pre-loading screen animation
- `initNavigation()` - Sticky navbar with scroll effects and active link tracking
- `initCustomCursor()` - Custom cursor with follower effect
- `initParticles()` - Animated particle background in hero section
- `initTypingAnimation()` - Dynamic text typing effect for role descriptions
- `initScrollAnimations()` - Intersection Observer-based scroll animations
- `initSkillBars()` - Animated skill progress bars
- `initTimeline()` - Education timeline animations
- `initContactForm()` - Contact form submission with fetch API
- `initVisitorForm()` - Visitor profile form submission
- `initHireButton()` - Hire button analytics tracking
- `initDashboard()` - Analytics dashboard with localStorage
- `initCertificateToggle()` - Show/hide certificates with immediate visibility
- `initProjectsToggle()` - Show/hide projects with staggered animation
- `initMobileMenu()` - Responsive mobile hamburger menu

### Theme System (themes.js)
- **ThemeManager Class**: Handles theme switching and persistence
- **Themes Available**: Light, Dark, Custom (pink/purple gradient)
- **Storage**: Uses localStorage with key `preferred-theme`
- **Keyboard Shortcut**: Ctrl+Shift+T toggles themes
- **Accessibility**: Respects `prefers-reduced-motion` and `prefers-contrast` media queries
- **Meta Theme Color**: Updates mobile browser toolbar color per theme

### Animation System (animations.js)
- **AnimationManager Class**: Centralized animation control
- **Scroll Animations**: Uses IntersectionObserver for performance
- **Parallax Effects**: Applied to hero section and particles
- **Hover Animations**: Magnetic effect, tilt effect, and glow effect
- **Loading Animations**: Skeleton loaders and progressive image loading
- **ParticleSystem Class**: Canvas-based particle animations
- **MouseTrail Class**: Optional mouse trail effect (commented out by default)

### Responsive Design System

The CSS uses a mobile-first approach with the following breakpoints:
- **Desktop Large** (1440px+): Enhanced spacing and larger fonts
- **Desktop** (1280px-1439px): Standard desktop layout
- **Tablet Landscape** (1024px-1279px): Two-column layouts begin collapsing
- **Tablet** (769px-1024px): Single column for hero/about, centered timeline
- **Mobile Landscape** (481px-768px): Mobile menu, stacked layouts, 3-column grids
- **Mobile Portrait** (320px-480px): Fully mobile-optimized, 2-column or single column
- **Extra Small** (320px-375px): Smallest devices, minimal spacing

#### Responsive CSS Variables
Font sizes and spacing automatically adjust via CSS custom properties at each breakpoint. Container padding reduces from `2rem` on desktop to `0.8rem` on mobile.

### Data Storage

#### Client-Side Storage (localStorage)
- `visitorCount` - Total page visits
- `hireCount` - "Hire Me" button clicks
- `visitedStates` - Array of unique visitor states/regions
- `messageCount` - Contact form submissions
- `preferred-theme` - User's selected theme

#### Server-Side Storage
- `data.json` - Stores visitor analytics and form submissions
- Contains: visitors count, hire count, states array, messages count, submissions array

## Important Development Patterns

### Form Submission Pattern
All forms use async/await with fetch API:
1. Prevent default form submission
2. Show loading state on submit button
3. Send JSON payload to `/api/send-email`
4. Handle success/error with notifications
5. Reset form and update analytics on success
6. Restore button state in finally block

### Animation Pattern
Most animations follow this pattern:
1. Elements start with hidden state (opacity 0, transform translateY)
2. IntersectionObserver watches for element visibility
3. When visible, add `.animate` class or apply inline styles
4. CSS transitions handle the animation
5. Stagger animations by applying delay based on index

### Toggle Pattern (Show More/Less)
Used for projects and certificates:
1. Hidden items have `.hidden-*` class with `display: none`
2. Toggle button adds `.show-all` class to parent section
3. CSS displays hidden items when `.show-all` is present
4. JavaScript applies staggered fade-in animations
5. Scroll position adjusts to keep content in view

## Email Configuration

### Gmail App Password Setup
1. Enable 2-Step Verification on Google Account
2. Go to Security → App Passwords
3. Generate password for "Mail" application
4. Use generated password in `.env` as `EMAIL_PASS`

### Email Templates
The server sends HTML formatted emails with:
- Sender name and email
- Form subject (contact) or profile info (visitor)
- Message content
- Timestamp and metadata

## Theme Development

### Adding New Themes
1. Define theme colors in `themePresets` object in `themes.js`
2. Add corresponding CSS variables in `themes.css`
3. Add theme button in footer HTML with `data-theme` attribute
4. Update `updateThemeIcons()` to include new theme icon

### Theme Color Structure
Each theme requires:
- Primary color (buttons, links)
- Background colors (primary, secondary, tertiary)
- Text colors (primary, secondary, light)
- Border color
- Shadow values

## Performance Considerations

### Optimization Techniques Used
- **GPU Acceleration**: `transform: translate3d(0,0,0)` on animated elements
- **Intersection Observer**: Lazy loading and scroll animations
- **Debounced Scroll Events**: Smooth scrolling without jank
- **Will-change Property**: Applied to frequently animated elements
- **Reduced Motion**: Respects user preferences via media query

### Image Optimization
- Project and certificate images should be optimized before upload
- Recommended formats: WebP for photos, SVG for icons
- Max dimensions: 800x600 for project images, 1200x900 for certificates

## Chatbot System (chatbot.js)

The AI chatbot provides pre-programmed responses about Ketan's portfolio:
- Built with vanilla JavaScript (no AI API required)
- Pattern matching for common queries
- Quick reply buttons for better UX
- Stores message history in-memory
- Mobile-responsive floating chat window

## 3D Model Viewer (bottle-3d.js)

Uses Three.js to display 3D models:
- Supports GLTF/GLB model formats
- OrbitControls for mouse/touch interaction
- Responsive canvas sizing
- Loading states with spinner
- Used in specific project cards with `.project-3d` class

## Testing Approach

No formal test framework is included. To test:
1. **Manual Testing**: Open in multiple browsers and device sizes
2. **Form Testing**: Test both contact and visitor forms with valid/invalid data
3. **Email Testing**: Verify emails arrive with correct formatting
4. **Theme Testing**: Switch between all themes, test persistence
5. **Mobile Testing**: Test on physical devices or browser DevTools
6. **Performance Testing**: Check Lighthouse scores, especially mobile

## Common Gotchas

### Email Issues
- Must use Gmail App Password, not account password
- Check that 2-Step Verification is enabled
- SMTP may be blocked on some networks/hosting
- Check server logs for detailed error messages

### Animation Issues
- Custom cursor may not work on touch devices (intentional)
- Reduced motion preference disables all animations
- IntersectionObserver not supported in very old browsers
- Timeline centering requires specific CSS !important overrides at mobile breakpoints

### Mobile Menu
- Menu uses fixed positioning and transform for sliding
- Must close menu when clicking links or outside menu
- Z-index must be less than loader (999 vs 10000)

### Hidden Certificates/Projects
- When clicking "See More", items appear immediately with stagger animation
- Display is toggled via CSS class, animations via JavaScript
- Must force reflow (`void cert.offsetWidth`) to ensure smooth transition

## Browser Support

Target browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile 90+)

Features requiring polyfills for older browsers:
- IntersectionObserver
- CSS Custom Properties
- Fetch API
- LocalStorage (universally supported)

## Deployment Notes

### Environment Variables Required
- `EMAIL_USER` - Gmail address
- `EMAIL_PASS` - Gmail app password
- `ADMIN_KEY` - Secret key for admin endpoints
- `PORT` - Optional, defaults to 3000

### Static File Serving
All files in `/public` are served statically. Ensure:
- Images are uploaded to correct subdirectories
- File paths in HTML match actual file locations
- No sensitive files are in `/public` directory

### Production Checklist
- Set `NODE_ENV=production`
- Use environment variables, not hardcoded values
- Enable HTTPS for email security
- Set up CORS properly if frontend hosted separately
- Consider rate limiting for email endpoint
- Regular backups of `data.json`

## Code Style Conventions

- **Indentation**: 4 spaces for JavaScript, 4 spaces for CSS
- **Naming**: camelCase for JS functions/variables, kebab-case for CSS classes
- **Comments**: Section headers use `// ===== SECTION =====` format
- **CSS**: BEM-like naming for components (e.g., `.certificate-card`, `.certificate-overlay`)
- **Functions**: Init functions return nothing, utility functions return values
- **Error Handling**: Try-catch in async functions, console.error for debugging

## Maintenance & Updates

### Adding New Projects
1. Add project card HTML in projects section
2. Add images to `/public/images/projects/`
3. Add `.hidden-project` class if more than 6 projects
4. Update project counter if adding hidden projects

### Adding New Certificates
1. Add certificate card HTML in certificates section
2. Add images to `/public/images/certificates/`
3. Add `.hidden-cert` class if more than 8 certificates
4. Ensure certificate links are functional

### Updating Content
Most content is in `index.html`:
- Personal info in hero section
- Skills percentages in about section
- Tool icons and names
- Education timeline dates and descriptions
- Social media links in hero and footer
