const { check, body } = require('express-validator');
const db = require('../database/models')

module.exports = [
    body('postName')
        .notEmpty().withMessage('El nombre del post es requerido').bail()
        .isLength({ max: 50 }).withMessage('El nombre del post no debe superar los 50 caracteres'),
    check('description')
        .notEmpty().withMessage('La descripción del post es requerida').bail()
        .isLength({ max: 200 }).withMessage('La descripción del post no debe superar los 200 caracteres'),
]