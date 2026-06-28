// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScroll();
    initNavbar();
    initContactForm();
});

// Smooth scrolling for navigation links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Update active nav link
                updateActiveNav(targetId);
            }
        });
    });
}

// Update active navigation link on scroll
function initNavbar() {
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        if (currentSection) {
            updateActiveNav('#' + currentSection);
        }
    });
}

// Update active navigation link styling
function updateActiveNav(targetId) {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`.nav-links a[href="${targetId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Simple contact form handler
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! (This is a demo)');
            this.reset();
        });
    }
}

// Log page load
console.log('🚀 Welcome to my school project website!');
console.log('Built with HTML, CSS, and JavaScript');
