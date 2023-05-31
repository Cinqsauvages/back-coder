import { CartsModel } from "../models/carts.model.js";

class CartService {
    constructor() {
        this.model = CartsModel
    }

    async getAllCarts() {
        return await this.model.find();
    }

    async addProdCart(prod) {
        return await this.model.create(prod);
    }

    async deletCarrito(idCart) {
        return await this.model.deleteOne({ _id: idCart });
    }

    async cartById(idCart) {
        return await this.model.findOne({ _id: idCart })
    }

}



const cartService = new CartService();
export default cartService;

