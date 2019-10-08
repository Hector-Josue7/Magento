const jwt = require('jsonwebtoken');
const moment = require('moment');
const bcrypt = require('bcryptjs');

module.exports = {
   signToken: (user) => {

      const payload = {
         sub: user._id,
         tipoUsuario: user.tipoUsuario,
         iat: moment().unix(), // Current time
         exp: moment().add(1, 'd').unix() // 1 dia hasta que expire el token
      }

      return { token: jwt.sign(payload, process.env.JWT_SECRET), exp: payload.exp };
   },

   hashPassword: (clave) => {
      return new Promise((resolve, reject) => {
         try {
            // Generar salt
            const salt = bcrypt.genSaltSync(10);
            // Generar password hash (salt + password)
            const passwordHash = bcrypt.hashSync(clave, salt);
            resolve(passwordHash)
         } catch (err) {
            throw new Error(err);
         }
      });
   },

   isValidPassword: (user, clave) => {
      return new Promise((resolve, reject) => {
         try {
            resolve(bcrypt.compare(clave, user.clave));
         } catch (err) {
            throw new Error(err);
         }
      });
   },

   verifyToken: (token) => {
      return new Promise((resolve, reject) => {
         try {
            const payload = jwt.decode(token, process.env.JWT_SECRET);

            if (payload.exp <= moment().unix()) {
               reject({
                  status: 401,
                  message: 'Token ha expirado'
               });
            }
            resolve(payload.sub)

         } catch (err) {
            reject({
               status: 500,
               message: 'Token Inválido'
            });
         }
      });
   },

   verifyAdminToken: (token) => {
      return new Promise((resolve, reject) => {
         try {
            const payload = jwt.decode(token, process.env.JWT_SECRET);

            if (payload.exp <= moment().unix()) {
               reject({
                  status: 401,
                  message: 'Token ha expirado'
               });
            }
        // payload.role 
            if (payload.tipoUsuario !== 'administrador') {
               reject({
                  status: 401,
                  message: 'No tienes permiso de Administrador'
               })
            }
            resolve(payload.sub)

         } catch (err) {
            reject({
               status: 500,
               message: 'Token Inválido'
            });
         }
      });
   }
}