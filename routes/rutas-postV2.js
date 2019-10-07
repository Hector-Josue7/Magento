

const express = require('express');
const path = require('path');
const fs = require('fs');
const router = require('express').Router();
const userValidators = require('../validators/user.validators');
const authMiddleware = require('../modulos/middleware');
const { Usuario } = require('../models');
const authService = require('../modulos/autenticacion');
const fileUploadService = require('../modulos/subir_archivo');
//const UsersController = require('../controllers/users.controller');

module.exports = app => {
    // Faltaria un endpoint para traer las imagenes de los usuarios
   // por su id, no solo la imagen del user q esta logeado.
   // Para mostrarlas en la info de los post, comments y rankings.
   /*====================================
   Obtener la imagen del usuario logeado
   ====================================*/
    router.get('/image', userValidators.getImageLoggedUser, authMiddleware.isAuth,  async (req, res) => {
         try {
         // Como es una ruta con autenticacion el usuario ya viene
         // en el token, no necesito pasar el userId por params
         // ni validar que el usuario exista
         const user = await Usuario.findById(req.body.userId).exec();
         res.sendFile(path.resolve(user.foto));
         } catch (err) {
         console.error(err);
         res.status(500).json({ msg: 'Error al obtener la imagen del usuario', error: err });
      }
});
router.patch('/', userValidators.updateUserImage, authMiddleware.isAuth, async (req, res) => {
        try {
         // Valido que venga la imagen
         if (!req.files) {
            return res.status(422).json({ msg: 'La imagen es requerida' });
         }
         // Busco el usuario que viene en el token, seguro existe
         const user = await Usuario.findById(req.body.userId).exec();
         // Elimino la imagen anterior
         if (fs.existsSync(user.foto) && user.foto !== '../public/img/team/ac_generico.jpg') {
            // Ya tiene una imagen de usuario anterior
            fs.unlinkSync(user.foto);
         }
         // Si viene la imagen espero hasta subirla y recibir el path (lo q se guarda en la db)
         const imagePath = await fileUploadService.uploadFile(req.files.image, user.usuario);
         user.foto = imagePath;
         // Persisto
         await user.save();
         res.sendFile(path.resolve(user.foto));
         } catch (err) {
         console.error(err);
         if (err.status) {
            res.status(err.status).json({ error: err.msg });
         } else {
            res.status(500).json({ msg: 'Error al actualizar la imagen de usuario', error: err });
         }
      }
   });
   /*============================
   Actualizar contraseña del user, Cambiar la contraseña
   ============================*/
router.patch('/changePassword', userValidators.changePassword, authMiddleware.isAuth, async (req, res) => {
         try {
         // El user viene del token, seguro existe
         const user = await Usuario.findById(req.body.userId).exec();
         if (req.body.currentlyPassword === req.body.newPassword) {  // contraseña actual = currentlyPassword
            return res.status(422).json({ msg: 'Tu nueva contraseña debe ser distinta a la actual' });
         }
         const isMatch = await authService.isValidPassword(user, req.body.currentlyPassword);
         if (!isMatch) {
            return res.status(422).json({ msg: 'Has ingresado una contraseña que no coincide con su contraseña actual' });
         }
         const hashedNewPassword = await authService.hashPassword(req.body.newPassword); // ha ocultado la nueva contraseña = hashedNewPassword
         user.clave = hashedNewPassword;
         await user.save();
         res.status(200).json({ msg: 'Has actualizado tu contraseña, pruebala cuando vuelvas a logear' });
         } catch (err) {
         console.error(err);
         res.status(500).json({ msg: 'Error al acutalizar la contraseña del usuario', error: err });
      }
   });
   
 app.use(router);
}

// TODO
   /*===========================
   Obtener todos los usuarios
   ===========================*/
   // getAllUsers: async (req, res) => {

   // },

   // TODO
   /*===========================
   Obtener usuario por su Id
   ===========================*/
   // getUserById: async (req, res) => {

   // },

   // TODO
   /*================================
   Obtener imagen de usuario por user
   =================================*/
   // getImageByUser: async (req, res) => {

   // },
// // Obtener imagen de perfil del usuario logeado

   /*==================================
   Actualizar imagen de perfil del user
   ===================================*/
