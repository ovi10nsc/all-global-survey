/**
 * ALL GLOBAL SURVEY - JAVASCRIPT (VANILLA JS)
 * Interactive logic for landing page navigation, portfolio tabs, and form validation.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------------------
       1. STICKY NAV & HEADER SCROLL EFFECT
       ---------------------------------------------------------------------- */
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ----------------------------------------------------------------------
       2. MOBILE MENU (HAMBURGER TOGGLE)
       ---------------------------------------------------------------------- */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    /* ----------------------------------------------------------------------
       3. ACTIVE LINK HIGH-LIGHTING ON SCROLL (SPY NAVIGATION)
       ---------------------------------------------------------------------- */
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // Account for header height
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.remove('active');
            }
        });
    });

    /* ----------------------------------------------------------------------
       4. SERVICE CARD BUTTONS -> PRE-FILL FORM & SCROLL
       ---------------------------------------------------------------------- */
    const selectServiceBtns = document.querySelectorAll('.btn-select-service');
    const serviceSelectDropdown = document.getElementById('serviceType');

    selectServiceBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const requestedService = btn.getAttribute('data-service');
            if (requestedService && serviceSelectDropdown) {
                // Find matching option in select dropdown
                for (let i = 0; i < serviceSelectDropdown.options.length; i++) {
                    if (serviceSelectDropdown.options[i].value.toLowerCase().includes(requestedService.toLowerCase()) || 
                        requestedService.toLowerCase().includes(serviceSelectDropdown.options[i].value.toLowerCase())) {
                        serviceSelectDropdown.selectedIndex = i;
                        break;
                    }
                }
            }
        });
    });

    /* ----------------------------------------------------------------------
       5. PORTFOLIO TABS FILTER
       ---------------------------------------------------------------------- */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const portfolioGrid = document.getElementById('portfolioGrid');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active to current tab
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'toate') {
                    item.style.display = 'flex';
                    item.style.opacity = '1';
                } else {
                    if (category === filterValue || (filterValue === 'audite-educatie-sanatate' && category === 'audite-educatie-sanatate')) {
                        item.style.display = 'flex';
                        item.style.opacity = '1';
                    } else {
                        item.style.display = 'none';
                        item.style.opacity = '0';
                    }
                }
            });
        });
    });

    /* ----------------------------------------------------------------------
       6. CONTACT FORM VALIDATION & MODAL RESPONSE
       ---------------------------------------------------------------------- */
    const quotationForm = document.getElementById('quotationForm');
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalQuoteDetails = document.getElementById('modalQuoteDetails');

    // Simple Email Regex Pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Romanian Phone Pattern (approx. 10 digits starting with 07 or 02/03)
    const phonePattern = /^(07|02|03)[0-9]{8}$/;

    // Error UI Helpers
    const setError = (inputElement, errorElement) => {
        const formGroup = inputElement.closest('.form-group') || inputElement.parentElement;
        formGroup.classList.add('has-error');
    };

    const clearError = (inputElement) => {
        const formGroup = inputElement.closest('.form-group') || inputElement.parentElement;
        formGroup.classList.remove('has-error');
    };

    // Real-time validation clears error state on input
    const inputsToValidate = quotationForm.querySelectorAll('input, select, checkbox');
    inputsToValidate.forEach(input => {
        input.addEventListener('input', () => clearError(input));
        if (input.tagName === 'SELECT') {
            input.addEventListener('change', () => clearError(input));
        }
    });

    quotationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        const fullName = document.getElementById('fullName');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const serviceType = document.getElementById('serviceType');
        const consent = document.getElementById('consent');
        const consentError = document.getElementById('consentError');

        // Name validation
        if (fullName.value.trim() === '') {
            setError(fullName);
            isValid = false;
        } else {
            clearError(fullName);
        }

        // Email validation
        if (!emailPattern.test(email.value.trim())) {
            setError(email);
            isValid = false;
        } else {
            clearError(email);
        }

        // Phone validation
        const cleanedPhone = phone.value.replace(/\s+/g, '');
        if (!phonePattern.test(cleanedPhone)) {
            setError(phone);
            isValid = false;
        } else {
            clearError(phone);
        }

        // Service validation
        if (serviceType.value === '') {
            setError(serviceType);
            isValid = false;
        } else {
            clearError(serviceType);
        }

        // Consent checkbox validation
        if (!consent.checked) {
            consentError.style.display = 'block';
            isValid = false;
        } else {
            consentError.style.display = 'none';
        }

        // If form is valid, trigger success modal and reset form
        if (isValid) {
            // Customize success modal with form details
            const surfaceStr = document.getElementById('buildingSurface').value;
            modalQuoteDetails.innerHTML = `
                <strong>Detalii înregistrate:</strong><br>
                • Nume: ${fullName.value.trim()}<br>
                • Telefon: ${phone.value.trim()}<br>
                • Serviciu: ${serviceType.options[serviceType.selectedIndex].text}<br>
                ${surfaceStr ? `• Suprafață declarată: ${surfaceStr} mp` : ''}
            `;

            // Open Modal
            successModal.classList.add('is-open');
            document.body.style.overflow = 'hidden'; // Lock scrolling
            
            // Reset Form
            quotationForm.reset();
            consentError.style.display = 'none';
        }
    });

    // Close Modal Button Event
    closeModalBtn.addEventListener('click', () => {
        successModal.classList.remove('is-open');
        document.body.style.overflow = ''; // Unlock scrolling
    });

    // Close Modal on clicking backdrop
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.classList.remove('is-open');
            document.body.style.overflow = '';
        }
    });
});
