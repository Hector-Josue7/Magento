var mongoose = require("mongoose");
const { Schema } = mongoose;

var esquema =  new Schema(
    {
       
        titulo: String,
        tituloMenu: String,
        descripcion: String, 
        palabrasClave: String, 
        paginaPadre: String,
        estado: Boolean,
        URL: String,
        incluirEncabezado: Boolean,
        piePagina: Boolean,
        menu: Boolean,
        breadcrumb: Boolean,
        tipoUsuario: { type: String, enum: ['administrador', 'usuario_generico'], required: false, default: 'usuario_generico' },
 }
);

const Pagina = mongoose.model('pagina', esquema);
module.exports = Pagina;