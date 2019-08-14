var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
       
        nombre : String,
        descripcion: String, 
       // idAccessoPaginas: mongoose.Schema.Types.ObjectId
       idAccessoPaginas: Array
      }
);

module.exports = mongoose.model('roles',esquema);