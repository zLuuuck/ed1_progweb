document.addEventListener('DOMContentLoaded', function () {
    const adicionarAoCarrinhoBotao = document.querySelector('.add-to-cart-btn');

    if (adicionarAoCarrinhoBotao) {
        adicionarAoCarrinhoBotao.addEventListener('click', function () {
            // Obter os dados do produto da página
            const productInfo = document.querySelector('.product-info');
            const idProduto = productInfo ? productInfo.id : null; // Usando o ID da div .product-info
            const nomeProduto = document.querySelector('.product-name').textContent;
            const precoProdutoTexto = document.querySelector('.product-price').textContent.replace('R$ ', '').replace(',', '.'); // Remover 'R$' e substituir ',' por '.' para o parseFloat
            const precoProduto = parseFloat(precoProdutoTexto);
            const imagemProduto = document.querySelector('.product-image img').src;

            // Verificar se todos os dados foram obtidos corretamente
            if (idProduto && nomeProduto && !isNaN(precoProduto) && imagemProduto) {
                // Chamar a função adicionarAoCarrinho (certifique-se de que ela esteja definida no seu script principal ou em um arquivo incluído antes)
                adicionarAoCarrinho(idProduto, nomeProduto, precoProduto, imagemProduto);
            } else {
                showError('Erro ao obter os dados do produto.');
                console.error('Erro ao obter os dados do produto.');
            }
        });
    } else {
        showError('Botão "Adicionar ao Carrinho" não encontrado.');
        console.error('Botão "Adicionar ao Carrinho" não encontrado.');
    }

    // Função adicionarAoCarrinho (coloque esta função AQUI ou em um arquivo JavaScript principal que seja carregado ANTES deste)
    function adicionarAoCarrinho(idProduto, nomeProduto, precoProduto, urlImagem) {
        const carrinhoString = localStorage.getItem('carrinho');
        let carrinho = carrinhoString ? JSON.parse(carrinhoString) : [];

        const itemExistente = carrinho.find(item => item.id === idProduto);

        if (itemExistente) {
            itemExistente.quantidade = (itemExistente.quantidade || 1) + 1;
        } else {
            carrinho.push({
                id: idProduto,
                nome: nomeProduto,
                preco: precoProduto,
                imagem: urlImagem,
                quantidade: 1
            });
        }

        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizarContadorCarrinho();
        showSuccess(`${nomeProduto} adicionado ao carrinho!`);
    }
});

function showSuccess(message) {
    const msgSuccess = document.querySelector("#msgSuccess");
    msgSuccess.textContent = message;
    msgSuccess.style.display = "block";
    msgSuccess.style.color = "green";
    document.querySelector("button[type='button']").disabled = true;
    setTimeout(() => {
        msgSuccess.style.display = "none";
        console.log('Mensagem de sucesso deve desaparecer agora.');
        document.querySelector("button[type='button']").disabled = false; // Reabilita o botão, se necessário
    }, 3000);
}

function showError(message) {
    const msgError = document.querySelector("#msgError");
    msgError.textContent = message;
    msgError.style.display = "block";
    msgError.style.color = "red";
    setTimeout(() => {
        msgError.style.display = "none";
    }, 3000);
}