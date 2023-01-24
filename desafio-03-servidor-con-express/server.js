import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import Container from './controllers/container.js';
import { random } from './utils/randomNumber.js';

const app = express();
const PORT = process.env.PORT;
const container = new Container(process.env.DB);

app.get('/productos', async (req, res) => {
    const productos = await container.getAll();
    res.json(productos);
})

app.get('/productoRandom', async (req, res) => {
    const productos = await container.getAll();
    console.log(random(productos.length));
    res.json(productos[random(productos.length)]);
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})