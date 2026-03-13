// ── Safety Loader Check ──
function removeLoader() {
    const loader = document.getElementById('loader');
    if (loader && loader.style.opacity !== '0') {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 400);
    }
}
window.addEventListener('load', () => setTimeout(removeLoader, 300));
setTimeout(removeLoader, 2000); // Safety fallback if 'load' event is slow

// Header Blur and Sticky on Scroll (throttled with rAF)
const header = document.getElementById('header');
let scrollTicking = false;
window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        requestAnimationFrame(() => {
            header.classList.toggle('scrolled', window.scrollY > 80);
            scrollTicking = false;
        });
        scrollTicking = true;
    }
});

// Scroll Reveal with Staggering (Framer Motion mimic)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.dataset.delay || '0s';
            el.style.transition = `all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}`;
            el.classList.add('active');
            revealObserver.unobserve(el);
        }
    });
}, {
    threshold: 0.05, // More aggressive
    rootMargin: "0px 0px -20px 0px"
});

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});

// Mobile Menu Toggle
(function () {
    const toggle = document.getElementById('mobileMenuToggle');
    const nav = document.querySelector('header nav');
    const overlay = document.getElementById('mobileOverlay');
    if (!toggle || !nav) return;

    function openMenu() {
        toggle.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
        nav.classList.add('open');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    toggle.addEventListener('click', () => {
        nav.classList.contains('open') ? closeMenu() : openMenu();
    });

    if (overlay) overlay.addEventListener('click', closeMenu);

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('open')) closeMenu();
    });
})();

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

// Scroll Spy (B1)
const sections = document.querySelectorAll('section[id], header[id="home"]');
const navLinksList = document.querySelectorAll('header nav ul li a');

if (sections.length > 0 && navLinksList.length > 0) {
    const spyOptions = {
        root: null,
        rootMargin: '-20% 0px -79% 0px',
        threshold: 0
    };

    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinksList.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, spyOptions);

    sections.forEach(sec => spyObserver.observe(sec));
}

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
                item.style.display = '';
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
        let firstInvalid = null;

        required.forEach(field => {
            const errorEl = field.parentElement.querySelector('.field-error');
            const errorId = field.id + '-error';
            if (errorEl) errorEl.id = errorId;

            if (!field.value.trim()) {
                valid = false;
                field.style.borderColor = '#ef4444';
                field.setAttribute('aria-invalid', 'true');
                field.setAttribute('aria-describedby', errorId);
                if (errorEl) errorEl.textContent = 'Este campo é obrigatório';
                if (!firstInvalid) firstInvalid = field;
            } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
                valid = false;
                field.style.borderColor = '#ef4444';
                field.setAttribute('aria-invalid', 'true');
                field.setAttribute('aria-describedby', errorId);
                if (errorEl) errorEl.textContent = 'E-mail inválido';
                if (!firstInvalid) firstInvalid = field;
            } else {
                field.style.borderColor = '';
                field.removeAttribute('aria-invalid');
                field.removeAttribute('aria-describedby');
                if (errorEl) errorEl.textContent = '';
            }
        });

        // TAREFA 2B: Focus first invalid field
        if (firstInvalid) {
            firstInvalid.focus();
            firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return valid;
    }

    // Clear error on input
    form.addEventListener('input', function (e) {
        e.target.style.borderColor = '';
        e.target.removeAttribute('aria-invalid');
        e.target.removeAttribute('aria-describedby');
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

    // ── TAREFA 3: Form State Machine ──
    // States: 'idle' | 'loading' | 'success' | 'error'
    let formState = 'idle';

    function setFormState(state) {
        formState = state;
        const submitBtn = document.getElementById('formSubmitBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        const formWrapper = form.closest('.multistep-form-wrapper');
        const existingError = form.querySelector('.form-error-banner');

        switch (state) {
            case 'idle':
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
                if (existingError) existingError.remove();
                break;

            case 'loading':
                btnText.style.display = 'none';
                btnLoading.style.display = 'inline-flex';
                submitBtn.disabled = true;
                if (existingError) existingError.remove();
                break;

            case 'success':
                form.style.display = 'none';
                document.querySelector('.form-progress').style.display = 'none';
                document.querySelector('.form-step-labels').style.display = 'none';
                formSuccess.style.display = 'block';
                break;

            case 'error':
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;

                // Remove previous error banner if any
                if (existingError) existingError.remove();

                // Create error banner — insert ABOVE submit button row
                const errorBanner = document.createElement('div');
                errorBanner.className = 'form-error-banner';
                errorBanner.setAttribute('role', 'alert');
                errorBanner.innerHTML = `
                    <svg class="icon" aria-hidden="true"><use href="icons.svg#icon-exclamation-triangle"/></svg>
                    <div>
                        <strong>Erro ao enviar.</strong> Verifique sua conexão ou tente novamente.<br>
                        <a href="mailto:celio@lanceair.com.br?subject=Solicitação de Orçamento MRO">Ou envie direto para celio@lanceair.com.br</a>
                    </div>
                `;

                // Insert before the form-nav of the current step
                const currentFormNav = form.querySelector('.form-step.active .form-nav');
                if (currentFormNav) {
                    currentFormNav.parentNode.insertBefore(errorBanner, currentFormNav);
                } else {
                    form.appendChild(errorBanner);
                }
                break;
        }
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (formState === 'loading') return; // prevent double submit

        setFormState('loading');

        const formData = new FormData(form);
        const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

        fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
            .then(response => {
                if (response.ok) {
                    setFormState('success');
                } else {
                    throw new Error('Server error: ' + response.status);
                }
            })
            .catch(() => {
                // Do NOT clear user data — just show error
                setFormState('error');
            });
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

// ── 5. Lightbox Galeria (filter-aware) ──
(function () {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    if (!lightbox) return;

    let visibleImages = [];
    let currentIndex = 0;

    function getVisibleImages() {
        return [...document.querySelectorAll('.mosaic-item')]
            .filter(item => item.style.display !== 'none')
            .map(item => item.querySelector('img'))
            .filter(Boolean);
    }

    function updateImage() {
        const img = visibleImages[currentIndex];
        if (!img) return;
        lightboxImg.src = img.src;
        lightboxCaption.textContent = img.alt;
    }

    function openLightbox(img) {
        visibleImages = getVisibleImages();
        currentIndex = visibleImages.indexOf(img);
        if (currentIndex === -1) currentIndex = 0;
        updateImage();
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
        updateImage();
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % visibleImages.length;
        updateImage();
    }

    document.querySelectorAll('.mosaic-item img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => openLightbox(img));
    });

    lightboxOverlay.addEventListener('click', closeLightbox);
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', prevImage);
    lightboxNext.addEventListener('click', nextImage);

    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'none') return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
        // Focus trap: Tab cycles within lightbox controls
        if (e.key === 'Tab') {
            const focusable = [lightboxPrev, lightboxNext, lightboxClose].filter(el => el);
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }
    });
})();
