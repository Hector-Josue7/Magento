const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
   comment: { type: String, required: true, minlength: 3 },
   usuario: { type: Schema.Types.ObjectId, ref: 'usuario', required: true },
   likes: { type: Number, default: 0 },
   dislikes: { type: Number, default: 0 },
   likedBy: [{ type: Schema.Types.ObjectId, ref: 'usuario' }],
   dislikedBy: [{ type: Schema.Types.ObjectId, ref: 'usuario' }]
}, { timestamps: true });

const Comment = mongoose.model('comentario', commentSchema);

module.exports = Comment;