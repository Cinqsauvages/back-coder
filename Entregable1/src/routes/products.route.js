import { Router } from "express";
import { productManager } from "../../utils.js";

const productsRoute = Router();


//creador de producto
productsRoute.post('/', async (req, res) => {
    try {
        const product = req.body;

        const createProduct = await productManager.addProduct(product);

        res.status(201).send('Se a creado el producto nuevo.');
    } catch (err) {
        res.status(401).json({ error: 'Ocurrió un error al cargar el producto nuevo.', message: err });
    }
})

//devuelve el array de productos, y en caso de un limit la cantidad
productsRoute.get("/", async (req, res) => {
    try {
        const getProductList = await productManager.getProduct();
        // Seteo el tipo de valor limit como un número
        let limit = parseInt(req.query.limit);
        // Si el usuario ingresa un límite de resultados lo muestro, sino muestro la totalidad de productos
        if (!limit) {
            return res.send(getProductList);
        } else {
            let productsLimit = getProductList.slice(0, limit);
            res.send(productsLimit );
        }
    } catch (error) {
        console.log(error);
    }
});

//este get devuelve el producto segun el id
productsRoute.get('/:id', async (req, res) => {
    //tomo parameto de la url, lo parseo en numero
    let id = parseInt(req.params.id);
    //le envio a la funcion el id para que me traiga el producto
    let productByID = await productManager.getProductByID(id);

    //si no existe
    if (!productByID) {
        return res.send("{error:el usuario no existe}")
    } else {
        res.send(productByID)
    };

})

productsRoute.put('/', async (req, res) => {
    let idProd = req.body.id;
    let attribute = req.body.attribute;
    let value = req.body.value;
    try {
        let changeProd = await productManager.updateProduct(idProd, attribute, value);
        res.send(changeProd);
    } catch (err) {
        res.send("error no se pudo cargar");
    }
})

productsRoute.delete('/:pid', async (req, res) => {
	try {
		let id = parseInt(req.params.pid);
		res.send(await productManager.deletProduct(id));
	} catch (error) {
		console.log(error);
	}
});

export { productsRoute };