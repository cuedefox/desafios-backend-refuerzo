import express from 'express';
const routerCarrito = express.Router();
import { getProductsOfCart, postCart, postProductsOfCart, deleteCart, deleteProductOfCart } from '../controllers/carrito.js';

routerCarrito.get('/carrito/:id/productos', getProductsOfCart);
routerCarrito.post('/carrito', postCart);
routerCarrito.post('/carrito/:id/productos', postProductsOfCart);
routerCarrito.delete('/carrito/:id', deleteCart);
routerCarrito.delete('/carrito/:id/productos/:id_prod', deleteProductOfCart);


export default routerCarrito;