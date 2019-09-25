const express = require("express") 
var  bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const path = require('path');
//------------------
var upload = require('./routes/upload')
var paginasEstaticas = require('./routes/paginas-estaticas-routers');
var locked = require('./routes/locked');
//----------------------------------------------
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(expressLayouts) 
//--------------------------------
app.use('/upload', upload);
app.use('/paginaestatica',paginasEstaticas);
//--------------------------------


app.set('view engine', 'ejs')  

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



