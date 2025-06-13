let salario = 0;
let contas = [];

//Carrega o salário e as contas salvas no LocalStorage
window.onload = () => {
    const salarioSalvo = localStorage.getItem("salario");
    const contasSalvas = localStorage.getItem("contas");

    if (salarioSalvo) {
        salario = parseFloat(salarioSalvo);
        document.getElementById("salario").value = salario;
    }

    if (contasSalvas) {
        contas = JSON.parse(contasSalvas);
    }

    atualizarLista();
    calcularDistribuicao();
};

//Define o salário do usuário
function definirSalario() {
    const inputSalario = parseFloat(document.getElementById("salario").value);

    if (!isNaN(inputSalario) && inputSalario >= 0) {
        salario = inputSalario;
        localStorage.setItem("salario", salario);
        calcularDistribuicao();
    }
}

//Adiciona a conta a ser paga
function adicionarConta() {
    const nome = document.getElementById("nomeConta").value;
    const valor = parseFloat(document.getElementById("valorConta").value);

    if (nome && !isNaN(valor) && valor >= 0) {
        contas.push({ nome, valor });
        localStorage.setItem("contas", JSON.stringify(contas));

        document.getElementById("nomeConta").value = "";
        document.getElementById("valorConta").value = "";

        atualizarLista();
        calcularDistribuicao();
    }
}

//Atualiza a lista das contas do usuário
function atualizarLista() {
    const lista = document.getElementById("listaContas");
    lista.innerHTML = "";

    contas.forEach((conta, index) => {
        const li = document.createElement("li");
        li.textContent = `${conta.nome} - R$ ${conta.valor.toFixed(2)}`;

        const btnRemover = document.createElement("button");
        btnRemover.textContent = "Remover";
        btnRemover.style.marginLeft = "11px";
        btnRemover.onclick = () => removerConta(index);

        li.appendChild(btnRemover);
        lista.appendChild(li);
    });
}

//Remove a conta
function removerConta(index) {
    contas.splice(index, 1);
    localStorage.setItem("contas", JSON.stringify(contas));
    atualizarLista();
    calcularDistribuicao();
}

//Calcula a distribuição
function calcularDistribuicao() {
    const distribuicaoDiv = document.getElementById("distribuicao");
    const resumoFinal = document.getElementById("resumoFinal");
    const sugestaoRenda = document.getElementById("sugestaoRenda");

    if (salario <= 0) {
        distribuicaoDiv.innerHTML = "<p>Digite um salário válido.</p>";
        resumoFinal.innerHTML = "";
        sugestaoRenda.innerHTML = "";
        return;
    }

    if (contas.length === 0) {
        distribuicaoDiv.innerHTML = "<p>Adicione contas para ver a distribuição.</p>";
        resumoFinal.innerHTML = "";
        sugestaoRenda.innerHTML = "";
        return;
    }

    const totalContas = contas.reduce((acc, conta) => acc + conta.valor, 0);
    let html = "<ul>";


    html += "</ul>";
    distribuicaoDiv.innerHTML = html;

    const diferenca = salario - totalContas;

    if (diferenca >= 0) {
        totalDivida.innerHTML = `<h2><strong>Dívida:</strong> R$ ${totalContas.toFixed(2)}</h2>`;
        resumoFinal.innerHTML = `<h2><strong>Sobra:</strong> R$ ${diferenca.toFixed(2)}</h2>`;
        sugestaoRenda.innerHTML = "";
    } else {
        resumoFinal.innerHTML = `<p style="color: red;"><strong>Falta:</strong> R$ ${Math.abs(diferenca).toFixed(2)}</p>`;
        sugestaoRenda.innerHTML = `
      <h3>💡 Sugestões para complementar a renda:</h3>
      <ul>
        <li>Vender produtos online (artesanato, roupas, etc.)</li>
        <li>Freelancer (design, redação, programação)</li>
        <li>Serviços locais (passear com cães, jardinagem, etc.)</li>
        <li>Aplicativos de entrega ou transporte</li>
        <li>Ensinar algo que você sabe (reforço escolar, música, etc.)</li>
      </ul>
    `;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const anoAtual = new Date().getFullYear();
    document.getElementById("ano").textContent = anoAtual;
});
