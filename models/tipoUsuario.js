var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        nombreTipoUsuario : String,
        orden: Number,
        acceso : Boolean
    }
);
module.exports = mongoose.model('tipousuarios',esquema);