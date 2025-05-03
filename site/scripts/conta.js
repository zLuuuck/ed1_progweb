if (localStorage.getItem("token") == null) {
    alert('Você precisa estar logado para acessar essa página!');
    window.location.href = "/site/html/conta/login.html";
}

const userLogado = JSON.parse(localStorage.getItem('userLogado'));
let user = userLogado.nome;
let user_logado_nome = document.querySelector("#user_logado_nome");

user_logado_nome.innerHTML = "Olá " + user + "!";



function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userLogado");
    alert('Você saiu da sua conta!');
    window.location.href = "/site/html/conta/login.html";
}