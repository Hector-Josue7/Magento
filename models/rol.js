
// el administrador podrá crear usuarios de cualquier tipo, sin embargo un usuario cualquiera podria registrarse utilizando un rol generico
var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
       idTipoUsuario:mongoose.Schema.Types.ObjectId,
        nombre : String,
        descripcion: String, 
       // idAccessoPaginas: mongoose.Schema.Types.ObjectId
       idAccessoPaginas: Array
      }
);

module.exports = mongoose.model('roles',esquema);