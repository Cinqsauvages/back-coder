import { Router } from "express";
import cartService from '../dao/service/carts.service.js';

const cartRouterAtlas = Router()
//llama a toods los carritos
cartRouterAtlas.get('/', async (req, res) => {
   const carts = await cartService.getAllCarts();

   res.send(carts);
})


cartRouterAtlas.delete('/:id', async (req, res) => {
   const id = req.params.id
   const delet = await cartService.deletCarrito(id);
   res.send("chau carrito");
})

cartRouterAtlas.get('/:id', async (req, res) => {
   const id = req.params.id;
   const findCart = await cartService.cartById(id);
   res.send(findCart);
})

cartRouterAtlas.post('/', async (req, res) => {
   const product = req.body;
   const addProduct = await cartService.addProdCart(product);
   res.send(addProduct);
})

export { cartRouterAtlas }

