// EmailJS Configuration
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual EmailJS public key
})();

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // FAQ Toggle Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                // Close other FAQ items
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

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Quote Form Handling
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', handleQuoteForm);
    }

    // Cost Calculator Handling
    const costCalculator = document.getElementById('costCalculator');
    if (costCalculator) {
        costCalculator.addEventListener('submit', handleCostCalculator);
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Phone number formatting
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', formatPhoneNumber);
    });

    // ZIP code validation
    const zipInputs = document.querySelectorAll('input[maxlength="5"]');
    zipInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '');
        });
    });

    // Set minimum date for date inputs to today
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    dateInputs.forEach(input => {
        input.setAttribute('min', today);
    });

    // Initialize Services Carousel
    initializeCarousel();

    // Initialize EmailJS Form Handler
    initializeEmailForm();

    // Initialize Scroll Animations
    initializeScrollAnimations();

    // Initialize Theme Switcher
    initializeThemeSwitcher();
});

// Services Carousel Functionality
function initializeCarousel() {
    const carousel = document.querySelector('.carousel-slides');
    const slides = document.querySelectorAll('.service-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.carousel-dots');

    if (!carousel || !slides.length) return;

    let currentSlide = 0;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.carousel-dot');

    function updateCarousel() {
        const offset = -currentSlide * 100;
        carousel.style.transform = `translateX(${offset}%)`;

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateCarousel();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    }

    function prevSlide() {
        currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
        updateCarousel();
    }

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Auto-rotate carousel
    setInterval(nextSlide, 5000);

    // Touch/swipe support for mobile
    let startX = 0;
    let isScrolling = false;

    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isScrolling = false;
    });

    carousel.addEventListener('touchmove', (e) => {
        if (!startX) return;

        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;

        if (Math.abs(diff) > 10) {
            isScrolling = true;
            e.preventDefault();
        }
    });

    carousel.addEventListener('touchend', (e) => {
        if (!isScrolling || !startX) return;

        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }

        startX = 0;
        isScrolling = false;
    });
}

// EmailJS Form Handler
function initializeEmailForm() {
    const form = document.getElementById('quoteForm');
    const statusDiv = document.getElementById('form-status');

    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Clear previous status
        statusDiv.innerHTML = '';

        // Prepare template parameters
        const templateParams = {
            user_name: form.user_name.value,
            user_email: form.user_email.value,
            user_phone: form.user_phone.value,
            moving_from: form.moving_from.value,
            moving_to: form.moving_to.value,
            moving_date: form.moving_date.value,
            message: form.message.value,
            to_email: 'alamrandhawa16@gmail.com'
        };

        // Send email using EmailJS
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showFormStatus('success', 'Thank you! Your quote request has been sent successfully. We\'ll contact you within 24 hours.');
                form.reset();
            })
            .catch(function(error) {
                console.log('FAILED...', error);
                showFormStatus('error', 'Sorry, there was an error sending your request. Please try again or call us directly at (437) 566-8712.');
            })
            .finally(function() {
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });
}

function showFormStatus(type, message) {
    const statusDiv = document.getElementById('form-status');
    statusDiv.className = `form-status ${type}`;
    statusDiv.innerHTML = `
        <div class="status-icon">${type === 'success' ? '✅' : '❌'}</div>
        <div class="status-message">${message}</div>
    `;
    statusDiv.style.display = 'block';

    // Auto-hide success message after 10 seconds
    if (type === 'success') {
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 10000);
    }
}

// Phone number formatting function
function formatPhoneNumber(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 6) {
        value = `(${value.slice(0,3)}) ${value.slice(3,6)}-${value.slice(6,10)}`;
    } else if (value.length >= 3) {
        value = `(${value.slice(0,3)}) ${value.slice(3)}`;
    }
    e.target.value = value;
}

// Quote Form Step Navigation
let currentStep = 1;
const totalSteps = 3;

