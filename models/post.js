// se crearan bloques de contenido informativo para luego ser utilizado
// en paginas o mediante shortcuts
var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
    tituloEntrada: String,
    autor:  mongoose.Schema.Types.ObjectId,
    fecha_hora: {type: Date, default: Date.now},
    contenidoEntrada: String,
    imagenPost: String,
    categoria: mongoose.Schema.Types.ObjectId,
    comentariosPermitidos: Boolean

 
} );

module.exports = mongoose.model('posts',esquema);