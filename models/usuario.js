var mongoose = require("mongoose");

const bcrypt = require('bcryptjs');
var UserSchema  = new mongoose.Schema(
    {
       
        nombre :  { type: String, required: true },
        apellido :  { type: String, required: true },
        usuario :  { type: String, required: true },
        correo : { type: String, required: true },
        clave :  { type: String, required: true },
        foto : String,
        genero:String,
        idTipoUsuario: mongoose.Schema.Types.ObjectId,
        fechaNacimiento:Date,
        fechaRegistro: {type: Date, default: Date.now},
        } );

UserSchema.methods.encryptPassword = async (contrasena) => {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(clave, salt);
        return hash;
      };
      
      UserSchema.methods.matchPassword = async function (clave) {
        return await bcrypt.compare(contrasena, this.clave);
      };

module.exports = mongoose.model('usuarios', UserSchema );

 // define a schema
//  var personSchema = new Schema({
//   name: {
//     first: String,
//     last: String
//   }
// });

// // compile our model
// var Person = mongoose.model('Person', personSchema);

// // create a document
// var axl = new Person({
//   name: { first: 'Axl', last: 'Rose' }
// });