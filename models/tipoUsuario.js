var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
       
        nombre : String, // aqui pueden insertarse usuario_administrador, registrado y no registrado
        caracteristicas : Array,
        disponibilidad: Array
}

);

module.exports = mongoose.model('tipoUsuarios',esquema);
