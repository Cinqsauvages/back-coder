import { Router } from "express";

const realTimeProducts = Router();

realTimeProducts.get('/', (req,res) => {
    //renderizo la plantilla que quiero usar
    res.render('realTimeProducts',{});
})

export {realTimeProducts};