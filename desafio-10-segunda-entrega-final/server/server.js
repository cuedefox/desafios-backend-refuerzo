import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import router from './router/index.js';
import {connect} from 'mongoose';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const PORT = process.env.PORT;

app.use('/api', router);

app.use('*', (req, res) => {
    const method = req.method;
    const path = req.params;
    res.send({
        error: -2,
        message: `error ruta ${path[0]} metodo ${method} no implementada`
    })
})

const server = app.listen(PORT, async () => {
    await connect(process.env.MONGO);
    console.log(`Server listening on port ${PORT} at ${new Date().toLocaleString()}`);
})
server.on('error', err => {
    console.log(err);
})