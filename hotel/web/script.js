const url = 'http://localhost:3000/quartos';
const quartos = [];
let quartoAtual = null;

carregarQuartos();

function carregarQuartos(){
    fetch(url + '/listar')
    .then(response => response.json())
    .then(data =>{
        quartos.length = 0;
        quartos.push(...data);
        listarCards();
    })
    .catch(e =>alert('Problemas com a conexão da API'));
}

function listarCards(){
    const container = document.querySelector('main');
    container.innerHTML = '';

    quartos.forEach(quarto =>{
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
        <h3>${quarto.numero}</h3>
        
        `;
        card.onclick = () => abrirQuarto(quarto);

        container.appendChild(card);
    });
}

function abrirQuarto(quarto){
    quartoAtual = quarto;
    tituloQuarto.innerText = quarto.nome;
    numeroEdit.value = quarto.numero;
    suitesEdit.value = quarto.suites;
    detalhes.classList.remove('oculto');
}

document.querySelector('#formCad'). addEventListener('submit', function(e){
    e.preventDefault();
    const novoQuarto = {
        numero: numero.value,
        tipo: suites.value,
        
    };

    fetch(url + '/cadastrar', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(novoQuarto)
    })

.then(()=>{
    alert("Quarto adicionado com sucesso!");
    cadastro.classList.add('oculto');
    carregarQuartos();
})
.catch(()=>alert("Erro ao salvar quarto"));

})

function salvarQuarto(){
    const quartoEditado = {
        numero: numeroEdit.value,
        tipo: suitesEdit.value,
    };

    fetch(url + '/atualizar/' + quartoAtual.id,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(quartoEditado)
    
    })
    .then(res =>{
        if(!res.ok) throw new Error();
        return res.json();
    })
    .then(()=>{
        alert("Quarto atualizado com sucesso!");
        detalhes.classList.add('oculto');
        carregarQuartos();
    })
    .catch(()=> alert("Erro ao editar quarto"));
}

function excluirQuartoAtual(){
    if(!confirm("Deseja excluir esse quarto?"))return;
    fetch(url + '/excluir/' + quartoAtual.id,{
        method: 'DELETE'
    })
    .then(()=>{
        alert("Quarto excluido com sucesso!");
        detalhes.classList.add('oculto');
        carregarQuartos();
    })
    .catch(()=> alert("Erro ao excluir quarto"));
}