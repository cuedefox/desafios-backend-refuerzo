import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import router from './router/products.js';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/api', router);

const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
server.on('error', err => {console.log(`Ocurrio un error ${err}`)});