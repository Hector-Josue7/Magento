const express = require('express')
//const productCtrl = require('../controladores/product')
const router = express.Router()

// RUTA INICIAL PRINCIPAL
router.get('/', (req, res) => {
  res.render('index');

});


//RUTAS PARA IMAGENES
router.get('/imagenes') // ruta para devolver todas las imagenes
router.get('/imagenes/:imagenId') // ruta para obtener una imagen
router.post('/imagenes') // ruta para insertar una imagen
//router.post('/images/:imagenId/like') // ruta para dar like a una imagen
//router.post('/imagenes/:imagenId/comment') // ruta para insertar un comentario en una imagen
router.delete('/imagenes/:imagenId') // ruta para eliminar una imagen especifica

// RUTAS PARA VIDEOS
router.get('/videos') // ruta para devolver todos los videos
router.get('/videos/:videoId') // ruta para devolver solo un video
router.post('/videos') // ruta para insertar un video
//router.post('/videos/:videoId/like') // ruta para dar like a un video
//router.post('/videos/:videoId/comment') // ruta para insertar un comentario en un video
router.delete('/videos/: videoId')  // ruta para eliminar un video

//RUTAS PARA ARCHIVOS GENERICOS
router.get('/archivos') // ruta para devolver todos los videos
router.get('/archivos/:archivoId') // ruta para devolver solo un video
router.post('/archivos') // ruta para insertar un video


router.get('/admin') // ruta para devolver administradores  http://localhost:3000/admin





module.exports = router


// router.get('/product', productCtrl.getProducts)
// router.get('/product/:productId', productCtrl.getProduct)  // http://localhost:3000/product
// router.post('/product', productCtrl.saveProduct)
// router.put('/product/:productId', productCtrl.updateProduct)
// router.delete('/product/:productId', productCtrl.deleteProduct)

// el punto de acceso para administradores sera http>://dominio:puerto/admin