document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const cpf = document.getElementById('cpf').value;
    const endereco = document.getElementById('endereco').value;

    // Mostrar no console o que está sendo enviado
    console.log("Dados enviados:", { nome, email, telefone, cpf, endereco });

    fetch('https://x8ki-letl-twmt.n7.xano.io/api:exnafo3B/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nome: nome,
            email: email,
            telefone: telefone,
            cpf: cpf,
            endereco: endereco
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro: ' + response.status + ' - ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('mensagem').innerText = `Cliente ${nome} cadastrado com sucesso!`;
        this.reset();
    })
    .catch(error => {
        document.getElementById('mensagem').innerText = 'Erro ao cadastrar. Tente novamente.';
        console.error("Erro detalhado: ", error);
    });
});

// Máscaras (mantidas como estão)
document.getElementById('telefone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 6) {
        value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
        value = `(${value}`;
    }
    e.target.value = value;
});

document.getElementById('cpf').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 9) {
        value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9)}`;
    } else if (value.length > 6) {
        value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`;
    } else if (value.length > 3) {
        value = `${value.slice(0, 3)}.${value.slice(3)}`;
    }
    e.target.value = value;
});