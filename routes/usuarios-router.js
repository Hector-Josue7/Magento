
var mongoose = require("mongoose");
const User = require('../models/usuario');
const passport = require('passport');
const Swal = require('sweetalert2');
const router = require('express-promise-router')();


// usar el prefijo /usuarios
module.exports = function(app)
{
     app.get('/usuarios/registro',function(req,res){


        res.render('registro')
     });
app.post('/usuarios/registro',  function(req,res){
            let u = new User({
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                usuario: req.body.usuario,
                correo: req.body.correo,
                clave: req.body.clave,
                gender: req.body.gender,
            birthdate:{
                day: req.body.day,
                month: req.body.month,
                year: req.body.year
            }
            });
      const emailUser = await User.findOne({correo: u.correo});
      if(emailUser) {
      console.log("este email esta repetido")
      res.redirect('/usuarios/registro');
       res.end();
  }else{
        // u.clave = await u.encryptPassword(u.clave);
        u.save()

       .then(obj=>{
           res.send(obj);
        //    res.redirect('/usuarios/login');
       })
       .catch(error=>{
           res.send(obj);
       });


  
    }
});

app.get('/usuarios/login', function(req, res){
    res.render('login');
         });



app.post('/usuarios/login', passport.authenticate('local', {
    successRedirect: '/inicio',
    failureRedirect: '/usuarios/login',
       //     failureFlash: true
}));


app.get('/usuarios/logout', function(req, res){
req.logout();
// req.flash('success_msg', 'You are logged out now.');
res.redirect('usuarios/login');
});







    }
