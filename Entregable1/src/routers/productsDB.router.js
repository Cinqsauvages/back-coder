import { Router } from "express";
import productService from "../dao/service/products.service.js";

const productsRouterAtlas = Router();

//llamo prod
productsRouterAtlas.get('/', async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        let limit = parseInt(req.query.limit);
        // Si el usuario ingresa un límite de resultados lo muestro, sino muestro la totalidad de productos
        if (!limit) {
            return res.send(products);
        } else {
            let productsLimit = await productService.getSomeProducts(limit);
            res.send(productsLimit);
        }

    } catch (err) {
        res.send(err)
    }
})

//busco por id
productsRouterAtlas.get('/:pid', async (req, res) => {
    try {
        const id = req.params.pid;
        const prod = await productService.getProductByID(id);

        res.send(prod);

    } catch (err) {
        res.send(err)
    }
})

//agrego pord
productsRouterAtlas.post('/', async (req, res) => {
    try {
        const product = req.body;
        const downloadProduct = await productService.addProduct(product);
        res.send(`producto cargador ${downloadProduct}`)
    }
    catch (err) {
        res.send(err)

    }
})

//elimino por id
productsRouterAtlas.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const delet = await productService.deletProd(id);
    res.send("eliminado")
})

//modifico por id
productsRouterAtlas.put('/', async (req, res) => {
    const update = req.body
    const updateProd = await productService.updateProd(update.id, update.key, update.valor);

    res.send(updateProd);
})

export { productsRouterAtlas };