var mongoose = require("mongoose");
 //const { Schema } = mongoose;
 
var esquema  = new mongoose.Schema({
  //  _id: Schema.Types.ObjectId,
      nombre : { type: String},
      apellido : { type: String},
      usuario :  {type: String}, //unique: true
      correo : {type: String, unique: true, trim: true,  lowercase: true},
      clave :{type: String,  required: true},
    //   foto: { type: String, required: false, default: '../public/img/team/ac_generico.jpg' },
      gender:String,
      birthdate:mongoose.SchemaTypes.Mixed, 
      fechaRegistro: {type: Date, default: Date.now},
      // tipoUsuario: { type: String, enum: ['administrador', 'usuario_generico'], required: false, default: 'usuario_generico' },
      tipoUsuario:{type: mongoose.Schema.Types.ObjectId,  //    ref: 'tipoUsuario', 
                  required: true,
                   nombreTipoUsuario: String }
     //, paginasPostAccesos: [{type: Schema.Types.ObjectId,
    //                 ref: 'paginaPost', 
    //                 required: false,
    //                 tituloPaginaPost: String,
    //                descripcion: String}],
    // paginasEstaticasAccesos: [{type: Schema.Types.ObjectId,
    //                   ref: 'paginaEstatica', 
    //                   required: false,
    //                   tituloPaginaEstatica: String,
    //                   descripcion: String}],


    //  tarjeta:{
    //                     tipo:String,
    //                     numero:String,
    //                     ccv:String,
    //                     propietario:String,
    //                     mesExpiracion:String,
    //                     anioExpiracion:String
    //             }

    });

//El primer parametro tiene que ser el nombre de la coleccion en mongo (puede ser el singular)
module.exports = mongoose.model('usuarios',esquema);
















