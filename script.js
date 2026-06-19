document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. MENU MOBILE E GAVETA LATERAL
    // ==========================================================================
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function(e) {
            e.preventDefault(); // Impede duplo clique acidental
            
            navLinks.classList.toggle('active'); // Abre a gaveta
            
            // Troca o ícone (Hambúrguer <-> X)
            const icon = this.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.replace('fa-bars', 'fa-xmark');
                } else {
                    icon.classList.replace('fa-xmark', 'fa-bars');
                }
            }
        });

        // Fecha a gaveta quando clica em algum link do menu
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

    // ==========================================================================
    // 2. FORMULÁRIO COM ANIMAÇÃO DE ESTADO
    // ==========================================================================
    const formContato = document.getElementById('formContato');
    
    if (formContato) {
        formContato.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            const btnSubmit = formContato.querySelector('button[type="submit"]');
            
            // Estado Carregando
            btnSubmit.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processando...';
            btnSubmit.style.opacity = '0.7'; 
            btnSubmit.style.cursor = 'wait';
            btnSubmit.disabled = true;

            // Simula o tempo
            setTimeout(() => {
                // Estado Sucesso
                btnSubmit.style.opacity = '1';
                btnSubmit.style.cursor = 'default';
                btnSubmit.classList.add('btn-success');
                btnSubmit.innerHTML = '<i class="fa-solid fa-check" style="margin-right: 8px;"></i> Orçamento Enviado!';
                
                formContato.reset();

                // Retorna ao Normal
                setTimeout(() => {
                    btnSubmit.classList.remove('btn-success');
                    btnSubmit.innerHTML = 'Solicitar Orçamento <i class="fa-solid fa-paper-plane"></i>';
                    btnSubmit.disabled = false;
                    btnSubmit.style = ''; 
                }, 4000);
            }, 1500); 
        });
    }

    // ==========================================================================
    // 3. ESTATÍSTICAS ANIMADAS (NÚMEROS)
    // ==========================================================================
    const counters = document.querySelectorAll('.counter');
    
    const runCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const c = +counter.innerText;
            const increment = target / 150; 

            if(c < target) {
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
});