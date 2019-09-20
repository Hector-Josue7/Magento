const express = require("express") 
const bodyParser = require('body-parser')
const router = require('./routes')
// const exphbs = require('express-handlebars');
var formidable = require("express-formidable");

const multer = require('multer');
//const path = require('path');
const app = express();
const routes = require('./routes');
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(formidable.parse({keepExtensions: true}));
//app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).single('image')); // colocaremos las imagenes que se suban en esa dirección y el single significa se van a subir de una en una
app.use(express.static("public")); //definir una carpeta como publica para que los usuarios puedan acceder a su contenido


//app.use("/mensajes",mensajesRouter);
app.use(router);
module.exports = app
