var express = require('express');
var router = express.Router();

const multer = require('multer');
var { login, logout, register, profileUpdate, profile } = require('../controllers/userController')

const uploadUser = require('../middleware/fotoUserMulter')

/* VALIDACION DE LOGIN */
const loginCheck = require("../middleware/loginCheck");
/* VALIDACION DE REGISTRO */
const registerValidation = require("../validations/registerValidation")
/* VALIDACION DE LOGIN */
const loginValidation = require('../validations/loginValidation');
/* VALIDACION DE EDIT */
const editUserValidation = require('../validations/editUserValidation');
/* login */
router.post('/login',loginValidation, login);
/* logout */
router.get('/logout', loginCheck, logout);
/* register */
router.post('/register', uploadUser.single('avatar'), registerValidation, register)
/* profile */
router.get('/profile', loginCheck, profile);
/* update */
router.post('/profileUpdate', loginCheck, uploadUser.single('avatar'), editUserValidation, profileUpdate);


module.exports = router;