function nextStep() {
    if (validateCurrentStep()) {
        if (currentStep < totalSteps) {
            document.getElementById(`step${currentStep}`).classList.remove('active');
            currentStep++;
            document.getElementById(`step${currentStep}`).classList.add('active');
            updateProgress();
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        document.getElementById(`step${currentStep}`).classList.remove('active');
        currentStep--;
        document.getElementById(`step${currentStep}`).classList.add('active');
        updateProgress();
    }
}

function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const progressSteps = document.querySelectorAll('.progress-step');
    
    if (progressFill) {
        const percentage = (currentStep / totalSteps) * 100;
        progressFill.style.width = `${percentage}%`;
    }
    
    progressSteps.forEach((step, index) => {
        if (index + 1 <= currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

function validateCurrentStep() {
    const currentStepElement = document.getElementById(`step${currentStep}`);
    const requiredFields = currentStepElement.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            field.style.borderColor = '#e5e7eb';
        }
    });

    if (!isValid) {
        alert('Please fill in all required fields before proceeding.');
    }

    return isValid;
}

// Contact Form Handler
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Basic validation
    if (!data.name || !data.email || !data.phone) {
        alert('Please fill in all required fields.');
        return;
    }

    if (!isValidEmail(data.email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Simulate form submission
    console.log('Contact form data:', data);
    
    // Show success message
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('formSuccess');
    
    if (form && successMessage) {
        form.style.display = 'none';
        successMessage.style.display = 'block';
    }

    // In a real application, you would send this data to your server
    // fetch('/submit-contact', { method: 'POST', body: formData })
}

// Quote Form Handler
function handleQuoteForm(e) {
    e.preventDefault();
    
    if (!validateCurrentStep()) {
        return;
    }

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Get selected services
    const selectedServices = [];
    const serviceCheckboxes = document.querySelectorAll('input[name="services"]:checked');
    serviceCheckboxes.forEach(checkbox => {
        selectedServices.push(checkbox.value);
    });
    data.services = selectedServices;

    // Simulate form submission
    console.log('Quote form data:', data);
    
    // Show success message
    const form = document.getElementById('quoteForm');
    const successMessage = document.getElementById('quoteSuccess');
    const progressContainer = document.querySelector('.form-progress');
    
    if (form && successMessage && progressContainer) {
        form.style.display = 'none';
        progressContainer.style.display = 'none';
        successMessage.style.display = 'block';
    }

    // In a real application, you would send this data to your server
    // fetch('/submit-quote', { method: 'POST', body: formData })
}

// Cost Calculator Handler
function handleCostCalculator(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Basic validation
    if (!data.moveFrom || !data.moveTo || !data.homeSize || !data.moveDate) {
        alert('Please fill in all required fields.');
        return;
    }

    // Calculate estimated cost (simplified logic)
    const estimate = calculateMoveCost(data);
    
    // Show result
    displayCostEstimate(estimate, data);
}

function calculateMoveCost(data) {
    // Simplified cost calculation logic
    let baseCost = 0;
    const homeSize = data.homeSize;
    
    // Base cost by home size (hourly rate for 4 hours minimum)
    switch(homeSize) {
        case 'studio':
            baseCost = 120 * 3; // 2 movers, 3 hours
            break;
        case '1br':
            baseCost = 120 * 4; // 2 movers, 4 hours
            break;
        case '2br':
            baseCost = 160 * 5; // 3 movers, 5 hours
            break;
        case '3br':
            baseCost = 160 * 6; // 3 movers, 6 hours
            break;
        case '4br':
            baseCost = 200 * 8; // 4 movers, 8 hours
            break;
        default:
            baseCost = 500;
    }

    // Additional services
    const services = document.querySelectorAll('input[name="services"]:checked');
    services.forEach(service => {
        switch(service.value) {
            case 'packing':
                baseCost += 200;
                break;
            case 'unpacking':
                baseCost += 150;
                break;
            case 'storage':
                baseCost += 100;
                break;
            case 'piano':
                baseCost += 300;
                break;
            case 'assembly':
                baseCost += 100;
                break;
        }
    });

    return baseCost;
}

function displayCostEstimate(estimate, data) {
    const resultDiv = document.getElementById('calculatorResult');
    const amountDiv = document.getElementById('estimateAmount');
    const detailsDiv = document.getElementById('estimateDetails');

    if (resultDiv && amountDiv && detailsDiv) {
        amountDiv.textContent = `$${estimate.toLocaleString()}`;
        
        let details = `Estimate for ${data.homeSize} move`;
        if (data.moveFrom && data.moveTo) {
            details += ` from ${data.moveFrom} to ${data.moveTo}`;
        }
        detailsDiv.textContent = details;

        resultDiv.style.display = 'block';
        resultDiv.scrollIntoView({ behavior: 'smooth' });
    }
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Lazy loading for images (if any are added later)
function lazyLoadImages() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Call lazy loading on page load
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add loading state to forms
function addLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'Sending...';
    button.disabled = true;
    
    // Simulate loading for demo
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
    }, 2000);
}

