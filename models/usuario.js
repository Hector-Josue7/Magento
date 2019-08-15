var mongoose = require("mongoose");

const bcrypt = require('bcryptjs');
var UserSchema  = new mongoose.Schema(
    {
       
        nombre :  { type: String, required: true },
        apellido :  { type: String, required: true },
        usuario :  { type: String, required: true },
        correo : { type: String, required: true },
        contrasena :  { type: String, required: true },
        foto : String,
        idTipoUsuario: mongoose.Schema.Types.ObjectId,
        genero:String,
        fechaNacimiento:Date,
        fechaRegistro: {type: Date, default: Date.now},
        
        
} );

UserSchema.methods.encryptPassword = async (contrasena) => {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(contrasena, salt);
        return hash;
      };
      
      UserSchema.methods.matchPassword = async function (contrasena) {
        return await bcrypt.compare(contrasena, this.contrasena);
      };

module.exports = mongoose.model('usuarios', UserSchema );