const { body, query, header } = require('express-validator/check');
const { sanitize } = require('express-validator/filter');

const checkErrors = require('../modulos/validation.service');

module.exports = {

   signUp: [
      sanitize('nombre').trim().escape(),
      body('nombre', 'El nombre es requerido').exists(),
      body('nombre', 'El nombre debe entre 2 y 30 caracteres').isLength({ min: 2, max: 30 }),
      sanitize('apellido').trim().escape(),
      body('apellido', 'El apellido es requerido').exists(),
      body('apellido', 'El apellido debe entre 2 y 50 caracteres').isLength({ min: 2, max: 50 }),
      sanitize('usuario').trim().escape(),
      body('usuario', 'El usuario es requerido').exists(),
      body('usuario', 'El usuario debe entre 3 y 50 caracteres').isLength({ min: 3, max: 50 }),
      sanitize('clave').trim().escape(),
      body('clave', 'La contraseña es requerida').exists(),
      body('clave', 'La contraseña debe entre 6 y 30 caracteres').isLength({ min: 6, max: 30 }),
      body('clave', 'La contraseña no puede tener caracteres especiales (solo letras y números)').isAlphanumeric(),
      sanitize('correo').trim().escape(),
      body('correo', 'El email es requerido').exists(),
      body('correo', 'No es un formato de email válido').isEmail(),
      sanitize('tipoUsuario').trim().escape(),
      // body('tipoUsuario', 'No es un rol válido').optional().isIn(['administrador', 'usuario_generico']),
      body('foto').optional(),
      checkErrors
   ],

   signIn: [
      sanitize('usuario').trim().escape(),
      body('usuario', 'El usuario es requerido').exists(),
      sanitize('clave').trim().escape(),
      body('clave', 'La contraseña es requerida').exists(),
      checkErrors
   ],

   refreshToken: [
      header('Authorization', 'Se debe proveer un Token').not().isEmpty(),
      checkErrors
   ],

   checkUsername: [
      query('usuario', 'El Nombre de Usuario es requerido').exists(),
      query('usuario', 'El usuario debe entre 3 y 50 caracteres').isLength({ min: 3, max: 50 }),
      checkErrors
   ],

   checkEmail: [
      query('correo', 'El email es requerido').exists(),
      query('correo', 'No es un formato de email válido').isEmail(),
      checkErrors
   ]

}