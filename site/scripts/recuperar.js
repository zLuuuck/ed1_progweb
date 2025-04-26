function toggleMenu() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
}

document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.getElementById("formularioRecuperar");
    const msgSuccess = document.getElementById("msgSuccess");
    const msgError = document.getElementById("msgError");

    formulario.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const users = JSON.parse(localStorage.getItem("listaUsers") || "[]");
        const user = users.find(u => u.email === email);

        if (!user) {
            showError("E-mail não encontrado.");
            return;
        }

        const token = Math.random().toString(36).substring(2);
        localStorage.setItem(`recoveryToken-${token}`, email); // salva o token ligado ao email

        const recoveryLink = `${window.location.origin}/site/html/conta/redefinir-senha.html?token=${token}`;

        // Enviar e-mail via EmailJS
        console.log("Enviando e-mail para:", email, "com link:", recoveryLink);
        emailjs.send("service_4dii119", "template_h5b4xag", {
            to_email: email,
            recovery_link: recoveryLink
        }).then(() => {
            showSuccess("E-mail de recuperação enviado com sucesso! Verifique sua caixa de entrada e a pasta de spam.");
            formulario.reset(); // Limpa o formulário após o envio
            setTimeout(()=>{
                window.location.href = '/site/html/conta/login.html'
            }, 3000)
        }).catch((error) => {
            console.error("Erro ao enviar e-mail:", error);
            showError("Erro ao enviar e-mail. Tente novamente mais tarde.");
        });
    });

    function showSuccess(message) {
        msgSuccess.textContent = message;
        msgSuccess.style.display = "block";
        msgSuccess.style.color = "green";
        msgError.style.display = "none";
    }

    function showError(message) {
        msgError.textContent = message;
        msgError.style.display = "block";
        msgError.style.color = "red";
        msgSuccess.style.display = "none";
    }
});