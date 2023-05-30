//importo dependencias
import express from 'express';
import handlebars from "express-handlebars"
import __dirname from '../utils.js';
import mongoose from 'mongoose';

//importo rutas
import { productsRoute } from './routers/products.router.js';
import { cartsRoute } from './routers/carts.router.js';
import { realTimeProducts } from './routers/realTimeProducts.router.js';
import { productManager, server, app } from '../utils.js';
import { productsRouterAtlas } from './routers/products.atlas.router.js';
import { cartRouterAtlas } from './routers/carts.atlas.router.js';
import { messagesRouteAtlas } from './routers/messages.atlas.router.js';



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
app.use('/api/productsAtlas', productsRouterAtlas);
app.use('/api/cartsAtlas', cartRouterAtlas);
app.use('/api/chatAtlas', messagesRouteAtlas);

//conectando a Atlas
mongoose.connect('mongodb+srv://juanheguilen:Cinqsauvages1234@cluster0.jljrb4e.mongodb.net/?retryWrites=true&w=majority')

//habilito la escucha del server
server.listen('8080', () => { console.log('Levantando server') });