// Midas Marketing Mastery - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initScrollAnimations();
    initMobileMenu();
    initSmoothScrolling();
    initCountdownTimer();
    initFAQ();
    initNotifications();
    initProgressBar();
    initPricingToggle();
    initVideoModal();
    initParallax();
    initTestimonialCarousel();
});

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuButton = document.querySelector('#mobile-menu-button');
    const mobileMenu = document.querySelector('#mobile-menu');
    const menuOverlay = document.querySelector('#menu-overlay');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.contains('translate-x-0');
            
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        // Close menu when clicking overlay
        if (menuOverlay) {
            menuOverlay.addEventListener('click', closeMobileMenu);
        }

        // Close menu when clicking links
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    function openMobileMenu() {
        mobileMenu.classList.remove('-translate-x-full');
        mobileMenu.classList.add('translate-x-0');
        menuOverlay.classList.remove('opacity-0', 'pointer-events-none');
        menuOverlay.classList.add('opacity-100', 'pointer-events-auto');
        document.body.classList.add('overflow-hidden');
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('-translate-x-full');
        menuOverlay.classList.remove('opacity-100', 'pointer-events-auto');
        menuOverlay.classList.add('opacity-0', 'pointer-events-none');
        document.body.classList.remove('overflow-hidden');
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Countdown Timer (3 days)
function initCountdownTimer() {
    const timerElement = document.querySelector('#countdown-timer');
    if (!timerElement) return;

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 3);

    function updateCountdown() {
        const now = new Date();
        const diff = endDate - now;

        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            timerElement.innerHTML = `
                <div class="flex justify-center gap-4 flex-wrap">
                    <div class="countdown-timer">
                        <div class="countdown-number">${days.toString().padStart(2, '0')}</div>
                        <div class="countdown-label">Dias</div>
                    </div>
                    <div class="countdown-timer">
                        <div class="countdown-number">${hours.toString().padStart(2, '0')}</div>
                        <div class="countdown-label">Horas</div>
                    </div>
                    <div class="countdown-timer">
                        <div class="countdown-number">${minutes.toString().padStart(2, '0')}</div>
                        <div class="countdown-label">Minutos</div>
                    </div>
                    <div class="countdown-timer">
                        <div class="countdown-number">${seconds.toString().padStart(2, '0')}</div>
                        <div class="countdown-label">Segundos</div>
                    </div>
                </div>
            `;
        } else {
            timerElement.innerHTML = '<p class="text-secondary text-xl font-bold">Oferta Encerrada!</p>';
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isOpen = answer.classList.contains('open');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherIcon = otherItem.querySelector('.faq-icon');
                otherAnswer.classList.remove('open');
                if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
            });
            
            // Toggle current item
            if (!isOpen) {
                answer.classList.add('open');
                const icon = question.querySelector('.faq-icon');
                if (icon) icon.style.transform = 'rotate(180deg)';
            }
        });
    });
}

// Notifications
function initNotifications() {
    window.showNotification = function(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type === 'success' ? 'border-secondary/30' : 'border-red-500/30'}`;
        
        const icon = type === 'success' ? 'check-circle' : 'alert-circle';
        const iconColor = type === 'success' ? 'text-secondary' : 'text-red-500';
        
        notification.innerHTML = `
            <div class="flex items-center gap-3">
                <i data-feather="${icon}" class="w-5 h-5 ${iconColor} flex-shrink-0"></i>
                <p class="text-sm">${message}</p>
                <button class="ml-2 text-gray-400 hover:text-white" onclick="this.parentElement.parentElement.remove()">
                    <i data-feather="x" class="w-4 h-4"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        feather.replace();
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    };
}

// Progress Bar Animation
function initProgressBar() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.dataset.width || '100%';
                bar.style.width = width;
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => observer.observe(bar));
}

// Pricing Toggle (if exists)
function initPricingToggle() {
    const toggle = document.querySelector('#pricing-toggle');
    if (!toggle) return;
    
    toggle.addEventListener('change', (e) => {
        const yearlyPrices = document.querySelectorAll('.yearly-price');
        const monthlyPrices = document.querySelectorAll('.monthly-price');
        
        if (e.target.checked) {
            yearlyPrices.forEach(el => el.classList.remove('hidden'));
            monthlyPrices.forEach(el => el.classList.add('hidden'));
        } else {
            yearlyPrices.forEach(el => el.classList.add('hidden'));
            monthlyPrices.forEach(el => el.classList.remove('hidden'));
        }
    });
}

