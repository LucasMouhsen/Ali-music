var express = require('express');
var router = express.Router();
const {cart, addCart, info} = require('../controllers/productsController')
const loginCheck = require("../middleware/loginCheck");
/* GET home page. */

router.get('/cart', loginCheck, cart);
router.get('/infoUser', loginCheck, info);
router.put('/cart/:id', loginCheck, addCart)


module.exports = router;