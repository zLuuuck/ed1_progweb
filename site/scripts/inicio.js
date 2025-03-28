if (localStorage.getItem("token") == null) {
    alert('Você precisa estar logado para acessar essa página!');
    window.location.href = "../html/login.html";
}

let userLogado = JSON.parse(localStorage.getItem("userLogado"));

let user = document.querySelector("#logado");
logado.innerHTML = 'Olá, ${userLogado.nome}';

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userLogado");
    alert('Você saiu da sua conta!');
    window.location.href = "../html/login.html";
}

