// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Portfolio filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    const applyFilter = (filter) => {
        filterButtons.forEach(btn => {
            btn.classList.remove('active', 'border-brown', 'border');
            btn.classList.add('border-transparent', 'border');
        });
        if (filter) {
            const activeBtn = Array.from(filterButtons).find(btn => btn.getAttribute('data-filter') === filter);
            if (activeBtn) {
                activeBtn.classList.add('active', 'border-brown', 'border');
                activeBtn.classList.remove('border-transparent');
            }
        }
        portfolioItems.forEach(item => {
            if (!filter || item.classList.contains(filter)) {
                item.style.display = 'block';
                item.classList.remove('hidden');
            } else {
                item.style.display = 'none';
                item.classList.add('hidden');
            }
        });
    };

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            applyFilter(filter);
        });
    });

    // Apply initial filter based on the active button (defaults to first if none)
    const initial = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || filterButtons[0]?.getAttribute('data-filter');
    if (initial) {
        applyFilter(initial);
    }

    // Portfolio item click handlers
    portfolioItems.forEach(item => {
        item.addEventListener('click', function () {
            const img = item.querySelector('img');
            if (img && img.src) {
                window.open(img.src, '_blank');
            }
        });
    });

    // Smooth scrolling for navigation links
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

    // Add scroll effect to navigation
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.classList.add('shadow-md');
        } else {
            nav.classList.remove('shadow-md');
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe portfolio items for animation
document.addEventListener('DOMContentLoaded', function() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
});