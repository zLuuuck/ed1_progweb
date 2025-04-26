document.querySelectorAll(".fa-eye").forEach((btn) => {
    btn.addEventListener("click", () => {
        let inputPassword = btn.parentElement.querySelector("input");
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
    document.querySelector("button[type='submit']").disabled = true; // Correção do seletor
}

function showError(message) {
    const msgError = document.querySelector("#msgError");
    msgError.textContent = message;
    msgError.style.display = "block";
    msgError.style.color = "red";
}

document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.getElementById("formularioRedefinir");

    formulario.addEventListener("submit", function (e) {
        e.preventDefault();

        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        const email = localStorage.getItem(`recoveryToken-${token}`);
        const novaSenha = document.getElementById("password").value; 
        const confirmNovaSenha = document.getElementById("confirmPassword").value;

        if (!token || !email) {
            document.body.innerHTML = "<h2>Link inválido ou expirado.</h2>";
            return;
        }

        if (novaSenha !== confirmNovaSenha) {
            showError("As senhas não coincidem.");
            return;
        }

        let users = JSON.parse(localStorage.getItem("listaUsers") || "[]");
        const index = users.findIndex(u => u.email === email);

        if (index !== -1) {
            users[index].senha = novaSenha; // **Importante: Em um sistema real, você HASHED a senha aqui!**
            localStorage.setItem("listaUsers", JSON.stringify(users));
            localStorage.removeItem(`recoveryToken-${token}`);
            showSuccess("Senha redefinida com sucesso!");
            setTimeout(() => {
                window.location.href = "/site/html/conta/login.html";
            }, 3000);
        } else {
            showError("Erro ao redefinir senha.");
            console.error("Erro ao redefinir senha.");
        }
    });
});