var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
{
       tituloTema: String,
       Descripcion: String,
       css: String, // editor en linea syntax highlighting
       javascript: String, // editor en linea syntax highlighting
       imagenesAsociadas: Array
    }
);

module.exports = mongoose.model('temas',esquema);