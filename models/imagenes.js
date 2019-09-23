const mongoose = require('mongoose');
//  var Schema = mongoose.Schema;
const { Schema } = mongoose;
const path = require('path');

const ImageSchema = new Schema({
    autor : mongoose.Schema.Types.Mixed,      
  titulo: { type: String },
  description: { type: String },
  filename: { type: String },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now }
});

ImageSchema.virtual('uniqueId') // lo que hace este uniqueId es quitarle la extensión al filename o nombreArchivo
  .get(function () {
    return this.filename.replace(path.extname(this.filename), '');
  });

module.exports = mongoose.model('Imagenes', ImageSchema);


//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
//creator: {type: Schema.Types.ObjectId, ref: "User"},
//extension: {type:String, required:true}
//var Imagen = mongoose.model("Imagen", img_schema);
//module.exports = Imagen;