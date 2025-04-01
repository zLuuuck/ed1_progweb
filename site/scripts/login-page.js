document.querySelector(".fa-eye").addEventListener("click", function() {
    let inputPassword = document.getElementById("senhaInput");
    if (inputPassword.type === "password") {
        inputPassword.type = "text";
        this.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        inputPassword.type = "password";
        this.classList.replace("fa-eye-slash", "fa-eye");
    }
});

// Função de login
async function login() {
    const usernameInput = document.querySelector("#userInput").value.trim();
    const passwordInput = document.querySelector("#senhaInput").value;


    if (!usernameInput || !passwordInput) {
        showError("Preencha todos os campos!");
        return false;
    }

    try {
        const listaUsers = JSON.parse(localStorage.getItem("listaUsers") || "[]");
        
        const usuarioEncontrado = listaUsers.find(user => user.nome === usernameInput);

        if (!usuarioEncontrado) {
            showError("Usuário ou senha incorretos!");
            return;
        }

        if (passwordInput !== usuarioEncontrado.senha) {
            showError("Usuário ou senha incorretos!");
            return;
        }

        const token = Math.random().toString(16).substring(2) + Math.random().toString(16).substring(2);

        localStorage.setItem("token", token);
        localStorage.setItem("userLogado", JSON.stringify({
            nome: usuarioEncontrado.nome,
            email: usuarioEncontrado.email
        }));

        showSuccess("Login realizado com sucesso!");

        setTimeout(() => {
            window.location.href = "/site/html/index.html";
        }, 5000);

    } catch (error) {
        console.error("Erro no login:", error);
        showError("Erro ao fazer login. Tente novamente.");
    }
}
function showSuccess(message) {
    const msgSuccess = document.querySelector("#msgSuccess");
    msgSuccess.textContent = message;
    msgSuccess.style.display = "block";
    msgSuccess.style.color = "green";
    document.querySelector("button[type='button']").disabled = true;
}

function showError(message) {
    const msgError = document.querySelector("#msgError");
    msgError.textContent = message;
    msgError.style.display = "block";
    msgError.style.color = "red";
    
    let userInput = document.querySelector("#userInput");
    let senhaInput = document.querySelector("#senhaInput");
    let userLabel = document.querySelector("#userLabel");
    let senhaLabel = document.querySelector("#senhaLabel");

    userInput.setAttribute("style", "border-color: red");
    userLabel.setAttribute("style", "color: red");
    senhaLabel.setAttribute("style", "color: red");
    senhaInput.setAttribute("style", "border-color: red");
    setTimeout(() => {
        msgError.style.display = "none";
        msgError.textContent = "";
        userInput.setAttribute("style", "border-color: #000000");
        userLabel.setAttribute("style", "color: #000000");
        senhaLabel.setAttribute("style", "color: #000000");
        senhaInput.setAttribute("style", "border-color: #000000");
        userInput.value = "";
        senhaInput.value = "";
        userInput.focus();
        userLabel.innerHTML = "Usuário";
        senhaLabel.innerHTML = "Senha";
    }, 5000);
    function resetarInput() {
        let input = document.getElementById("userInput");
        let label = document.getElementById("userLabel");
        let inputsenha = document.getElementById("senhaInput");
        let labelsenha = document.getElementById("senhaLabel");
        label.innerHTML = "Usuário";
        labelsenha.innerHTML = "Senha";
        label.setAttribute("style", "color: #000000");
        labelsenha.setAttribute("style", "color: #000000");
        input.setAttribute("style", "border-color: #000000");
        inputsenha.setAttribute("style", "border-color: #000000");
        input.value = "";
        inputsenha.value = "";
        input.focus();
    }
    // Resetar quando a página carrega
    window.onload = resetarInput;
}