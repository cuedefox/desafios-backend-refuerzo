import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { productsRouter, products } from './router/products.js';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import fs from 'fs';

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
	cors: {
		origin: 'http://localhost:3000'
	}
});
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/', productsRouter);

io.on('connection', socket => {
	console.log('A client has connected')
	io.sockets.emit('products', products);

	fs.promises.readFile('db/chat.json', 'utf-8').then(data => {
		io.sockets.emit('messages', JSON.parse(data));
	});

	socket.on('newProduct', newProduct => {
		products.push(newProduct);
		io.sockets.emit('products', products);
	});

	socket.on('newMessage', async newMessage => {
		let data = await fs.promises.readFile('db/chat.json', 'utf-8');
		let messages = JSON.parse(data);
		messages.push(newMessage);
		fs.writeFileSync('db/chat.json', JSON.stringify(messages));
		io.sockets.emit('messages', messages);
	});

});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

server.on('error', err => {
    console.log(err);
});