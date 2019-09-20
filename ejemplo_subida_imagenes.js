//utilizar el middleware formidable, que se usa para subir archivos a nuestra aplicacion
var Imagen= require("./models/imagenes");
var fs = require("fs");
//npm install --save express-formidable

// colocar en app.js

var formidable = require('express-formidable');
// estos archivos se guardan en una carpeta de almacenamiento temporal

var formidable = require('express-formidable');
// estos archivos se guardan en una carpeta de almacenamiento temporal
//con esto ya leemos archivos en nuestra aplicaion
app.use(formidable.parse({keepExtensions: true, uploadDir: "images"}));


// colocar en el formulario enctype="multipart/form-data"
//routes app

router.route("/imagenes")
.get (function (req,res){
Imagen.find({creator:res.locals.user._id}, function(err, imagenes){
if(err) {res.redirect("/app"); return;}
res.render("app/imagenes/index", {imagenes: imagenes});
});
})
.post(function(req,res){
//console.log(req.body.archivo)
var extension = req.body.archivo.name.split(".").pop(); // esto devuelve un arreglo donde separa 
var data ={
title: req.body.title,
creator: res.locals.user._id,
extension: extension
}
var imagen = new Imagen(data);
Imagen.save(function(err){
if(!err){
fs.rename(req.body.archivo.path, "public/imagenes/"+imagen._id +"."+ extension); // se usa el _id para no repetir los nombres de las imagenes
res.redirect("/app/imagenes/"+imagen._id)
} else{
    console.log(imagen);
    res.render(err);
}
});
});


// models

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var img_schema = new Schema({
title: {type: String, required:true},
creator: {type: Schema.Types.ObjectId, ref: "User"},
extension: {type:String, required:true}
});

var Imagen = mongoose.model("Imagen", img_schema);

module.exports = Imagen