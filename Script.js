// ============================================
// PROFESSIONAL PORTFOLIO - MAIN SCRIPT
// ============================================

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);

/**
 * Main application initialization
 */
function initializeApp() {
    setupNavigation();
    setupSmoothScroll();
    setupContactForm();
    setupScrollToTop();
    setupIntersectionObserver();
    setupEventListeners();
    logApplicationStart();
}

// ============================================
// NAVIGATION SETUP
// ============================================

/**
 * Setup and manage navigation functionality
 */
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Update active nav on page load
    updateActiveNavigation();
    
    // Update active nav on scroll
    window.addEventListener('scroll', debounce(() => {
        updateActiveNavigation();
    }, 100));
    
    // Add click handler to all nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    updateActiveNavigation();
                }
            }
        });
    });
}

/**
 * Update which navigation link is marked as active
 */
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.scrollY + 100;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = '#' + section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentSection) {
            link.classList.add('active');
        }
    });
}

// ============================================
// SMOOTH SCROLL SETUP
// ============================================

/**
 * Setup smooth scrolling for all anchor links
 */
function setupSmoothScroll() {
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;
        
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update active nav after scroll
            setTimeout(() => {
                updateActiveNavigation();
            }, 100);
        }
    });
}

// ============================================
// CONTACT FORM SETUP
// ============================================

/**
 * Setup contact form functionality
 */
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', handleFormSubmission);
    
    // Add real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateInput);
        input.addEventListener('focus', removeInputError);
    });
}

/**
 * Handle form submission
 */
function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const nameInput = form.querySelector('input[type="text"]');
    const emailInput = form.querySelector('input[type="email"]');
    const messageInput = form.querySelector('textarea');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Clear previous errors
    clearFormErrors(form);
    
    // Validate all inputs
    const isNameValid = validateInput.call(nameInput);
    const isEmailValid = validateEmailInput.call(emailInput);
    const isMessageValid = validateInput.call(messageInput);
    
    if (!isNameValid || !isEmailValid || !isMessageValid) {
        showNotification('Please fill in all fields correctly', 'error');
        return;
    }
    
    // Get form data
    const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        message: messageInput.value.trim(),
        timestamp: new Date().toISOString()
    };
    
    // Disable button and show loading state
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    submitBtn.style.opacity = '0.7';
    
    // Simulate form submission
    submitFormData(formData, function() {
        // Success callback
        showNotification('✓ Thank you! We received your message and will get back to you soon.', 'success');
        form.reset();
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        submitBtn.style.opacity = '1';
        
        // Log form submission
        console.log('Form submitted successfully:', formData);
    }, function(error) {
        // Error callback
        showNotification('✗ Something went wrong. Please try again.', 'error');
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        submitBtn.style.opacity = '1';
        
        console.error('Form submission error:', error);
    });
}

/**
 * Validate text input
 */
function validateInput() {
    const value = this.value.trim();
    const isValid = value.length > 0;
    
    if (!isValid) {
        this.style.borderColor = '#f85149';
        this.style.boxShadow = '0 0 0 3px rgba(248, 81, 73, 0.1)';
    } else {
        this.style.borderColor = '#30363d';
        this.style.boxShadow = 'none';
    }
    
    return isValid;
}

/**
 * Validate email input
 */
function validateEmailInput() {
    const value = this.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = value.length > 0 && emailRegex.test(value);
    
    if (!isValid) {
        this.style.borderColor = '#f85149';
        this.style.boxShadow = '0 0 0 3px rgba(248, 81, 73, 0.1)';
    } else {
        this.style.borderColor = '#30363d';
        this.style.boxShadow = 'none';
    }
    
    return isValid;
}

/**
 * Remove error styling from input
 */
function removeInputError() {
    this.style.borderColor = '#30363d';
    this.style.boxShadow = 'none';
}

/**
 * Clear all form errors
 */
function clearFormErrors(form) {
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.style.borderColor = '#30363d';
        input.style.boxShadow = 'none';
    });
}

/**
 * Submit form data (simulated)
 */
function submitFormData(formData, successCallback, errorCallback) {
    // Simulate API request with random delay
    const delay = Math.random() * 1000 + 1000; // 1-2 seconds
    
    setTimeout(() => {
        // Simulate 95% success rate
        if (Math.random() < 0.95) {
            successCallback();
        } else {
            errorCallback(new Error('Network error'));
        }
    }, delay);
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================

/**
 * Setup scroll to top button
 */
function setupScrollToTop() {
    let scrollBtn = document.querySelector('.scroll-to-top');
    
    // Create button if it doesn't exist
    if (!scrollBtn) {
        scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.innerHTML = '↑';
        scrollBtn.setAttribute('title', 'Scroll to top');
        scrollBtn.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollBtn);
    }
    
    // Show/hide button on scroll
    window.addEventListener('scroll', debounce(() => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    }, 100));
    
    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// INTERSECTION OBSERVER
