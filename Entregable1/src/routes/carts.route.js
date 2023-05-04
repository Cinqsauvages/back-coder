import { Router } from "express";

const carts = [1234,32423];

const cartsRoute = Router();

cartsRoute.get('/', (req,res) =>{

    res.send(carts);
})

export {cartsRoute};