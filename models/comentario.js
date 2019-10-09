const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
   comentario: { type: String, required: true, minlength: 3 },
   usuarioRegistrado: { type: Schema.Types.ObjectId, ref: 'usuario', required: true },
//  paginaPost : {type: Schema.Types.ObjectId, ref: 'paginaPost',  required: true },
 
}, { timestamps: true });

const Comment = mongoose.model('comentario', commentSchema);

module.exports = Comment;

// post_entrada:{type: Schema.Types.ObjectId,
//    ref: 'post_entrada',
//     required: false
//   },

// Un usuario normal registrado puede hacer comentarios a los
//  posts que lo permitan, dichos comentarios pueden ser 
//  visualizados por el administrador, borrarlos o reportarlo como inapropiado.

// likes: { type: Number, default: 0 },
// dislikes: { type: Number, default: 0 },
// likedBy: [{ type: Schema.Types.ObjectId, ref: 'usuario' }],
// dislikedBy: [{ type: Schema.Types.ObjectId, ref: 'usuario' }],
