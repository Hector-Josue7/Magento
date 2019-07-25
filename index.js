
const express = require("express") //Importar el modulo express para crear el servidor web
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Product = require('./models/product')
const app = express() //Crear una aplicacion de nodejs con express
const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static("public")); //definir una carpeta como publica para que los usuarios puedan acceder a su contenido


app.get('/api/product', (req, res)=>{
res.send(200, {products: []})
})
app.get('/api/product/:productId', (req, res)=>{

})
app.post('/api/product', (req, res) =>{
//console.log(req.body)
//res.status(200).send({message: 'El producto se ha recibido'})
console.log('POST /api/product')
console.log(req.body)
let product = new Product()
product.name = req.body.name
product.picture = req.body.picture
    product.price = req.body.price
    product.category = req.body.category
    product.description = req.body.description

    product.save((err, productStored) =>{
        if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})
        res.status(200).send({product: productStored})
    })
})
app.put('/api/product/:productId', (req, res) =>{

})
app.delete('/api/product/:productId', (req, res)=>{

})
//Levantar el servidor en el puerto 3333

mongoose.connect('mongodb://localhost:27017/shop', (err, res) =>{
    if(err) {
        return console.log(`Error al conectar a la base de datos: ${err}`)
    }
    console.log('Conesión a la base de datos establecida...')
    app.listen(port, ()=>{
        console.log(`Servidor corriendo en http://localhost:${port}`)
    });
    
})

/* 
app.get ('/hola/:name', (req, res) =>{
   res.send({message: `Hola ${req.params.name}!`})
}) */