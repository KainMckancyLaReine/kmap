document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');

    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            navList.classList.remove('active');
        });
    });

    // Dropdown menus for mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');

        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Testimonial slider
    if (document.querySelector('.testimonial-slider')) {
        const testimonialSlides = document.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.dot');
        let currentSlide = 0;

        function showSlide(n) {
            testimonialSlides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            currentSlide = (n + testimonialSlides.length) % testimonialSlides.length;
            testimonialSlides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });

        // Auto slide
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }

    // Portfolio filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category').includes(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Target audience tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.testimonial-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            tabBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const tabValue = this.getAttribute('data-tab');

            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.getAttribute('data-tab') === tabValue) {
                    pane.classList.add('active');
                }
            });
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Here you would typically send the form data to a server
            // For demo purposes, we'll just show the success message
            this.style.display = 'none';
            document.getElementById('formSuccess').style.display = 'block';

            // Reset form after 3 seconds
            setTimeout(() => {
                this.reset();
                this.style.display = 'block';
                document.getElementById('formSuccess').style.display = 'none';
            }, 3000);
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .feature-card, .value-card, .team-member, .portfolio-item');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.service-card, .feature-card, .value-card, .team-member, .portfolio-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    // Trigger once on page load
    animateOnScroll();

    // Lazy loading for images
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading is supported
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers without native lazy loading
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
});