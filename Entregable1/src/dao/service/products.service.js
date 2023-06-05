import { ProductModel } from "../models/products.model.js"

class ProductService {
    constructor() {
        this.model = ProductModel;
    }
    //llamo prods
    async getAllProducts() {
        //retorno todos los productos
        return await this.model.find();
    }
    async getSomeProducts(cantidad){
        //el operadore lt, filtra por cantidad maxima.
        return await this.model.find().limit(cantidad);
    }
    //agrego prod
    async addProduct(product) {
        //recibo el producto y lo creo
        return await this.model.create(product);

    }
    //llamo prod por id
    async getProductByID(idProd) {
        //busco prod por id
        return await this.model.findOne({ _id: idProd })
    }
    //elimino por id
    async deletProd(idProd) {
        //elimino producto por id
        return await this.model.deleteOne({ _id: idProd });
    }
    //modifico prod
    async updateProd(idProd, key, valor) {
        //traigo el prod
        const prod = await this.getProductByID(idProd);
        //le modifico el atributo
        prod[key] = valor;
        //guardo en DB
        return prod.save();
    }
}



const productService = new ProductService();

export default productService 