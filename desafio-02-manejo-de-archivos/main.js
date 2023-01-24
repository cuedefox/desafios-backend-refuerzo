const fs = require('fs');

class Contenedor {
    constructor(file) {
        this.file = file;
    }
    writeFile = async obj => {
        try {
            await fs.promises.writeFile(this.file, JSON.stringify(obj, null, 2));
        } catch (err) {
            console.log(err);
        }
    }
    getAll = async () => {
        try {
            const productos = await fs.promises.readFile(this.file, 'utf-8');
            return JSON.parse(productos);
        } catch (err) {
            if(err) return [];
        }
    }
    save = async obj => {
        try {
            let productos = await this.getAll();
            const producto = {...obj, id: productos.length > 0 ? productos[productos.length - 1].id + 1 : 1};
            productos.push(producto);
            await this.writeFile(productos);
            return producto.id;
        } catch (err) {
            console.log(`error: ${err}`);
        }
    }
    getById = async id => {
        try {
            const productos = await this.getAll();
            const obj = productos.find(prod => prod.id == id);
            return obj ? obj : null;
        } catch (err) {
            console.log(`error: ${err}`);
        }
    }
    deleteById = async id => {
        try {
            let productos = await this.getAll();
            productos = productos.filter(obj => obj.id != id);
            await this.writeFile(productos);
            return 'eliminado';
        } catch (err) {
            console.log(`error: ${err}`);
        }
    }
    deleteAll = async () => {
        try {
            await this.writeFile([]);
        } catch (err) {
            console.log(`error: ${err}`);
        }
    }
}

module.exports = Contenedor;