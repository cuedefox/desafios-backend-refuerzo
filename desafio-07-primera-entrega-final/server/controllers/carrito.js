import { FileSystem } from "./fs.js";

const container = new FileSystem('./db/carritos.json');

export function getProductsOfCart(req, res) {
    const id = req.params.id;
    try {
        const carrito = container.getById(id);
        res.status(200).send(carrito.products);
    } catch (error) {
        res.status(404).send({message: 'carrito no encontrado'});
    }
}

export async function postCart(req, res) {
    const id = await container.saveCart();
    res.status(200).send({message: `Carrito con id ${id} creado`})
}

export function postProductsOfCart(req, res) {
    const id = req.params.id;
    const products = req.body;
    try {
        container.saveProduct(id, products);
        res.status(200).send({message: 'producto/s agregado/s'});
    } catch (error) {
        res.status(404).send({message: 'carrito no encontrado'});
    }
}

export function deleteCart(req, res) {
    const id = req.params.id;
    try {
        container.deleteById(id);
        res.status(200).send({message: 'carrito eliminado'});
    } catch (error) {
        res.status(404).send({message: 'carrito no encontrado'});
    }
}

export function deleteProductOfCart(req, res) {
    const id = Number(req.params.id);
    const id_prod = Number(req.params.id_prod);
    try {
        container.deleteProduct(id, id_prod);
        res.status(200).send({message: 'producto eliminado'});
    } catch (error) {
        res.status(404).send({message: 'carrito o producto no encontrado'});
    }
}