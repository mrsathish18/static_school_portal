// Mobile Menu Toggle Logic
function initMobileMenu() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        // Render icons initially
        if (window.lucide) lucide.createIcons();

        // Remove existing listener to avoid duplicates if re-initted
        mobileBtn.replaceWith(mobileBtn.cloneNode(true));
        const newBtn = document.getElementById('mobile-menu-btn');

        newBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            
            // Toggle Icon
            const icon = newBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
                document.body.style.overflow = 'hidden'; // Prevent scroll
            } else {
                icon.setAttribute('data-lucide', 'menu');
                document.body.style.overflow = 'auto';
            }
            if (window.lucide) lucide.createIcons();
        });

        // Close menu when clicking links
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto';
                const icon = newBtn.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                if (window.lucide) lucide.createIcons();
            });
        });
    }

    // Header Scroll Effect
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else if (!header.classList.contains('always-scrolled')) {
                header.classList.remove('scrolled');
            }
        });
    }
}

// Interactive Scroll Reveal Logic
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(el => revealObserver.observe(el));
}

// Subtle Hero Parallax
function initHeroParallax() {
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollVal = window.pageYOffset;
            hero.style.backgroundPositionY = `${scrollVal * 0.5}px`;
        });
    }
}

// Notification Dot Logic
function updateNotificationDot() {
    const dot = document.getElementById('nav-notification-dot');
    if (!dot) return;

    try {
        const enquiries = JSON.parse(localStorage.getItem('school_enquiries') || '[]');
        const unreadEnquiries = enquiries.filter(e => e.isRead === false);
        const newCount = unreadEnquiries.length;
        
        if (newCount > 0) {
            dot.style.display = 'flex';
            dot.textContent = newCount > 9 ? '9+' : newCount;
        } else {
            dot.style.display = 'none';
        }
    } catch (e) {
        console.error("Error reading enquiries:", e);
    }
}

// Run all initializations
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initScrollReveal();
    initHeroParallax();
    updateNotificationDot();
});

// Refresh notifications when returning to page (handles BFCache)
window.addEventListener('pageshow', (event) => {
    updateNotificationDot();
});
