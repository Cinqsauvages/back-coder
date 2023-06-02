//importo dependencias
import express from 'express';
import handlebars from "express-handlebars"
import __dirname from '../utils.js';
import mongoose from 'mongoose'
import { Server } from 'socket.io';

//importo rutas
import { productsRoute } from './routers/products.router.js';
import { cartsRoute } from './routers/carts.router.js';
import { realTimeProducts } from './routers/realTimeProducts.router.js';
import { productManager, server, app } from '../utils.js';
import { productsRouterAtlas } from './routers/productsDB.router.js';
import { cartRouterAtlas } from './routers/cartsDB.router.js';
import { messagesRouteAtlas } from './routers/messagesDB.router.js';



//parseo a json
app.use(express.json())
//permite recibir datos complejos desde las url
app.use(express.urlencoded({ extended: true }));

//seteo el directorio de archivos estatico;
app.use(express.static(__dirname + '/public'));

// Set handlebars- a ese nombre es ese gestor
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
//a mis views las procesas con esto
app.set('view engine', 'handlebars');


//renderizo la plantilla que quiero usar.
app.get('/', async (req, res) => {
    //llamo la lista del productos
    let prod = await productManager.getProduct();
    //la envio a la plantilla
    res.render('home', { products: prod })
});


//llamo las rutas creadas
app.use('/realTimeProducts', realTimeProducts)
app.use('/api/products', productsRoute);
app.use('/api/carts', cartsRoute);
//rutas de de mongo
app.use('/api/productsDB', productsRouterAtlas);
app.use('/api/cartsDB', cartRouterAtlas);
app.use('/api/chatDB', messagesRouteAtlas);

//conectando a Atlas
mongoose.connect('mongodb+srv://juanheguilen:Cinqsauvages1234@cluster0.jljrb4e.mongodb.net/?retryWrites=true&w=majority')

//habilito la escucha del server
const webServer = server.listen('8080', () => { console.log('Levantando server') });

