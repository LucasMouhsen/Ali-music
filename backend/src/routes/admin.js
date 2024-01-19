var express = require('express');
var router = express.Router();
const {index, add, store, edit, update, destroy} = require('../controllers/adminController')
const multer = require('multer');
const path = require('path')
const adminCheck = require('../middleware/adminCheck')
const productValidation = require('../validations/productValidation')
const editProductValidation = require('../validations/editProductValidation')
const loginCheck = require('../middleware/loginCheck');

const storage = multer.diskStorage({
    destination : (req,file,cb) =>{
        cb(null, "./public/images/articulos/")
    },
     filename : (req,file,cb) => {
        cb(null, "art-" + Date.now() + path.extname(file.originalname) )
    }
})

const upload = multer({ storage })

router.get('/', adminCheck, loginCheck, index)
router.get('/add', adminCheck, loginCheck, add);
router.post('/add', upload.array('image'), productValidation ,store);

router.get('/edit/:id', adminCheck, loginCheck, edit);
router.put('/edit/:id', upload.array("image"), editProductValidation ,update);

router.delete('/delete/:id', loginCheck, destroy);

module.exports = router;