const {check} = require('express-validator');
const users = require('../data/users.json');
const bcrypt = require('bcryptjs');
const db = require('../database/models')

module.exports = [
     check('email')
    .isEmail().withMessage('Debe ingresar un email ').bail()
    ,
    check('password')
    .notEmpty().withMessage('El campo de contraseña no puede estar vacío')
    .custom((value, { req }) => {
        return db.User.findOne({
            where: {
                email: req.body.email, 
            }
        })
            .then(User => {
                if(!User){
                    return Promise.reject('Credenciales inválidas');
                }
                if (!bcrypt.compareSync(value, User.password)) { 
                    return Promise.reject('Credenciales inválidas');  // Simplifica el mensaje de error
                }
            }).catch(() => Promise.reject('Credenciales inválidas'));
    })

]