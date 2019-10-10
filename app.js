   const express = require('express');
   const bodyParser = require('body-parser');
   const mongoose  = require('mongoose');
   const session = require('express-session');
   const multer = require('multer');
   const ejs = require('ejs');
   const morgan = require('morgan');
   const path = require('path');
   const fs = require('fs-extra');
   var  lodash = require('lodash');
   //var joi = require('joi');
   //var cookieParser = require('cookie-parser');
   //const favicon = require('serve-favicon');
   const fileUpload = require('express-fileupload');
   const app = express();

// middlewares
  //app.use(morgan('dev'));
 app.use(bodyParser.urlencoded({extended: false}));
 app.use(bodyParser.json());
 app.use(fileUpload({limits: { fileSize: 5 * 1024 * 1024 } })); // Max Size, mirar el valor de truncated
 //app.use(cookieParser());
 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'ejs');
 app.set('views',__dirname + '/views')
 app.use(session({secret: 'secret', resave: true, saveUninitialized: true}));
  //  app.use(multer({dest: path.join(__dirname, './public/img/cargaImagenes')}).single('image')); 
 
  // archivos estaticos
  app.use('/public', express.static(path.join(__dirname, 'public')));
  app.use('/uploads',express.static(path.join(__dirname,'./public/img/cargaImagenes')));

 //routes
 require('./routes/rutas-post')(app);
 require('./routes/rutas-get')(app);
 //require ('./routes/paginas-estaticas-routers')(app);
//require('./routes/rutas-inicio-sesion')(app);
// app.use('/api', routes);

//manejador de errores
app.use(function (req, res, next) {
  var err = new Error('Archivo no encontrado');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
  // res.status(error.status || 500).json({ error: { msg: error.message } });
});

module.exports = app;








  




