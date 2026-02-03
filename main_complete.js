// ============ Toggle Icon Navbar =============

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
};

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

ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200,
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-contact h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-contact p, .about-content', { origin: 'right' });
// it's CHANGE FOR SKILLS REVEAL TOP TO UI FRONT OF THE  FACE
ScrollReveal().reveal('.services , .container', { origin: 'bottom' });
// ENS

// ================= Typed JS ==============

const typed = new Typed('.multiple-text', {
    strings: ['Frontend Developer', 'UI/UX Designer', 'Web Designer', 'React Developer', 'Full Stack Developer'],
    typeSpeed: 70,
    backSpeed: 70,
    backDelay: 1000,
    loop: true,
});

// SKILLS SECTION DESIGN

const progText = document.querySelectorAll(".progText");
const progress = document.querySelectorAll(".progress");
const progContainer = document.querySelector(".container");
let bol = false;

window.addEventListener("scroll", function () {

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

// ================= Contact Form Functionality with EmailJS ==============

// EmailJS Configuration - Replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = 'service_portfolio'; // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = 'template_contact'; // Replace with your EmailJS template ID
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY_HERE'; // Replace with your EmailJS public key

// Contact form handling
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

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
            // Send email using EmailJS
            const response = await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    phone: formData.phone,
                    subject: formData.subject,
                    message: formData.message,
                    to_email: 'mahendramahajn3492@gmail.com' // Your email
                },
                EMAILJS_PUBLIC_KEY
            );

            if (response.status === 200) {
                showStatus('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();

                // Add success animation
                submitBtn.style.animation = 'floatGlow 2s ease-in-out';
                setTimeout(() => {
                    submitBtn.style.animation = 'floatBounce 2s ease-in-out infinite';
                }, 2000);
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            showStatus('Sorry, there was an error sending your message. Please try again or contact me directly.', 'error');

            // Add error animation
            submitBtn.style.animation = 'floatBounce 0.5s ease-in-out 3';
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
                this.style.animation = 'floatBounce 0.5s ease-in-out';
            } else {
                this.style.borderColor = 'transparent';
                this.style.animation = 'none';
            }
        });

        input.addEventListener('input', function () {
            if (this.style.borderColor === 'rgb(239, 68, 68)') {
                this.style.borderColor = 'transparent';
                this.style.animation = 'none';
            }
        });

        // Add floating effect on focus
        input.addEventListener('focus', function () {
            this.style.animation = 'floatGlow 1s ease-in-out infinite';
        });

        input.addEventListener('blur', function () {
            if (this.style.borderColor !== 'rgb(239, 68, 68)') {
                this.style.animation = 'none';
            }
        });
    });
});

// ================= Enhanced Floating Animations ==============

document.addEventListener('DOMContentLoaded', function () {
    // Add random floating animations to various elements
    const floatingElements = document.querySelectorAll('.portfolio-box, .progress-card, .contact-item');

    floatingElements.forEach((element, index) => {
        // Add random delay to create more natural floating effect
        const randomDelay = Math.random() * 2;
        element.style.animationDelay = `${randomDelay}s`;

        // Add hover effects
        element.addEventListener('mouseenter', function () {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });

        element.addEventListener('mouseleave', function () {
            this.style.animationPlayState = 'running';
            this.style.transform = 'none';
        });
    });

    // Add click handlers for contact links
    const contactLinks = document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"], a[href^="https://wa.me/"]');

    contactLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Add a small delay to show the click effect
            this.style.transform = 'scale(0.95)';
            this.style.animation = 'floatGlow 0.5s ease-in-out';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.animation = 'floatUpDown 2.5s ease-in-out infinite';
            }, 150);
        });
    });

    // Add floating effect to social media icons
    const socialIcons = document.querySelectorAll('.social-media a, .social-links a');
    socialIcons.forEach((icon, index) => {
        icon.addEventListener('mouseenter', function () {
            this.style.animation = 'floatGlow 1s ease-in-out infinite';
        });

        icon.addEventListener('mouseleave', function () {
            this.style.animation = 'floatUpDown 3s ease-in-out infinite';
        });
    });
});

// ================= Parallax Effect for Background ==============

window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.home-img img, .logo');

    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ================= Dynamic Color Changes ==============

document.addEventListener('DOMContentLoaded', function () {
    const colors = ['#5982f4', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    let colorIndex = 0;

    setInterval(() => {
        const root = document.documentElement;
        root.style.setProperty('--main-color', colors[colorIndex]);
        colorIndex = (colorIndex + 1) % colors.length;
    }, 5000); // Change color every 5 seconds
});

// ================= Enhanced Scroll Animations ==============

// Add intersection observer for better performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        } else {
            entry.target.style.animationPlayState = 'paused';
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', function () {
    const animatedElements = document.querySelectorAll('[class*="float"], .portfolio-box, .progress-card, .contact-item');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// ================= Performance Optimization ==============

// Throttle scroll events for better performance
function throttle(func, wait) {
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

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-related animations here
}, 16)); // ~60fps
