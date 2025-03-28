let btn = document.querySelector(".fa-eye");

btn.addEventListener("click", () => {
    let inputpassword = document.getElementById("senha");
    if (inputpassword.getAttribute("type") === "password") {
        inputpassword.setAttribute("type", "text");
        btn.classList.remove("fa-eye-slash");
        btn.classList.add("fa-eye");
    } else {
        inputpassword.setAttribute("type", "password");
        btn.classList.remove("fa-eye");
        btn.classList.add("fa-eye-slash");
    }
});

function login() {
    let user = document.querySelector("#usuario").value;
    let userLabel = document.querySelector("#usuarioLabel");
    let password = document.querySelector("#senha").value;
    let passwordLabel = document.querySelector("#senhaLabel");
    let msgError = document.querySelector("#msgError");b

    let listaUsers = [];
    let userValido = {
        user: "",
        email: "",
        senha: "",
    };

    listaUsers = JSON.parse(localStorage.getItem("listaUsers"));

    listaUsers.forEach((item) => {
        if (user.value == item.userCad && password.value == item.passwordCad) {
            userValido = {
                user: item.userCad,
                email: item.emailCad,
                senha: item.passwordCad,
            }
        }
    });

    if (user.value == userValido.user && password.value == userValido.senha) {
        let mathRandom = Math.random().toString(16).substring(2);
        let token = mathRandom + mathRandom;
        localStorage.setItem("token", token);
        localStorage.setItem("userLogado", JSON.stringify(userValido));
        window.location.href = "../html/products.html";
    } else {
        userLabel.setAttribute('style', 'color: red')
        usuario.setAttribute('style', 'border-color: red')
        senhaLabel.setAttribute('style', 'color: red')
        senha.setAttribute('style', 'border-color: red')
        msgError.setAttribute('style', 'display: block')
        msgError.innerHTML = 'Usuário ou senha incorretos'
        usuario.focus()
    }
}