var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
       
        nombre : String,
        apellido : String,
        usuario : String,
        correo : String,
        contrasena : String,
        foto : String,
        idTipoUsuario: mongoose.Schema.Types.ObjectId,
        genero:String,
        fechaNacimiento:Date,
        fechaRegistro:Date,
} );

module.exports = mongoose.model('usuarios',esquema);