//se usa para instalar las diferentes instancias del proyecto.
import cartsManager from "./src/controllers/cartsManager.js";
import ProductManager from "./src/controllers/productManager.js";
// para usar dirname
import { fileURLToPath } from "url";
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;


//export los controllers
export const cartManager = new cartsManager();
export const productManager = new ProductManager();

