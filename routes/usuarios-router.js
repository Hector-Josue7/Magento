const User = require('../models/usuario');
const passport = require('passport');

module.exports = function(app)
{
     app.get('/usuarios/registro',function(req,res){


        res.render('registro.html')
     });
    app.post('/usuarios/registro', function(req,res){

    
      let u = new User({
                Nombre:req.body.Nombre,
                Apellido:req.body.Apellido,
                Usuario: req.body.Usuario,
                Correo:req.body.Correo,
                Clave:req.body.Clave,
                birthdate:{
                    day:req.body.day,
                    month:req.body.month,
                    year:req.body.year
                },
                gender:req.body.gender
            });
      
           u.save() 
           .then(function(obj){
                   res.send(obj);
                   res.end();
               })
               .catch(function(error){
                   res.send(error);
                   res.end();
               });
    });
}


//Guardar un usuario
// router.post('/',function(req,res){
//    let u = new usuario({
//        firstName:req.body.firstName,
//        lastName:req.body.lastName,
//        email:req.body.email,
//        password:req.body.password,
//        birthdate:{
//            day:req.body.day,
//            month:req.body.month,
//            year:req.body.year
//        },
//        gender:req.body.gender
//    }); 

//    //Promesa
//    u.save()
//    .then(function(obj){
//        res.send(obj);
//        res.end();
//    })
//    .catch(function(error){
//        res.send(error);
//        res.end();
//    });
// });


// // Models
// const User = require('../models/User');

// router.get('/users/signup', (req, res) => {
//   res.render('users/signup');
// });

// router.post('/users/signup', async (req, res) => {
//   let errors = [];
//   const { name, email, password, confirm_password } = req.body;
//   if(password != confirm_password) {
//     errors.push({text: 'Passwords do not match.'});
//   }
//   if(password.length < 4) {
//     errors.push({text: 'Passwords must be at least 4 characters.'})
//   }
//   if(errors.length > 0){
//     res.render('users/signup', {errors, name, email, password, confirm_password});
//   } else {
//     // Look for email coincidence
//     const emailUser = await User.findOne({email: email});
//     if(emailUser) {
//       req.flash('error_msg', 'The Email is already in use.');
//       res.redirect('/users/signup');
//     } else {
//       // Saving a New User
//       const newUser = new User({name, email, password});
//       newUser.password = await newUser.encryptPassword(password);
//       await newUser.save();
//       req.flash('success_msg', 'You are registered.');
//       res.redirect('/users/signin');
//     }
//   }
// });





// var mongoose = require("mongoose");
// const { Schema } = mongoose;
// const bcrypt = require('bcryptjs');

// var UserSchema  = new Schema(
//     {
       
//         nombre :  { type: String, required: true },
//         apellido :  { type: String, required: true },
//         usuario :  { type: String, required: true },
//         correo : { type: String, required: true },
//         clave :  { type: String, required: true },
//         foto : String,
//         genero:String,
//         idTipoUsuario: mongoose.Schema.Types.ObjectId,
//         fechaNacimiento:Date,
//         fechaRegistro: {type: Date, default: Date.now},
//         } );

// UserSchema.methods.encryptPassword = async (clave) => {
//         const salt = await bcrypt.genSalt(10);
//         const hash = await bcrypt.hash(clave, salt);
//         return hash;
//       };
      
//       UserSchema.methods.matchPassword = async function (clave) {
//         return await bcrypt.compare(clave, this.clave);
//       };

// module.exports = mongoose.model('usuarios', UserSchema );