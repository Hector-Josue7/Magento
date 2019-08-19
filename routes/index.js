const express = require('express')
const productCtrl = require('../controladores/product')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('index');

});


router.get('/product', productCtrl.getProducts)
router.get('/product/:productId', productCtrl.getProduct)  // http://localhost:3000/product
router.post('/product', productCtrl.saveProduct)
router.put('/product/:productId', productCtrl.updateProduct)
router.delete('/product/:productId', productCtrl.deleteProduct)

module.exports = router