const mongoose = require('mongoose');
const { Schema } = mongoose;
const path = require('path');

const esquema = new Schema({
  title: { type: String },
  description: { type: String },
  filename: { type: String },
  tipoArchivo: {
    nombre: String,
    extension: String,
    icono: String
        },

  // timestamp: { type: Date, default: Date.now },
  fecha_ingreso:  { type: Date, default: Date.now },
  idCreador : {type: mongoose.Schema.Types.ObjectId, ref: 'usuario', required: true},
} , { timestamps: true });





var archivosGenericos = mongoose.model('archivosGenericos', esquema);
module.exports = archivosGenericos;



