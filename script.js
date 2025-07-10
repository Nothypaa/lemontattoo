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
    
    // Navbar scroll behavior - moved to lenis-scroll.js to avoid conflicts
    
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
                
                // Reset mobile show more state when filtering
                const showMoreBtn = document.getElementById('showMoreBtn');
                const galleryGrid = document.querySelector('.gallery-grid');
                
                if (showMoreBtn && galleryGrid && window.innerWidth <= 768) {
                    galleryGrid.classList.remove('show-all');
                    showMoreBtn.textContent = 'Voir plus d\'œuvres';
                    showMoreBtn.classList.remove('active');
                    // Reset the isExpanded flag (we'll need to make it accessible)
                    if (window.mobileShowMoreState) {
                        window.mobileShowMoreState.isExpanded = false;
                    }
                }
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
    
    // Mobile Show More functionality
    const showMoreBtn = document.getElementById('showMoreBtn');
    const galleryGrid = document.querySelector('.gallery-grid');
    
    if (showMoreBtn && galleryGrid) {
        // Create global state for mobile show more
        window.mobileShowMoreState = { isExpanded: false };
        
        showMoreBtn.addEventListener('click', function() {
            if (!window.mobileShowMoreState.isExpanded) {
                // Show all items
                galleryGrid.classList.add('show-all');
                showMoreBtn.textContent = 'Voir moins';
                showMoreBtn.classList.add('active');
                window.mobileShowMoreState.isExpanded = true;
            } else {
                // Hide items beyond first 3
                galleryGrid.classList.remove('show-all');
                showMoreBtn.textContent = 'Voir plus d\'œuvres';
                showMoreBtn.classList.remove('active');
                window.mobileShowMoreState.isExpanded = false;
                
                // Scroll back to top of portfolio section
                const portfolioSection = document.querySelector('#portfolio');
                if (portfolioSection) {
                    portfolioSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
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
            const subjects = formData.getAll('subject');
            
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
            
            if (subjects.length === 0) {
                alert('Veuillez sélectionner au moins un sujet.');
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
    
}); 