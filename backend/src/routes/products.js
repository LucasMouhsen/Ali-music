var express = require('express');
var router = express.Router();
const {products, createProduct, editProduct, deleteProduct} = require('../controllers/productsController')

const loginCheck = require("../middleware/loginCheck");
const productValidation = require('../validations/productValidation');
/* GET home page. */

/* router.get('/cart', loginCheck, cart);
router.get('/infoUser', loginCheck, info);
router.put('/cart/:id', loginCheck, addCart) */


router.get('/', products)
router.post('/create',(req, res) =>{
    
  res.header('Access-Control-Allow-Origin', '');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.status(204).end();
}, productValidation, createProduct)
router.post('/edit', editProduct)
router.post('/delete', deleteProduct) 



module.exports = router;