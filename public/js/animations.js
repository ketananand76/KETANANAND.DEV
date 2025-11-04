// ===== ADVANCED ANIMATIONS =====

class AnimationManager {
    constructor() {
        this.observers = new Map();
        this.animations = new Map();
        this.init();
    }

    init() {
        this.initScrollAnimations();
        this.initParallaxEffects();
        this.initHoverAnimations();
        this.initLoadingAnimations();
        console.log('Animation manager initialized');
    }

    // ===== SCROLL ANIMATIONS =====
    initScrollAnimations() {
        // Main scroll observer
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Elements to animate on scroll
        const elementsToAnimate = document.querySelectorAll(`
            .animate-on-scroll,
            .animate-slide-up,
            .animate-slide-down,
            .animate-slide-left,
            .animate-slide-right,
            .animate-fade-in,
            .animate-scale-up,
            .project-card,
            .certificate-card,
            .timeline-item,
            .skill-item,
            .tool-item,
            .dashboard-card
        `);

        elementsToAnimate.forEach((el, index) => {
            // Add stagger delay
            el.style.transitionDelay = `${index * 0.1}s`;
            scrollObserver.observe(el);
        });

        this.observers.set('scroll', scrollObserver);
    }

    animateElement(element) {
        const animationClasses = [
            'animate-on-scroll',
            'animate-slide-up', 
            'animate-slide-down',
            'animate-slide-left',
            'animate-slide-right',
            'animate-fade-in',
            'animate-scale-up'
        ];

        // Add animate class
        animationClasses.forEach(className => {
            if (element.classList.contains(className)) {
                element.classList.add('animate');
            }
        });

        // Special animations for specific elements
        if (element.classList.contains('project-card')) {
            this.animateProjectCard(element);
        }

        if (element.classList.contains('timeline-item')) {
            this.animateTimelineItem(element);
        }

        if (element.classList.contains('dashboard-card')) {
            this.animateDashboardCard(element);
        }
    }

    animateProjectCard(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, 100);
    }

    animateTimelineItem(item) {
        const isEven = Array.from(item.parentNode.children).indexOf(item) % 2 === 1;
        const translateX = isEven ? '50px' : '-50px';
        
        item.style.opacity = '0';
        item.style.transform = `translateX(${translateX}) translateY(30px)`;
        
        setTimeout(() => {
            item.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0) translateY(0)';
        }, 200);
    }

    animateDashboardCard(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) rotateX(10deg)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) rotateX(0deg)';
        }, 150);
    }

    // ===== PARALLAX EFFECTS =====
    initParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.parallax, .hero, .particles');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            parallaxElements.forEach(element => {
                if (element.classList.contains('particles')) {
                    element.style.transform = `translateY(${parallax * 0.3}px)`;
                } else {
                    element.style.transform = `translateY(${parallax}px)`;
                }
            });
        });
    }

    // ===== HOVER ANIMATIONS =====
    initHoverAnimations() {
        // Magnetic effect for buttons
        const magneticElements = document.querySelectorAll('.btn, .project-card, .certificate-card');
        
        magneticElements.forEach(el => {
            el.addEventListener('mouseenter', (e) => {
                this.addMagneticEffect(e.target);
            });
            
            el.addEventListener('mouseleave', (e) => {
                this.removeMagneticEffect(e.target);
            });
        });

        // Tilt effect
        this.initTiltEffect();
        
        // Glow effect
        this.initGlowEffect();
    }

    addMagneticEffect(element) {
        element.addEventListener('mousemove', this.magneticMove);
        element.style.transition = 'transform 0.3s ease';
    }

    removeMagneticEffect(element) {
        element.removeEventListener('mousemove', this.magneticMove);
        element.style.transform = 'translate(0, 0) scale(1)';
    }

    magneticMove = (e) => {
        const rect = e.target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.1;
        const deltaY = (e.clientY - centerY) * 0.1;
        
        e.target.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.05)`;
    }

    initTiltEffect() {
        const tiltElements = document.querySelectorAll('.project-card, .certificate-card');
        
        tiltElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = e.target.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const rotateX = (e.clientY - centerY) / 10;
                const rotateY = (centerX - e.clientX) / 10;
                
                e.target.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });
            
            el.addEventListener('mouseleave', (e) => {
                e.target.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
            });
        });
    }

    initGlowEffect() {
        const glowElements = document.querySelectorAll('.btn-primary, .nav-link');
        
        glowElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.style.boxShadow = '0 0 20px var(--primary-color)';
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.boxShadow = '';
            });
        });
    }

    // ===== LOADING ANIMATIONS =====
    initLoadingAnimations() {
        // Skeleton loading
        this.createSkeletonLoaders();
        
        // Progressive image loading
        this.initProgressiveImageLoading();
        
        // Content reveal animation
        this.initContentReveal();
    }

    createSkeletonLoaders() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            if (!img.complete) {
                const skeleton = document.createElement('div');
                skeleton.className = 'skeleton';
                skeleton.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, var(--bg-tertiary) 25%, var(--bg-secondary) 50%, var(--bg-tertiary) 75%);
                    background-size: 200% 100%;
                    animation: loading 1.5s infinite;
                    border-radius: inherit;
                `;
                
                img.parentNode.style.position = 'relative';
                img.parentNode.appendChild(skeleton);
                
                img.addEventListener('load', () => {
                    skeleton.remove();
                });
            }
        });
    }

    initProgressiveImageLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('fade-in');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    initContentReveal() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                section.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    // ===== TEXT ANIMATIONS =====
    animateText(element, options = {}) {
        const {
            duration = 50,
            delay = 0,
            direction = 'forward'
        } = options;
        
        const text = element.textContent;
        element.textContent = '';
        
        const chars = text.split('');
        
        chars.forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = `all 0.5s cubic-bezier(0.4, 0, 0.2, 1)`;
            element.appendChild(span);
            
            const animationDelay = direction === 'forward' 
                ? delay + (index * duration)
                : delay + ((chars.length - index - 1) * duration);
            
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, animationDelay);
        });
    }

    // ===== UTILITY METHODS =====
    createRipple(element, event) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    morphElement(element, targetShape) {
        element.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        
        switch (targetShape) {
            case 'circle':
                element.style.borderRadius = '50%';
                break;
            case 'square':
                element.style.borderRadius = '0';
                break;
            case 'rounded':
                element.style.borderRadius = '20px';
                break;
        }
    }

    // ===== PERFORMANCE OPTIMIZATION =====
    optimizeAnimations() {
        // Use GPU acceleration
        const gpuElements = document.querySelectorAll('.animate-on-scroll, .project-card, .hero');
        gpuElements.forEach(el => {
            el.style.willChange = 'transform';
            el.style.transform = 'translate3d(0, 0, 0)';
        });

        // Reduce motion for users who prefer it
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--transition-base', '0.01ms');
            document.documentElement.style.setProperty('--transition-slow', '0.01ms');
        }
    }

    // ===== CLEANUP =====
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
        this.animations.clear();
    }
}

