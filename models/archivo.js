var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
    idCreador : mongoose.Schema.Types.ObjectId,
    imagenes: Array,
    videos: Array,
    archivos_genericos: Array, // Dicho codigo servira para incrustar este tipo de recursos mediante shortcuts

});

module.exports = mongoose.model('archivos',esquema);