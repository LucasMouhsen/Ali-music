var express = require('express');
var router = express.Router();

const multer = require('multer');
const path = require('path')

var {fav, logout, add, store, edit, update, destroy, usersApiLogin, usersApiRegister, usersApiProfile, usersApiProfileUpdate} = require('../controllers/userController')

const uploadUser = require('../middleware/fotoUserMulter')
const uploadProduct = require('../middleware/fotoProductMulter')
const loginCheck = require("../middleware/loginCheck");

const productValidation = require('../validations/productValidation')
const editProductValidation = require('../validations/editProductValidation')
const registerValidation = require("../validations/registerValidation")
const loginValidation = require('../validations/loginValidation');
const editUserValidation = require('../validations/editUserValidation');

/* GET users listing. */
/* router.get('/profile/:id', loginCheck, profile);
router.put('/profile/:id', uploadUser.single('avatar'),profileEdit);

router.get('/login', login);
router.post('/login',loginValidation, processLogin); 

router.get('/register',register);
router.post('/register',uploadUser.single('avatar'), registerValidation ,proccesRegister);*/

router.get('/logout', logout);

/* router.get('/add', loginCheck, add);
router.post('/add', uploadProduct.array('image'), loginCheck, productValidation,store);
 */
/* router.get('/edit/:id', loginCheck, edit);
router.put('/edit/:id', uploadProduct.array("image"), loginCheck, editProductValidation, update); */

router.delete('/delete/:id', loginCheck, destroy);

router.get('fav', loginCheck, fav);

router.post('/usersApiLogin',loginValidation, usersApiLogin);
router.post('/usersApiRegister',registerValidation, usersApiRegister);

router.get('/usersApiProfile', usersApiProfile);
router.post('/usersApiProfileUpdate', editUserValidation, usersApiProfileUpdate);

module.exports = router;

