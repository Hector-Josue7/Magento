const mongoose = require('mongoose');
const { Schema } = mongoose;
const path = require('path');

const ImageSchema = new Schema({
  title: { type: String },
  description: { type: String },
  filename: { type: String },
  tipoArchivo: {
    nombre: String,
    extension: String,
    icono: String
        },

  timestamp: { type: Date, default: Date.now },
  usuarioDueño:  mongoose.Schema.Types.Mixed
});

ImageSchema.virtual('uniqueId')
  .get(function () {
    return this.filename.replace(path.extname(this.filename), '');
  });

module.exports = mongoose.model('Imagenes', ImageSchema);



