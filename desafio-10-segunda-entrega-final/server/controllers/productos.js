import { Products } from "./containerProductos.js";
const admin = true;
const container = new Products();

export async function getProducts(req, res) {
    const id = req.params.id;
    if(id == undefined || !id) {
        res.json(await container.getAll());
    }else {
        if(id.length != 24) {
           return res.status(404).send({message: 'el id no pertenece a ningun producto'});
        }
        const producto = await container.findById(id);
        producto ? res.json(producto) : res.status(404).send({message: 'el id no pertenece a ningun producto'});
    }
}

export async function postProduct(req, res) {
    if (admin) {
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
        await container.save(
            {
                nombre,
                descripcion,
                codigo,
                foto,
                precio,
                stock
            }
        );
        res.status(200).send({message: 'producto agregado'});
    }else {
        res.status(405).send({message: 'usuario no permitido para hacer esta request'})
    }
}

export async function putProduct(req, res) {
    if(admin) {
        const id = req.params.id;
        const idExists = await container.findById(id);
        if(idExists) {
            await container.updateProduct(id, req.body);
            res.status(200).send({message: 'producto actualizado'});
        }else {
            res.status(404).send({message: 'El id no pertenece a ningun producto'});
        }
    }else {
        res.status(405).send({message: 'usuario no permitido para hacer esta request'})
    }
}

export async function deleteProduct(req, res) {
    if(admin) {
        const id = req.params.id;
        const idExists = await container.findById(id);
        if(idExists) {
            await container.deleteById(id);
            res.status(200).send({message: 'producto eliminado'});
        }else {
            res.status(404).send({message: 'El id no pertenece a ningun producto'});
        }
    }else {
        res.status(405).send({message: 'usuario no permitido para hacer esta request'})
    }
}
