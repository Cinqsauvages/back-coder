const fs = require('fs');

class ProductManager {
    //variable local de id de los productos.
    #id = 0;
    //crea el archivo
    constructor() {
        this.path = './products.json';

        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify([]));
        }

    }

    //agrega producto buscando el archivo y agregando el producto//
    async addProduct(title, description, price, thrumbail, code, stock) {
        // recopilo los datos y creo el objeto//

        if ((title.length === 0) || (description.length === 0) || (price.length === 0) || (thrumbail.length === 0) || (code.length === 0) || (stock.length === 0)) {
            console.log("Verifique que los campos esten llenos, y que el code no sea igual a el de los productos ya cargados!.")
            return;
        }
        const newProduct = {
            title,
            description,
            price,
            thrumbail,
            code,
            stock
        };
        //agrega id al objeto!
        newProduct.id = this.#getID();

        try {
            //busco el archivo y lo traigo//
            const actualProduct = await this.getProduct();
            if (actualProduct.length != 0) {
                let validCode = '';
                for (let i = 0; i < actualProduct.length; i++) {
                    validCode = actualProduct[i].code;
                }
                console.log(validCode, newProduct.code)
               
                if (validCode === newProduct.code) {
                    console.log("ya existe ese code");

                } else {
                    actualProduct.push(newProduct);
                    await fs.promises.writeFile(
                        this.path,
                        JSON.stringify(actualProduct)
                    );
                }

            } else {
                actualProduct.push(newProduct);
                await fs.promises.writeFile(
                    this.path,
                    JSON.stringify(actualProduct)
                );
            }


        } catch (err) {
            console.log('No pudimos cargar el producto', err);
        }
    }

    //crea un id por cada producto nuevo.
    #getID() {
        this.#id++;
        return this.#id;
    }

    //funciona
    async getProduct() {
        try {
            //busco el archivo
            const dateProduct = await fs.promises.readFile(this.path, 'utf-8');
            //muestro datos del archivo

            return JSON.parse(dateProduct)

        } catch (err) {
            console.log('No puedo traer datos de Productos', err);
        }
    }

    //busco por ID el producto guardado//
    async getProductByID(idProducto) {
        try {
            //busco el archivo
            const dateProduct = await this.getProduct();
            if (dateProduct.length === 0) {
                console.log("Todavia no hay producto al cual buscar");
                return
            } else {
                let productIndex = dateProduct.findIndex((product) => product.id === idProducto);
                return console.log(dateProduct[productIndex]);
            }

        } catch (err) {
            console.log("NOT FOUND, el producto no se encontro", err)

        }
    }
    /* 
        updateProduct(idProduct) {
            const changeProduct = this.getProductByID(idProduct);
    
    
        } */
}

const asd = new ProductManager();

asd.addProduct('pantalon', 'cortos', 'quee?', '25', 123456123122427, 80);




