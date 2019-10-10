var mongoose = require('mongoose');

//Schema: Define la estructura de los objetos que se guardaran en una coleccion.
var esquema = new mongoose.Schema({

    editorEncabezado: String,
    editorPagina: String,
    editorPiePagina: String,
    tituloPagina: String,
    descripcionPagina: String, 
    favicon: String,
    logoPagina: String,
    palabrasClave: String,
    editorCss: String,
    editorJs: String,
    idCreador : {type: mongoose.Schema.Types.ObjectId, ref: 'usuario', required:true, "tipoUsuario.nombreTipoUsuario": String},
    fechaCreacion : {type: Date, default: Date.now},
    ultimaModificacion : {type: Date, default: Date.now},
});

//El primer parametro tiene que ser el nombre de la coleccion en mongo (puede ser el singular)
module.exports = mongoose.model('paginaPrincipal',esquema);