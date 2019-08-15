var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
    imagenes: Array,
    videos: Array,
    archivos_genericos: Array, // Dicho codigo servira para incrustar este tipo de recursos mediante shortcuts
    idCreador : mongoose.Schema.Types.ObjectId
          
}

);

module.exports = mongoose.model('archivos',esquema);