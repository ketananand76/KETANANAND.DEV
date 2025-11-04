// ===== THEME SYSTEM =====

class ThemeManager {
    constructor() {
        this.currentTheme = this.getSavedTheme() || 'light';
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.initThemeToggle();
        this.initThemeSwitcher();
        this.updateThemeIcons();
        
        console.log('Theme system initialized');
    }

    getSavedTheme() {
        return localStorage.getItem('preferred-theme');
    }

    saveTheme(theme) {
        localStorage.setItem('preferred-theme', theme);
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        this.saveTheme(theme);
        this.updateThemeIcons();
        this.updateThemeButtons();
    }

    initThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    initThemeSwitcher() {
        const themeButtons = document.querySelectorAll('.theme-btn');
        
        themeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const theme = btn.getAttribute('data-theme');
                this.applyTheme(theme);
            });
        });
    }

    toggleTheme() {
        const themes = ['light', 'dark', 'custom'];
        const currentIndex = themes.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        const nextTheme = themes[nextIndex];
        
        this.applyTheme(nextTheme);
        this.animateToggle();
    }

    animateToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.classList.add('theme-toggle-animation');
            setTimeout(() => {
                themeToggle.classList.remove('theme-toggle-animation');
            }, 500);
        }
    }

    updateThemeIcons() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;

        const icons = {
            light: 'fas fa-sun',
            dark: 'fas fa-moon',
            custom: 'fas fa-palette'
        };

        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = icons[this.currentTheme];
        }
    }

    updateThemeButtons() {
        const themeButtons = document.querySelectorAll('.theme-btn');
        
        themeButtons.forEach(btn => {
            const theme = btn.getAttribute('data-theme');
            if (theme === this.currentTheme) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Auto theme based on system preference
    initSystemTheme() {
        if (window.matchMedia && !this.getSavedTheme()) {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            this.applyTheme(systemTheme);
        }

        // Listen for system theme changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addListener((e) => {
                if (!this.getSavedTheme()) {
                    this.applyTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }

    // Theme-specific customizations
    applyThemeSpecificStyles() {
        const theme = this.currentTheme;
        const body = document.body;

        // Remove existing theme classes
        body.classList.remove('theme-light', 'theme-dark', 'theme-custom');
        
        // Add current theme class
        body.classList.add(`theme-${theme}`);

        // Update meta theme color for mobile browsers
        this.updateMetaThemeColor();
    }

    updateMetaThemeColor() {
        const themeColors = {
            light: '#ffffff',
            dark: '#0f172a',
            custom: '#fdf2f8'
        };

        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        
        metaThemeColor.content = themeColors[this.currentTheme];
    }

    // Smooth theme transition
    enableThemeTransition() {
        const transitionStyles = `
            * {
                transition: background-color 0.3s ease, 
                           color 0.3s ease, 
                           border-color 0.3s ease, 
                           box-shadow 0.3s ease !important;
            }
        `;

        const style = document.createElement('style');
        style.textContent = transitionStyles;
        document.head.appendChild(style);

        // Remove transition after theme change
        setTimeout(() => {
            style.remove();
        }, 300);
    }

    // Export theme settings
    exportTheme() {
        return {
            theme: this.currentTheme,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };
    }

    // Import theme settings
    importTheme(themeData) {
        if (themeData && themeData.theme) {
            this.applyTheme(themeData.theme);
        }
    }
}

// ===== THEME PRESETS =====
const themePresets = {
    light: {
        name: 'Light Theme',
        colors: {
            primary: '#6366f1',
            background: '#ffffff',
            text: '#1f2937'
        }
    },
    dark: {
        name: 'Dark Theme',
        colors: {
            primary: '#818cf8',
            background: '#0f172a',
            text: '#f9fafb'
        }
    },
    custom: {
        name: 'Custom Theme',
        colors: {
            primary: '#ec4899',
            background: '#fdf2f8',
            text: '#1f2937'
        }
    }
};

// ===== THEME UTILITIES =====
class ThemeUtils {
    static getThemeInfo(themeName) {
        return themePresets[themeName] || null;
    }

    static getAllThemes() {
        return Object.keys(themePresets);
    }

    static createCustomTheme(colors) {
        const customTheme = {
            name: 'Custom Theme',
            colors: {
                primary: colors.primary || '#6366f1',
                background: colors.background || '#ffffff',
                text: colors.text || '#1f2937'
            }
        };

        // Apply custom CSS properties
        const root = document.documentElement;
        root.style.setProperty('--primary-color', customTheme.colors.primary);
        root.style.setProperty('--bg-primary', customTheme.colors.background);
        root.style.setProperty('--text-primary', customTheme.colors.text);

        return customTheme;
    }

    static resetCustomTheme() {
        const root = document.documentElement;
        const customProperties = [
            '--primary-color',
            '--bg-primary', 
            '--text-primary'
        ];

        customProperties.forEach(prop => {
            root.style.removeProperty(prop);
        });
    }

    static getContrastRatio(color1, color2) {
        // Simplified contrast ratio calculation
        const getLuminance = (color) => {
            const rgb = parseInt(color.slice(1), 16);
            const r = (rgb >> 16) & 0xff;
            const g = (rgb >> 8) & 0xff;
            const b = (rgb >> 0) & 0xff;
            
            const [rs, gs, bs] = [r, g, b].map(c => {
                c = c / 255;
                return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
            });
            
            return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
        };

        const lum1 = getLuminance(color1);
        const lum2 = getLuminance(color2);
        const brightest = Math.max(lum1, lum2);
        const darkest = Math.min(lum1, lum2);
        
        return (brightest + 0.05) / (darkest + 0.05);
    }
}

// ===== THEME ANIMATIONS =====
class ThemeAnimations {
    static fadeTransition(duration = 300) {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--bg-primary);
            opacity: 0;
            pointer-events: none;
            z-index: 9999;
            transition: opacity ${duration}ms ease;
        `;
        
        document.body.appendChild(overlay);
        
        // Fade in
        setTimeout(() => {
            overlay.style.opacity = '0.5';
        }, 10);
        
        // Fade out
        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.remove();
            }, duration);
        }, duration / 2);
    }

    static slideTransition(direction = 'right', duration = 500) {
        const overlay = document.createElement('div');
        const translateX = direction === 'right' ? '100%' : '-100%';
        
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--bg-primary);
            transform: translateX(${direction === 'right' ? '-100%' : '100%'});
            pointer-events: none;
            z-index: 9999;
            transition: transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1);
        `;
        
        document.body.appendChild(overlay);
        
        // Slide in
        setTimeout(() => {
            overlay.style.transform = 'translateX(0)';
        }, 10);
        
        // Slide out
        setTimeout(() => {
            overlay.style.transform = `translateX(${translateX})`;
            setTimeout(() => {
                overlay.remove();
            }, duration);
        }, duration / 2);
    }

    static rippleTransition(event, duration = 800) {
        const ripple = document.createElement('div');
        const rect = document.body.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        const x = event ? event.clientX - size / 2 : window.innerWidth / 2 - size / 2;
        const y = event ? event.clientY - size / 2 : window.innerHeight / 2 - size / 2;
        
        ripple.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: var(--bg-primary);
            transform: scale(0);
            pointer-events: none;
            z-index: 9999;
            transition: transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1);
        `;
        
        document.body.appendChild(ripple);
        
        // Expand
        setTimeout(() => {
            ripple.style.transform = 'scale(1)';
        }, 10);
        
        // Remove
        setTimeout(() => {
            ripple.remove();
        }, duration);
    }
}

// ===== ACCESSIBILITY FEATURES =====
class ThemeAccessibility {
    static respectsReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    static respectsHighContrast() {
        return window.matchMedia('(prefers-contrast: high)').matches;
    }

    static applyAccessibilitySettings() {
        if (this.respectsReducedMotion()) {
            document.documentElement.style.setProperty('--transition-base', '0s');
            document.documentElement.style.setProperty('--transition-slow', '0s');
        }

        if (this.respectsHighContrast()) {
            document.documentElement.classList.add('high-contrast');
        }
    }
}

// ===== INITIALIZATION =====
let themeManager;

document.addEventListener('DOMContentLoaded', () => {
    themeManager = new ThemeManager();
    
    // Apply accessibility settings
    ThemeAccessibility.applyAccessibilitySettings();
    
    // Listen for system preference changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-reduced-motion: reduce)').addListener(() => {
            ThemeAccessibility.applyAccessibilitySettings();
        });
        
        window.matchMedia('(prefers-contrast: high)').addListener(() => {
            ThemeAccessibility.applyAccessibilitySettings();
        });
    }
});

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    // Ctrl + Shift + T to toggle theme
    if (e.ctrlKey && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        if (themeManager) {
            themeManager.toggleTheme();
        }
    }
});

// ===== EXPORT FOR GLOBAL ACCESS =====
window.ThemeManager = ThemeManager;
window.ThemeUtils = ThemeUtils;
window.ThemeAnimations = ThemeAnimations;

console.log('Theme system loaded successfully!');