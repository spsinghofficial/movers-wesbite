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
});

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

// Debounced scroll handler for performance
const debouncedScrollHandler = debounce(() => {
    // Any scroll-based functionality can go here
}, 100);

window.addEventListener('scroll', debouncedScrollHandler);