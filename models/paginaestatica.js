var mongoose = require("mongoose");
const { Schema } = mongoose;

var esquema = new Schema(
    {
    
        editor_html_wysiwyg: String,
        shortcuts: Array,
        pagina:{type: Schema.Types.ObjectId, ref: 'pagina', required: false}

    });

var paginaEstatica = mongoose.model('paginaEstatica', esquema);
module.exports = paginaEstatica;