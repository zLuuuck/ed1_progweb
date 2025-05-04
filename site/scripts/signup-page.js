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

if (localStorage.getItem("token")) {
    alert('Você já está logado!');
    window.location.href = "/site/html/index.html";
}

let user = document.querySelector("#userInput");
let userLabel = document.querySelector("#userLabel");
let validUser = false;

let email = document.querySelector("#email");
let emailLabel = document.querySelector("#emailLabel");
let validEmail = false;

let senha = document.getElementById("senhaInput");
let senhaLabel = document.getElementById("senhaLabel");
let validSenha = false;

let senhaConfirm = document.querySelector("#confirmarSenha");
let senhaConfirmLabel = document.querySelector("#confirmarSenhaLabel");
let validSenhaConfirm = false;

let msgError = document.querySelector("#msgError");
let msgSuccess = document.querySelector("#msgSuccess");

user.addEventListener("keyup", () => {
    if (user.value.length <= 2) {
        userLabel.setAttribute('style', 'color: red')
        userLabel.innerHTML = 'Nome *Insira no mínimo 3 caracteres'
        user.setAttribute('style', 'border-color: red')
        validUser = false
    } else {
        userLabel.setAttribute('style', 'color: green')
        userLabel.innerHTML = 'Nome'
        user.setAttribute('style', 'border-color: green')
        validUser = true
    }
});

email.addEventListener("keyup", () => {
    if (email.value.indexOf('@') === -1 || email.value.indexOf('.') === -1) {
        emailLabel.setAttribute('style', 'color: red; ');
        emailLabel.innerHTML = 'Email *Insira um email válido';
        email.setAttribute('style', 'border-color: red;');
        validEmail = false;
    } else {
        emailLabel.setAttribute('style', 'color: green')
        emailLabel.innerHTML = 'Email'
        email.setAttribute('style', 'border-color: green')
        validEmail = true
    }
});
senha.addEventListener("keyup", () => {
    if (senha.value.length <= 7) {
        senhaLabel.setAttribute('style', 'color: red')
        senhaLabel.innerHTML = 'Senha *Insira no mínimo 8 caracteres'
        senha.setAttribute('style', 'border-color: red')
        validSenha = false
    } else {
        senhaLabel.setAttribute('style', 'color: green')
        senhaLabel.innerHTML = 'Senha'
        senha.setAttribute('style', 'border-color: green')
        validSenha = true
    }
});
senhaConfirm.addEventListener("keyup", () => {
    if (senhaConfirm.value != senha.value) {
        senhaConfirmLabel.setAttribute('style', 'color: red')
        senhaConfirmLabel.innerHTML = 'Senha *As senhas não conferem'
        senhaConfirm.setAttribute('style', 'border-color: red')
        validSenhaConfirm = false
    } else {
        senhaConfirmLabel.setAttribute('style', 'color: green')
        senhaConfirmLabel.innerHTML = 'Senha'
        senhaConfirm.setAttribute('style', 'border-color: green')
        validSenhaConfirm = true
    }
});

function signup() {
    if (validUser && validEmail && validSenha && validSenhaConfirm) {
        let listaUsers = JSON.parse(localStorage.getItem('listaUsers') || '[]')

        const emailExistente = listaUsers.some(user => user.email === email.value);
        const userExistente = listaUsers.some(user => user.nome === user.value);
        if (emailExistente) {
            msgError.setAttribute('style', 'display: block')
            msgError.innerHTML = 'Este email já está cadastrado!'
            msgSuccess.setAttribute('style', 'display: none')
            return;
        }
        if (userExistente) {
            msgError.setAttribute('style', 'display: block')
            msgError.innerHTML = 'Este usuário já está cadastrado!'
            msgSuccess.setAttribute('style', 'display: none')
            return;
        }

        listaUsers.push({
            nome: user.value,
            email: email.value,
            senha: senha.value
        })

        localStorage.setItem('listaUsers', JSON.stringify(listaUsers))

        showSuccess('Cadastro realizado com sucesso! Você será redirecionado para a tela de login!')

        setTimeout(() => {
            window.location.href = '/site/html/conta/login.html'
        }, 3000)
    } else {
        showError('Preencha todos os campos corretamente!')
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
    setTimeout(() => {
        msgError.style.display = "none";
        msgError.textContent = "";
    }, 5000);
}