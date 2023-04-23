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
            //si no es vacio el archivo
            if (actualProduct.length != 0) {
                //lo recorro
                actualProduct.forEach(element => {
                    //verifico que los id sean diferentes, sino le agrego uno nuevo
                    if (element.id === newProduct.id) {
                        newProduct.id = this.#getID();
                    }
                });
                //lo escribo en el archivo
                actualProduct.push(newProduct);

                await fs.promises.writeFile(
                    this.path,
                    JSON.stringify(actualProduct)
                );


            } else if (actualProduct.length === 0) {
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

            return JSON.parse(dateProduct);

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
            console.log(dateProduct);

        } catch (err) {
            console.log("Error al traer producto", err);

        }
    }

    async deletProduct (idProduct){
        try{
            //traigo array
            const dateProduct = await this.getProduct();
            //lo busco
            let productIndex = dateProduct.findIndex((product) => product.id === idProduct);
            if(productIndex != -1){
                dateProduct.splice(productIndex, 1);
                //cambio archivo
                await fs.promises.writeFile(
                    this.path,
                    JSON.stringify(dateProduct)
                );
                return
            };
            //elimino

        }catch(err){
            console.log("No existe ese producto",err)
        }
    }

}
const archive = new ProductManager();

const test = async () => {
    // intento
    try {
        // Agregar usuario
        await archive.addProduct(
            'prueba 1',
            'BUEN producto',
            295,
            'no tiene',
            12344,
            25
        );
        // Agregar usuario
        await archive.addProduct(
            'prueba 2',
            'BUEN producto',
            295,
            'no tiene',
            12345,
            25
        );

    } catch (err) {
        // Si hay error imprimo el error en consola
        console.log('Salio mal el Test', err);
    }
    console.log(await archive.getProduct());
};

test();
