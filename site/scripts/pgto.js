document.addEventListener("DOMContentLoaded", () => {
    atualizarResumo();

    const form = document.getElementById("form-pagamento");
    const validadeInput = document.getElementById("validade");
    const cardNumberInput = document.getElementById("cardNumber");
    const cvvInput = document.getElementById("cvv");
    const cepInput = document.getElementById("cep");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
    
        const validadeValor = validadeInput.value.trim();
        const numeroCartao = cardNumberInput.value.replace(/\D/g, "");
        const cvvValor = cvvInput.value.trim();
        const cepValor = cepInput.value.trim();
    
        if (numeroCartao.length < 13 || numeroCartao.length > 19) {
            showError("Número do cartão inválido.");
            return;
        }
    
        if (!validarValidadeCartao(validadeValor)) {
            showError("Data de validade do cartão inválida.");
            return;
        }
    
        if (!validarCVV(cvvValor)) {
            showError("CVV inválido. Deve conter 3 ou 4 dígitos.");
            return;
        }
    
        if (!validarCEP(cepValor)) {
            showError("CEP inválido. Use o formato 00000-000.");
            return;
        }
    
        localStorage.removeItem("carrinho");
        window.location.href = "/site/html/obrigado.html";
    });
    

    validadeInput.addEventListener("input", (e) => {
        let valor = e.target.value.replace(/\D/g, "");
        if (valor.length > 4) valor = valor.slice(0, 4);
        if (valor.length >= 3) valor = `${valor.slice(0, 2)}/${valor.slice(2)}`;
        e.target.value = valor;
    });
    
    cepInput.addEventListener("input", (e) => {
        let valor = e.target.value.replace(/\D/g, "");
        if (valor.length > 8) valor = valor.slice(0, 8);
        if (valor.length > 5) {
            valor = `${valor.slice(0, 5)}-${valor.slice(5)}`;
        }
        e.target.value = valor;
    });
    
});

function showError(message) {
    const msgError = document.querySelector("#msgError");
    msgError.textContent = message;
    msgError.style.display = "block";
    msgError.style.color = "red";
}

function atualizarResumo() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let subtotal = 0;

    carrinho.forEach(item => {
        subtotal += item.preco * (item.quantidade || 1);
    });

    const subtotalEl = document.querySelector(".subtotal");
    const totalEl = document.querySelector(".total");

    subtotalEl.textContent = `Subtotal: R$ ${subtotal.toFixed(2)}`;
    totalEl.textContent = `Total: R$ ${subtotal.toFixed(2)}`;
}

const cardIcon = document.getElementById("cardBrandIcon");
const cardPatterns = {
    visa: /^4/,
    mastercard: /^(5[1-5][0-9]{0,}|2(2[2-9][0-9]{0,}|2[3-9][0-9]{0,}|[3-6][0-9]{2}|7[01][0-9]|720))/,
    amex: /^3[47]/,
    elo: /^(4011(78|79)|431274|438935|451416|457393|457631|457632|504175|5067[0-6]|50677[0-8]|509[0-9]{3}|627780|636297|636368|6500(31|33|35|36|37)|6504(85|86|87|88)|6507(00|01|02|03|04|05|06|07|08|09)|6516(52|53|54|55)|6550(00|01|02|03|04|05|06|07|08|09))/,
};

function detectCardBrand(number) {
    for (const brand in cardPatterns) {
        if (cardPatterns[brand].test(number)) return brand;
    }
    return null;
}

function formatCardNumber(value) {
    return value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
}

document.getElementById("cardNumber").addEventListener("input", (e) => {
    const raw = e.target.value.replace(/\D/g, "");
    e.target.value = formatCardNumber(raw);
    const brand = detectCardBrand(raw);
    updateCardIcon(brand);
});

function updateCardIcon(brand) {
    const iconUrls = {
        visa: "https://img.icons8.com/color/48/000000/visa.png",
        mastercard: "https://img.icons8.com/color/48/000000/mastercard.png",
        amex: "https://img.icons8.com/color/48/000000/amex.png",
        elo: "https://images.icon-icons.com/2341/PNG/512/elo_payment_method_card_icon_142740.png",
    };

    if (brand && iconUrls[brand]) {
        cardIcon.style.backgroundImage = `url('${iconUrls[brand]}')`;
    } else {
        cardIcon.style.backgroundImage = "";
    }
}

function validarValidadeCartao(validade) {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!regex.test(validade)) return false;
    const [mes, ano] = validade.split("/").map(Number);
    const agora = new Date();
    const anoAtual = agora.getFullYear() % 100;
    const mesAtual = agora.getMonth() + 1;
    return !(ano < anoAtual || (ano === anoAtual && mes < mesAtual));
}

function validarCVV(cvv) {
    return /^\d{3,4}$/.test(cvv);
}

function validarCEP(cep) {
    return /^[0-9]{5}-?[0-9]{3}$/.test(cep);
}
