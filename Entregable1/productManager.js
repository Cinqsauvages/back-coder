class ProductManager {
    //variable que me guarda los productos.
    #id = 0;
    constructor() {
        this.products = [];
    }

    // devuelve todos los productos//
    getProduct() {
        return this.products;

    }
    //agrega producto
    addProduct(title, description, price, thrumbail, code, stock) {
        let validCode = this.products.findIndex((product) => product.code === code)
        if ((title.length === 0) || (description.length === 0) || (price.length ===  0) || (thrumbail.length ===  0) || (code.length ===  0) ||(stock.length ===  0) || (validCode != -1)) {
            console.log("Verifique que los campos esten llenos, y que el code no sea igual a el de los productos ya cargados!.")
            return;
        }

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

        this.products.push(product);

    }


    //crea un id por cada producto nuevo.
    #getID() {
        this.#id++;
        return this.#id;
    }

    //busco por ID el producto guardado//
    getProductByID(idProducto) {
        const productoIndex = this.products.findIndex((product) => product.id === idProducto);

        if (productoIndex === -1) {
            console.log("NOT FOUND, el producto no existe!!.")
            return;
        }
        const product = this.products[productoIndex];
        return product;
    }

}

const asd = new ProductManager();

asd.addProduct("asd", "una calza que calza", 250, "www.asd.com", "abc1234", 10);
asd.addProduct("mantel", "alto mantel", 250, "no tiene", "abc123", 25)

console.log(asd.getProduct(), asd.getProductByID(0))

