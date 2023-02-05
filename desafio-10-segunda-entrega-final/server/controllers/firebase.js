import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();
admin.initializeApp({credential: admin.credential.cert(process.env.FIREBASE)});

export class ContainerFire {
    constructor() {
        this.db = admin.firestore();
    }
    save(obj) {
        try {
            return this.db.collection('products').add(obj);
        } catch (error) {
            console.log(error);
        }
    }
    getById(id) {
        try {
            const data = this.db.doc(`/products/${id}`).get();
            return data;
        } catch (error) {
            console.log(error);
        }
    }
    async getAll() {
        try {
            const data = await this.db.collection('products').get();
            let docs = [];
            data.forEach(doc => {
                docs.push(doc.data());
            })
            return docs;
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