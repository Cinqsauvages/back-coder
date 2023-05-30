//se usa para instalar las diferentes instancias del proyecto.
import cartsManager from "./src/dao/managers/cartsManager.js";
import ProductManager from "./src/dao/managers/productManager.js";
// para usar dirname
import { fileURLToPath } from "url";
import { dirname } from 'path';
//para usar socket, en mi ruta
import { Server } from 'socket.io';
import express from 'express';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;


//export los controllers
export const cartManager = new cartsManager();
export const productManager = new ProductManager();


// inicializo express y server.io
export const app = express();
export const server = http.createServer(app);
export const io = new Server(server);
