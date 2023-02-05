import { Schema } from "mongoose";
import { ContainerMon } from "./mongodb.js";

export class Carrito extends ContainerMon {
    constructor() {
        super('carts', new Schema({
            products: [
                {
                    nombre: { type: String, require: true },
                    descripcion: { type: String, require: true },
                    codigo: { type: Number, require: true },
                    foto: { type: String, require: true },
                    precio: { type: Number, require: true },
                    stock: { type: Number, require: true }
                },
                { timestamps: true }
            ]
        }, {timestamps: true}));
    }
    async getProducts(id) {
        try {
            const carrito = await this.model.findById(id);
            return carrito.products;
        } catch (error) {
            console.log(error);
        }
    }
    async saveProduct(product, idCart) {
        try {
            let cart = await this.model.findById(idCart);
            await cart.products.push(product);
            return await cart.save();
        } catch (error) {
            console.log(error);
        }
    }
    async deleteProduct(idCart, idProd) {
        let cart = await this.model.findById(idCart);
        await cart.products.filter(prod => prod._id != idProd);
        return await cart.save();
    }
}