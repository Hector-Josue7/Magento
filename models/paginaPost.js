var mongoose = require("mongoose");
const { Schema } = mongoose;

var esquema = new Schema(
    {
        // categoriaPost: { type: String, enum: ['categoria1', 'categoria2'], required: true},   
        tituloPaginaPost:  {type: String, required: true, minlength: 3, maxlength: 50 },
        menu:[{_id: Schema.Types.ObjectId, tituloMenu: String, enlaceFijo: String, estilosCss: String, estilosCss: Array}],
        // Tendrá que indicar los estilos css del menú o tomarlos directamente del css principal del sitio.
        descripcion: { type: String, required: true, minlength: 3 }, 
        palabrasClave: String, 
        paginaPadre: String,
        estado: Boolean,
        URL: String,
        incluirEncabezado: Boolean,
        piePagina: Boolean,
        menu: Boolean,
        breadcrumb: Boolean,
        idCreador : {type: Schema.Types.ObjectId, ref: 'usuario',required: true},
        post_categoria:{type: Schema.Types.ObjectId, ref: 'post_categoria', required: true,  categoria_post_entrada: String },  // se seleccionará una categoría de posts o entradas
        fecha_creacion: {type: Date, default: Date.now},
        comentarios: [{ type: Schema.Types.ObjectId, ref: 'comentario' }],
        shortcuts:  [{ type: Schema.Types.ObjectId, ref: 'shortcuts'}]
        // likes: { type: Number, default: 0 },
        // dislikes: { type: Number, default: 0 },
       // likedBy: [{ type: Schema.Types.ObjectId, ref: 'user' }],
       // dislikedBy: [{ type: Schema.Types.ObjectId, ref: 'user' }],
}, { timestamps: true } );

var paginaPost = mongoose.model('paginaPost', esquema);
module.exports = paginaPost;

// pueden existir post sin comentaios, pero no pueden existir comentarios sin un post al cual vayan dirigidos





