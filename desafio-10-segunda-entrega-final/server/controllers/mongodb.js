import {model} from 'mongoose';

export class ContainerMon {
    constructor(collection, schema) {
        this.model = model(collection, schema);
    }
    save(obj) {
        try {
            return this.model.create(obj);
        } catch (error) {
            console.log(error);
        }
    }
    findById(id) {
        try {
            return this.model.findById(id);
        } catch (error) {
            console.log(error);
        }
    }
    getAll() {
        try {
            return this.model.find();
        } catch (error) {
            console.log(error);
        }
    }
    deleteById(id) {
        try {
            return this.model.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
        }
    }
}