// ===== PARTICLE SYSTEM =====
class ParticleSystem {
    constructor(container, options = {}) {
        this.container = container;
        this.particles = [];
        this.options = {
            count: options.count || 50,
            size: options.size || 4,
            speed: options.speed || 1,
            colors: options.colors || ['#6366f1', '#06b6d4', '#f59e0b'],
            ...options
        };
        this.init();
    }

    init() {
        this.createParticles();
        this.animate();
    }

    createParticles() {
        for (let i = 0; i < this.options.count; i++) {
            const particle = {
                x: Math.random() * this.container.offsetWidth,
                y: Math.random() * this.container.offsetHeight,
                vx: (Math.random() - 0.5) * this.options.speed,
                vy: (Math.random() - 0.5) * this.options.speed,
                element: this.createParticleElement()
            };
            
            this.particles.push(particle);
            this.container.appendChild(particle.element);
        }
    }

    createParticleElement() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${this.options.size}px;
            height: ${this.options.size}px;
            background: ${this.options.colors[Math.floor(Math.random() * this.options.colors.length)]};
            border-radius: 50%;
            opacity: 0.6;
            pointer-events: none;
        `;
        return particle;
    }

    animate() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Boundary checking
            if (particle.x < 0 || particle.x > this.container.offsetWidth) {
                particle.vx *= -1;
            }
            if (particle.y < 0 || particle.y > this.container.offsetHeight) {
                particle.vy *= -1;
            }
            
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
        });
        
        requestAnimationFrame(() => this.animate());
    }

    destroy() {
        this.particles.forEach(particle => {
            particle.element.remove();
        });
        this.particles = [];
    }
}

// ===== MOUSE TRAIL EFFECT =====
class MouseTrail {
    constructor(options = {}) {
        this.trail = [];
        this.options = {
            length: options.length || 20,
            size: options.size || 6,
            color: options.color || 'var(--primary-color)',
            ...options
        };
        this.init();
    }

    init() {
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    }

    handleMouseMove(e) {
        this.trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        
        // Limit trail length
        if (this.trail.length > this.options.length) {
            this.trail.shift();
        }
        
        this.updateTrail();
    }

    updateTrail() {
        // Remove old trail elements
        document.querySelectorAll('.mouse-trail-dot').forEach(dot => dot.remove());
        
        // Create new trail
        this.trail.forEach((point, index) => {
            const dot = document.createElement('div');
            dot.className = 'mouse-trail-dot';
            const opacity = (index + 1) / this.trail.length;
            const size = (this.options.size * opacity);
            
            dot.style.cssText = `
                position: fixed;
                left: ${point.x - size / 2}px;
                top: ${point.y - size / 2}px;
                width: ${size}px;
                height: ${size}px;
                background: ${this.options.color};
                border-radius: 50%;
                opacity: ${opacity * 0.7};
                pointer-events: none;
                z-index: 9999;
                transition: all 0.1s ease;
            `;
            
            document.body.appendChild(dot);
        });
    }

    destroy() {
        document.removeEventListener('mousemove', this.handleMouseMove.bind(this));
        document.querySelectorAll('.mouse-trail-dot').forEach(dot => dot.remove());
    }
}

// ===== INITIALIZATION =====
let animationManager;
let particleSystem;
let mouseTrail;

document.addEventListener('DOMContentLoaded', () => {
    animationManager = new AnimationManager();
    
    // Initialize particle system for hero section
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        particleSystem = new ParticleSystem(particlesContainer, {
            count: 30,
            size: 3,
            speed: 0.5
        });
    }
    
    // Initialize mouse trail (optional - can be enabled/disabled)
    // mouseTrail = new MouseTrail({ length: 15, size: 4 });
    
    // Optimize animations for performance
    animationManager.optimizeAnimations();
});

// ===== EXPORT FOR GLOBAL ACCESS =====
window.AnimationManager = AnimationManager;
window.ParticleSystem = ParticleSystem;
window.MouseTrail = MouseTrail;

console.log('Advanced animations loaded successfully!');