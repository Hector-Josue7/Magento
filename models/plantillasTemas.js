var mongoose = require("mongoose");
const { Schema } = mongoose;

var esquema = new Schema(
{
        tituloTema: String,
        descripcion: String,
        css: String,
// css: {type: Schema.Types.ObjectId,    
//      ref: 'paginaPrincipal',required: false},
         javascript: String,
// javascript: { type: Schema.Types.ObjectId, ref: 'paginaPrincipal', required:false},
        listaImagenesAsociadas: [{ type: Schema.Types.ObjectId,  ref: 'imagenes', required: false}] // (Opción de subir las imágenes relacionadas al tema
   
    });

var plantilla_tema = mongoose.model('plantilla_tema', esquema);
module.exports = plantilla_tema;
