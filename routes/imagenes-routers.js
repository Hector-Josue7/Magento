 const fs = require('fs-extra');
 const path = require('path');
 var express = require('express');
 var multer = require('multer');

const md5 = require('md5');
const { Imagen } = require('../models');
var upload = multer({dest: './public/img/cargaImagenes/temp/'});

module.exports = function(app)
{
    




  // el numero 1 indica la cantidad de archivos que llegaran
  app.post('/:idUsuario/subirfoto', upload.array('image', 1), function(req, res) {
    for(var x=0;x<req.files.length;x++) {
         //copiamos el archivo a la carpeta definitiva de fotos
        fs.createReadStream('./public/img/cargaImagenes/temp/'+req.files[x].filename).pipe(fs.createWriteStream('./public/img/cargaImagenes/'+req.files[x].originalname)); 
        //borramos el archivo temporal creado
        fs.unlink('./public/img/cargaImagenes/temp/'+req.files[x].filename); 
     
     
        const newImg = new Imagen({
         title: req.body.title,
        filename: req.files[x].originalname,
         description: req.body.description
       });

       const imageSaved =  newImg.save();
      }
         //  res.redirect('elegirArchivo');
         res.redirect('/galeriaimagenes');


   });


   // const newNote = new Note({title, description});
   //  newNote.user = req.user.id;
   //  await newNote.save();



app.get('/galeriaimagenes', function (req, res){
   res.render ('galeriaImagenes');

    });





//     router.post('/:idUsuario/posts/',function(req,res){
//       usuario.update(
//           {
//               _id:mongoose.Types.ObjectId(req.params.idUsuario)
//           },
//           {
//               $push:{
//                   posts:{
//                       _id:mongoose.Types.ObjectId(),
//                       contenidoPost:req.body.contenidoPost,
//                       urlImagen:req.body.imagen,
//                       likes:[],
//                       comentarios:[]
//                   }
//               }
//           }
//       ).then((data)=>{
//           res.send(data);
//           res.end();
//       })
//       .catch((error)=>{
//           res.send(error);
//           res.end();
//       });
//   });


//     router.post('/:idUsuario/posts/',function(req,res){
//       usuario.update(
//           {
//               _id:mongoose.Types.ObjectId(req.params.idUsuario)
//           },
//           {
//               $push:{
//                   posts:{
//                       _id:mongoose.Types.ObjectId(),
//                       contenidoPost:req.body.contenidoPost,
//                       urlImagen:req.body.imagen,
//                       likes:[],
//                       comentarios:[]
//                   }
//               }
//           }
//       ).then((data)=>{
//           res.send(data);
//           res.end();
//       })
//       .catch((error)=>{
//           res.send(error);
//           res.end();
//       });
//   });


   //  


//    router.get('/:id/seguidores',function(req,res){
//       usuario.aggregate([
//           {
//               $lookup:{
//                   from:"usuarios",
//                   localField:"seguidores",
//                   foreignField:"_id", //Es decir el atributo de la coleccion con la que se va a relacinar, en este caso, coleccion2,
//                   as:"seguidores"
//               }
//           },
//           {
//               $match:{
//                   _id:mongoose.Types.ObjectId(req.params.id)
//               }
//           },
//           {
//               $project:{
//                   _id:true,
//                   nombre:true,
//                   imagen:true,
//                   "seguidores._id":true,
//                   "seguidores.nombre":true,
//                   "seguidores.imagen":true
//               }
//           }
//       ])
//       .then((data)=>{
//           res.send(data[0]);
//           res.end();
//       })
//       .catch((error)=>{
//           res.send(error);
//           res.end();
//       });
//   });



}