// Handle form submission loading states
document.addEventListener('submit', function(e) {
    if (e.target.tagName === 'FORM') {
        const submitButton = e.target.querySelector('button[type="submit"]');
        if (submitButton) {
            addLoadingState(submitButton);
        }
    }
});

// Add click-to-call tracking (for analytics)
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.href.startsWith('tel:')) {
        // In a real application, you might track this click
        console.log('Phone link clicked:', e.target.href);
    }
});

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    const scrollButton = document.getElementById('scrollToTop');
    if (scrollButton) {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    }
});

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

// Scroll Animations
function initializeScrollAnimations() {
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    animationObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe sections for animation
        const sections = document.querySelectorAll('section, .feature, .service-card, .faq-item');
        sections.forEach(section => {
            section.classList.add('animate-on-scroll');
            animationObserver.observe(section);
        });
    }
}

// Theme Switcher Functionality
function initializeThemeSwitcher() {
    const themeSwitcher = document.getElementById('themeSwitcher');
    const themeDropdown = document.getElementById('themeDropdown');
    const themeOptions = document.querySelectorAll('.theme-option');

    if (!themeSwitcher || !themeDropdown) return;

    // Load saved theme
    const savedTheme = localStorage.getItem('selectedTheme') || 'ocean';
    applyTheme(savedTheme);
    updateActiveTheme(savedTheme);

    // Toggle dropdown
    themeSwitcher.addEventListener('click', (e) => {
        e.stopPropagation();
        themeDropdown.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        themeDropdown.classList.remove('show');
    });

    // Theme selection
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.dataset.theme;
            applyTheme(theme);
            updateActiveTheme(theme);
            localStorage.setItem('selectedTheme', theme);
            themeDropdown.classList.remove('show');
        });
    });
}

function applyTheme(theme) {
    const html = document.documentElement;

    if (theme === 'default') {
        html.removeAttribute('data-theme');
    } else {
        html.setAttribute('data-theme', theme);
    }
}

function updateActiveTheme(activeTheme) {
    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
        option.classList.remove('active');
        if (option.dataset.theme === activeTheme) {
            option.classList.add('active');
        }
    });
}

// Animation Observer for Stats Section
function initStatsAnimation() {
    const stats = document.querySelectorAll('.stat');

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 150); // Staggered animation
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '-50px'
    });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Service Cards Animation Delays
function initServiceCardsAnimation() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.setProperty('--move-delay', `${index * 0.5}s`);
    });
}

// Debounced scroll handler for performance
const debouncedScrollHandler = debounce(() => {
    // Any scroll-based functionality can go here
}, 100);

window.addEventListener('scroll', debouncedScrollHandler);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initStatsAnimation();
    initServiceCardsAnimation();
});