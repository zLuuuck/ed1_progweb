document.querySelectorAll(".fa-eye").forEach((btn) => {
    btn.addEventListener("click", () => {
        // Identifica o input relacionado ao ícone clicado
        let inputPassword = btn.parentElement.querySelector("input");

        // Alterna entre "password" e "text"
        if (inputPassword.type === "password") {
            inputPassword.type = "text";
            btn.classList.remove("fa-eye");
            btn.classList.add("fa-eye-slash");
        } else {
            inputPassword.type = "password";
            btn.classList.remove("fa-eye-slash");
            btn.classList.add("fa-eye");
        }
    });
});

function toggleMenu() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
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
}

function redefinirsenha() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const email = localStorage.getItem(`recoveryToken-${token}`);

    if (!token || !email) {
        document.body.innerHTML = "<h2>Link inválido ou expirado.</h2>";
    }

    document.getElementById("formulario").addEventListener("submit", function (e) {
        e.preventDefault();

        const novaSenha = document.getElementById("nova-senha").value;
        let users = JSON.parse(localStorage.getItem("listaUsers") || "[]");
        const index = users.findIndex(u => u.email === email);

        if (index !== -1) {
            users[index].senha = novaSenha;
            localStorage.setItem("listaUsers", JSON.stringify(users));
            localStorage.removeItem(`recoveryToken-${token}`);
            alert("Senha redefinida com sucesso!");
            showSuccess("Senha redefinida com sucesso!");
            // Redireciona para a página de login após 5 segundos
            setTimeout(() => {
                window.location.href = "/site/html/conta/login.html";
            }, 3000);
        } else {
            showError("Erro ao redefinir senha.");
            console.error("Erro ao redefinir senha.");
            alert("Erro ao redefinir senha.");
        }
    });
}
