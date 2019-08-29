const express = require("express") 
const bodyParser = require('body-parser')
const router = require('./routes')
// const exphbs = require('express-handlebars');
const pug = require('pug');
const multer = require('multer');
const path = require('path');
const app = express();
const routes = require('./routes');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
//app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).single('image')); // colocaremos las imagenes que se suban en esa dirección y el single significa se van a subir de una en una
app.use(express.static("public")); //definir una carpeta como publica para que los usuarios puedan acceder a su contenido

// app.use("/peliculas",routes);
app.use(routes);
app.set("view engine", "pug");
// app.set('views', path.join(__dirname, 'views'));
// app.engine('.hbs', exphbs({
//   defaultLayout: 'main',
//   layoutsDir: path.join(app.get('views'), 'layouts'),
//   partialsDir: path.join(app.get('views'), 'partials'),
//   extname: '.hbs'
// }));
// app.set('view engine', '.hbs');

//app.use(require('./routes'));

//cerrar sesion
// app.get('/logout',function(req,res){
//     req.session.destroy();
//     res.send({status:1,mensaje:"Se cerró la sesión"});
// });


//app.use(express.static("public"));
// app.get('/inicio.html', verificarAutenticacion, function (res, req, next) {  
//     res.redirect('/inicio.html');
// });



// function verificarAutenticacion(req, res, next) {
//     if ( req.session.codigoUsuario){
//         return next();
//     }
//     else{
//         res.redirect('/');
//     }
// }



module.exports = app
