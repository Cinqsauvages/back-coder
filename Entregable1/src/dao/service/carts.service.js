import { CartsModel } from "../dao/models/carts.model";

class CartService{
    constructor(){
        this.model = CartsModel
    }

    async getAllCarts(){
        return await this.model.find();
    }
}

const cartService = new CartService();

export default cartService;

