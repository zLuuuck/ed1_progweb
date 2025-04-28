function toggleMenu() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
}

function atualizarContadorCarrinho() {
    const carrinhoString = localStorage.getItem('carrinho');
    const carrinho = carrinhoString ? JSON.parse(carrinhoString) : [];
    const contadorElement = document.querySelector('.cart-count');

    if (contadorElement) {
        let totalItens = 0;
        carrinho.forEach(item => {
            totalItens += item.quantidade || 1; // Considera a quantidade de cada item
        });
        contadorElement.textContent = totalItens;
    }
}
atualizarContadorCarrinho();