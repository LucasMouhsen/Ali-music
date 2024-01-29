var express = require('express');
var router = express.Router();
var { login, logout, register, profileUpdate, profile } = require('../controllers/userController')

/* VALIDACION DE IMAGEN */
const uploadUser = require('../middleware/fotoUserMulter')

/* VALIDACION DE REGISTRO */
const registerValidation = require("../validations/registerValidation")
/* VALIDACION DE LOGIN */
const loginValidation = require('../validations/loginValidation');
/* VALIDACION DE EDIT */
const editUserValidation = require('../validations/editUserValidation');
/* VALIDACION DE TOKEN */
const userExtractor = require('../middleware/userExtractor');

/* login */
router.post('/login',loginValidation, login);
/* logout */
router.post('/logout', userExtractor, logout);
/* register */
router.post('/register', uploadUser.single('avatar'), registerValidation, register)
/* profile */
router.get('/profile', userExtractor, profile);
/* update */
router.post('/profileUpdate', userExtractor, uploadUser.single('avatar'), editUserValidation, profileUpdate);

module.exports = router;

