var express = require('express');
var bodyParser = require("body-parser");
var  mongoose = require("mongoose");
const fs = require('fs-extra');
const path = require('path');
var session = require("express-session");
var multer = require('multer');
var upload = multer({dest: './public/img/cargaImagenes/temp/'});
var uploadPaginaPrincipal = multer({dest: './public/img/paginaPrincipal/temp/'});

var  lodash = require('lodash');
var bcrypt = require('bcryptjs');


// const { imagenes, usuario, paginaPrincipal } = require('../models');
var usuario = require('../models/usuario');
 var tipousuario = require('../models/tipousuario');
 var paginaEstatica =require('../models/paginaestatica');
// var objImagen = require('../models/Imagenes');
module.exports = function(app)
{
// registro de usuarios
app.post('/registro',  function(req, res ){ // http://localhost:3000/registro     (2) 
let user =  usuario.findOne({ correo: req.body.correo });
  if (user) {
    return res.status(400).send('Ya existe un usuario registrado con ese correo');
    
 //res.status(200).redirect('/registro');



 //   var p = new pelicula({
//           nombre: req.body.nombre,
//           descripcion: req.body.descripcion,
//           caratula:req.body.caratula,
//           categoria: {
//                   _id: req.body.categoria,
//                   nombre: req.body.nombreCategoria
//           },
//           calificacion: req.body.calificacion,
//           imagenes: req.body.imagenes,
//           original: req.body.original
//   });

    } else {
     user = new usuario({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        usuario: req.body.usuario,
        correo: req.body.correo,
        clave: req.body.clave,
     //   foto: '../public/img/team/ac_generico.jpg',
        gender: req.body.gender,
        birthdate:{
        day: req.body.day,
        month: req.body.month,
        year: req.body.year
     },
     tipoUsuario: {

_id: req.body.tipoUsuario,
// _id: req.body.nombreTipoUsuario,
nombreTipoUsuario: req.body.nombreTipoUsuario

     }


  });


   const salt =  bcrypt.genSalt(10);
   user.clave = bcrypt.hash(user.clave, salt);
   console.log(JSON.stringify({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    usuario: req.body.usuario,
    correo: req.body.correo,
    clave: req.body.clave,
   // foto: '../public/img/team/ac_generico.jpg',
    gender: req.body.gender,
    birthdate:{
    day: req.body.day,
    month: req.body.month,
    year: req.body.year
 },
 tipoUsuario: {

_id: req.body.tipoUsuario,

nombreTipoUsuario: req.body.nombreTipoUsuario
  // `<option value="${res[i]._id}">${res[i].nombre}</option>`
  // categoria: {
    //                   _id: req.body.categoria,
    //                   nombre: req.body.nombreCategoria
    //           },
   
 }
//  tipoUsuario: req.body.slcTipoUsuario
//  ,tarjeta:{
  //                   tipo:req.body.tipoTarjeta,
  //                   numero:req.body.numeroTarjeta,
  //                   ccv:req.body.ccvTarjeta,
  //                   propietario:req.body.propietario,
  //                   mesExpiracion:req.body.mes,
  //                   anioExpiracion:req.body.anio,
  //               },

} ));

   user.save()
   .then( objeto =>{


res.send(objeto);
res.end();
   })
   .catch(error=>{
          res.send(error);
      });
  //  res.send(lodash.pick(user, ['_id', 'nombre', 'correo']));

 }
});


// verificacion de login****************************************************************************************************************************************************
//app.post('/login/:correo', async function(req, res){
app.post('/login', async function(req, res){ // http://localhost:3000/login     (3)
//let user = await Usuario.findOne({ correo: req.params.correo });
let user = await Usuario.findOne({ correo: req.body.correo });  //encuentre al usuario por su dirección de correo electrónico
if (!user) {
    return res.status(400).send('Credenciales invalidas');
}
const validPassword = await bcrypt.compare(req.body.clave, user.clave);
if (!validPassword) {
    return res.status(400).send('Credenciales invalidas');
}
// const token = jwt.sign({ _id: user._id }, 'PrivateKey');
 req.session.correoUsuario = req.params.correo;    // se desea establecer algunas variables de sesion
 req.session.codigoUsuario = user._id;
 req.session.codigoTipoUsuario = user.tipoUsuario;
// res.redirect(`/${user._id}/inicio`);
res.status(200).redirect('/home');
});


// app.get('/obtener-sesion',function(req, res){
//     res.send({correo:req.session.correo});
// });
// subida de imagenes****************************************************************************************************************************************************************
app.post('/subirfoto', upload.array('image', 1), function(req, res) {  // http://localhost:3000/subirfoto
    for(var x=0;x<req.files.length;x++) {
        fs.createReadStream('./public/img/cargaImagenes/temp/'+req.files[x].filename).pipe(fs.createWriteStream('./public/img/cargaImagenes/'+req.files[x].originalname)); //copiamos el archivo a la carpeta definitiva de fotos
        fs.unlink('./public/img/cargaImagenes/temp/'+req.files[x].filename); //borramos el archivo temporal creado
        const newImg = new Imagen({
         title: req.body.title,
         filename: req.files[x].originalname,
         description: req.body.description
       });
       newImg.save((err, foto_guardada) =>{
        if(err) {res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})}
        else{
      res.status(200).redirect('/galeriaimagenes') }
   });
}
});


