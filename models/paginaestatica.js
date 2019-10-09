var mongoose = require("mongoose");
const { Schema } = mongoose;

var esquema = new Schema(
    {
        tituloPaginaEstatica: String,
        menu: {_id: Schema.Types.ObjectId, 
                enlaceFijo: String,
                estilosCss: String }, // Tendrá que indicar los estilos css del menú o tomarlos directamente del css principal del sitio.
            // estilosCss: Array },
        descripcion: String, 
        palabrasClave: String, 
        paginaPadre: String,
        estado: Boolean,
        URL: String,
        incluirEncabezado: Boolean,
        piePagina: Boolean,
        menu: Boolean,
        breadcrumb: Boolean,
        editor_html_wysiwyg: String,
        shortcuts: Array,
        idCreador : {type: Schema.Types.ObjectId,
                    ref: 'usuario',required: true},

    });

var paginaEstatica = mongoose.model('paginaEstatica', esquema);
module.exports = paginaEstatica;


// Los menús serán componentes independientes que se podrán incrustar vía shortcut.
// Al momento de crear un menú se mostrará el id correspondiente, luego se 
// podrán agregar las opciones del menú, las opciones podrán ser una pagina de
//  la lista de paginas creadas o un enlace fijo el cual tendrá que indicar.