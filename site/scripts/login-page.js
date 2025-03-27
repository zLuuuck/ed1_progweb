document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        /* Usuário e senha para testes */
        //Adicionar depois: validação com o banco de dados
        const validUsername = "admin";
        const validPassword = "12345678";
        
        if (username === validUsername && password === validPassword) {
            // Redirecionar para a página inicial
            alert("Login bem-sucedido!");
            window.location.href = "../html/index.html";
        }
        else {
            // Exibir mensagem de erro
            alert("Usuário ou senha inválidos. Tente novamente.");
        }

    });
});