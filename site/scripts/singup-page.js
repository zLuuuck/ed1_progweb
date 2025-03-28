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


let user = document.querySelector("#usuario");
let userLabel = document.querySelector("#usuariolabel");
let validUser = false;

let email = document.querySelector("#email");
let emailLabel = document.querySelector("#emailLabel");
let validEmail = false;

let senha = document.querySelector("#senha");
let senhaLabel = document.querySelector("#senhalabel");
let validSenha = false;

let senhaConfirm = document.querySelector("#confirmarSenha");
let senhaConfirmLabel = document.querySelector("#confirmarSenhaLabel");
let validSenhaConfirm = false;

let msgError = document.querySelector("#msgError");
let msgSuccess = document.querySelector("#msgSuccess");

user.addEventListener("keyup", () => {
    if (nome.value.length <= 2) {
        labelNome.setAttribute('style', 'color: red')
        labelNome.innerHTML = 'Nome *Insira no minimo 3 caracteres'
        nome.setAttribute('style', 'border-color: red')
        validNome = false
    } else {
        labelNome.setAttribute('style', 'color: green')
        labelNome.innerHTML = 'Nome'
        nome.setAttribute('style', 'border-color: green')
        validNome = true
    }
});

email.addEventListener("keyup", () => {
    if (email.value.indexOf('@') === -1 || email.value.indexOf('.') === -1) {
        emailLabel.setAttribute('style', 'color: red')
        emailLabel.innerHTML = 'Email *Insira um email válido'
        email.setAttribute('style', 'border-color: red')
        validEmail = false
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
        senhaLabel.innerHTML = 'Senha *Insira no minimo 8 caracteres'
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

function singup() {
    if (validNome && validEmail && validSenha && validSenhaConfirm) {
        let listaUsers = JSON.parse(localStorage.getItem('listaUser') || '[]')

        listaUsers.push({
            nome: user.value,
            email: email.value,
            senha: senha.value
        })

        localStorage.setItem('listaUsers', JSON.stringify(listaUsers))

        msgSuccess.setAttribute('style', 'display: block')
        msgSuccess.innerHTML = 'Cadastro realizado com sucesso!'
        msgError.setAttribute('style', 'display: none')
        msgError.innerHTML = ''
        
        setTimeout(()=>{
            window.location.href = '../html/signin.html'
        }, 3000)
    } else {
        msgError.setAttribute('style', 'display: block')
        msgError.innerHTML = 'Preencha todos os campos corretamente!'
        msgSuccess.setAttribute('style', 'display: none')
        msgSuccess.innerHTML = ''
    
        
    }
};