import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import { Container } from './controllers/dbContainer.js';
import { mariadbConfig, sqlite3Config } from './config/config.js';

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
	cors: {
		origin: 'http://localhost:3000'
	}
});
const PORT = process.env.PORT;

const controlProducts = new Container(mariadbConfig, 'products');
const controlMessages = new Container(sqlite3Config, 'messages');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

io.on('connection', async socket => {
	console.log('A client has connected');
	const dbProds = await controlProducts.getAll();
	io.sockets.emit('products', dbProds);
	const dbMess = await controlMessages.getAll();
	io.sockets.emit('messages', dbMess);

	socket.on('newProduct', newProduct => {
		controlProducts.save(newProduct);
		const dbProds = controlProducts.getAll();
		io.sockets.emit('products', dbProds);
	});

	socket.on('newMessage', async newMessage => {
		controlMessages.save(newMessage);
		const dbMess = await controlMessages.getAll();
		io.sockets.emit('messages', dbMess);
	});

});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

server.on('error', err => {
    console.log(err);
});