import fs from 'fs';

export class FileSystem {
    constructor(file) {
        this.file = file;
        this.objects = this.readData();
    }
    generateId() {
        try {
            if(this.objects.length == 0) {
                return 1;
            }
            return this.objects[this.objects.length - 1].id + 1;
        }catch (err) {
            console.log({error: err});
        }
    }
    readData() {
        try {
            return JSON.parse(fs.readFileSync(this.file, 'utf-8'));
        } catch (error) {
            console.log({error: error});
            if (error.message === 'Unexpected end of JSON input') return [];
        }
    }
    async writeData() {
        await fs.promises.writeFile(
            this.file,
            JSON.stringify(this.objects, null, 2)
        )
    }
    getAll() {
        try {
            return this.objects;
        } catch (error) {
            console.log({error: error});
            return [];
        }
    }
    getById(id) {
        try {
            const obj = this.objects.find(obj => obj.id == id);
            return obj;
        } catch (error) {
            console.log({error: error});
        }
    }
    async save(obj) {
        try {
            obj.id = await this.generateId();
            obj.timestamp =  Date.now();
            this.objects.push(obj);
            await this.writeData();
            return obj.id;
        } catch (error) {
            console.log({error: error});
        }
    }
    async saveCart() {
        try {
            let obj = {}
            obj.id = await this.generateId();
            obj.timestamp =  Date.now();
            obj.products = [];
            this.objects.push(obj);
            await this.writeData();
            return obj.id;
        } catch (error) {
            console.log({error: error});
        }
    }
    update(id, data) {
        const obj = this.getById(id);
        if(obj) {
            const index = this.objects.findIndex(obj => id == obj.id);
            this.objects[index] = {
                ...data,
                id: obj.id,
                timestamp: obj.timestamp
            }
            this.writeData();
        }else {
            console.log({error: 'no se ha encontrado el obj con ese id'});
        }
    }
    async deleteAll() {
        try {
            this.objects = [];
            this.writeFile();
        } catch (error) {
            console.log({error: error});
        }
    }
    async deleteById(id) {
        try {
            this.objects = this.objects.filter(obj => obj.id != id);
            this.writeData();
        } catch (error) {
            console.log({error: error});
        }
    }
    saveProduct(cartId, data) {
        const cart = this.objects.find(cart => cart.id == cartId);
        const index = this.objects.findIndex(cart => cart.id == cartId);
        this.objects[index].products.push(data);
        this.writeData();
    }
    deleteProduct(cartId, productId) {
        const index = this.objects.findIndex(cart => cart.id == cartId);
        this.objects[index].products = this.objects[index].products.filter(prod => prod.id != productId);
        this.writeData();
    }
}