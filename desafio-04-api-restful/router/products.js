import express from "express";
const router = express.Router()
import { Product, products } from "../models/product.js";

router.get('/productos', (req, res) => {
    res.json(products);
})

router.get('/productos/:id', (req, res) => {
    const id = req.params.id;
    const product = products.find(prod => prod.id == id);
    if(product) {
        res.json(product);
    }else{
        res.status(404).send({error: 'Producto no encontrado / no existe'});
    }
})

router.post('/productos', (req, res) => {
    const {title, price, thumbnail} = req.body;
    let product = new Product(title, price, thumbnail);
    product = {...product, id: products.length > 0 ? products[products.length - 1].id + 1 : 1};
    products.push(product);
})

router.put('/productos/:id', (req, res) => {
    const id = req.params.id;
    const {title, price, thumbnail} = req.body;
    let product = products.find(prod => prod.id == id);
    if(product) {
        const newProd = new Product(title, price, thumbnail);
        const index = products.findIndex(prod => prod.id == id);
        products[index] = {...newProd, id: Number(parseInt(id))};
        res.json({ok: 'Producto modificado correctamente'});
    }else{
        res.status(404).send({error: 'No se ha encontrado el producto a modificar / no existe'});
    }
})

router.delete('/productos/:id', (req, res) => {
    const id = req.params.id;
    const prodExists = products.find(prod => prod.id == id);
    if(prodExists) {
        let index = products.findIndex(prod => prod.id == id);
        products.splice(index, 1);
        res.json({ok: 'Producto eliminado correctamente'});
    }else{
        res.status(404).send({error: 'No se ha encontrado el producto a eliminar / no existe'});
    }
})

export default router;