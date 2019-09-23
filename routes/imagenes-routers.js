var express = require("express");
var router = express.Router();
const fs = require('fs-extra');
const path = require('path');
const md5 = require('md5');
var formidable = require("express-formidable");
const { randomNumber } = require('../modulos/libs');
//const ctrl = {};

var {Imagen} = require('../models');




//router.get('/:id', async function(req,res){
router.get('/images/:image_id', async function(req,res){
    let viewModel = { Imagen: {}, comments: [] };
    const Imagen = await Imagen.findOne({filename: { $regex: req.params.image_id }}); // con esto me trae la imagen
    if (Imagen) {
      Imagen.views = Imagen.views + 1;
      viewModel.Imagen = Imagen;
      Imagen.save();
      const comments = await Comment.find({image_id: Imagen._id})  // se traen los comentarios relacionados con esa imagen
        .sort({'timestamp': 1});
      viewModel.comments = comments;
      viewModel = await sidebar(viewModel);
      // res.render('Imagen', viewModel);
      res.send("Enviar detalle de la imagen: " + req.params.image_id);

    } else {
      // res.redirect('/');
      res.send("Caimos en el else " + req.params.image_id);
    }

    // usuario.find({_id:req.params.id})
    // .then((data)=>{
    //     res.send(data[0]);//Se le pone 0 para que solo envie un json y no un arreglo con un json
    //     res.end();
    // })
    // .catch((error)=>{
    //     res.send(error);
    //     res.end();
    // });
});



router.post("/guardaImagen", function(req, res){
//     var p = new pelicula({
//             nombre: req.body.nombre,
//             descripcion: req.body.descripcion,
//             caratula:req.body.caratula,
//             categoria: {
//                     _id: req.body.categoria,
//                     nombre: req.body.nombreCategoria
//             },
//             calificacion: req.body.calificacion,
//             imagenes: req.body.imagenes,
//             original: req.body.original
//     });

//     console.log(JSON.stringify({
//         nombre: req.body.nombre,
//         descripcion: req.body.descripcion,
//         caratula:req.body.caratula,
//         categoria: {
//                 _id: req.body.categoria,
//                 nombre: req.body.nombreCategoria
//         },
//         calificacion: req.body.calificacion,
//         imagenes: req.body.imagenes,
//         original: req.body.original
// }));

//     p.save()
//     .then(obj=>{
//         res.send(obj);
//     })
//     .catch(error=>{
//         res.send(obj);
//     });

const saveImage = async () => {
    const imgUrl = randomNumber(); // nos devuelve un string con numeros y letras aleatorio
    const images = await Imagen.find({ filename: imgUrl });
    if (images.length > 0) {  // compruena que no envien imagenes repetidas
      saveImage()
    } else {
      // Imagen Location
      const imageTempPath = req.file.path;
      const ext = path.extname(req.file.originalname).toLowerCase();
      // const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);
    //   const targetPath = path.resolve(`public/upload/${imgUrl}${ext}`);
    const targetPath = path.resolve(`public/img/cargaImagenes/${imgUrl}${ext}`);
    // app.use(multer({dest: path.join(__dirname, './public/img/cargaImagenes/temp')}).single('Imagen'));
      // Validate Extension
      if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
        // you wil need the public/temp path or this will throw an error
        await fs.rename(imageTempPath, targetPath);  // aqui se mueven archivos
        const newImg = new Imagen({
          titulo: req.body.titulo,
          filename: imgUrl + ext,
          description: req.body.description
        });
        console.log(JSON.stringify({
          titulo: req.body.titulo,
          filename: imgUrl + ext,
          description: req.body.description
        }));
        const imageSaved = await newImg.save();
        res.redirect('/images/' + imageSaved.uniqueId);
      } else {
        await fs.unlink(imageTempPath);  // se elimina el archivo del servidor
        res.status(500).json({ error: 'Only Images are allowed' });
      }
    }
  };

  saveImage();
});


module.exports = router;

//**************************************************************************************
// const express = require('express');
// const router = express.Router();
// const home = require('../controllers/home');
// const Imagen = require('../controllers/Imagen');

