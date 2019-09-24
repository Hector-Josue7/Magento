var express = require('express');
var paginaestatica = require('../models/paginaestatica');
var router = express.Router();

//Guardar un usuario
router.post('/guardaPagina',function(req,res){
    let p = new paginaestatica({
        nombrePagina:req.body.nombrePagina,
    }); 

    //Promesa
    p.save()
    .then(function(obj){
        res.send(obj);
        res.end();
    })
    .catch(function(error){
        res.send(error);
        res.end();
    });
});

module.exports = router;


//Eliminar un usuario
router.delete('/eliminaPagina/:id',function(req,res){
    paginaestatica.remove({_id:req.params.id})
    .then((result)=>{
        res.send(result);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});

router.get('/',function(req,res){
    paginaestatica.find()
    .then((data)=>{
        res.send(data);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});