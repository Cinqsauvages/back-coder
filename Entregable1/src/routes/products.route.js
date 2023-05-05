import { Router } from "express";
import ProductManager from '../productManager.js';

const prod = new ProductManager();
const products = [];
const productsRoute = Router();


//creador de producto
productsRoute.post('/', async (req, res) => {
    try {
        const carga = {
            title : req.body.name,
            description :req.body.description,
            thrumbail:req.body.thrumbail,
            price: req.body.price,
            code: req.body.code,
            stock: req.body.stock,
        }
        const createProduct = await prod.addProduct(carga.title, carga.description, carga.thrumbail, carga.price, carga.code, carga.stock);

        res.status(201).send('Se a creado el producto nuevo.');
    } catch (err) {
        res.status(401).send(err, 'Ocurrio un error al cargar el producto nuevo.');
    }
})

//devuelve el array de productos, y en caso de un limit la cantidad
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


export { productsRoute };