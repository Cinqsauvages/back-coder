import { Router } from "express";
import cartService from '../dao/service/carts.service.js';

const cartRouterAtlas = Router()

cartRouterAtlas.get('/', (req, res) => {
    res.send('estamos en carts')
})

export { cartRouterAtlas }