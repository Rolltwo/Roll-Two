document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.hero-nav.prev');
    const nextBtn = document.querySelector('.hero-nav.next');
    let currentSlide = 0;
    const totalSlides = slides.length;

    // Função para atualizar o slide ativo
    function updateSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    // Função para ir para o próximo slide
    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        updateSlide(next);
    }

    // Função para ir para o slide anterior
    function prevSlide() {
        const prev = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlide(prev);
    }

    // Event listeners para os botões de navegação
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Event listeners para os dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => updateSlide(index));
    });

    // Autoplay do slider
    let autoplayInterval = setInterval(nextSlide, 5000);

    // Parar autoplay quando o mouse estiver sobre o slider
    const hero = document.querySelector('.hero');
    hero.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    hero.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(nextSlide, 5000);
    });
});
