/*Criação de objetos*/
let listaDeItens = []
let itemAEditar 

const form = document.getElementById('form-itens')
const itensInput = document.getElementById('receber-item')
const ulItens = document.getElementById('lista-de-itens')
const ulItensComprados = document.getElementById('itens-comprados')
const listaRecuperada = localStorage.getItem('listaDeItens')

function atualizaLocalStorage() {
    localStorage.setItem('listaDeItens', JSON.stringify(listaDeItens))
}

// (valores omitidos, 0, null, NaN, undefined, "", false) << retornam false

if (listaRecuperada) {
    listaDeItens = JSON.parse(listaRecuperada)
    mostrarItem()
}else {
    listaDeItens = []
}

form.addEventListener("submit", function (evento) {
    evento.preventDefault()
    salvarItem()
    mostrarItem()
})

function salvarItem() {
    const comprasItem = itensInput.value;
    /*método booleman "true" e "false" */
    const checarDuplicado = listaDeItens.some((elemento) => elemento.valor.toUpperCase() === comprasItem.toUpperCase())

    if(checarDuplicado) {
        alert('Item já existe')
    }else { /*Só guardará o objeto*/
    listaDeItens.push({
        valor: comprasItem,
        checa: false
    })
}
    itensInput.value = ''
}

/*comparação de objetos*/
function mostrarItem() {
    ulItens.innerHTML = '' /*Esvaziar lista de itens*/
    ulItensComprados.innerHTML = '' /*Esvaziar lista de itens comprados */
    itensInput.focus()  /*Manter o foco no input */
    
    listaDeItens.forEach((elemento, index) => {
        if (elemento.checar) {
            ulItensComprados.innerHTML += `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
    <div>
        <input type="checkbox" checked class="is-clickable" />
        <span class="itens-comprados is-size-5">${elemento.valor}</span>
    </div>
    <div>
        <i class="fa-solid fa-trash is-clickable deletar"></i>
    </div>
</li>
            `
           } else {
            ulItens.innerHTML += `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
        <div>
            <input type="checkbox" class="is-clickable"/>
            <input type="text" class="is-size-5" value="${elemento.valor}" ${index !== Number(itemAEditar) ? 'disabled' : ''}></input>
        </div>
        <div>
            ${ index === Number(itemAEditar) ? '<button onClick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>' : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
            <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>

    </li>
    `
 }
})
    const inputsCheck = document.querySelectorAll('input[type="checkbox"]')
    inputsCheck.forEach(i => {
        i.addEventListener('click', (evento) => {
            const ValorDoElemento = evento.target /*retorna um alvo*/.parentElement /*retorna o elemento pai que está sendo clicado*/.parentElement.getAttribute('data-value')
            listaDeItens[ValorDoElemento].checar = evento.target.checked /*permite acessar a chave diretamente pelo objeto, identifiacando pelo seu índice*/
            console.log (listaDeItens[ValorDoElemento].checar)
            mostrarItem()
        })
    })
    
    const deletarObjetos = document.querySelectorAll('.deletar')

    deletarObjetos.forEach(i => {
    i.addEventListener('click', (evento) => {
        ValorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value')
        listaDeItens.splice /*método multifuncional - Deleta objetos, Substitui um objeto pelo outro, adiciona novos objetos''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/(ValorDoElemento, 1)
        mostrarItem()
        
    })
})

    const editarItens = document.querySelectorAll('.editar')

    editarItens.forEach(i => {
            i.addEventListener('click', (evento) => {
            itemAEditar = evento.target.parentElement.parentElement.getAttribute('data-value')
            mostrarItem()
        })
})
//     const inputEdit = document.querySelector(`[data-value="${itemAEditar}"] input[type="text"]`);
//     if (inputEdit) {
//     inputEdit.removeAttribute('disabled');
//     inputEdit.focus();
//     inputEdit.addEventListener('keydown', event => {
//         if (event.key === 'Enter') {
//             salvarEdicao();
//         }
//     })
// }

 atualizaLocalStorage()
}


function salvarEdicao() {
    const itemEditado = document.querySelector(`[data-value="${itemAEditar}"] input[type="text"]`)
    // console.log(itemEditado.value)
    /*Comando para atulizar os objetos */
    listaDeItens[itemAEditar].valor = itemEditado.value
    console.log(listaDeItens)
    itemAEditar = -1
    mostrarItem()
    // itemEditado.setAttribute('disabled', true)
} 

//  Comentário
/*Usar 3 sinais de igual, indica uma comparação mais forte, no caso, o navegador não dará sempre 'false' na comparação de number com string (number)*/

/*Se o itemEditar for diferente do index, eu quero que input seja desabilitado(não edita) e quero substituir o desabilitado por uma string vazia*/
 
/*se o index for igual a itemEditar, eu quero que apareça o ícone de salvar*/ 

/*se não for igual, vai aparecer o ícone de editar(lapis)*/