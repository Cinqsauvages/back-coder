import { Router } from "express";
import ProductManager from '../productManager.js';


const prod = new ProductManager();
const products = [];

const productsRoute = Router();

//primera parte del entregable este get devuelve el array de productos, y en caso de un limit la cantidad
productsRoute.get("/", async (req, res) => {
    //agrego una consulta
    let limit = req.query.limit;
    //llamo al array
    let array = await prod.getProduct();
    //limit tiene que ser distinto a falsy, y menos o igual a el tamaño del array//
    if (limit || limit <= array.length) {
        let cutArray = array.slice(0, limit);
        products.push(cutArray);
        //muestro el array de prodct
        res.send(products);
    } else {
        products.push(array)
        res.send(products);
    }

});
//este get devuelve el producto segun el id
productsRoute.get('/:id', async (req, res) => {
    //tomo parameto de la url, lo parseo en numero
    let id = parseInt(req.params.id);
    //le envio a la funcion el id para que me traiga el producto
    let productByID = await prod.getProductByID(id);

    //si no existe
    if (!productByID) {
        return res.send("{error:el usuario no existe}")
    } else {
        res.send(productByID)
    };

})

productsRoute.put('/:id', async (req, res) => {

    let id = parseInt(req.params.id);
    let key = req.body;
    let valor = req.body;
    let productByID = await prod.updateProduct(id,key,valor);
    //ahora tengo que usar updateProduct
    res.send(productByID);

})

export { productsRoute };