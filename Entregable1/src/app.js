import express from 'express';
import ProductManager from './productManager.js';


const prod = new ProductManager();
const app = express();
//permite recibir datos complejos desde las url
app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
    //agrego una consulta
    let limit = req.query.limit;
    //llamo al array
    let array = await prod.getProduct();
    //limit tiene que ser distinto a falsy, y menos o igual a el tamaño del array//
    if (limit || limit <= array.length) {
        let cutArray = array.slice(0, limit);
        res.send(cutArray);
    } else {
        res.send(array);
    }

})

app.get('/products/:id', async (req, res) => {
    //tomo parameto de la url, lo parseo en numero
    let id = parseInt(req.params.id);
    //le envio a la funcion el id para que me traiga el producto
    let productByID = await prod.getProductByID(id);
    
    //si no existe
    if (!productByID) {
        return res.send("{error:el usuario no existe}")
    }else {
        res.send(productByID)
    };

})

app.listen('8080', () => { console.log('probando cositas') });