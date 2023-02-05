import { Carrito } from "./containerCarrito.js";
const cart = new Carrito();

export async function getProductsOfCart(req, res) {
    const id = req.params.id;
    try {
        const carrito = await cart.getProducts(id);
        res.status(200).send(carrito);
    } catch (error) {
        res.status(404).send({message: 'carrito no encontrado'});
    }
}

export async function postCart(req, res) {
    const id = await cart.save(req.body);
    res.status(200).send({message: `Carrito con id ${id.id} creado`})
}

export function postProductsOfCart(req, res) {
    const id = req.params.id;
    const product = req.body;
    try {
        cart.saveProduct(product, id);
        res.status(200).send({message: 'producto/s agregado/s'});
    } catch (error) {
        res.status(404).send({message: 'carrito no encontrado'});
    }
}

export async function deleteCart(req, res) {
    const id = req.params.id;
    try {
        await cart.deleteById(id);
        res.status(200).send({message: 'carrito eliminado'});
    } catch (error) {
        res.status(404).send({message: 'carrito no encontrado'});
    }
}

export async function deleteProductOfCart(req, res) {
    const id = req.params.id;
    const id_prod = req.params.id_prod;
    try {
        await cart.deleteProduct(id, id_prod);
        res.status(200).send({message: 'producto eliminado'});
    } catch (error) {
        res.status(404).send({message: 'carrito o producto no encontrado'});
    }
}