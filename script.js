document.addEventListener('DOMContentLoaded', () => {

    // ================================================================
    // 0. PRELOADER
    // ================================================================
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hide');
            }, 600);
        });
    }

    // ================================================================
    // 1. ALTERNADOR DE TEMA (AZUL / LARANJA)
    // ================================================================
    const themeToggle = document.getElementById('themeToggle');
    const themeLabel = themeToggle ? themeToggle.querySelector('.theme-label') : null;
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

    let currentTheme = localStorage.getItem('vetec-theme') || 'azul';

    function applyTheme(theme) {
        if (theme === 'laranja') {
            document.documentElement.setAttribute('data-theme', 'laranja');
            if (themeLabel) themeLabel.textContent = 'Laranja';
            if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
            localStorage.setItem('vetec-theme', 'laranja');
        } else {
            document.documentElement.removeAttribute('data-theme');
            if (themeLabel) themeLabel.textContent = 'Azul';
            if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
            localStorage.setItem('vetec-theme', 'azul');
        }
    }

    applyTheme(currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const current = document.documentElement.getAttribute('data-theme');
            const newTheme = current === 'laranja' ? 'azul' : 'laranja';
            applyTheme(newTheme);
        });
    }

    // ================================================================
    // 2. MENU MOBILE
    // ================================================================
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.replace('fa-bars', 'fa-xmark');
                } else {
                    icon.classList.replace('fa-xmark', 'fa-bars');
                }
            }
        });

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenu.querySelector('i');
                if (icon) {
                    icon.classList.replace('fa-xmark', 'fa-bars');
                }
            });
        });
    }

    // ================================================================
    // 3. BOTÃO VOLTAR AO TOPO
    // ================================================================
    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ================================================================
    // 4. FORMULÁRIO
    // ================================================================
    const formContato = document.getElementById('formContato');

    if (formContato) {
        formContato.addEventListener('submit', function(event) {
            event.preventDefault();

            const btnSubmit = formContato.querySelector('button[type="submit"]');

            btnSubmit.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processando...';
            btnSubmit.style.opacity = '0.7';
            btnSubmit.style.cursor = 'wait';
            btnSubmit.disabled = true;

            setTimeout(() => {
                btnSubmit.style.opacity = '1';
                btnSubmit.style.cursor = 'default';
                btnSubmit.classList.add('btn-success');
                btnSubmit.innerHTML = '<i class="fa-solid fa-check" style="margin-right: 8px;"></i> Orçamento Enviado!';

                formContato.reset();

                setTimeout(() => {
                    btnSubmit.classList.remove('btn-success');
                    btnSubmit.innerHTML = 'Solicitar Orçamento <i class="fa-solid fa-paper-plane"></i>';
                    btnSubmit.disabled = false;
                    btnSubmit.style = '';
                }, 4000);
            }, 1500);
        });
    }

    // ================================================================
    // 5. ESTATÍSTICAS ANIMADAS
    // ================================================================
    const counters = document.querySelectorAll('.counter');

    const runCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const c = +counter.innerText;
            const increment = target / 150;

            if (c < target) {
                counter.innerText = Math.ceil(c + increment);
                setTimeout(runCounters, 15);
            } else {
                if (target === 100) {
                    counter.innerText = target + '%';
                } else {
                    counter.innerText = target + '+';
                }
            }
        });
    };

    const sectionMetricas = document.getElementById('metricas');
    let animated = false;

    if (sectionMetricas) {
        window.addEventListener('scroll', () => {
            const sectionPos = sectionMetricas.getBoundingClientRect().top;
            const screenPos = window.innerHeight / 1.2;

            if (sectionPos < screenPos && !animated) {
                runCounters();
                animated = true;
            }
        });
    }

    // ================================================================
    // 6. ANIMAÇÕES DE REVELAÇÃO (SCROLL REVEAL)
    // ================================================================
    const revealElements = document.querySelectorAll('.card-produto, .about-text, .contact-info');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

});