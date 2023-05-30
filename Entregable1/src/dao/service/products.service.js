import { ProductModel } from "../models/products.model"

class ProductService{
    constructor(){
        this.model = ProductModel;
    }
    async getAllProducts(){
        return await this.model.find();
    }
}

const productService = new ProductService();

export default productService;