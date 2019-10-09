
// coleccion de categorias 
// desarroolar opcones crud
var mongoose = require("mongoose");
const { Schema } = mongoose;

var esquema = new Schema(
    {
 
     categoria_post_entrada: String,
     idCreador : {type: Schema.Types.ObjectId,
         ref: 'usuario', 
         required: true
        },
     fecha_creacion: {type: Date,
         default: Date.now
        },
  // tiene que existir alguna pagina para que existan entradas
     //categoriaPost: { type: String, enum: ['categoria1', 'categoria2'], required: true},
     }, { timestamps: true } );

var post_categoria = mongoose.model('post_categoria', esquema);
module.exports = post_categoria;


// paginaPost:[{type: Schema.Types.ObjectId,
//     ref: 'paginaPost',
//      required: false,
//      titulo: String
//    }]