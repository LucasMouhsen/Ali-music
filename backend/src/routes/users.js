var express = require('express');
var router = express.Router();

const multer = require('multer');
const path = require('path')

var {fav, logout, destroy, usersApiLogin, usersApiRegister, usersApiProfile, usersApiProfileUpdate} = require('../controllers/userController')

const uploadUser = require('../middleware/fotoUserMulter')
const uploadProduct = require('../middleware/fotoProductMulter')

/* VALIDACION DE LOGIN */
const loginCheck = require("../middleware/loginCheck");
/* VALIDACION DE REGISTRO */
const registerValidation = require("../validations/registerValidation")
/* VALIDACION DE LOGIN */
const loginValidation = require('../validations/loginValidation');
/* VALIDACION DE EDIT */
const editUserValidation = require('../validations/editUserValidation');



router.delete('/delete/:id', loginCheck, destroy);

router.get('fav', loginCheck, fav);

/* login */
router.post('/login',loginValidation, usersApiLogin);
/* logout */
router.get('/logout', loginCheck, logout);
/* register */
router.post('/register', uploadUser.single('avatar'), registerValidation, usersApiRegister);
/* profile */
router.get('/profile', loginCheck ,usersApiProfile);
/* update */
router.post('/profileUpdate', loginCheck, uploadUser.single('avatar'), editUserValidation, usersApiProfileUpdate);


module.exports = router;

