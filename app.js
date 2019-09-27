const express = require("express") 
var  bodyParser = require('body-parser')
const path = require('path');
const app = express();

//MIDDLEWARES
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// EJS MOTOR DE VISTAS CONFIGURACION
app.set('views',__dirname + '/public');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//ACCESO A LOS ROUTERS
require('./routes/usuarios-router')(app);

app.use(express.static(path.join(__dirname, './public')));
module.exports = app;


//var formidable = require("express-formidable");
//var errorHandler = require('errorhandler'); // npm install errorhandler
//var imagenesRouter = require('./routes/imagenes-routers');
//const multer = require('multer');

// if('development' === app.get('env')) {
//     app.use(errorHandler());
//   }

//const faker = require('faker')



//app.use(express.static("public"));



