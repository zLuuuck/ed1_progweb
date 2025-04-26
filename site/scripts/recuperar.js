function toggleMenu() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
}

let msgError = document.querySelector("#msgError");
let msgSuccess = document.querySelector("#msgSuccess");

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

function recuperar() {

document.getElementById("formulario").addEventListener("submit", function (e) {
    e.preventDefault();

    const emailInput = document.getElementById("email");
    const email = emailInput.value.trim();
    const users = JSON.parse(localStorage.getItem("listaUsers") || "[]");
    const user = users.find(u => u.email === email);

    const msg = document.getElementById("mensagem");

    if (!user) {
        showError("E-mail não encontrado.");
        msg.innerText = "E-mail não encontrado.";
        msg.style.color = "red";
        return;
    }

    const token = Math.random().toString(36).substring(2);
    localStorage.setItem(`recoveryToken-${token}`, email); // salva o token ligado ao email

    const recoveryLink = `${window.location.origin}/site/html/conta/redefinir.html?token=${token}`;

    // Enviar e-mail via EmailJS
    emailjs.send("service_uym7tgt", "template_x1fvfyr", {
        to_email: email,
        recovery_link: recoveryLink
    }).then(() => {
        msg.innerText = "E-mail de recuperação enviado com sucesso!";
        msg.style.color = "green";
        showSuccess("E-mail de recuperação enviado com sucesso!");
    }).catch((error) => {
        console.error("Erro ao enviar e-mail:", error);
        msg.innerText = "Erro ao enviar e-mail. Tente novamente mais tarde.";
        msg.style.color = "red";
        showError("Erro ao enviar e-mail. Tente novamente mais tarde.");
    });
});
}