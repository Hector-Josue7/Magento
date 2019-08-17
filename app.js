const express = require("express") 
const bodyParser = require('body-parser')
const app = express() 
const router = require('./routes')
const exphbs = require('express-handlebars');
const multer = require('multer');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
//app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).single('image')); // colocaremos las imagenes que se suban en esa dirección y el single significa se van a subir de una en una
app.use(express.static("public")); //definir una carpeta como publica para que los usuarios puedan acceder a su contenido
app.use('/api', router)

//cerrar sesion
app.get('/logout',function(req,res){
    req.session.destroy();
    res.send({status:1,mensaje:"Se cerró la sesión"});
});


//app.use(express.static("public"));
app.get('/inicio.html', verificarAutenticacion, function (res, req, next) {  
    res.redirect('/inicio.html');
});



function verificarAutenticacion(req, res, next) {
    if ( req.session.codigoUsuario){
        return next();
    }
    else{
        res.redirect('/');
    }
}



module.exports = app
