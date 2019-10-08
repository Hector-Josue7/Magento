var mongoose = require("mongoose");
const { Schema } = mongoose;

var esquema = new Schema(
    {

     titulo_entrada: String,
     idCreador : {type: mongoose.Schema.Types.ObjectId, ref: 'usuario', required: true},

     fecha_creacion: {type: Date, default: Date.now},
     contenido_entrada: String, // utilizar editor HTML wysiwyg
     imagen_representativa: String,
     
 pagina:{type: Schema.Types.ObjectId, ref: 'post_entrada', required: false, titulo_entrada: String}, // tiene que existir alguna pagina para que existan entradas


}, { timestamps: true } );

var administracion_entrada = mongoose.model('administracion_entrada', esquema);
module.exports = administracion_entrada;