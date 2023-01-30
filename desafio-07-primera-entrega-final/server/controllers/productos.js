import { FileSystem } from "./fs.js";
const admin = true;
const container = new FileSystem('./db/productos.json');

export function getProducts(req, res) {
    const id = Number(req.params.id);
    if(id == undefined || id == NaN || !id) {
        res.json(container.getAll());
    }else {
        const producto = container.getById(id);
        producto ? res.json(producto) : res.status(404).send({message: 'el id no pertenece a ningun producto'});
    }
}

export function postProduct(req, res) {
    if (admin) {
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
        container.save(
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

export function putProduct(req, res) {
    if(admin) {
        const id = req.params.id;
        const idExists = container.objects.find(obj => obj.id == id);
        if(idExists) {
            container.update(id, req.body);
            res.status(200).send({message: 'producto actualizado'});
        }else {
            res.status(404).send({message: 'El id no pertenece a ningun producto'});
        }
    }else {
        res.status(405).send({message: 'usuario no permitido para hacer esta request'})
    }
}

export function deleteProduct(req, res) {
    if(admin) {
        const id = req.params.id;
        const idExists = container.objects.find(obj => obj.id == id);
        if(idExists) {
            container.deleteById(id);
            res.status(200).send({message: 'producto eliminado'});
        }else {
            res.status(404).send({message: 'El id no pertenece a ningun producto'});
        }
    }else {
        res.status(405).send({message: 'usuario no permitido para hacer esta request'})
    }
}
