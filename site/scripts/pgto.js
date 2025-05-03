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
    mastercard: /^5[1-5]/,
    amex: /^3[47]/,
    elo: /^636/,
    hipercard: /^606282|^3841/,
    diners: /^36/,
    discover: /^6(?:011|5)/,
    jcb: /^(?:2131|1800|35)/
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
    if (brand) {
        cardIcon.style.backgroundImage = `url('https://img.icons8.com/color/48/000000/${brand}.png')`;
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
