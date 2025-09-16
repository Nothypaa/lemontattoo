// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation functionality
    const hamburger = document.querySelector('.hamburger');
    const navbarMenu = document.querySelector('.navbar-menu');
    const navbar = document.querySelector('.navbar');
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navbarMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.navbar-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navbarMenu.classList.remove('active');
        });
    });
    
    // Scroll to Top Button functionality
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    // Accueil Button functionality
    const accueilBtn = document.getElementById('navbarAccueil');
    const heroSectionForAccueil = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        // Scroll to Top Button
        if (window.scrollY > 300) { // Show button after scrolling 300px
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
        
        // Accueil Button - show when past hero section
        if (heroSectionForAccueil && accueilBtn) {
            const heroHeight = heroSectionForAccueil.offsetHeight;
            if (window.scrollY > heroHeight - 100) { // Show 100px before end of hero
                accueilBtn.classList.add('show');
            } else {
                accueilBtn.classList.remove('show');
            }
        }
    });
    
    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Ensure video starts playing (fallback for autoplay issues)
    const video = document.querySelector('.hero-video');
    if (video) {
        video.play().catch(function(error) {
            console.log('Video autoplay failed:', error);
        });
    }
    
    // Handle video loading
    video.addEventListener('loadeddata', function() {
        console.log('Video loaded successfully');
    });
    
    video.addEventListener('error', function(e) {
        console.error('Video failed to load:', e);
    });
    
    // Portfolio tab functionality
    const tabs = document.querySelectorAll('.artist-tab');
    const tattooItems = document.querySelectorAll('.tattoo-item');
    
    if (tabs.length > 0) {
        tabs.forEach(tab => {
            // Add both click and touchend events for better mobile support
            const handleTabClick = function(e) {
                e.preventDefault();
                const targetArtist = this.getAttribute('data-artist');
                
                // Remove active class from all tabs
                tabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Filter tattoo items with smooth animation
                tattooItems.forEach(item => {
                    const itemArtist = item.getAttribute('data-artist');
                    
                    if (targetArtist === 'all' || itemArtist === targetArtist) {
                        // Reset display first, then remove hidden for smooth transition
                        item.style.display = 'block';
                        // Use requestAnimationFrame to ensure display is set before animation
                        requestAnimationFrame(() => {
                            item.classList.remove('hidden');
                        });
                    } else {
                        item.classList.add('hidden');
                        // Only set display none after animation completes for mobile
                        if (window.innerWidth <= 480) {
                            setTimeout(() => {
                                if (item.classList.contains('hidden')) {
                                    item.style.display = 'none';
                                }
                            }, 350); // Slightly longer than CSS transition
                        }
                    }
                });
                
                // Force reflow on mobile to ensure proper display
                if (window.innerWidth <= 480) {
                    setTimeout(() => {
                        const portfolioGrid = document.querySelector('.portfolio-grid');
                        if (portfolioGrid) {
                            portfolioGrid.style.display = 'none';
                            portfolioGrid.offsetHeight; // Force reflow
                            portfolioGrid.style.display = 'grid';
                        }
                    }, 100);
                }
            };
            
            tab.addEventListener('click', handleTabClick);
            tab.addEventListener('touchend', handleTabClick);
        });
    }
    
    // Smooth scrolling for anchor links - moved to lenis-scroll.js to avoid conflicts

    // Modal functionality
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.querySelector('.modal-close');
    const viewButtons = document.querySelectorAll('.view-btn');

    if (modal && modalImage && modalClose && viewButtons.length > 0) {
        // Open modal when view button is clicked
        viewButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const imgSrc = this.getAttribute('data-img');
                
                if (imgSrc !== 'placeholder') {
                    modalImage.src = imgSrc;
                    modalImage.alt = 'Tatouage Lemon Tattoo';
                    modal.classList.add('show');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Close modal
        function closeModal() {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }

        modalClose.addEventListener('click', closeModal);
        
        // Close modal when clicking outside the image
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close modal with escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });
    }
    
    
    // Contact form functionality
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const phone = formData.get('phone').trim();
            const message = formData.get('message').trim();
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Veuillez entrer une adresse email valide.');
                return;
            }
            
            // Get submit button
            const submitBtn = contactForm.querySelector('.form-submit');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'ENVOI EN COURS...';
            submitBtn.disabled = true;
            
            // Submit to Formspree
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    // Success
                    alert('Merci pour votre message ! Nous vous recontacterons rapidement.');
                    contactForm.reset();
                } else {
                    // Error
                    response.json().then(data => {
                        if (Object.hasOwnProperty.call(data, 'errors')) {
                            alert('Il y a eu un problème avec votre soumission:\n' + data["errors"].map(error => error["message"]).join(", "));
                        } else {
                            alert('Oups! Il y a eu un problème lors de l\'envoi de votre message.');
                        }
                    });
                }
            }).catch(error => {
                // Network or other error
                alert('Oups! Il y a eu un problème lors de l\'envoi de votre message.');
            }).finally(() => {
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
        
        // Add real-time validation
        const inputs = contactForm.querySelectorAll('.form-input, .form-textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                // Remove error styling on input
                this.style.borderColor = '';
            });
        });
        
        function validateField(field) {
            const value = field.value.trim();
            const fieldType = field.type;
            
            if (field.hasAttribute('required') && !value) {
                showFieldError(field, 'Ce champ est obligatoire.');
                return false;
            }
            
            if (fieldType === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    showFieldError(field, 'Adresse email invalide.');
                    return false;
                }
            }
            
            // Clear any existing error
            clearFieldError(field);
            return true;
        }
        
        function showFieldError(field, message) {
            field.style.borderColor = '#ff4444';
            
            // Remove existing error message
            clearFieldError(field);
            
            // Create and append error message
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.textContent = message;
            errorDiv.style.color = '#ff4444';
            errorDiv.style.fontSize = '0.85rem';
            errorDiv.style.marginTop = '0.25rem';
            
            field.parentNode.appendChild(errorDiv);
        }
        
        function clearFieldError(field) {
            const existingError = field.parentNode.querySelector('.field-error');
            if (existingError) {
                existingError.remove();
            }
        }
    }
    
    // Phone field visibility functionality
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneGroup = document.getElementById('phoneGroup');
    
    if (nameInput && emailInput && phoneGroup) {
        // Set initial state properly
        phoneGroup.style.display = 'none';
        phoneGroup.style.opacity = '0';
        phoneGroup.style.transform = 'translateY(-10px)';
        phoneGroup.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        
        function checkPhoneVisibility() {
            const nameValue = nameInput.value.trim();
            const emailValue = emailInput.value.trim();
            
            // Show phone field when both name and email have values
            if (nameValue && emailValue) {
                // First set display to flex to maintain proper form layout
                phoneGroup.style.display = 'flex';
                phoneGroup.style.opacity = '0';
                phoneGroup.style.transform = 'translateY(-10px)';
                
                // Force reflow and then animate
                phoneGroup.offsetHeight;
                
                setTimeout(() => {
                    phoneGroup.style.opacity = '1';
                    phoneGroup.style.transform = 'translateY(0)';
                }, 50);
            } else {
                // Hide phone field with animation
                phoneGroup.style.opacity = '0';
                phoneGroup.style.transform = 'translateY(-10px)';
                
                setTimeout(() => {
                    if (!nameValue || !emailValue) {
                        phoneGroup.style.display = 'none';
                    }
                }, 400);
            }
        }
        
        // Add event listeners with debouncing for smoother experience
        let timeout;
        function debouncedCheck() {
            clearTimeout(timeout);
            timeout = setTimeout(checkPhoneVisibility, 100);
        }
        
        nameInput.addEventListener('input', debouncedCheck);
        nameInput.addEventListener('blur', checkPhoneVisibility);
        emailInput.addEventListener('input', debouncedCheck);
        emailInput.addEventListener('blur', checkPhoneVisibility);
    }
    
    // Floating CTA functionality
    const floatingCta = document.getElementById('floatingCta');
    const heroSection = document.querySelector('.hero');
    
    if (floatingCta && heroSection) {
        let isVisible = false;
        let ticking = false;
        
        function updateFloatingCta() {
            const heroHeight = heroSection.offsetHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            
            // Show floating CTA when user scrolls past 80% of hero section
            const showThreshold = heroHeight * 0.8;
            const shouldShow = scrollTop > showThreshold;
            
            if (shouldShow && !isVisible) {
                // Show with slide-in animation
                floatingCta.classList.remove('slide-out');
                floatingCta.classList.add('visible');
                floatingCta.classList.add('slide-in');
                isVisible = true;
            } else if (!shouldShow && isVisible) {
                // Hide with slide-out animation
                floatingCta.classList.remove('slide-in');
                floatingCta.classList.add('slide-out');
                
                // Remove visible class after animation completes
                setTimeout(() => {
                    if (!isVisible) return; // Prevent race condition
                    floatingCta.classList.remove('visible');
                    floatingCta.classList.remove('slide-out');
                }, 500); // Match the animation duration
                
                isVisible = false;
            }
            
            // Optional: Hide when near footer to avoid overlap
            const footer = document.querySelector('footer') || document.querySelector('.contact');
            if (footer && isVisible) {
                const footerRect = footer.getBoundingClientRect();
                const windowBottom = windowHeight;
                
                if (footerRect.top < windowBottom + 100) {
                    floatingCta.classList.add('near-footer');
                } else {
                    floatingCta.classList.remove('near-footer');
                }
            }
            
            ticking = false;
        }
        
        function requestUpdateFloatingCta() {
            if (!ticking) {
                requestAnimationFrame(updateFloatingCta);
                ticking = true;
            }
        }
        
        // Listen for scroll events
        window.addEventListener('scroll', requestUpdateFloatingCta);
        
        // Initial check
        updateFloatingCta();
        
        // Handle resize events
        window.addEventListener('resize', function() {
            // Reset visibility state on resize
            setTimeout(updateFloatingCta, 100);
        });
    }
    
    // FAQ Section functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentNode;
            const faqAnswer = faqItem.querySelector('.faq-answer');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Close all other FAQ items
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this) {
                    const otherItem = otherQuestion.parentNode;
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    otherQuestion.setAttribute('aria-expanded', 'false');
                    otherAnswer.classList.remove('active');
                }
            });
            
            // Toggle current FAQ item
            if (isExpanded) {
                this.setAttribute('aria-expanded', 'false');
                faqAnswer.classList.remove('active');
            } else {
                this.setAttribute('aria-expanded', 'true');
                faqAnswer.classList.add('active');
            }
        });
    });
    
    // Reviews infinite scrolling animation
    const reviewsTrack = document.getElementById('reviewsTrack');
    const reviewsContainer = document.querySelector('.reviews-container');
    
    if (reviewsTrack && typeof gsap !== 'undefined') {
        // Calculate the width of one complete set of reviews (now 9 unique reviews)
        const reviewCards = reviewsTrack.querySelectorAll('.review-card');
        const totalCards = reviewCards.length;
        const uniqueReviews = totalCards / 2; // We have duplicates, so divide by 2
        const cardWidth = 350;
        const gap = 30;
        const oneSetWidth = (cardWidth + gap) * uniqueReviews;
        
        // Create truly seamless infinite scrolling using modulus
        gsap.set(reviewsTrack, { x: 0 });
        
        // Use a continuous animation that wraps seamlessly
        const scrollAnimation = gsap.to(reviewsTrack, {
            x: -oneSetWidth,
            duration: 60, // Increased from 40 to 60 seconds for slower scrolling
            ease: "none",
            repeat: -1,
            modifiers: {
                x: function(x) {
                    // This creates seamless wrapping without jumps
                    return (parseFloat(x) % oneSetWidth) + "px";
                }
            }
        });
        
        // Pause on hover
        if (reviewsContainer) {
            reviewsContainer.addEventListener('mouseenter', () => {
                scrollAnimation.pause();
            });
            
            reviewsContainer.addEventListener('mouseleave', () => {
                scrollAnimation.resume();
            });
        }
        
        // Enhanced mobile touch interaction
        let touchHoldTimer = null;
        let isHolding = false;
        let startX = 0;
        let isDragging = false;
        
        // Touch start - begin hold detection
        reviewsContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = false;
            isHolding = false;
            
            // Start hold timer (500ms to detect hold)
            touchHoldTimer = setTimeout(() => {
                isHolding = true;
                scrollAnimation.pause();
            }, 500);
        });
        
        // Touch move - detect if user is dragging/scrolling
        reviewsContainer.addEventListener('touchmove', (e) => {
            if (Math.abs(e.touches[0].clientX - startX) > 10) {
                isDragging = true;
                // Cancel hold detection if user is scrolling
                if (touchHoldTimer) {
                    clearTimeout(touchHoldTimer);
                    touchHoldTimer = null;
                }
            }
        });
        
        // Touch end - resume animation based on interaction type
        reviewsContainer.addEventListener('touchend', () => {
            // Clear hold timer
            if (touchHoldTimer) {
                clearTimeout(touchHoldTimer);
                touchHoldTimer = null;
            }
            
            // Resume animation after delay
            setTimeout(() => {
                if (!isDragging && !isHolding) {
                    // Quick tap - brief pause then resume
                    setTimeout(() => scrollAnimation.resume(), 500);
                } else if (isHolding) {
                    // Was holding - longer pause then resume
                    setTimeout(() => scrollAnimation.resume(), 2000);
                } else {
                    // Was dragging - immediate resume
                    scrollAnimation.resume();
                }
                isDragging = false;
                isHolding = false;
            }, 100);
        });
        
        // Touch cancel - cleanup
        reviewsContainer.addEventListener('touchcancel', () => {
            if (touchHoldTimer) {
                clearTimeout(touchHoldTimer);
                touchHoldTimer = null;
            }
            isHolding = false;
            isDragging = false;
            scrollAnimation.resume();
        });
        
    } else if (reviewsTrack) {
        // Fallback CSS animation if GSAP is not available
        reviewsTrack.style.animation = 'scroll-reviews 60s linear infinite';
        
        // Add CSS keyframes for fallback
        const reviewCards = reviewsTrack.querySelectorAll('.review-card');
        const totalCards = reviewCards.length;
        const uniqueReviews = totalCards / 2; // We have duplicates, so divide by 2
        const cardWidth = 350;
        const gap = 30;
        const oneSetWidth = (cardWidth + gap) * uniqueReviews;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes scroll-reviews {
                0% { transform: translateX(0); }
                100% { transform: translateX(-${oneSetWidth}px); }
            }
        `;
        document.head.appendChild(style);
        
        // Pause on hover fallback
        if (reviewsContainer) {
            reviewsContainer.addEventListener('mouseenter', () => {
                reviewsTrack.style.animationPlayState = 'paused';
            });
            
            reviewsContainer.addEventListener('mouseleave', () => {
                reviewsTrack.style.animationPlayState = 'running';
            });
        }
    }

    // Intersection Observer for triggering animations on scroll
    function initAnimationTriggers() {
        // Observer options
        const observerOptions = {
            root: null,
            rootMargin: '-10% 0px -10% 0px', // Trigger when 10% of element is visible
            threshold: 0.2
        };

        // Create the observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add the animate-play class to trigger animations
                    entry.target.classList.add('animate-play');
                    // Stop observing once triggered (one-time animation)
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all elements with animate-trigger class
        const animateElements = document.querySelectorAll('.animate-trigger');
        animateElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Initialize animation triggers
    initAnimationTriggers();

});