
var 
    bodyParser = require('body-parser'),
    
   
    multer = require('multer'),
    ejs = require('ejs'),
    mongoose = require('mongoose'),
    session = require('express-session'),
   // Joi = require('joi'),
   favicon = require('serve-favicon');

   var cookieParser = require('cookie-parser');
   const express = require('express');
   const morgan = require('morgan');
   const path = require('path');
const fs = require('fs-extra');
var  lodash = require('lodash');
var ejs = require('ejs');
var joi = require('joi');
const fileUpload = require('express-fileupload');

const app = express();


//require('./modulos/passport');
  // middlewares
  //app.use(morgan('dev'));
 app.use(bodyParser.urlencoded({extended: false}));
 app.use(bodyParser.json());
 app.use(cookieParser());
 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'ejs');
 app.set('views',__dirname + '/views')
 app.use(session({secret: 'secret', resave: true, saveUninitialized: true}));
//  app.use(multer({dest: path.join(__dirname, './public/img/cargaImagenes')}).single('image')); 
 // Static files
  app.use('/public', express.static(path.join(__dirname, 'public')));
  app.use('/uploads',express.static(path.join(__dirname,'./public/img/cargaImagenes')));






 //routes
 require('./routes/rutas-post')(app);
 require('./routes/rutas-get')(app);


 //require('./routes/index')(app);
//require('./routes/imagenes-routers')(app);
//require('./routes/usuarios-router')(app);





  
// app.use(function (req, res, next) {
//   var err = new Error('Archivo no encontrado');
//   err.status = 404;
//   next(err);
// });

// app.use(function (err, req, res, next) {
//   res.status(err.status || 500);
//   res.send(err.message);
// });



  
  module.exports = app;





  // 3rd party Modules
// const express = require('express');
// const cors = require('cors');
// const morgan = require('morgan');
// const path = require('path');
// const fileUpload = require('express-fileupload');

// // Custom files
// const routes = require('./routes/index.routes');

// // Express
// const app = express();

// // Middlewares
// app.use(morgan('dev'));
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(fileUpload({
//    limits: { fileSize: 5 * 1024 * 1024 } // Max Size, mirar el valor de truncated
// }));

// // Routes
// app.use('/api', routes);

// // Static files. Build de Angular
// app.use('/', express.static(path.join(__dirname, '../dist')));

// // Error handling
// app.use((req, res, next) => {
//    const error = new Error('Endpoint inválido');
//    error.status = 404;
//    next(error);
// });

// app.use((error, req, res, next) => {
//    res.status(error.status || 500).json({ error: { msg: error.message } });
// });

// module.exports = app;



  




