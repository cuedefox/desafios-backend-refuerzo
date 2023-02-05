import express from 'express';
import routerCarrito from './carrito.js';
import routerProductos from './productos.js';
const router = express.Router();

router.use(routerCarrito);
router.use(routerProductos);

export default router;