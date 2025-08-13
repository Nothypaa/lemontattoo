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
            tab.addEventListener('click', function() {
                const targetArtist = this.getAttribute('data-artist');
                
                // Remove active class from all tabs
                tabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Filter tattoo items with smooth animation
                tattooItems.forEach(item => {
                    const itemArtist = item.getAttribute('data-artist');
                    
                    if (targetArtist === 'all' || itemArtist === targetArtist) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                });
                
            });
        });
    }
    
    // Smooth scrolling for anchor links - moved to lenis-scroll.js to avoid conflicts

    // Modal functionality
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.querySelector('.modal-title');
    const modalClose = document.querySelector('.modal-close');
    const viewButtons = document.querySelectorAll('.view-btn');

    if (modal && modalImage && modalClose && viewButtons.length > 0) {
        // Open modal when view button is clicked
        viewButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const imgSrc = this.getAttribute('data-img');
                const title = this.getAttribute('data-title');
                
                if (imgSrc !== 'placeholder') {
                    modalImage.src = imgSrc;
                    modalImage.alt = title;
                    if (modalTitle) modalTitle.textContent = title;
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
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Show success message
                alert('Merci pour votre message ! Nous vous recontacterons rapidement.');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Optional: scroll to top of contact section
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 2000);
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
    
}); 