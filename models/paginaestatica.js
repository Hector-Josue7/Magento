var mongoose = require("mongoose");
const { Schema } = mongoose;

var esquema = new Schema(
    {
        tituloPaginaEstatica: { type: String, required: true, minlength: 3 },
        menu:[{_id: Schema.Types.ObjectId, tituloMenu: String, enlaceFijo: String, estilosCss: String, estilosCss: Array}],
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
        // idCreador : {type: Schema.Types.ObjectId,
        //             ref: 'usuario',required: true},

    idUsuarioAdmin: {  // se hace un cruce con la tabla de usuarios, el cual accede al atributo tipousuario, y se extrae el nombre para saber si es un administrador
        type: Schema.Types.ObjectId,
        ref: 'usuarios',
        required: true,
        "tipoUsuario.nombreTipoUsuario": String
    }

    });

    module.exports = mongoose.model('pagina_estaticas',esquema);


// Los menús serán componentes independientes que se podrán incrustar vía shortcut.
// Al momento de crear un menú se mostrará el id correspondiente, luego se 
// podrán agregar las opciones del menú, las opciones podrán ser una pagina de
//  la lista de paginas creadas o un enlace fijo el cual tendrá que indicar.