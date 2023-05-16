const socket = io();
//este socket es el que se usa para poder comunicarse con el servidor

let btn = document.getElementById('btn')

//traigo productos desde el server
socket.on('product_list', prod => {
    createList(prod);
})


btn.addEventListener('click', (e) => {
    e.preventDefault();
    let key = document.getElementById('key').value;
    let value = document.getElementById('value').value;
    let id = document.getElementById('idProduct').value;

    updateProduct(key, value, id);
})




//dibujo lista de Productos
const createList = async (prod) => {
    let divList = document.getElementById('listOfProducts');
    divList.innerHTML = '';
    await prod.forEach(element => {
        //creo hijo
        let div = document.createElement('div');
        //dibujo en e hijo
        div.innerHTML = ` <ul>
            <li>${element.title}</li>
            <li>${element.description}</li>
            <li>${element.code}</li>
            <li>${element.price}</li>
            <li>${element.id}</li>
        </ul>`
        //cargo en el padre
        divList.appendChild(div);
    });
}

const updateProduct = (key, value, id) => {
    socket.emit('update', { key, value, id });

}