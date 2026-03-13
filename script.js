// Loader Removal Action
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 400);
        }
    }, 1200);
});

// Header Blur and Sticky on Scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Scroll Reveal with Staggering (Framer Motion mimic)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Apply delay from inline style if present
            const delay = entry.target.style.transitionDelay || '0s';
            entry.target.style.transition = `all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}`;
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
});

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});

// Smooth Scroll for Internal Anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Mosaic Filter Logic
const filterButtons = document.querySelectorAll('.filter-btn');
const mosaicItems = document.querySelectorAll('.mosaic-item');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        mosaicItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-cat') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => item.style.opacity = '1', 10);
            } else {
                item.style.opacity = '0';
                setTimeout(() => item.style.display = 'none', 300);
            }
        });
    });
});
