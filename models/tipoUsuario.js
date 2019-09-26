// el administrador podrá crear usuarios de cualquier tipo, sin embargo un usuario 
// cualquiera podria registrarse utilizando un rol generico
var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
       
        tipoUsuario : String, // aqui pueden insertarse usuario_administrador, registrado y no registrado
        acceso: boolean;
}

);

module.exports = mongoose.model('tipoUsuarios',esquema);



// var mongoose = require("mongoose");

// var esquema = new mongoose.Schema(
//     {
       
//         nombre : String,
//         precio : String,
//         tiempo: String,
//         caracteristicas : Array,
//         disponibilidad: Array
// }

// );
// //El primer parametro es el singular de la coleccion, 
// //mediante este parametro hace el enlace,
// //si se pone mal este parametro no se podria realizar ninguna instruccion
// module.exports = mongoose.model('planes',esquema);
