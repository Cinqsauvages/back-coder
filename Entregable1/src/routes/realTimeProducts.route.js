import { Router } from "express";
import { productManager } from "../../utils.js";
import { io } from "../app.js";
const prod = productManager;

const realTimeProducts = Router();

realTimeProducts.get('/', async (req, res) => {
    //renderizo la plantilla que quiero usar
    res.render('realTimeProducts');
})




export { realTimeProducts };