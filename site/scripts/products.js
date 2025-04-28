document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.product-slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);

    showSlide(currentIndex);
});
