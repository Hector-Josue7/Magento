const mongoose = require('mongoose');
const { Schema } = mongoose;


const esquema = new Schema({
  title: { type: String },
  description: { type: String },
  filename: { type: String },
  tipoArchivo: { nombre: String, extension: String, icono: String},
  fecha_ingreso:  { type: Date, default: Date.now },
  idCreador : {type: mongoose.Schema.Types.ObjectId, ref: 'usuario', required: true, "tipoUsuario.nombreTipoUsuario": String},
} , { timestamps: true });


var archivosGenericos = mongoose.model('archivosGenericos', esquema);
module.exports = archivosGenericos;



