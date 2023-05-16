const socket = io();
//este socket es el que se usa para poder comunicarse con el servidor

let btn = document.getElementById('btn')
let btnAdd = document.getElementById('btnAdd');
let btnDelet = document.getElementById('eliminar');

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

btnAdd.addEventListener('click',(e)=>{
    e.preventDefault();
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let code = document.getElementById('code').value;
    let price = parseInt(document.getElementById('price').value);
    let stock = parseInt(document.getElementById('stock').value);
    let category = document.getElementById('category').value;
    let status = document.getElementById('status').value;

    let newProduct = {title,description,code,price,stock,category,status};
    addProd(newProduct);
})

btnDelet.addEventListener('click', (e) => {
    e.preventDefault();
    let id = parseInt(document.getElementById('idDelet').value);
    deletProd(id);
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
    socket.emit('update', {key, value, id});

}

const addProd = (prod) =>{

    socket.emit('add-prod', prod);
}
const deletProd = (id) =>{
    socket.emit('delet', id);
}