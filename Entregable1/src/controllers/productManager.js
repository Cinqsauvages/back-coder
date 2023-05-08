import fs from 'fs';

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

    //crea un id por cada producto nuevo.
    #getID() {
        this.#id++;
        return this.#id;
    }

    //agrega producto buscando el archivo y agregando el producto//
    async addProduct(product) {
        // recopilo los datos y creo el objeto//
        if (
            !product.title ||
            !product.description ||
            !product.code ||
            !product.price ||
            !product.status ||
            !product.stock ||
            !product.category
        ) {
            return `Faltan propiedades obligatorias en el producto!
			
			title: ${product.title} 
			description: ${product.description} 
			code: ${product.code} 
			price: ${product.price} 
			status: ${product.status}
			stock: ${product.stock} 
			category: ${product.category}
			Solo la propiedad 'thumbnails' no es obligatoria. 
			Por favor intente nuevamente.
			`;
        }

        const newProduct = {
            title: product.title,
            description: product.description,
            price: product.price,
            code: product.code,
            stock: product.stock,
            status: product.status,
            category: product.category
        };
        //agrega id al objeto!
        newProduct.id = this.#getID();

        try {
            //busco el archivo y lo traigo//
            const arrayProduct = await this.getProduct();
            //si no es vacio el archivo
            if (arrayProduct.length != 0) {
                //lo recorro 
                arrayProduct.forEach(element => {
                    //verifico que los id sean diferentes, sino le agrego uno nuevo
                    if (element.id === newProduct.id) {
                        newProduct.id = this.#getID();
                    }
                });

                //lo escribo en el archivo
                arrayProduct.push(newProduct);

                await fs.promises.writeFile(
                    this.path,
                    JSON.stringify(arrayProduct)
                );

            } else if (arrayProduct.length === 0) {
                //si la base de dato de los productos es vacia
                arrayProduct.push(newProduct);

                await fs.promises.writeFile(
                    this.path,
                    JSON.stringify(arrayProduct)
                );
            }

        } catch (err) {
            console.log('No pudimos cargar el producto', err);
        }
    }


    //traer el archivo de productos
    async getProduct() {
        try {
            //busco el archivo
            const dateProduct = await fs.promises.readFile(this.path, 'utf-8');
            //muestro datos del archivo
            const parsProduct = JSON.parse(dateProduct);
            return parsProduct;

        } catch (err) {
            console.log('No puedo traer datos de Productos', err);
        }
    }

    //busco por ID el producto guardado//
    async getProductByID(idProduct) {
        try {
            //busco el archivo
            const dateProduct = await this.getProduct();
            if (dateProduct.length === 0) {
                console.log("Todavia no hay producto al cual buscar");
                return
            } else {
                let productIndex = dateProduct.findIndex((product) => product.id === idProduct);
                return dateProduct[productIndex];
            }
        } catch (err) {
            console.log("NOT FOUND, el producto no se encontro", err)

        }
    }

    //modifico el producto que quiero
    async updateProduct(idProduct, key, newValue) {

        let object2 = {
            [key]: newValue,
        }

        try {
            const object1 = await this.getProductByID(idProduct);
            //objeto nuevo
            let object3 = { ...object1, ...object2 };
            //array
            const dateProduct = await this.getProduct();

            let productIndex = dateProduct.findIndex((product) => product.id === idProduct);
            //cambio el producto por el nuevo//
            dateProduct[productIndex] = object3;

            await fs.promises.writeFile(
                this.path,
                JSON.stringify(dateProduct)
            );
            return (dateProduct);

        } catch (err) {
            console.log("Error al traer producto", err);

        }
    }

    //borro el producto
    async deletProduct(idProduct) {
        try {
            //traigo array
            const dateProduct = await this.getProduct();
            //lo busco
            let productIndex = dateProduct.findIndex((product) => product.id === idProduct);
            if (productIndex != -1) {
                dateProduct.splice(productIndex, 1);
                //cambio archivo
                await fs.promises.writeFile(
                    this.path,
                    JSON.stringify(dateProduct)
                );
                return
            };
            //elimino

        } catch (err) {
            console.log("No existe ese producto", err)
        }
    }
}

export default ProductManager;