// ============================================

/**
 * Setup intersection observer for scroll animations
 */
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class
                entry.target.style.opacity = '1';
                entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe service cards and portfolio items
    document.querySelectorAll('.service-card, .portfolio-item').forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
}

// ============================================
// EVENT LISTENERS
// ============================================

/**
 * Setup additional event listeners
 */
function setupEventListeners() {
    // Handle window resize
    window.addEventListener('resize', debounce(() => {
        console.log('Window resized');
    }, 300));
    
    // Handle visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            console.log('Page is hidden');
        } else {
            console.log('Page is visible');
        }
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

/**
 * Handle keyboard shortcuts
 */
function handleKeyboardShortcuts(e) {
    // Ctrl/Cmd + K to focus search (future implementation)
    // if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    //     e.preventDefault();
    //     // Focus search
    // }
    
    // Escape to close modals (future implementation)
    if (e.key === 'Escape') {
        // Close any open modals
    }
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================

/**
 * Show notification to user
 */
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    notification.setAttribute('aria-atomic', 'true');
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Trigger animation
    requestAnimationFrame(() => {
        notification.style.animation = 'slideInRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease-out forwards';
        setTimeout(() => notification.remove(), 400);
    }, 4000);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {Number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
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

/**
 * Throttle function to limit function calls
 * @param {Function} func - Function to throttle
 * @param {Number} limit - Limit time in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    
    return function(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Get element position
 */
function getElementPosition(element) {
    return {
        top: element.offsetTop,
        left: element.offsetLeft,
        width: element.offsetWidth,
        height: element.offsetHeight
    };
}

/**
 * Check if element is in viewport
 */
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
        rect.bottom >= 0 &&
        rect.right >= 0
    );
}

/**
 * Add class to element with delay
 */
function addClassWithDelay(element, className, delay = 0) {
    setTimeout(() => {
        element.classList.add(className);
    }, delay);
}

/**
 * Remove class from element
 */
function removeClassAfterDelay(element, className, delay = 0) {
    setTimeout(() => {
        element.classList.remove(className);
    }, delay);
}

// ============================================
// PERFORMANCE MONITORING
// ============================================

/**
 * Log application start and performance metrics
 */
function logApplicationStart() {
    // Check if performance API is available
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        console.log('%c🚀 Professional Portfolio', 'font-size: 18px; color: #1f6feb; font-weight: bold;');
        console.log('%cApplication initialized successfully', 'color: #238636; font-weight: 500;');
        console.log(`%cPage Load Time: ${pageLoadTime}ms`, 'color: #8b949e; font-size: 12px;');
        console.log('%cBuilt with HTML5, CSS3 & Vanilla JavaScript', 'color: #8b949e; font-size: 11px;');
    } else {
        console.log('%c🚀 Professional Portfolio Loaded', 'font-size: 16px; color: #1f6feb; font-weight: bold;');
    }
    
    // Log environment info
    console.log('%cEnvironment Info:', 'font-weight: bold; color: #8b949e;');
    console.log('User Agent:', navigator.userAgent.substring(0, 50) + '...');
    console.log('Viewport:', `${window.innerWidth}x${window.innerHeight}`);
}

// ============================================
// ERROR HANDLING
// ============================================

/**
 * Global error handler
 */
window.addEventListener('error', function(event) {
    console.error('❌ Application Error:', event.error);
    // In production, send to error tracking service
});

/**
 * Handle unhandled promise rejections
 */
window.addEventListener('unhandledrejection', function(event) {
    console.error('❌ Unhandled Promise Rejection:', event.reason);
    // In production, send to error tracking service
});

/**
 * Handle page unload
 */
window.addEventListener('beforeunload', function(event) {
    // You can optionally prompt user before leaving
    // event.preventDefault();
    // event.returnValue = '';
});

// ============================================
// ADVANCED FEATURES
// ============================================

/**
 * Animate counter numbers
 */
function animateCounter(element, targetValue, duration = 2000) {
    const startValue = 0;
    const startTime = Date.now();
    
    const updateCounter = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = Math.floor(startValue + (targetValue - startValue) * progress);
        
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    };
    
    requestAnimationFrame(updateCounter);
}

/**
 * Lazy load images
 */
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

/**
 * Setup local storage management
 */
function setupLocalStorage() {
    // Save user preferences
    window.saveUserPreference = function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('LocalStorage error:', error);
            return false;
        }
    };
    
    // Get user preferences
    window.getUserPreference = function(key, defaultValue = null) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } catch (error) {
            console.error('LocalStorage error:', error);
            return defaultValue;
        }
    };
}

// Initialize local storage on app start
setupLocalStorage();
