var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        nombrePagina: String,
   
} );

module.exports = mongoose.model('paginasEstaticas',esquema);