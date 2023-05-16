import { Router } from "express";
import { productManager } from "../../utils.js";
import { io } from "../app.js";
const prod = productManager;

const realTimeProducts = Router();

realTimeProducts.get('/', async (req, res) => {
    //renderizo la plantilla que quiero usar
    res.render('realTimeProducts');
})


realTimeProducts.put('/', async (req, res) => {
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


export { realTimeProducts };