const relatorioForm = document.getElementById('relatorioForm');
const relatoriosContainer = document.getElementById('relatoriosContainer');

// Carregar relatórios salvos ao iniciar a página
carregarRelatorios();

relatorioForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(relatorioForm);
    const relatorioData = {};
    formData.forEach((value, key) => {
        relatorioData[key] = value;
    });

    salvarRelatorio(relatorioData);
    relatorioForm.reset();
    carregarRelatorios();
});

function salvarRelatorio(relatorioData) {
    const relatorios = JSON.parse(localStorage.getItem('relatorios')) || [];
    relatorios.push(relatorioData);
    localStorage.setItem('relatorios', JSON.stringify(relatorios));
    alert('Relatório salvo com sucesso!');
}

function carregarRelatorios() {
    relatoriosContainer.innerHTML = '';

    const relatorios = JSON.parse(localStorage.getItem('relatorios')) || [];
    relatorios.forEach((relatorio, index) => {
        const relatorioDiv = document.createElement('div');
        relatorioDiv.classList.add('relatorio');
        relatorioDiv.innerHTML = `
            <h3>Torre: ${relatorio.torre}</h3>
            <p>Data: ${relatorio.data}</p>
            <p>Local: ${relatorio.local}</p>
            <p>Observações: ${relatorio.observacoes}</p>
            <button onclick="excluirRelatorio(${index})">Excluir</button>
        `;
        relatoriosContainer.appendChild(relatorioDiv);
    });
}

function excluirRelatorio(index) {
    const relatorios = JSON.parse(localStorage.getItem('relatorios')) || [];
    relatorios.splice(index, 1);
    localStorage.setItem('relatorios', JSON.stringify(relatorios));
    carregarRelatorios();
}