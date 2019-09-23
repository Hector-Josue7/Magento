const express = require("express") 
var  bodyParser = require('body-parser')
const path = require('path');
var upload = require('./routes/upload')
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/upload', upload);
app.use(express.static(path.join(__dirname, './public')));
module.exports = app;

//var formidable = require("express-formidable");
//var errorHandler = require('errorhandler'); // npm install errorhandler
//var imagenesRouter = require('./routes/imagenes-routers');
//const multer = require('multer');

// if('development' === app.get('env')) {
//     app.use(errorHandler());
//   }
