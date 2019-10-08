var mongoose = require("mongoose");
const { Schema } = mongoose;

var esquema = new Schema(
    {
 
     titulo_entrada: String,
     idCreador : {type: mongoose.Schema.Types.ObjectId, ref: 'usuario', required: true},
     fecha_creacion: {type: Date, default: Date.now},
     contenido_entrada: String, // utilizar editor HTML wysiwyg
     imagen_representativa: String,
     categoriaPost: { type: String, enum: ['categoria1', 'categoria2'], required: true},
     comentariosAdmitidos: Boolean,
     pagina:{type: Schema.Types.ObjectId, ref: 'pagina', required: false}, // tiene que existir alguna pagina para que existan entradas


}, { timestamps: true } );

var post_entrada = mongoose.model('post_entrada', esquema);
module.exports = post_entrada;