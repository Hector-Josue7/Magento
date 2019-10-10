var mongoose = require("mongoose");
const { Schema } = mongoose;

var esquema = new Schema(
    {
   loginPaginaPost:  {type: Schema.Types.ObjectId,
     ref: 'paginaPost',
     required: false},
    galeriaImagenes:  [{ type: Schema.Types.ObjectId,
         ref: 'imagenes'}], // Ejemplo: {tipo:'galeria',imagenes:['56bcvb5545shjh65','56bcvb5545shjh66','56bcvb5545shjh67']}
    enlacesDescargaArchivosPaginasPost:  [{ type: Schema.Types.ObjectId, 
        ref: 'paginaPost'}],
    paginaPost :{type: Schema.Types.ObjectId,
         ref: 'paginaPost',required: false} , // Ejemplo:{tipo:'entrada',id:'56bcvb5545shjh44'
    imagen: {type: Schema.Types.ObjectId,
         ref: 'imagenes',
         required: false,
          title: String},
    menusPaginaPost:[{type: Schema.Types.ObjectId, 
        ref: 'paginaPost',
        required: false}] , // Los menús serán componentes independientes que se podrán incrustar vía shortcut.
    // breadcrumbPaginaPost: Array,
    //breadcrumbPaginaPost: {type: Schema.Types.ObjectId, ref: 'paginaPost',required: false, titulo: String},

});

var paginaPost = mongoose.model('shortcut', esquema);
module.exports = paginaPost;
/*
Un administrador podrá incrustar diversos recursos en 
páginas o entradas utilizando secuencias de caracteres 
los cuales deberán estar bien definidos. El formato
 propuesto para dichos shorcuts es JSON.
*/

