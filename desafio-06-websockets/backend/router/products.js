import express from 'express';
const router = express.Router();
import { Product } from '../models/product.js';

router.get('/products', getAll);
router.post('/products', sendProd);


export let products = [];

function sendProd(req, res) {
    try {
        const {name, price, thumbnail} = req.body;
        let newProd = new Product(name, price, thumbnail);
        newProd = {...newProd, id: products.length > 0 ? products[products.length - 1].id + 1 : 1};
        products.push(newProd);
        res.json({ok: 'ok'})
    } catch (error) {
        console.log(error);
    }
}

function getAll(req, res) {
    try {
        res.json(products);
    } catch (error) {
        console.log(error);
    }
}

export {router as productsRouter};