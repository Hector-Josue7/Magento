var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
    archivos: Array,
    videos: Array,
    archivos_genericos: Array,
    idCreador : mongoose.Schema.Types.ObjectId
          
}

);

module.exports = mongoose.model('usuarios',esquema);