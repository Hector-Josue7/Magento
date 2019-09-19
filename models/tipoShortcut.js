var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
       
        tipo : String,
        nombreExtra : Array
}

);

module.exports = mongoose.model('tipoShortcuts',esquema);
