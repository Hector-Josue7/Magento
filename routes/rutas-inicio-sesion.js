
const router = require('express').Router();
const authValidators = require('../validators/auth.validators');
const authMiddleware = require('../modulos/middleware');
const {Usuario} = require('../models');
const authService = require('../modulos/autenticacion');
// const authController = require('../controllers/auth.controller');

module.exports = app => {
  /*=====================
   Crear una cuenta nueva
   =====================*/
router.post('/registro', authValidators.signUp, async (req, res) => { // http://localhost:3000/registro

      try {
         // Corro las 2 promesas en paralelo y espero q terminen ambas
         const [sameEmailUser, sameUsernameUser] = await Promise.all([
            Usuario.findOne({ correo: req.body.correo.toLowerCase() }).exec(),
            Usuario.findOne({ usuario: req.body.usuario }).exec()
         ]);

         // Valido que el email y el username no esten en uso
         if (sameEmailUser) {
            return res.status(422).json({ msg: 'El email está en uso' });
         }
         if (sameUsernameUser) {
            return res.status(422).json({ msg: 'El nombre de usuario está en uso' });
         }

         const hashedPassword = await authService.hashPassword(req.body.clave);

         // Espero para q se cree el nuevo usuario
         const user = await new Usuario({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
          usuario: req.body.usuario,
          correo: req.body.correo.toLowerCase(),
            clave: hashedPassword,
           gender: req.body.gender,
           birthdate:{
            day: req.body.day,
            month: req.body.month,
            year: req.body.year
         },
           // tipoUsuario: req.body.tipoUsuario
         });

     
         // Corro las 2 promesas en paralelo y espero a q terminen ambas
         const [newUser, tokenInfo] = await Promise.all([
            user.save(),
            authService.signToken(user)
         ]);

         res.status(201).json({
            msg: 'Usuario creado',
            user: {
               nombre: newUser.nombre,
               apellido: newUser.apellido,
               usuario: newUser.usuario,
               correo: newUser.correo
            },
            tokenInfo
         });

      } catch (err) {
         console.error(err);
         res.status(500).json({ msg: 'Error al crear usuario', error: err });
      }

   } );

/*===============
   Login de usuario
   ===============*/
router.post('/signIn', authValidators.signIn, async (req, res) => {

      try {
         // Espero hasta encontrar el usuario
         const user = await User.findOne({ username: req.body.username }).exec();

         if (!user) {
            return res.status(401).json({ msg: 'Nombre de usuario y/o contraseña incorrectos' });
         }

         // Espero hasta validar la password
         const isMatch = await authService.isValidPassword(user, req.body.password);

         if (!isMatch) {
            return res.status(401).json({ msg: 'Nombre de usuario y/o contraseña incorrectos' });
         }

         // Espero hasta generar el token
         const tokenInfo = await authService.signToken(user);

         res.status(200).json({
            msg: 'Login satisfactorio',
            user: {
               name: user.name,
               lastname: user.lastname,
               username: user.username,
               email: user.email
            },
            tokenInfo
         });

      } catch (err) {
         console.error(err);
         res.status(500).json({ msg: 'Error al iniciar sesión', error: err });
      }

   }
);

/*===============
   Refrescar Token
   ===============*/
router.get('/refreshToken', authValidators.refreshToken, authMiddleware.isAuth,  async (req, res) => {

      try {
         const user = await User.findById(req.body.userId).exec();

         const tokenInfo = await authService.signToken(user);

         res.status(200).json({
            msg: 'Token refrescado',
            user: {
               name: user.name,
               lastname: user.lastname,
               username: user.username,
               email: user.email
            },
            tokenInfo
         });

      } catch (err) {
         console.error(err);
         res.status(500).json({ msg: 'Error al refrescar el token', error: err });
      }

   });
/*==================
   Chequea el Username
   ===================*/
// Consultar disponibilidad de nombre de usuario
router.get('/checkUsername', authValidators.checkUsername, async (req, res) => {

      try {
         // Espero hasta encontrar (o no) al usuario
         const sameUsernameUser = await User.findOne({ username: req.query.username }).exec()

         if (sameUsernameUser) {
            return res.status(200).json({ isUsernameAvailable: false, msg: 'El nombre de usuario está en uso' });
         } else if (!sameUsernameUser) {
            return res.status(200).json({ isUsernameAvailable: true, msg: 'El nombre de usario está disponible' });
         }

      } catch (err) {
         console.error(err);
         res.status(500).json({ msg: 'Error al buscar disponibilidad de nombre de usuario', error: err });
      }

   } );
/*================
   Chequea el Email, Consultar disponibilidad de email
   =================*/
router.get('/checkEmail', authValidators.checkEmail, async (req, res) => {

      try {
         // Espero hasta encontrar (o no) al usuario
         const sameEmailUser = await User.findOne({ email: req.query.email }).exec()

         if (sameEmailUser) {
            return res.status(200).json({ isEmailAvailable: false, msg: 'El email está en uso' });
         } else if (!sameEmailUser) {
            return res.status(200).json({ isEmailAvailable: true, msg: 'El email está disponible' });
         }

      } catch (err) {
         console.error(err);
         res.status(500).json({ msg: 'Error al buscar disponibilidad de nombre de usuario', error: err });
      }

   });

app.use(router);
}











