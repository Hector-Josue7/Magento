const mongoose = require('mongoose');
const { Schema } = mongoose;


const esquema = new Schema({
  title: { type: String },
  description: { type: String },
  filename: { type: String },
  fecha_ingreso:{ type: Date, default: Date.now },
  idCreador : {type: mongoose.Schema.Types.ObjectId, ref: 'usuario', required: true,  "tipoUsuario.nombreTipoUsuario": String},

} , { timestamps: true });



var imagenes = mongoose.model('imagenes', esquema);
module.exports = imagenes;

//   views: { type: Number, default: 0 },
//   likes: { type: Number, default: 0 },









