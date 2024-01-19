var express = require('express');
var router = express.Router();
const {index, about, search, privacity} = require('../controllers/indexController')
/* GET home page. */

router.get('/',index);
router.get('/about', about);
router.get('/search',search)
router.get('/privacity', privacity)

module.exports = router;
