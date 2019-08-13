var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
       
        nombre : String,
        descripcion: String, 
        idAccesso: mongoose.Schema.Types.ObjectId,
      }
);

module.exports = mongoose.model('roles',esquema);