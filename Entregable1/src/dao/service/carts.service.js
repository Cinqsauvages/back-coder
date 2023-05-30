import { CartsModel } from "../models/carts.model.js";

class CartService{
    constructor(){
        this.model = CartsModel
    }

    async getAllCarts(){
        return await this.model.find();
    }

    async addCarts () {
        const cart = {
            products: [],
        };

        await this.model.insertOne(cart);
    }
}



const cartService = new CartService();
export default {cartService}

