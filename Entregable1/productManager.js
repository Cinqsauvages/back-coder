const fs = require('fs');

class ProductManager {
    //variable local de id de los productos.
    #id = 0;
    constructor() {
        this.path = './products.json'

        //el constructor no puede ser asyncronico
        if (!fs.existsSync(this.path)) {
            fs.writeSync(this.path, JSON.stringify([]));
        }
        //creo el archivo.
    }

    //agrega producto buscando el archivo y agregando el producto//
    async addProduct(title, description, price, thrumbail, code, stock) {
        const product = {
            title,
            description,
            price,
            thrumbail,
            code,
            stock
        };
        //agrega id al evento!
        product.id = this.#getID();

        try {
            //me hace el getproduct para retornar los datos guardados
            const actualProduct = await this.getProduct();
            let validCode = actualProduct.findIndex((product) => product.code === code)
            //guardo los datos nuevos si cumple que no son nulos, y que sean distinto codigo.
            if ((Object.values(product.length) !== 0) || (validCode === -1)) {
                actualProduct.push(product);
                //esrcribo devuelta el archivo
                await fs.promises.writeFile(this.path, JSON.stringify(actualProduct));
            }

        } catch (err) {
            console.log('No pudimos cargar el usuario');
        }
    }

    //crea un id por cada producto nuevo.
    #getID() {
        this.#id++;
        return this.#id;
    }

    //devuelve todos los productos con una promesa buscando en el archivo//
    async getProduct() {
        try {
            //busco el archivo
            const dateProduct = await fs.promises.readFile(this.path, 'utf-8');
            //muestro datos del archivo
            return JSON.parse(dateProduct);

        } catch (err) {
            console.log('No puedo traer datos de Productos');
        }
    }

    //busco por ID el producto guardado//
    async getProductByID(idProducto) {
        try {
            //busco el archivo
            const dateProduct = await fs.promises.readFile(this.path, 'utf-8');
            //guardo el archivo en []
            let products = JSON.parse(dateProduct);
            //busco el producto por id
            let productIndex = products.findIndex((product) => product.id === idProducto);
            //lo muestro
            return products[productIndex];

        } catch (err) {
            console.log("NOT FOUND, el producto no se encontro")

        }
    }

    updateProduct(idProduct){
        const changeProduct = this.getProductByID(idProduct);
        

    }
}

const asd = new ProductManager();

asd.addProduct("asd", "una calza que calza", 250, "www.asd.com", "abc1234", 10);
asd.addProduct("mantel", "alto mantel", 250, "no tiene", "abc123", 25)

console.log(asd.getProduct(), asd.getProductByID(0))