app.post('/paginaestatica' ,  function(req, res) {  // http://localhost:3000/paginaestatica      seria recomendable reescribir la ruta cuando se loguee el usuario asi http://localhost:3000/:id_usuario/paginaPrincipal

//    for(var x=0;x<req.files.length;x++) {
//       fs.createReadStream('./public/img/paginaPrincipal/temp/'+req.files[x].filename).pipe(fs.createWriteStream('./public/img/paginaPrincipal/'+req.files[x].originalname)); //copiamos el archivo a la carpeta definitiva de fotos
//       fs.unlink('./public/img/paginaPrincipal/temp/'+req.files[x].filename); //borramos el archivo temporal creado
//       const newPaginaPrincipal = new paginaEstatica({
//          editorEncabezado: req.body.editorEncabezado,
//          editorPagina: req.body.editorPagina,
//          editorPiePagina: req.body.editorPiePagina,
//          tituloPagina: req.body.tituloPagina,
//          descripcionPagina: req.body. descripcionPagina,
//           logoPagina: req.files[x].originalname,
//           palabrasClave: req.body.palabrasClave,
//           editorCss: req.body.editorCss,
//           editorJs: req.body.editorJs
// });
//      newPaginaPrincipal.save((err, pagina_guardada) =>{
//       if(err) {res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})}
//       else{
//    // res.status(200).redirect('/galeriaimagenes') 
// console.log('Se ha guardado la pagina principal')
// }});

// }
let newPaginaPrincipal = new paginaPrincipal({
          editorEncabezado: req.body.editorEncabezado,
          editorPagina: req.body.editorPagina,
          editorPiePagina: req.body.editorPiePagina,
          tituloPagina: req.body.tituloPagina,
          descripcionPagina: req.body. descripcionPagina,
          palabrasClave: req.body.palabrasClave,
          editorCss: req.body.editorCss,
          editorJs: req.body.editorJs
   }); 
   newPaginaPrincipal.save()
      .then(function(obj){
         res.send(obj);
         res.end();
     })
     .catch(function(error){
         res.send(error);
         res.end();
     });

});
// guardar pagina estatica
app.post('/paginaestatica/guardaPagina', function(req, res){ // http://localhost/paginaestatica/guardaPagina



        let newPaginaEstatica = new paginaEstatica({tituloPaginaEstatica: req.body.tituloPaginaEstatica}); 
    
        //Promesa
        newPaginaEstatica.save()
        .then(function(obj){
            res.send(obj);
            res.end();
        })
        .catch(function(error){
            res.send(error);
            res.end();
        });
    });
//FIN
}








 
        
