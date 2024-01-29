const { check } = require('express-validator');
const db = require('../database/models')
const bcrypt = require('bcryptjs');

let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;

module.exports = [
    check("firstName").notEmpty().withMessage("Debes indicar tu nombre").bail(),

    check("lastName").notEmpty().withMessage("Debes indicar tu apellido").bail(),

    check("password").notEmpty().withMessage("Debes indicar tu contraseña").isLength({ max: 20, min: 6 }).withMessage("Tu contraseña debe tener minimo 6 caracteres y maximo 20").matches(regExPass).withMessage('La contraseña debe tener una mayúscula, un número y entre 6 y 12 caracteres').bail().custom((value, { req }) => {
        return db.User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(user => {
                if (!bcrypt.compareSync(value, user.password)) {
                    return Promise.reject('Contraseña incorrecta')
                }
            })

    }),

    check("newPassword").notEmpty().withMessage("Debes indicar tu contraseña").isLength({ max: 20, min: 6 }).withMessage("Tu contraseña debe tener minimo 6 caracteres y maximo 20").matches(regExPass).withMessage('La contraseña debe tener una mayúscula, un número y entre 6 y 12 caracteres').bail(),
]