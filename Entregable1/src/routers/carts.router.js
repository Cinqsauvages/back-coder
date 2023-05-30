import { Router } from 'express';
import { cartManager } from '../../utils.js';

const cartsRoute = Router();


cartsRoute.post('/', async (req, res) => {
	try {
		res.send(await cartManager.addCart());
	} catch (error) {
		console.log(error);
	}
});

cartsRoute.get('/:cid', async (req, res) => {
	try {
		const cid = parseInt(req.params.cid);
		let getCart = await cartManager.getCartById(cid);
		
		res.send(getCart);
	} catch (error) {
		console.log(error);
	}
});

cartsRoute.post('/:cid/product/:pid', async (req, res) => {
	try {
		const cid = parseInt(req.params.cid);
		const pid = parseInt(req.params.pid);
		res.send(await cartManager.addProductToCart(cid, pid));
	} catch (error) {
		console.log(error);
	}
});

export { cartsRoute };