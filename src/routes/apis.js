const router = require('express').Router()
const {getMails, orderPriceDesc, orderPrice, filterPrice, allProducts,filterPriceUser} = require('../controllers/apisController')

/* /api */
router.get('/emails',getMails)
router.get('/orderPriceDesc',orderPriceDesc)
router.get('/orderPrice',orderPrice)
router.get('/price', filterPrice)
router.get('/all',allProducts)
router.get('/allUser',filterPriceUser)


module.exports = router
