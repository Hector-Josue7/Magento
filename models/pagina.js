var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        idTipoUsuario: mongoose.Schema.Types.ObjectId,
        paginasEstaticasHTML: String,
        paginasPosts:  mongoose.Schema.Types.ObjectId,
        apartado: {
            encabezadoPaginaGenerico: String,
            piePaginaGenerico: String,
            tituloPagina: String,
            favicon: String,
            Descripcion: String,
            palabrasClave: String,
            cssExtra: String,
         
        }
} );

module.exports = mongoose.model('paginas',esquema);