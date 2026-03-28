/* ================================================
   LUXE HAVEN HOTEL - MAIN JAVASCRIPT
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initThemeToggle();
    initMobileMenu();
    initHeroSlider();
    initScrollAnimations();
    initRoomFilters();
    initFAQAccordion();
    initContactForm();
    initBookingForm();
    initStickyHeader();
    initCounterAnimation();
    initTypingEffect();
});

/* ============ THEME TOGGLE ============ */
function initThemeToggle() {
    const themeBtn = document.getElementById('theme-btn');
    if (!themeBtn) return;
    
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const themeBtn = document.getElementById('theme-btn');
    if (!themeBtn) return;
    
    const icon = themeBtn.querySelector('i');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

/* ============ MOBILE MENU ============ */
function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuToggle || !navLinks) return;
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
}

/* ============ HERO SLIDER ============ */
function initHeroSlider() {
    const slider = document.querySelector('.hero-slider');
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.hero-slide');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    function startAutoPlay() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoPlay() {
        clearInterval(slideInterval);
    }
    
    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoPlay();
            startAutoPlay();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoPlay();
            startAutoPlay();
        });
    }
    
    // Start auto-play
    startAutoPlay();
    
    // Pause on hover
    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);
}

/* ============ SCROLL ANIMATIONS ============ */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/* ============ ROOM FILTERS ============ */
function initRoomFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const roomCards = document.querySelectorAll('.room-card');
    
    if (filterBtns.length === 0 || roomCards.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Filter rooms
            roomCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/* ============ FAQ ACCORDION ============ */
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
}

/* ============ CONTACT FORM ============ */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate
        if (!validateForm(data)) {
            return;
        }
        
        // Simulate submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Show success message
            showSuccessMessage('Thank you! Your message has been sent successfully.');
            
            // Reset form
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

/* ============ BOOKING FORM ============ */
function initBookingForm() {
    const form = document.getElementById('booking-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.checkin || !data.checkout || !data.guests) {
            showSuccessMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Simulate booking
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Checking...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showSuccessMessage('Searching for available rooms...');
            
            setTimeout(() => {
                showSuccessMessage('Redirecting to room selection...');
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 1000);
            }, 1500);
        }, 1500);
    });
}

/* ============ FORM VALIDATION ============ */
function validateForm(data) {
    let isValid = true;
    
    // Check required fields
    if (data.name !== undefined && !data.name.trim()) {
        showFieldError('name', 'Please enter your name');
        isValid = false;
    }
    
    if (data.email !== undefined) {
        if (!data.email.trim()) {
            showFieldError('email', 'Please enter your email');
            isValid = false;
        } else if (!isValidEmail(data.email)) {
            showFieldError('email', 'Please enter a valid email');
            isValid = false;
        }
    }
    
    if (data.phone !== undefined && !data.phone.trim()) {
        showFieldError('phone', 'Please enter your phone number');
        isValid = false;
    }
    
    if (data.message !== undefined && !data.message.trim()) {
        showFieldError('message', 'Please enter your message');
        isValid = false;
    }
    
    return isValid;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showFieldError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (field) {
        field.style.borderColor = '#ef4444';
        field.setAttribute('placeholder', message);
        
        setTimeout(() => {
            field.style.borderColor = '';
        }, 3000);
    }
}

/* ============ SUCCESS MESSAGE ============ */
function showSuccessMessage(message, type = 'success') {
    // Remove existing message
    const existingMsg = document.querySelector('.success-message');
    if (existingMsg) {
        existingMsg.remove();
    }
    
    // Create message element
    const msg = document.createElement('div');
    msg.className = 'success-message';
    msg.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        ${message}
    `;
    
    document.body.appendChild(msg);
    
    // Show message
    setTimeout(() => {
        msg.classList.add('show');
    }, 10);
    
    // Hide message after 5 seconds
    setTimeout(() => {
        msg.classList.remove('show');
        setTimeout(() => {
            msg.remove();
        }, 300);
    }, 5000);
}

/* ============ STICKY HEADER ============ */
function initStickyHeader() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

/* ============ COUNTER ANIMATION ============ */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-item h3');
    
    if (counters.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target')) || parseInt(counter.innerText);
                const suffix = counter.innerText.replace(/[0-9]/g, '');
                
                animateCounter(counter, target, suffix);
                observer.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element, target, suffix = '') {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            element.innerText = target + suffix;
            clearInterval(timer);
        } else {
            element.innerText = Math.floor(current) + suffix;
        }
    }, stepTime);
}

/* ============ SMOOTH SCROLL ============ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ============ TYPING EFFECT ============ */
function initTypingEffect() {
    const phrases = document.querySelectorAll('.typing-phrase');
    if (phrases.length === 0) return;
    
    const container = document.querySelector('.typing-container');
    const cursor = document.querySelector('.typing-cursor');
    
    let currentPhrase = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function type() {
        const current = phrases[currentPhrase];
        const phrase = current.getAttribute('data-phrase');
        
        if (isDeleting) {
            // Delete characters
            current.textContent = phrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            // Type characters
            current.textContent = phrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }
        
        // Check if word is complete
        if (!isDeleting && charIndex === phrase.length) {
            // Pause at end
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Move to next phrase
            isDeleting = false;
            currentPhrase = (currentPhrase + 1) % phrases.length;
            
            // Hide all phrases
            phrases.forEach(p => p.classList.remove('active'));
            
            // Show current phrase
            phrases[currentPhrase].classList.add('active');
            phrases[currentPhrase].textContent = '';
            
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    // Start typing effect
    setTimeout(type, 1000);
}
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const speed = el.getAttribute('data-parallax') || 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

/* ============ lazy loading Images ============ */
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (lazyImages.length === 0) return;
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

/* ============ UTILITY FUNCTIONS ============ */

// Debounce function
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

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Format date
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}