// module.exports = app => {

//   router.get('/', home.index);
//   router.get('/images/:image_id', Imagen.index);
//   router.post('/images', Imagen.create);
//   router.post('/images/:image_id/like', Imagen.like);
//   router.post('/images/:image_id/comment', Imagen.comment);
//   router.delete('/images/:image_id', Imagen.remove);

//   app.use(router);

// };
//******************************************************************************************** *

// 
// 

//

// 

// const sidebar = require('../helpers/sidebar');
// 


// ctrl.index = async (req, res) => {
//   let viewModel = { Imagen: {}, comments: [] };
//   const Imagen = await Imagen.findOne({filename: { $regex: req.params.image_id }}); // con esto me trae la imagen
//   if (Imagen) {
//     Imagen.views = Imagen.views + 1;
//     viewModel.Imagen = Imagen;
//     Imagen.save();
//     const comments = await Comment.find({image_id: Imagen._id})  // se traen los comentarios relacionados con esa imagen
//       .sort({'timestamp': 1});
//     viewModel.comments = comments;
//     viewModel = await sidebar(viewModel);
//     res.render('Imagen', viewModel);
//   } else {
//     res.redirect('/');
//   }
// };

// ctrl.create = (req, res) => {
//   const saveImage = async () => {
//     const imgUrl = randomNumber(); // nos devuelve un string con numeros y letras aleatorio
//     const images = await Imagen.find({ filename: imgUrl });
//     if (images.length > 0) {  // compruena que no envien imagenes repetidas
//       saveImage()
//     } else {
//       // Imagen Location
//       const imageTempPath = req.file.path;
//       const ext = path.extname(req.file.originalname).toLowerCase();
//       // const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);
//       const targetPath = path.resolve(`public/upload/${imgUrl}${ext}`);
//       // Validate Extension
//       if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
//         // you wil need the public/temp path or this will throw an error
//         await fs.rename(imageTempPath, targetPath);  // aqui se mueven archivos
//         const newImg = new Imagen({
//           title: req.body.title,
//           filename: imgUrl + ext,
//           description: req.body.description
//         });
//         const imageSaved = await newImg.save();
//         res.redirect('/images/' + imageSaved.uniqueId);
//       } else {
//         await fs.unlink(imageTempPath);  // se elimina el archivo del servidor
//         res.status(500).json({ error: 'Only Images are allowed' });
//       }
//     }
//   };

//   saveImage();
// };

// ctrl.like = async (req, res) => {
//   const Imagen = await Imagen.findOne({filename: {$regex: req.params.image_id}});
//   console.log(Imagen)
//   if (Imagen) {
//     Imagen.likes = Imagen.likes + 1;
//     await Imagen.save();
//     res.json({likes: Imagen.likes}) // el total de los likes
//   } else {
//     res.status(500).json({error: 'Internal Error'});
//   }
// };

// ctrl.comment= async (req, res) => {
//   const Imagen = await Imagen.findOne({filename: {$regex: req.params.image_id}});
//   if (Imagen) {  // si la imagen existe se le va a poder hacer un comentario
//     const newComment = new Comment(req.body);
//     newComment.gravatar = md5(newComment.email);
//     newComment.image_id = Imagen._id;
//     await newComment.save();
//     res.redirect('/images/' + Imagen.uniqueId + '#' + newComment._id);
//   } else {
//     res.redirect('/');
//   }
// };

// ctrl.remove = async (req, res) => {
//   const Imagen = await Imagen.findOne({filename: {$regex: req.params.image_id}});  // con esto encuentro el id
//   if (Imagen) {
//     // await fs.unlink(path.resolve('./src/public/upload/' + Imagen.filename));
//     await fs.unlink(path.resolve('./public/upload/' + Imagen.filename)); // unlink remueve un dato a partir de una direccion que yo le de
//     await Comment.deleteOne({image_id: Imagen._id});  // quiero eliminar los comentarios de esa imagen
//     await Imagen.remove();  // se eliminan los datos de esa imagen
//     res.json(true);
//   } else {
//     res.json({response: 'Bad Request.'})
//   }
// };

// module.exports = ctrl;

