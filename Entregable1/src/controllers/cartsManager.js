import fs from 'fs';
import productsManager from './productManager.js';

const listProductsToCart = new productsManager();

class cartsManager {
	constructor() {
		this.path = './carts.json';
	}

	//Variable privada del id de producto
	#cid = 0;
	// Método privado para incrementar id automáticamente
	#generateIdCart() {
		this.#cid++;
		return this.#cid;
	}
	// Método privado para leer el archivo de productos
	#readFileCarts = async () => {
		const readCart = await fs.promises.readFile(this.path, 'utf-8');
		return JSON.parse(readCart);

	};
	// Método privado para escribir el archivo de productos
	#writeFileCarts = async (carts) => {
		await fs.promises.writeFile(this.path, JSON.stringify(carts));
	};

	// Método privado para validar Id
	#validIdCart = async (id) => {
		let carts = await this.#readFileCarts();
		return carts.find((cart) => cart.id === id);
	};

	#validIdProduct = async (id) => {
		let products = await listProductsToCart.getProduct();
		console.log(products);
		return await products.find((product) => product.id === id);
	};

	//finalizan los metodos privados los cuales uso en mis metodos principales.
	addCart = async () => {
		const listCarts = await this.#readFileCarts();
		//traigo el archivo
		const cart = {
			products: [],
		};
		//le creo al carrito un id
		cart.id = this.#generateIdCart();

		listCarts.forEach(element => {
			//verifico que los id sean diferentes, sino le agrego uno nuevo
			if (element.id === cart.id) {
				cart.id = this.#generateIdCart();
			}
		});

		listCarts.push(cart);
		//lo escribo
		await this.#writeFileCarts(listCarts);

		return listCarts;
	};

	getCartById = async (id) => {
		//Almaceno contenido del archivo de productos en una variable
		let carts = await this.#readFileCarts();
		//Busco el índice del carrito solicitado por id
		let validCart = await this.#validIdCart(id);
		console.log(validCart);
		if (!validCart) {
			return 'Carrito no encontrado';
		}
		// Muestro el producto solicitado
		console.log('Producto Encontrado!');
		return validCart;
	};

	addProductToCart = async (cid, pid) => {
		//valido que este creado el carrito
		let validCart = await this.#validIdCart(cid);
		if (!validCart) {
			return 'Carrito no encontrado';
		}
		//valido que exista el producto
		let validProduct = await this.#validIdProduct(pid);

		if (!validProduct) {
			return 'Producto no encontrado';
		}
		//llamo todos los carritos
		const allCarts = await this.#readFileCarts();
		//filtro el carrito que quiero
		let cartFilter = await allCarts.filter((cart) => cart.id != cid);

		//agrego el producto que coincida con su id, si existe ya en el carrito aumento la cantidad.
		if (validCart.products.some((product) => product.id === pid)) {
			let productExist = validCart.products.find(
				(product) => product.id === pid
			);
			productExist.quantity++;
			let newCarts = [validCart, ...cartFilter];
			await this.#writeFileCarts(newCarts);
			return 'Producto Agregado al Carrito';
		}
		//agrego el producto con la siguiente forma
		validCart.products.push({ id: validProduct.id, quantity: 1 });
		let newCarts = [validCart, ...cartFilter];
		await this.#writeFileCarts(newCarts);
		return 'Producto Agregado al Carrito';
	};
}

export default cartsManager;