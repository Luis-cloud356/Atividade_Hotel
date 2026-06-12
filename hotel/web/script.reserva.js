const url = 'http://localhost:3000/reservas';
const reservas = [];
let reservaAtual = null;

carregarReservas();

function carregarReservas(){
    fetch(url + '/listar')
    .then(response => response.json())
    .then(data =>{
        reservas.length = 0;
        reservas.push(...data);
        listarCards();
    })
    .catch(e =>alert('Problemas com a conexão da API'));
}

function listarCards(){
    const container = document.querySelector('main');
    container.innerHTML = '';

    reservas.forEach(reserva =>{
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
        <h3>${reserva.hospede}</h3>
        <h3>${reserva.data_entrada}</h3>
        <h3>${reserva.data_saida}</h3>
        <h3>${reserva.quarto_id}</h3>
        
        
        
        `;
        card.onclick = () => abrirReserva(reserva);

        container.appendChild(card);
    });
}

function abrirReserva(reserva){
    reservaAtual = reserva;
    tituloReserva.innerText = reserva.nome;
    nomeEdit.value = reserva.hopede;
    dataEdit.value = reserva.data_entrada;
    data_saidaEdit.value = reserva.data_saida;
    detalhes.classList.remove('oculto');
}

document.querySelector('#formCad'). addEventListener('submit', function(e){
    e.preventDefault();
    const novaReserva = {
        hospede: hospede.value,
        data_entrada: data_entrada.value,
        data_saida: data_saida.value,
        quarto_id: quarto_idEdit.value
        
    };

    fetch(url + '/cadastrar', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(novaReserva)
    })

.then(()=>{
    alert("Reserva adicionada com sucesso!");
    cadastro.classList.add('oculto');
    carregarReservas();
})
.catch(()=>alert("Erro ao salvar reserva"));

})

function salvarReserva(){
    const reservaEditada = {
        hospede: hospedeEdit.value,
        data: dataEdit.value,
        data_saida: data_saidaEdit.value,
        quarto_id: quarto_idEdit.value
    };

    fetch(url + '/atualizar/' + reservaAtual.id,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(reservaEditada)
    
    })
    .then(res =>{
        if(!res.ok) throw new Error();
        return res.json();
    })
    .then(()=>{
        alert("Reserva atualizada com sucesso!");
        detalhes.classList.add('oculto');
        carregarReservas();
    })
    .catch(()=> alert("Erro ao editar reserva"));
}

function excluirReservaAtual(){
    if(!confirm("Deseja excluir essa reserva?"))return;
    fetch(url + '/excluir/' + reservaAtual.id,{
        method: 'DELETE'
    })
    .then(()=>{
        alert("Reserva excluida com sucesso!");
        detalhes.classList.add('oculto');
        carregarReservas();
    })
    .catch(()=> alert("Erro ao excluir reserva "));
}