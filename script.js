// Theme management
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.init();
    }

    init() {
        // Check for saved theme or prefer color scheme
        if (localStorage.getItem('theme') === 'dark' || 
            (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        this.setupEventListeners();
        this.updateToggleIcon();
    }

    setupEventListeners() {
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    toggleTheme() {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
        this.updateToggleIcon();
    }

    updateToggleIcon() {
        if (!this.themeToggle) return;

        const moonIcon = this.themeToggle.querySelector('[data-feather="moon"]');
        const sunIcon = this.themeToggle.querySelector('[data-feather="sun"]');

        if (document.documentElement.classList.contains('dark')) {
            moonIcon?.classList.remove('hidden');
            sunIcon?.classList.add('hidden');
        } else {
            sunIcon?.classList.remove('hidden');
            moonIcon?.classList.add('hidden');
        }

        // Update feather icons
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }
}

// Smooth scrolling
class SmoothScroller {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Intersection Observer for animations
class ScrollAnimator {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        this.setupObserver();
        this.observeElements();
    }

    setupObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
        }
    }

    observeElements() {
        const elements = document.querySelectorAll('.card-hover, .float-animation');
        elements.forEach(el => {
            this.observer.observe(el);
        });
    }
}

// Form handling
class FormHandler {
    constructor() {
        this.init();
    }

    init() {
        this.setupFormListeners();
    }

    setupFormListeners() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', this.handleSubmit.bind(this));
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted');
    }
}

// Countdown timer
class CountdownTimer {
    constructor(endTime) {
        this.endTime = endTime;
        this.timerElement = document.getElementById('countdownTimer');
        this.init();
    }

    init() {
        if (this.timerElement) {
            this.startTimer();
        }
    }

    startTimer() {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = this.endTime - now;

            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (this.timerElement) {
                this.timerElement.innerHTML = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}
            }

            if (distance < 0) {
                clearInterval(timer);
                if (this.timerElement) {
                    this.timerElement.innerHTML = "Oferta Expirada!";
            }
        }, 1000);
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme manager
    new ThemeManager();

    // Initialize smooth scrolling
    new SmoothScroller();

    // Initialize scroll animations
    new ScrollAnimator();

    // Initialize form handler
    new FormHandler();

    // Set countdown timer (24 hours from now)
    const endTime = new Date().getTime() + (24 * 60 * 60 * 1000);
    new CountdownTimer(endTime);

    // Update feather icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
});

// Add loading state to buttons
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href="#compra"]')) {
        const button = e.target;
        const originalText = button.textContent;

        button.innerHTML = '<div class="loading-dots"><div></div><div></div><div></div></div>';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 2000);
    }
});

// Performance optimization: Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}