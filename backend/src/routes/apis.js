const router = require('express').Router()
const {getMails, orderPriceDesc, orderPrice, filterPrice, allProducts,filterPriceUser, productsApi} = require('../controllers/apisController')
const { products } = require('../controllers/productsController')

/* /api */
router.get('/products',products)

router.get('/emails',getMails)
router.get('/orderPriceDesc',orderPriceDesc)
router.get('/orderPrice',orderPrice)
router.get('/price', filterPrice)
router.get('/all',allProducts)
router.get('/allUser',filterPriceUser)


module.exports = router
