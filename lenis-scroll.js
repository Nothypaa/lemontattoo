// Lenis Smooth Scrolling Implementation
// Separate file to keep main files lightweight

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Check if device is desktop (width > 1024px)
    const isDesktop = window.innerWidth > 1024;
    
    // Initialize Lenis only if it's available AND on desktop
    if (typeof Lenis !== 'undefined' && isDesktop) {
        
        // Create Lenis instance with optimized settings
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        // Animation frame function for Lenis
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Handle anchor links with Lenis
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    lenis.scrollTo(target, {
                        offset: -80, // Account for fixed navbar
                        duration: 1.5,
                        easing: (t) => 1 - Math.pow(1 - t, 3)
                    });
                }
            });
        });

        // Handle scroll arrow click
        const scrollArrow = document.querySelector('.scroll-arrow');
        if (scrollArrow) {
            scrollArrow.addEventListener('click', function() {
                const portfolioSection = document.querySelector('#portfolio');
                if (portfolioSection) {
                    lenis.scrollTo(portfolioSection, {
                        offset: -80,
                        duration: 1.8,
                        easing: (t) => 1 - Math.pow(1 - t, 4)
                    });
                }
            });
        }

        // Parallax effect for hero video
        const heroVideo = document.querySelector('.hero-video');
        if (heroVideo) {
            lenis.on('scroll', ({ scroll }) => {
                const scrollProgress = scroll / window.innerHeight;
                const parallaxOffset = scrollProgress * 50;
                heroVideo.style.transform = `translateX(-50%) translateY(-50%) scale(0.85) translateY(${parallaxOffset}px)`;
            });
        }

        // Smooth navbar background transition on scroll
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            lenis.on('scroll', ({ scroll }) => {
                if (scroll > 100) {
                    navbar.classList.add('navbar-scrolled');
                } else {
                    navbar.classList.remove('navbar-scrolled');
                }
            });
        }

        // Enhanced scroll progress indicator (optional)
        const createScrollProgress = () => {
            const progressBar = document.createElement('div');
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(90deg, #FFD900, #FFF200);
                z-index: 9999;
                transition: width 0.1s ease;
                box-shadow: 0 0 10px rgba(255, 217, 0, 0.5);
            `;
            document.body.appendChild(progressBar);

            lenis.on('scroll', ({ scroll, limit }) => {
                const progress = (scroll / limit) * 100;
                progressBar.style.width = `${Math.min(progress, 100)}%`;
            });
        };

        // Uncomment the line below if you want a scroll progress bar
        // createScrollProgress();

        // Make lenis instance available globally for debugging
        window.lenisInstance = lenis;
        
        // Console log for debugging
        console.log('Lenis smooth scrolling initialized successfully');

    } else {
        console.warn('Lenis library not found or mobile device. Smooth scrolling will fallback to native behavior.');
        
        // Fallback smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Portfolio image reveal animation - WORKS ON ALL DEVICES
    // Moved outside the desktop-only condition to fix mobile image loading
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const portfolioObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe portfolio items on all devices
    const portfolioItems = document.querySelectorAll('.tattoo-item');
    portfolioItems.forEach((item, index) => {
        // Set initial animation delay
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        portfolioObserver.observe(item);
    });
});

// Handle window resize for Lenis
window.addEventListener('resize', () => {
    const isDesktop = window.innerWidth > 1024;
    
    if (window.lenisInstance && isDesktop) {
        window.lenisInstance.resize();
    } else if (window.lenisInstance && !isDesktop) {
        // Destroy Lenis instance if switching to mobile/tablet
        window.lenisInstance.destroy();
        window.lenisInstance = null;
    }
}); 