// ===== MAIN JAVASCRIPT FILE =====

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initLoader();
    initNavigation();
    initCustomCursor();
    initParticles();
    initTypingAnimation();
    initScrollAnimations();
    initSkillBars();
    initTimeline();
    initContactForm();
    initVisitorForm();
    initHireButton();
    initDashboard();
    initScrollProgress();
    initSmoothScrolling();
    initMobileMenu();
    initCertificateToggle();
    initProjectsToggle();
    
    console.log('Portfolio initialized successfully!');
});

// ===== LOADER =====
function initLoader() {
    const loader = document.getElementById('loader');
    
    setTimeout(() => {
        loader.classList.add('hide');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 2000);
}

// ===== NAVIGATION =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Update active navigation link based on scroll position
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===== CUSTOM CURSOR =====
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursor-follower');
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Smooth follower animation
    function animateFollower() {
        const speed = 0.1;
        followerX += (mouseX - followerX) * speed;
        followerY += (mouseY - followerY) * speed;
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    // Add hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-card, .certificate-card, .tool-item');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });
}

// ===== PARTICLES =====
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 6 + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// ===== TYPING ANIMATION =====
function initTypingAnimation() {
    const typedTextElement = document.getElementById('typed-text');
    const textArray = ['Web Developer', 'Graphics Designer', 'UI/UX Designer', 'Creative Thinker'];
    const typingDelay = 200;
    const erasingDelay = 100;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextElement.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }
    
    function erase() {
        if (charIndex > 0) {
            typedTextElement.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }
    
    setTimeout(type, newTextDelay + 250);
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll, .animate-slide-up, .animate-fade-in, .animate-scale-up');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// ===== SKILL BARS =====
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                skillBar.style.width = width + '%';
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// ===== TIMELINE ANIMATION =====
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// ===== CONTACT FORM =====
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message'),
                type: 'contact'
            };
            
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                showNotification('Message sent successfully! I will get back to you soon.', 'success');
                contactForm.reset();
                updateMessageCount();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification('Failed to send message. Please try emailing directly at ketanpaswan53@gmail.com', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// ===== VISITOR FORM =====
function initVisitorForm() {
    const visitorForm = document.getElementById('visitor-form');
    
    visitorForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(visitorForm);
        const state = formData.get('state');
        
        // Show loading state
        const submitBtn = visitorForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        submitBtn.disabled = true;
        
        try {
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                country: formData.get('country'),
                state: state,
                message: formData.get('message'),
                type: 'visitor_profile'
            };
            
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                showNotification('Profile submitted successfully!', 'success');
                visitorForm.reset();
                updateStateCount(state);
            } else {
                throw new Error('Failed to submit profile');
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification('Failed to submit profile. Please try emailing directly at ketanpaswan53@gmail.com', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// ===== HIRE BUTTON =====
function initHireButton() {
    const hireBtn = document.getElementById('hire-btn');
    
    hireBtn.addEventListener('click', () => {
        // Increment hire counter
        updateHireCount();
        
        // Show success message
        showNotification('Thank you for your interest! I will contact you soon.', 'success');
        
        // Add animation effect
        hireBtn.classList.add('animate-bounce-in');
        setTimeout(() => {
            hireBtn.classList.remove('animate-bounce-in');
        }, 600);
    });
}

// ===== DASHBOARD =====
function initDashboard() {
    // Initialize counters
    updateVisitorCount();
    loadDashboardData();
    
    // Animate counters when in view
    const counters = document.querySelectorAll('#visitor-count, #hire-count, #state-count, #message-count');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function updateVisitorCount() {
    let visitorCount = localStorage.getItem('visitorCount');
    if (!visitorCount) {
        visitorCount = 0;
    }
    visitorCount = parseInt(visitorCount) + 1;
    localStorage.setItem('visitorCount', visitorCount);
    
    document.getElementById('visitor-count').textContent = visitorCount;
}

function updateHireCount() {
    let hireCount = localStorage.getItem('hireCount');
    if (!hireCount) {
        hireCount = 0;
    }
    hireCount = parseInt(hireCount) + 1;
    localStorage.setItem('hireCount', hireCount);
    
    document.getElementById('hire-count').textContent = hireCount;
    animateCounter(document.getElementById('hire-count'));
}

function updateStateCount(newState) {
    let states = JSON.parse(localStorage.getItem('visitedStates') || '[]');
    if (!states.includes(newState)) {
        states.push(newState);
        localStorage.setItem('visitedStates', JSON.stringify(states));
        
        document.getElementById('state-count').textContent = states.length;
        animateCounter(document.getElementById('state-count'));
    }
}

function updateMessageCount() {
    let messageCount = localStorage.getItem('messageCount');
    if (!messageCount) {
        messageCount = 0;
    }
    messageCount = parseInt(messageCount) + 1;
    localStorage.setItem('messageCount', messageCount);
    
    document.getElementById('message-count').textContent = messageCount;
    animateCounter(document.getElementById('message-count'));
}

function loadDashboardData() {
    // Load saved data
    const hireCount = localStorage.getItem('hireCount') || '0';
    const states = JSON.parse(localStorage.getItem('visitedStates') || '[]');
    const messageCount = localStorage.getItem('messageCount') || '0';
    
    document.getElementById('hire-count').textContent = hireCount;
    document.getElementById('state-count').textContent = states.length;
    document.getElementById('message-count').textContent = messageCount;
}

function animateCounter(element) {
    const target = parseInt(element.textContent);
    const increment = Math.ceil(target / 20);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = current;
    }, 50);
    
    element.classList.add('counter');
}

// ===== SCROLL PROGRESS =====
function initScrollProgress() {
    // Create scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = scrollPercentage + '%';
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navbar = document.getElementById('navbar');
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ===== CERTIFICATE TOGGLE =====
function initCertificateToggle() {
    const toggleBtn = document.getElementById('certificates-toggle-btn');
    const certificatesSection = document.getElementById('certificates');
    const toggleText = toggleBtn.querySelector('.toggle-text');
    const toggleIcon = toggleBtn.querySelector('.toggle-icon');
    let isExpanded = false;
    
    // Get all hidden certificates
    const hiddenCerts = document.querySelectorAll('.certificate-card.hidden-cert');
    
    toggleBtn.addEventListener('click', function() {
        isExpanded = !isExpanded;
        
        if (isExpanded) {
            // Show all certificates immediately
            certificatesSection.classList.add('show-all');
            toggleText.textContent = 'See Less';
            toggleIcon.classList.remove('fa-chevron-down');
            toggleIcon.classList.add('fa-chevron-up');
            
            // Make hidden certificates visible immediately with stagger animation
            hiddenCerts.forEach((cert, index) => {
                cert.style.display = 'block';
                // Force reflow to ensure display change is applied
                void cert.offsetWidth;
                // Add staggered animation
                setTimeout(() => {
                    cert.style.opacity = '1';
                    cert.style.transform = 'translateY(0) scale(1)';
                }, index * 50); // Faster stagger (50ms instead of 100ms)
            });
            
            // Smooth scroll to keep the button in view
            setTimeout(() => {
                const buttonPosition = toggleBtn.offsetTop + toggleBtn.offsetHeight;
                const windowHeight = window.innerHeight;
                const scrollPosition = buttonPosition - windowHeight + 100;
                
                if (scrollPosition > window.scrollY) {
                    window.scrollTo({
                        top: scrollPosition,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        } else {
            // Hide extra certificates
            certificatesSection.classList.remove('show-all');
            toggleText.textContent = 'See More';
            toggleIcon.classList.remove('fa-chevron-up');
            toggleIcon.classList.add('fa-chevron-down');
            
            // Reset hidden certificates
            hiddenCerts.forEach(cert => {
                cert.style.opacity = '0';
                cert.style.transform = 'translateY(20px) scale(0.95)';
            });
            
            // Scroll back to certificates section top
            setTimeout(() => {
                const navbar = document.getElementById('navbar');
                const navbarHeight = navbar.offsetHeight;
                const certificatesTop = certificatesSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: certificatesTop,
                    behavior: 'smooth'
                });
            }, 100);
        }
    });
    
    // Apply initial styles for hidden certificates
    hiddenCerts.forEach(cert => {
        cert.style.opacity = '0';
        cert.style.transform = 'translateY(20px) scale(0.95)';
        cert.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
}

// ===== PROJECTS TOGGLE =====
function initProjectsToggle() {
    const toggleBtn = document.getElementById('projects-toggle-btn');
    const projectsSection = document.getElementById('projects');
    
    // Check if elements exist
    if (!toggleBtn || !projectsSection) {
        return; // Exit if elements not found
    }
    
    const toggleText = toggleBtn.querySelector('.toggle-text');
    const toggleIcon = toggleBtn.querySelector('.toggle-icon');
    let isExpanded = false;
    
    toggleBtn.addEventListener('click', function() {
        isExpanded = !isExpanded;
        
        if (isExpanded) {
            // Show all projects
            projectsSection.classList.add('show-all');
            toggleText.textContent = 'See Less';
            toggleIcon.classList.remove('fa-chevron-down');
            toggleIcon.classList.add('fa-chevron-up');
            
            // Smooth scroll to keep the button in view
            setTimeout(() => {
                const buttonPosition = toggleBtn.offsetTop + toggleBtn.offsetHeight;
                const windowHeight = window.innerHeight;
                const scrollPosition = buttonPosition - windowHeight + 100;
                
                if (scrollPosition > window.scrollY) {
                    window.scrollTo({
                        top: scrollPosition,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        } else {
            // Hide extra projects
            projectsSection.classList.remove('show-all');
            toggleText.textContent = 'See More';
            toggleIcon.classList.remove('fa-chevron-up');
            toggleIcon.classList.add('fa-chevron-down');
            
            // Scroll back to projects section top
            setTimeout(() => {
                const navbar = document.getElementById('navbar');
                const navbarHeight = navbar.offsetHeight;
                const projectsTop = projectsSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: projectsTop,
                    behavior: 'smooth'
                });
            }, 100);
        }
    });
    
    // Add smooth animation when projects are shown/hidden
    const hiddenProjects = document.querySelectorAll('.project-card.hidden-project');
    
    // Observer to animate projects when they become visible
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100); // Stagger animation
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Apply initial styles for hidden projects
    hiddenProjects.forEach(project => {
        project.style.opacity = '0';
        project.style.transform = 'translateY(20px)';
        project.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        projectObserver.observe(project);
    });
}

// ===== UTILITY FUNCTIONS =====

function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'var(--success-color)' : 'var(--danger-color)'};
        color: white;
        border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-lg);
        z-index: 10001;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Add ripple effect to buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) {
        const button = e.target;
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
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
        
        ripple.className = 'ripple';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Handle form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Enhanced form validation
document.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('blur', function() {
        const value = this.value.trim();
        const isRequired = this.hasAttribute('required');
        const isEmail = this.type === 'email';
        
        // Remove existing error styling
        this.classList.remove('error');
        
        if (isRequired && !value) {
            this.classList.add('error');
            return;
        }
        
        if (isEmail && value && !validateEmail(value)) {
            this.classList.add('error');
            return;
        }
    });
    
    field.addEventListener('focus', function() {
        this.classList.remove('error');
    });
});

// Add error styles
const errorStyles = `
.form-group input.error,
.form-group textarea.error {
    border-color: var(--danger-color);
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = errorStyles;
document.head.appendChild(styleSheet);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events for better performance
const debouncedScrollHandler = debounce(() => {
    // Scroll-related updates can be added here if needed
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

console.log('Main JavaScript loaded successfully!');

// ===== TESTIMONIALS CAROUSEL =====
function initTestimonials() {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    const carousel = document.getElementById('testimonials-carousel');
    
    let currentSlide = 0;
    let autoScrollInterval;
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Initialize testimonials
    if (testimonialItems.length === 0) return;
    
    // Show first testimonial
    showTestimonial(0);
    
    // Auto-scroll functionality
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonialItems.length;
            showTestimonial(currentSlide);
        }, 5000); // Change testimonial every 5 seconds
    }
    
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }
    
    // Show specific testimonial
    function showTestimonial(index) {
        // Hide all testimonials
        testimonialItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current testimonial
        testimonialItems[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // Next testimonial
    function nextTestimonial() {
        currentSlide = (currentSlide + 1) % testimonialItems.length;
        showTestimonial(currentSlide);
        stopAutoScroll();
        startAutoScroll(); // Reset auto-scroll timer
    }
    
    // Previous testimonial
    function prevTestimonial() {
        currentSlide = (currentSlide - 1 + testimonialItems.length) % testimonialItems.length;
        showTestimonial(currentSlide);
        stopAutoScroll();
        startAutoScroll(); // Reset auto-scroll timer
    }
    
    // Event listeners for navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', prevTestimonial);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextTestimonial);
    }
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
            stopAutoScroll();
            startAutoScroll(); // Reset auto-scroll timer
        });
    });
    
    // Touch/swipe support for mobile
    function handleTouchStart(e) {
        touchStartX = e.changedTouches[0].screenX;
    }
    
    function handleTouchEnd(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchStartX - touchEndX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // Swipe left - next testimonial
                nextTestimonial();
            } else {
                // Swipe right - previous testimonial
                prevTestimonial();
            }
        }
    }
    
    // Add touch event listeners
    if (carousel) {
        carousel.addEventListener('touchstart', handleTouchStart, { passive: true });
        carousel.addEventListener('touchend', handleTouchEnd, { passive: true });
    }
    
    // Pause auto-scroll on hover
    const testimonialContainer = document.querySelector('.testimonials-container');
    if (testimonialContainer) {
        testimonialContainer.addEventListener('mouseenter', stopAutoScroll);
        testimonialContainer.addEventListener('mouseleave', startAutoScroll);
    }
    
    // Pause auto-scroll when page is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoScroll();
        } else {
            startAutoScroll();
        }
    });
    
    // Start auto-scroll
    startAutoScroll();
    
    console.log('Testimonials carousel initialized successfully!');
}

// Initialize testimonials when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTestimonials();
});