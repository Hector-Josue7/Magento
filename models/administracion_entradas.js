var mongoose = require("mongoose");
const { Schema } = mongoose;

var esquema = new Schema(
    {

     titulo_entrada: String,
     idCreador : {type: Schema.Types.ObjectId, ref: 'usuario', required: true},
     fecha_creacion: {type: Date, default: Date.now},
     contenido_entrada: String, // utilizar editor HTML wysiwyg
     imagen_representativa: String,
     paginaPost:{type: Schema.Types.ObjectId,  // se puede visualizar en paginas de post
          ref: 'paginaPost', 
          required: true, 
         "post_categoria.categoria_post_entrada": String}, // Categoría a la que pertenece  = categpria de posts o entradas
 
comentariosAdmitidos: Boolean,

}, { timestamps: true } );

var administracion_entrada = mongoose.model('administracion_entrada', esquema);
module.exports = administracion_entrada;



// Las entradas podrán ser visualizadas en paginas creadas para visualizar posts mediante la categoría o mediante shortcuts
// esta informacion de abajo es por si se quiere algun dia visualizar en paginas estaticas o en paginas normales
// pagina_estatica: {  // se puede visualizar en paginas estaticas
//     type: Schema.Types.ObjectId,
//     ref: 'paginaEstatica',
//     required:false,
//     nombre_pagina_estatica: String

//  },

// pagina_normal {type: Schema.Types.ObjectId,  // se puede visualizar en paginas que no sean post o paginas estaticas
//     ref: 'pagina', 
//     required: false, 
//     titulo: String},