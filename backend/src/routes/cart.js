var express = require('express');
var router = express.Router();
const { cart } = require('../controllers/cartController');
const userExtractor = require('../middleware/userExtractor');

/* Carrito */
router.post('/', userExtractor, cart);

module.exports = router