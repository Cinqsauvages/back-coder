import { Router } from "express";
import { productManager } from "../../utils.js";
import { io } from "../../utils.js";



const realTimeProducts = Router();

realTimeProducts.get('/', async (req, res) => {
    //renderizo la plantilla que quiero usar
    res.render('realTimeProducts');
})

io.on('connection', async (socket) =>{

    console.log('Cliente conectado..');
    socket.emit('product_list', await productManager.getProduct());
    socket.on('update', async (data) => {
        let modifico = await productManager.updateProduct(parseInt(data.id), data.key, data.value)
    })
    
    socket.on('add-prod', async (newProd) => {
        await productManager.addProduct(newProd);
    })
    socket.on('delet', async (id) =>{
        await productManager.deletProduct(id);
    })
})


export { realTimeProducts };