import {Schema} from 'mongoose';
import { ContainerMon } from './mongodb.js';

export class Products extends ContainerMon {
    constructor() {
        super('products', new Schema(
			{
				nombre: { type: String, require: true },
				descripcion: { type: String, require: true },
				codigo: { type: Number, require: true },
				foto: { type: String, require: true },
				precio: { type: Number, require: true },
				stock: { type: Number, require: true }
			},
			{ timestamps: true }
        ))
    }
    updateProduct(id, data) {
        try {
            return this.model.findByIdAndUpdate(id, data);
        } catch (error) {
            console.log(error);
        }
    }
}