var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
  login: String,
  galeriaImagenes: Array,
  enlacesDescargaArchivos: Array,
  post: String,
  imagen: String,
  Menu: String,  // serán componentes independientes que se podran incrustar via shortcut
  Breadcrumb: String

} );

module.exports = mongoose.model('shortcuts',esquema);