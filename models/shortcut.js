var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {


  enlacesDescargaArchivos:{
        _id: mongoose.Schema.Types.ObjectId,
        titulo: String
  },
  post: String,
  imagen: String,
  Menu: String,  // serán componentes independientes que se podran incrustar via shortcut
  Breadcrumb: {

  }

} );

module.exports = mongoose.model('shortcuts',esquema);



// var mongoose = require("mongoose");

// var esquema = new mongoose.Schema(
//     {
       
//         nombre : String,
//         codigo : String,
//         tipo: {
//             _id: mongoose.Schema.Types.ObjectId,
//             nombre: String,
//             extension:String,
//             icono:String
//         },
//         idCreador:mongoose.Schema.Types.ObjectId,
//         fechaCreacion : Date,
//         ultimaModificacion : Date,
//         idCarpeta :String,
//         colaboradores:Array
// }

// );

// module.exports = mongoose.model('snippets',esquema);