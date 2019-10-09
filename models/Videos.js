const mongoose = require('mongoose');
const { Schema } = mongoose;
const path = require('path');

const ImageSchema = new Schema({
  title: { type: String },
  description: { type: String },
  filename: { type: String },
//   views: { type: Number, default: 0 },
//   likes: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now },
  idCreador : {type: mongoose.Schema.Types.ObjectId, ref: 'usuario', required: true},

});



module.exports = mongoose.model('Imagenes', ImageSchema);