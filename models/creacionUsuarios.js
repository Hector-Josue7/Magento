var mongoose = require("mongoose");
 const { Schema } = mongoose;
var esquema  = new Schema({

tipoUsuario:{type: Schema.Types.ObjectId, ref: 'tipoUsuario', required: true},
idAdministrador : {type: Schema.Types.ObjectId,
    ref: 'usuario', 
    required: true,
    nombre: String, 
    apellido:String},

    usuariosCreados: [{ type: Schema.Types.ObjectId,
        ref: 'usuario',
        nombre: String,
        apellido: String,
        "paginasPostAccesos.tituloPaginaPost": String,
       "paginasEstaticasAccesos.tituloPaginaEstatica": String }],


    }, { timestamps: true });

var creacion_usuarios = mongoose.model('creacion_usuarios', esquema);
module.exports = creacion_usuarios;