// Video Modal
function initVideoModal() {
    const videoBtn = document.querySelector('#video-modal-btn');
    const videoModal = document.querySelector('#video-modal');
    const closeModal = document.querySelector('#close-modal');
    const modalOverlay = document.querySelector('#modal-overlay');
    
    if (videoBtn && videoModal) {
        videoBtn.addEventListener('click', () => {
            videoModal.classList.remove('opacity-0', 'pointer-events-none');
            videoModal.classList.add('opacity-100', 'pointer-events-auto');
        });
        
        [closeModal, modalOverlay].forEach(el => {
            if (el) {
                el.addEventListener('click', () => {
                    videoModal.classList.remove('opacity-100', 'pointer-events-auto');
                    videoModal.classList.add('opacity-0', 'pointer-events-none');
                    // Stop video when closing
                    const iframe = videoModal.querySelector('iframe');
                    if (iframe) {
                        iframe.src = iframe.src;
                    }
                });
            }
        });
    }
}

// Parallax Effect
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Testimonial Carousel
function initTestimonialCarousel() {
    const carousel = document.querySelector('#testimonial-carousel');
    if (!carousel) return;
    
    let currentSlide = 0;
    const testimonials = carousel.querySelectorAll('.testimonial-slide');
    const totalSlides = testimonials.length;
    
    function showSlide(index) {
        testimonials.forEach((slide, i) => {
            slide.classList.toggle('hidden', i !== index);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    
    // Auto-advance carousel
    setInterval(nextSlide, 5000);
    
    // Manual controls
    const prevBtn = carousel.querySelector('#prev-btn');
    const nextBtn = carousel.querySelector('#next-btn');
    
    prevBtn?.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    });
    
    nextBtn?.addEventListener('click', () => {
        nextSlide();
    });
}

// Purchase Button Handler
document.addEventListener('click', (e) => {
    if (e.target.matches('.purchase-btn') || e.target.closest('.purchase-btn')) {
        e.preventDefault();
        
        // Show loading state
        const btn = e.target.closest('.purchase-btn') || e.target;
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i data-feather="loader" class="w-5 h-5 animate-spin"></i> Processando...';
        btn.disabled = true;
        
        // Simulate purchase process
        setTimeout(() => {
            showNotification('Compra realizada com sucesso! Verifique seu email.', 'success');
            btn.innerHTML = originalText;
            btn.disabled = false;
            feather.replace();
            
            // Scroll to success section
            const successSection = document.querySelector('#success-section');
            if (successSection) {
                successSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 2000);
    }
});

// Form Submissions
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i data-feather="loader" class="w-4 h-4 animate-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            showNotification('Formulário enviado com sucesso!', 'success');
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            feather.replace();
        }, 1500);
    });
});

// Newsletter Form
const newsletterForm = document.querySelector('#newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Show loading state
        const submitBtn = newsletterForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i data-feather="loader" class="w-4 h-4 animate-spin"></i>';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showNotification(`Email ${email} cadastrado com sucesso!`, 'success');
            newsletterForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            feather.replace();
        }, 1000);
    });
}

// Dynamic Year in Footer
const yearElements = document.querySelectorAll('.current-year');
yearElements.forEach(el => {
    el.textContent = new Date().getFullYear();
});

// Back to Top Button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i data-feather="arrow-up" class="w-5 h-5"></i>';
backToTopBtn.className = 'fixed bottom-6 right-6 bg-secondary text-dark p-3 rounded-full shadow-2xl hover:bg-white transition-all transform hover:scale-110 opacity-0 pointer-events-none z-50';
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
document.body.appendChild(backToTopBtn);
feather.replace();

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100', 'pointer-events-auto');
    } else {
        backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
    }
});

// Performance Optimization: Lazy Loading Images
const lazyImages = document.querySelectorAll('img[loading="lazy"]');
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('loading-skeleton');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Add loading skeleton class to images
document.querySelectorAll('img').forEach(img => {
    if (!img.hasAttribute('loading')) {
        img.classList.add('loading-skeleton');
        img.addEventListener('load', () => {
            img.classList.remove('loading-skeleton');
        });
    }
});