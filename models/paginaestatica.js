var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        tituloPagina: String,
        encabezado_editor: String,
        pie_pagina_editor: String,
        contenido_editor: String,
        favicon: String,
        logotipo: String,
        descripcion: String,
        palabras_clave: String,
        css_extra: String,
        javascript_extra: String
        
  
   
} );

module.exports = mongoose.model('paginasEstaticas',esquema);