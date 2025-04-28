document.getElementById('formulario').addEventListener('submit', function (e) {
    e.preventDefault(); // impede redirecionamento

    const form = e.target;
    const data = new FormData(form);

    fetch(form.action, {
        method: "POST",
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            showSuccess("E-mail enviado com sucesso!");
            form.reset(); // limpa o formulário
        }
    })
});

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