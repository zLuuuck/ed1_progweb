function carregarCarrinho() {
    const carrinhoString = localStorage.getItem('carrinho');
    const carrinho = carrinhoString ? JSON.parse(carrinhoString) : [];
    const listaCarrinho = document.querySelector('.cart-items'); 
    const sumary = document.querySelector('.cart-summary');
    const botao = document.querySelector('.checkout-btn');

    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = '<p style="text-align:center;padding:10vh">Seu carrinho está vazio.</p>';
        sumary.innerHTML = '<p></p>';
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

    if (botao) {
        botao.addEventListener('click', function () {
            const token = localStorage.getItem("token")
            if (token) {
                window.location.href = "/site/html/pgto.html"
            }
            if (token == null) {
                console.log("redirecionando para página de login. . . ")
                avisoLogin("Você precisa estar logado! Redirecionando . . .")
                setTimeout(() => {
                    window.location.href = "/site/html/conta/login.html"
                }, 3000);
            }
        })
    }

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

function avisoLogin(message) {
    const msgError = document.querySelector("#avisoLogin");
    msgError.textContent = message;
    msgError.style.display = "block";
    msgError.style.color = "red";
}