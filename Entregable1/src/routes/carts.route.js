import { Router } from 'express';
import cartsManager from '../controllers/cartsManager.js';

const cartsRoute = Router();
const cartsList = new cartsManager();

cartsRoute.post('/', async (req, res) => {
	try {
		res.send(await cartsList.addCart());
	} catch (error) {
		console.log(error);
	}
});

cartsRoute.get('/:cid', async (req, res) => {
	try {
		const cid = parseInt(req.params.cid);
		let getID = await cartsList.getCartById(cid);
		res.send(await getID);
	} catch (error) {
		console.log(error);
	}
});

cartsRoute.post('/:cid/product/:pid', async (req, res) => {
	try {
		const cid = parseInt(req.params.cid);
		const pid = parseInt(req.params.pid);
		res.send(await cartsList.addProductToCart(cid, pid));
	} catch (error) {
		console.log(error);
	}
});

export { cartsRoute };