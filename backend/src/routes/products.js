var express = require('express');
var router = express.Router();
const { products, createProduct, editProduct, deleteProduct, categories } = require('../controllers/productsController')
const uploadProduct = require('../middleware/fotoProductMulter')

/* Validacion producto */
const productValidation = require('../validations/productValidation');
/* Validacion token */
const userExtractor = require('../middleware/userExtractor')
/* GET home page. */

router.get('/', products)
router.get('/categories', categories)
router.post('/create', userExtractor,   uploadProduct.array('image'), productValidation, createProduct)
router.post('/edit/:id', userExtractor, uploadProduct.array('image'), productValidation, editProduct)
router.post('/delete/:id', userExtractor, deleteProduct)



module.exports = router;