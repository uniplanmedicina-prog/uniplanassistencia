document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os elementos que têm a classe 'os-animation'
    const animatedElements = document.querySelectorAll('.os-animation');

    // Opções para o Intersection Observer
    const observerOptions = {
        root: null, // viewport como o elemento raiz
        rootMargin: '0px',
        threshold: 0.3 // O elemento deve estar 30% visível para ser acionado
    };

    // Callback executado quando um elemento é observado
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // Se o elemento estiver interceptando (visível)
            if (entry.isIntersecting) {
                // Adiciona a classe 'animated' para iniciar a animação CSS
                entry.target.classList.add('animated');

                // Para a observação após a animação ser acionada
                observer.unobserve(entry.target);
            }
        });
    };

    // Cria o Intersection Observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Inicia a observação em cada elemento
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});
/* --- LÓGICA DO LIGHTBOX/MODAL PARA COROAS DE FLORES (NOVO) --- */

document.addEventListener('DOMContentLoaded', () => {
    // ... Código Scroll Reveal existente ...

    // Seleciona o modal e seus elementos
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("img01");
    const captionText = document.getElementById("caption");
    const closeBtn = document.querySelector(".close-btn");

    // Adiciona listener de clique em todos os itens do carrossel
    const galleryItems = document.querySelectorAll('.gallery-item img');

    galleryItems.forEach(item => {
        item.onclick = function () {
            modal.classList.add('visible');
            modalImg.src = this.src; // Pega a URL da imagem clicada

            // Pega o texto alternativo (alt) como legenda
            captionText.innerHTML = this.alt;

            // Permite dar zoom na imagem dentro do modal (simples toggle)
            modalImg.style.transform = "scale(1)";
            modalImg.onclick = function () {
                this.style.transform = (this.style.transform === "scale(1.5)") ? "scale(1)" : "scale(1.5)";
                this.style.cursor = (this.style.transform === "scale(1.5)") ? "zoom-out" : "zoom-in";
            }
        }
    });

    // Funções para fechar o modal
    const closeModal = () => {
        modal.classList.remove('visible');
        modalImg.style.transform = "scale(1)"; // Reseta o zoom ao fechar
    };

    // 1. Fechar pelo botão 'x'
    closeBtn.onclick = closeModal;

    // 2. Fechar ao clicar fora da imagem
    modal.onclick = (e) => {
        if (e.target.id === 'imageModal') {
            closeModal();
        }
    };

    // 3. Fechar pela tecla ESC
    document.onkeydown = (e) => {
        if (e.key === "Escape" && modal.classList.contains('visible')) {
            closeModal();
        }
    };

});
document.addEventListener('DOMContentLoaded', function () {

    // ==========================================================
    // 1. SCROLL REVEAL (Animação de Entrada)
    // ==========================================================

    /**
     * Função para verificar se um elemento está visível no viewport.
     * @param {HTMLElement} el - O elemento a ser verificado.
     * @returns {boolean} - Retorna true se estiver visível.
     */
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0 &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
            rect.right >= 0
        );
    }

    /**
     * Função principal para lidar com a animação de scroll.
     */
    function handleScrollAnimations() {
        const animatedElements = document.querySelectorAll('.os-animation');

        animatedElements.forEach(el => {
            if (isElementInViewport(el)) {

                // Aplica a classe 'animated' (definida no CSS) para iniciar a animação.
                el.classList.add('animated');

                // Lidar com delays de animação:
                const delayClass = el.className.match(/delay-(\d)/);
                if (delayClass) {
                    const delay = parseInt(delayClass[1]) * 100; // Multiplica por 200ms
                    el.style.transitionDelay = `${delay}ms`;
                }

                // Opcional: Remover a classe 'os-animation' após animar para otimização, 
                // mas manteremos para simplicidade.
            }
        });
    }

    // Executa a função na primeira carga para animar elementos já visíveis
    handleScrollAnimations();

    // Executa a função toda vez que o usuário rola a página
    window.addEventListener('scroll', handleScrollAnimations);

    // ==========================================================
    // 2. MODAL/LIGHTBOX para Galeria de Flores
    // ==========================================================

    // Obter o modal e o botão de fechar
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("img01");
    const captionText = document.getElementById("caption");
    const closeBtn = document.querySelector(".close-btn");

    // Obter todas as imagens da galeria que devem abrir o modal
    const galleryItems = document.querySelectorAll('.gallery-item img');

    galleryItems.forEach(img => {
        img.onclick = function () {
            // Define o conteúdo do modal
            modal.classList.add('visible');
            modalImg.src = this.src;

            // Usa o atributo 'alt' como legenda
            captionText.innerHTML = this.alt;

            // Impede a rolagem do corpo quando o modal está aberto
            document.body.style.overflow = 'hidden';
        }
    });

    /**
     * Função para fechar o modal.
     */
    function closeModal() {
        modal.classList.remove('visible');
        document.body.style.overflow = ''; // Restaura a rolagem do corpo
    }

    // Ação: Fechar ao clicar no botão 'X'
    closeBtn.onclick = closeModal;

    // Ação: Fechar ao clicar fora da imagem (no fundo escuro do modal)
    modal.onclick = function (event) {
        // Verifica se o clique foi diretamente no elemento modal (e não na imagem ou legenda)
        if (event.target === modal) {
            closeModal();
        }
    }

    // Ação: Fechar ao pressionar a tecla ESC
    document.onkeydown = function (e) {
        e = e || window.event;
        if (e.key === "Escape" || e.key === "Esc") {
            if (modal.classList.contains('visible')) {
                closeModal();
            }
        }
    };
});