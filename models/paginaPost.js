var mongoose = require("mongoose");
const { Schema } = mongoose;

var esquema = new Schema(
    {


 // categoriaPost: { type: String, enum: ['categoria1', 'categoria2'], required: true},   


 
       pagina:{type: Schema.Types.ObjectId, ref: 'pagina', required: false},
       fecha_creacion: {type: Date, default: Date.now},
}, { timestamps: true } );

var paginaPost = mongoose.model('paginaPost', esquema);
module.exports = paginaPost;