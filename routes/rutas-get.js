var express = require('express');
var bodyParser = require("body-parser");
var multer = require('multer');
var bcrypt = require('bcryptjs');


// const { imagen, usuario, tipousuario } = require('../models');
var upload = multer({dest: './public/img/cargaImagenes/temp/'});

var usuario = require('../models/usuario');
var tipoUsuario = require('../models/tipousuario');
var paginaEstatica = require('../models/paginaestatica');
module.exports = function(app)
{
     app.get('/',function(req,res){ // http://localhost:3000/       (1)
        res.render('index')
     });
     
     app.get('/registro',function(req, res){  // http://localhost:3000/registro   (2) 
       res.render('registro');
      });
    app.get('/login', function(req, res, next){   // http://localhost:3000/login     (3)
        res.render('login');
       });
    app.get(`/home`,  function (req, res, next) { // http://localhost:3000/home     (4)
           if(typeof req.session.correoUsuario!='undefined'){
               res.render('home',{ Nombre:req.session.correoUsuario});
            }else{
             res.render('home',{Nombre:'la variable no existe'});
            }
    });

  

app.get('/logout',async function (req, res, next) {  // http://localhost:3000/logout       se destruye la sesion actual
   // req.logout();  
   req.session.destroy(); 
    res.redirect("/login");
   });
  
// LAS RUTAS SIGUIENTES SON PRIVADAS

app.get('/elegirarchivo', function(req,res){ // http://localhost:3000/elegirarchivo    
  res.render('elegirArchivo');
});


app.get('/galeriaimagenes', function(req,res){ // http://localhost:3000/galeriaimagenes
  res.render('galeriaImagenes');
});
  
  app.get('/edicionpagina', function(req,res){ // http://localhost:3000/edicionpagina
    res.render('edicionPagina');
  });

  app.get('/creacionroles', function(req,res){ // http://localhost:3000/creacionroles
    res.render('creacionRoles');
  });


  app.get('/creacionusuarios', function(req,res){ // http://localhost:3000/creacionusuarios
    res.render('creacionUsuarios');
  });

  app.get('/edicionpagina', function(req,res){ // http://localhost:3000/edicionpagina
    res.render('edicionPagina');
  });

  app.get('/eleccionpagina', function(req,res){ // http://localhost:3000/eleccionpagina
    res.render('eleccionPagina');
  });
 
  app.get('/galeriaarchivos', function(req,res){ // http://localhost:3000/galeriaarchivos
    res.render('galeriaArchivos');
  });
  

  app.get('/galeriavideos', function(req,res){ // http://localhost:3000/galeriavideos
    res.render('galeriaVideos');
  });

  app.get('/listapaginaestatica', function(req,res){ // http://localhost:3000/listapaginaestatica
    res.render('listaPaginaEstatica');
  });
  app.get('/listapaginapost', function(req,res){ // http://localhost:3000/listapaginapost
    res.render('listaPaginaPost');
  });

  app.get('/paginaestaticadashboard', function(req,res){ // http://localhost:3000/paginaestaticadashboard
    res.render('paginaEstaticaDashboard');
  });
  app.get('/paginapostdashboard', function(req,res){ // http://localhost:3000/paginapostdashboard
    res.render('paginaPostDashboard');
  });

  app.get('/perfilarchivo', function(req,res){ // http://localhost:3000/perfilarchivo
    res.render('perfilArchivo');
  });
  app.get('/perfilimagen', function(req,res){ // http://localhost:3000/perfilimagen
    res.render('perfilImagen');
  });
  app.get('/perfilvideo', function(req,res){ // http://localhost:3000/perfilvideo
    res.render('perfilVideo');
  });
  app.get('/plantillas', function(req,res){ // http://localhost:3000/plantillas
    res.render('plantillas');
  });


  // peticion para obtener tipos de usuario 

  
// app.get("/i",function(req,res){ // http://localhost:3000/i
//   tipoUsuario.find().sort({orden:1})
//   .then(data=>{
//       res.send(data);
//   })
//   .catch(error=>{
//       res.send(error);
//   });
// });


//Obtener el listado de las categorias
app.get("/tipousuario",function(req,res){  // http://localhost:3000/tipousuario
  tipoUsuario.find()
  .then(data=>{
      res.send(data);
  })
  .catch(error=>{
      res.send(error);
  });
});

app.get('/paginaestatica', function(req, res){ // http://localhost:3000/paginaestatica
  paginaEstatica.find()

  .then((data)=>{
    res.send(data[0]);//Se le pone 0 para que solo envie un json y no un arreglo con un json
    res.end();
})
.catch((error)=>{
    res.send(error);
    res.end();
});



});
    }