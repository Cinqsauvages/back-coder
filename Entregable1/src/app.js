import express from 'express';
import { productsRoute } from './routes/products.route.js';
import { cartsRoute } from './routes/carts.route.js';

const app = express();

// Seteo carpeta public como raiz de servidor estatico
app.use(express.static('../public'));


//parseo a json
app.use(express.json())
//permite recibir datos complejos desde las url
app.use(express.urlencoded({ extended: true }));


//habilito la escucha del server
app.listen('8080', () => { console.log('Levantando server') });


//llamo las rutas creadas
app.use('/api/products', productsRoute);
app.use('/api/carts', cartsRoute);

