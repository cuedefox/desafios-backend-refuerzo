import express from 'express';
import { getProducts, postProduct, putProduct, deleteProduct } from '../controllers/productos.js';
const routerProductos = express.Router();

routerProductos.get('/productos/:id?', getProducts);
routerProductos.post('/productos', postProduct);
routerProductos.put('/productos/:id', putProduct);
routerProductos.delete('/productos/:id', deleteProduct);

export default routerProductos;