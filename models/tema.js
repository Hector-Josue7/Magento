var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
{
       tituloTema: String,
       Descripcion: String,
       css: String, // editor en linea syntax highlighting
       javascript: String, // editor en linea syntax highlighting
       imagenesAsociadas: Array // opcion de subir imagenes relacionadas al tema
    }
);

module.exports = mongoose.model('temas',esquema);