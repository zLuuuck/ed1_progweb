function carregarCarrinho() {
    const carrinhoString = localStorage.getItem('carrinho');
    const carrinho = carrinhoString ? JSON.parse(carrinhoString) : [];
    const listaCarrinho = document.querySelector('.cart-items'); 

    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = '<p>Seu carrinho está vazio.</p>';
        return;
    }

    listaCarrinho.innerHTML = '';

    carrinho.forEach(item => {
        const itemCarrinho = document.createElement('div');
        itemCarrinho.classList.add('cart-item'); 
        itemCarrinho.dataset.id = item.id;

        itemCarrinho.innerHTML = `
        <div class="item-image">
          <img src="${item.imagem}" alt="${item.nome}">
        </div>
        <div class="item-details">
          <h2 class="item-name">${item.nome}</h2>
          <p class="item-price">R$ ${item.preco.toFixed(2)}</p>
          <div class="item-quantity">
            <label for="quantity-${item.id}">Quantidade:</label>
            <input type="number" id="quantity-${item.id}" name="quantity-${item.id}" value="${item.quantidade || 1}" min="1">
          </div>
        </div>
        <button class="remove-item"><i class="fas fa-trash"></i> Remover</button>
      `;

        listaCarrinho.appendChild(itemCarrinho);
    });

    adicionarListenersRemover();
    atualizarTotalCarrinho(); 
}

function removerItemDoCarrinho(idProduto) {
    const carrinhoString = localStorage.getItem('carrinho');
    let carrinho = carrinhoString ? JSON.parse(carrinhoString) : [];

    carrinho = carrinho.filter(item => item.id !== idProduto);

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarContadorCarrinho();
    carregarCarrinho();
}

function adicionarListenersRemover() {
    const botoesRemover = document.querySelectorAll('.remove-item');
    botoesRemover.forEach(botao => {
        botao.addEventListener('click', function () {
            const itemCarrinho = this.parentNode;
            const idProduto = itemCarrinho.dataset.id;
            removerItemDoCarrinho(idProduto);
        });
    });
}

function atualizarTotalCarrinho() {
    const carrinhoString = localStorage.getItem('carrinho');
    const carrinho = carrinhoString ? JSON.parse(carrinhoString) : [];
    let subtotal = 0;

    carrinho.forEach(item => {
        subtotal += item.preco * (item.quantidade || 1);
    });

    const subtotalElement = document.querySelector('.subtotal');
    const totalElement = document.querySelector('.total');

    if (subtotalElement) {
        subtotalElement.textContent = `Subtotal: R$ ${subtotal.toFixed(2)}`;
    }
    if (totalElement) {
        totalElement.textContent = `Total: R$ ${subtotal.toFixed(2)}`; 
    }
}

window.onload = carregarCarrinho;