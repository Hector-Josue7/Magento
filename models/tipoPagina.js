var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
       // aqui se almacenan los valores de paginas estaticas y paginas de entradas o post
        tipoPagina: String,
      
}

);

module.exports = mongoose.model('tipos',esquema);