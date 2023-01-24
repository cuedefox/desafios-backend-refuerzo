const Contenedor = require('./main.js');

const test = async() => {
    let container = new Contenedor('products.txt');
    console.log(await container.save({nombre: 'Roberto'}));
    console.log(await container.save({nombre: 'Juan'}));
    console.log(await container.save({nombre: 'Jose'}));
    console.log(await container.getById(2));
    console.log(await container.deleteById(3));
    console.log(await container.getAll());
    await container.deleteAll();
}

test();