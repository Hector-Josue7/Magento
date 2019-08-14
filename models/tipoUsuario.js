var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
       
        nombre : String, // aqui pueden insertarse usuario_administrador, registrado y no registrado

        caracteristicas : Array,
        disponibilidad: Array
}

);
//El primer parametro es el singular de la coleccion, 
//mediante este parametro hace el enlace,
//si se pone mal este parametro no se podria realizar ninguna instruccion
module.exports = mongoose.model('tipoUsuarios',esquema);
