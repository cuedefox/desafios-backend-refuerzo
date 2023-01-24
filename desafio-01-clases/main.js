class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre,
        this.apellido = apellido,
        this.libros = libros,
        this.mascotas = mascotas
    }
    getFullName() {
        console.log(`El nombre completo del usuario es ${this.nombre} ${this.apellido}`);
    }
    addMascota(mascota) {
        this.mascotas.push(mascota);
        console.log(`Mascota agregada correctamente`);
    }
    countMascotas() {
        console.log(`El usuario posee ${this.mascotas.length} mascotas`);
    }
    addBook(nombre, autor) {
        this.libros.push({
            nombre: nombre,
            autor: autor
        })
        console.log('Libro agregado correctamente');
    }
    getBookNames() {
        let nombresLibros = [];
        for(let i = 0; i < this.libros.length; i++) {
            nombresLibros.push(this.libros[i].nombre);
        }
        console.log(nombresLibros);
    }
}

let rodrigo = new Usuario('Rodrigo', 'Vergara', [], []);

rodrigo.getFullName();
rodrigo.addMascota('Link');
rodrigo.addMascota('Link');
rodrigo.addMascota('Link');
rodrigo.addMascota('Link');
rodrigo.countMascotas();
rodrigo.addBook('Lo que el se llevo', 'Cuede');
rodrigo.addBook('asereje', 'Cuede');
rodrigo.addBook('La divina tragedia', 'Cuede');
rodrigo.getBookNames();