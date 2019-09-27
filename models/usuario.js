var mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

var UserSchema  = new Schema(
    {
       
        Nombre :  String,
        Apellido : String,
        Usuario :  String,
        Correo : String,
        Clave : String,
        // foto : String,
        gender:String,
        // idTipoUsuario: mongoose.Schema.Types.ObjectId,
        birthdate:mongoose.SchemaTypes.Mixed, 
        fechaRegistro: {type: Date, default: Date.now},
        } );




        
UserSchema.methods.encryptPassword = async (Clave) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(Clave, salt);
  return hash;
};

UserSchema.methods.matchPassword = async function (Clave) {
  return await bcrypt.compare(Clave, this.Clave);
};

module.exports = mongoose.model('usuarios', UserSchema );


// var esquema = new mongoose.Schema({
//   firstName:String,
//   lastName:String,
//   email:String,
//   password:String,
//   birthdate:mongoose.SchemaTypes.Mixed, 
//   gender:String
// });
// let parametros = `firstName=${persona.firstName}
//&lastName=${persona.lastName}
//&email=${persona.email}
//&password=${persona.password}
//&month=${persona.birthdate.month}
//&day=${persona.birthdate.day}
//&year=${persona.birthdate.year}
//&gender=${persona.gender}`;









// var esquema = new mongoose.Schema({
//   firstName:String,
//   lastName:String,
//   email:String,
//   password:String,
//   birthdate:mongoose.SchemaTypes.Mixed, 
//   gender:String
// });



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


// var mongoose = require("mongoose");

// var esquema = new mongoose.Schema(
//     {
       
//         nombre : String,
//         apellido : String,
//         usuario : String,
//         correo : String,
//         contrasena : String,
//         foto : String,
//         idFacebook : String,
//         idPlan: mongoose.Schema.Types.ObjectId,
//         genero:String,
//         fechaNacimiento:Date,
//         fechaRegistro:Date,
//         tarjeta:{
//                 tipo:String,
//                 numero:String,
//                 ccv:String,
//                 propietario:String,
//                 mesExpiracion:String,
//                 anioExpiracion:String
//         }



     
// }

// );

// module.exports = mongoose.model('usuarios',esquema);
