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
        filterButtons.forEach(b => b.classList.remove('active'));
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

// ═══════════════════════════════════════════════
// PHASE 2: Conversion, Social Proof & Polish
// ═══════════════════════════════════════════════

// ── 1. AOG CTA Flutuante ──
(function () {
    const aogBanner = document.getElementById('aog-cta');
    const aogClose = document.getElementById('aogClose');
    if (!aogBanner || !aogClose) return;

    // Don't show if user already dismissed in this session
    if (sessionStorage.getItem('aog_dismissed')) return;

    let shown = false;
    window.addEventListener('scroll', function () {
        if (shown) return;
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercent >= 40) {
            aogBanner.style.display = 'block';
            shown = true;
        }
    });

    aogClose.addEventListener('click', function () {
        aogBanner.style.display = 'none';
        sessionStorage.setItem('aog_dismissed', 'true');
    });
})();

// ── 2. Multi-Step Form ──
(function () {
    const form = document.getElementById('multiStepForm');
    if (!form) return;

    const steps = form.querySelectorAll('.form-step');
    const progressBar = document.getElementById('formProgressBar');
    const stepLabels = document.querySelectorAll('.step-label');
    const formSuccess = document.getElementById('formSuccess');
    let currentStep = 1;
    const totalSteps = 3;

    function goToStep(step) {
        steps.forEach(s => s.classList.remove('active'));
        stepLabels.forEach(l => l.classList.remove('active'));

        const target = form.querySelector(`.form-step[data-step="${step}"]`);
        const label = document.querySelector(`.step-label[data-step="${step}"]`);
        if (target) target.classList.add('active');
        if (label) label.classList.add('active');

        // Also highlight all previous labels
        stepLabels.forEach(l => {
            if (parseInt(l.dataset.step) <= step) l.classList.add('active');
        });

        progressBar.style.width = ((step / totalSteps) * 100) + '%';
        currentStep = step;
    }

    function validateStep(step) {
        const stepEl = form.querySelector(`.form-step[data-step="${step}"]`);
        const required = stepEl.querySelectorAll('[required]');
        let valid = true;

        required.forEach(field => {
            const errorEl = field.parentElement.querySelector('.field-error');
            if (!field.value.trim()) {
                valid = false;
                field.style.borderColor = '#ef4444';
                if (errorEl) errorEl.textContent = 'Este campo é obrigatório';
            } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
                valid = false;
                field.style.borderColor = '#ef4444';
                if (errorEl) errorEl.textContent = 'E-mail inválido';
            } else {
                field.style.borderColor = '';
                if (errorEl) errorEl.textContent = '';
            }
        });

        return valid;
    }

    // Clear error on input
    form.addEventListener('input', function (e) {
        e.target.style.borderColor = '';
        const errorEl = e.target.parentElement.querySelector('.field-error');
        if (errorEl) errorEl.textContent = '';
    });

    // Next buttons
    form.querySelectorAll('.form-next').forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateStep(currentStep) && currentStep < totalSteps) {
                goToStep(currentStep + 1);
            }
        });
    });

    // Back buttons
    form.querySelectorAll('.form-back').forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep > 1) goToStep(currentStep - 1);
        });
    });

    // Submit
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const submitBtn = document.getElementById('formSubmitBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');

        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;

        // Simulate submission
        setTimeout(() => {
            form.style.display = 'none';
            document.querySelector('.form-progress').style.display = 'none';
            document.querySelector('.form-step-labels').style.display = 'none';
            formSuccess.style.display = 'block';
        }, 1500);
    });
})();

// ── 3. Contadores Animados ──
(function () {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);

                if (!target) return; // Skip text-only stats (ANAC+EASA, AOG 24/7)

                const duration = 1800;
                const startTime = performance.now();

                function animate(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease-out curve
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    el.textContent = Math.floor(target * easeOut);

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        el.textContent = target;
                    }
                }

                requestAnimationFrame(animate);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));
})();

// ── 4. Carousel de Depoimentos ──
(function () {
    const carousel = document.getElementById('testimonialCarousel');
    const dotsContainer = document.getElementById('carouselDots');
    if (!carousel || !dotsContainer) return;

    const cards = carousel.querySelectorAll('.testimonial-card');
    const dots = dotsContainer.querySelectorAll('.dot');
    let current = 0;
    let autoPlayInterval;

    function showSlide(index) {
        cards.forEach(c => c.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        cards[index].classList.add('active');
        dots[index].classList.add('active');
        current = index;
    }

    function nextSlide() {
        showSlide((current + 1) % cards.length);
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Dots click
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            stopAutoPlay();
            showSlide(parseInt(dot.dataset.index));
            startAutoPlay();
        });
    });

    // Pause on hover
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    startAutoPlay();
})();

// ── 5. Lightbox Galeria ──
(function () {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    if (!lightbox) return;

    const galleryImages = document.querySelectorAll('.mosaic-item img');
    let currentIndex = 0;

    function openLightbox(index) {
        currentIndex = index;
        const img = galleryImages[index];
        lightboxImg.src = img.src;
        lightboxCaption.textContent = img.alt;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        const img = galleryImages[currentIndex];
        lightboxImg.src = img.src;
        lightboxCaption.textContent = img.alt;
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        const img = galleryImages[currentIndex];
        lightboxImg.src = img.src;
        lightboxCaption.textContent = img.alt;
    }

    // Click on gallery images
    galleryImages.forEach((img, i) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => openLightbox(i));
    });

    lightboxOverlay.addEventListener('click', closeLightbox);
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', prevImage);
    lightboxNext.addEventListener('click', nextImage);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'none') return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    });
})();
