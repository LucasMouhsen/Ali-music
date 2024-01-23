var express = require('express');
var router = express.Router();
const { products, createProduct, editProduct, deleteProduct } = require('../controllers/productsController')
const uploadProduct = require('../middleware/fotoProductMulter')

const loginCheck = require("../middleware/loginCheck");
const productValidation = require('../validations/productValidation');
const editProductValidation = require('../validations/editProductValidation');
/* GET home page. */

/* router.get('/cart', loginCheck, cart);
router.get('/infoUser', loginCheck, info);
router.put('/cart/:id', loginCheck, addCart) */


router.get('/', products)
router.post('/create', loginCheck,   uploadProduct.array('image'), productValidation, createProduct)
router.post('/edit/:id', loginCheck, uploadProduct.array('image'), productValidation, editProduct)
router.post('/delete/:id', loginCheck, deleteProduct)



module.exports = router;