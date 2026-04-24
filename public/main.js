// ============ Toggle Icon Navbar =============

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('fa-xmark');
        navbar.classList.toggle('active');
    };
}

// ============ Scroll Section Active Link =============

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    // ================= Sticky Navbar ===================
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // ================= Remove Toggle Icon and Navbar ==============
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
};

// ================= Scroll Reveal ==============
if (typeof window !== 'undefined' && typeof window.ScrollReveal === 'function') {
    window.ScrollReveal({
        distance: '80px',
        duration: 2000,
        delay: 200,
    });

    window.ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
    window.ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
    window.ScrollReveal().reveal('.home-contact h1, .about-img', { origin: 'left' });
    window.ScrollReveal().reveal('.home-contact p, .about-content', { origin: 'right' });
    // it's CHANGE FOR SKILLS REVEAL TOP TO UI FRONT OF THE FACE
    window.ScrollReveal().reveal('.services , .container', { origin: 'bottom' });
}

// ================= Typed JS ==============
if (typeof window !== 'undefined' && typeof window.Typed === 'function') {
    new window.Typed('.multiple-text', {
        strings: ['Frontend Developer', 'UI/UX Designer', 'Web Designer'],
        typeSpeed: 70,
        backSpeed: 70,
        backDelay: 1000,
        loop: true,
    });
}

// SKILLS SECTION DESIGN


const progText = document.querySelectorAll(".progText");
const progress = document.querySelectorAll(".progress");
const progContainer = document.querySelector(".container");
let bol = false;

window.addEventListener("scroll", function () {
    if (!progContainer) return;

    if (pageYOffset > progContainer.offsetTop - 600 && bol === false) {

        for (let i = 0; i < progText.length; i++) {

            progText[i].innerText = 0;
            let count = 0;
            progress[i].style.transition = "left 1.5s ease-in-out";
            progress[i].style.left = "100%";

            function updateCount() {
                let target = parseInt(progText[i].dataset.count);

                if (count < target) {
                    count++;
                    progText[i].innerText = count + "%";
                    setTimeout(updateCount, 5);  // Faster update interval
                } else {
                    progText[i].innerText = target + "%";
                    progress[i].style.left = (100 - target) + "%";
                }
            }

            updateCount();
            bol = true;
        }
    }
});

// end


// ================= Contact Form Functionality ==============

// EmailJS Configuration
const EMAILJS_CONFIG = (typeof window !== 'undefined' && window.__EMAILJS_CONFIG__) || {};
const EMAILJS_SERVICE_ID = EMAILJS_CONFIG.serviceId || '';
const EMAILJS_TEMPLATE_ID = EMAILJS_CONFIG.templateId || '';
const EMAILJS_PUBLIC_KEY = EMAILJS_CONFIG.publicKey || '';

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    if (contactForm.dataset.initialized === 'true') return;
    contactForm.dataset.initialized = 'true';

    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');
    if (!formStatus || !submitBtn) return;

    // Form validation
    function validateForm(formData) {
        const errors = [];

        if (!formData.name.trim()) {
            errors.push('Name is required');
        }

        if (!formData.email.trim()) {
            errors.push('Email is required');
        } else if (!isValidEmail(formData.email)) {
            errors.push('Please enter a valid email address');
        }

        if (!formData.subject.trim()) {
            errors.push('Subject is required');
        }

        if (!formData.message.trim()) {
            errors.push('Message is required');
        }

        return errors;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
        formStatus.style.display = 'block';

        // Hide status after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }

    function showSuccessNotification(message) {
        const existingToast = document.getElementById('contact-success-toast');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.id = 'contact-success-toast';
        toast.textContent = message;
        toast.style.position = 'fixed';
        toast.style.top = '20px';
        toast.style.right = '20px';
        toast.style.zIndex = '9999';
        toast.style.padding = '12px 16px';
        toast.style.borderRadius = '8px';
        toast.style.backgroundColor = '#22c55e';
        toast.style.color = '#ffffff';
        toast.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.25)';
        toast.style.fontSize = '14px';
        toast.style.fontWeight = '600';
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-8px)';
        toast.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        });

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-8px)';
            setTimeout(() => toast.remove(), 250);
        }, 3000);
    }

    function setLoadingState(loading) {
        if (loading) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
        } else {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    }

    // Form submission
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        console.log('[contact] Submit intercepted');

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Validate form
        const errors = validateForm(formData);
        if (errors.length > 0) {
            showStatus(errors.join(', '), 'error');
            return;
        }

        setLoadingState(true);

        try {
            if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
                throw new Error('Missing EmailJS environment configuration');
            }

            if (typeof window.emailjs === 'undefined') {
                throw new Error('EmailJS is not loaded');
            }

            // Send email using EmailJS
            const response = await window.emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    name: formData.name,
                    title: formData.subject,
                    message: formData.message + "\n\n" + formData.email + "\n" + formData.phone,
                },
                EMAILJS_PUBLIC_KEY
            );

            console.log('[contact] Email send response:', response);

            if (response.status === 200) {
                showStatus('Message sent successfully! I\'ll get back to you soon.', 'success');
                showSuccessNotification('Your message was sent successfully.');
                contactForm.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('[contact] Error sending email:', error);
            showStatus('Sorry, there was an error sending your message. Please try again or contact me directly.', 'error');
        } finally {
            setLoadingState(false);
        }
    });

    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function () {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = 'transparent';
            }
        });

        input.addEventListener('input', function () {
            if (this.style.borderColor === 'rgb(239, 68, 68)') {
                this.style.borderColor = 'transparent';
            }
        });
    });
}

// ================= Smooth scrolling for contact links ==============

function initContactLinks() {
    // Add click handlers for contact links
    const contactLinks = document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"], a[href^="https://wa.me/"]');

    contactLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Add a small delay to show the click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initContactForm();
        initContactLinks();
    });
} else {
    initContactForm();
    initContactLinks();
}