// el administrador podrá crear usuarios de cualquier tipo, sin embargo un usuario 
// cualquiera podria registrarse utilizando un rol generico
var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
       
        nombreTipoUsuario : String, // aqui pueden insertarse usuario_administrador, registrado y no registrado
         acceso:{type: Boolean, default: false}
   
    }

);

module.exports = mongoose.model('tipoUsuarios',esquema);



