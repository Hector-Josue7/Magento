var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
  login: String,
  galeriaImagenes: Array,
  enlacesDescargaArchivos: Array,
  post: String,
  Menu: String,
  Breadcrumb: String

} );

module.exports = mongoose.model('shortcuts',esquema);