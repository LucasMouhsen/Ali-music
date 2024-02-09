const { validationResult } = require('express-validator');
const bcrypt = require("bcryptjs")
const db = require('../database/models');
const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = {
    profile: async (req, res) => {
        const { userId } = req
        try {
            // Obtener el usuario por su clave primaria (userId)
            const user = await db.User.findByPk(userId);

            // Enviar la respuesta con el perfil del usuario
            res.json({
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                number: user.number,
                avatar: user.avatar,
                rol: user.rol

            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener el perfil del usuario' });
        }
    },
    login: async (req, res) => {
        // Validamos los datos que vienen en el body
        let errors = validationResult(req);
        // si hay errores los retornamos
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // buscamos por body el email
        const { email } = req.body
        const options = {
            where: {
                email: email,
            }
        };
        // Buscamos el usuario por correo electronico y lo guardamos en user
        const user = await db.User.findOne(options);
        const userLogin = {
            id: user.id,
        }
        // creamos un token con los datos recibidos que dura 7 dias
        const token = jwt.sign(
            userLogin,
            process.env.SECRET,
            {
                expiresIn: 60 * 60 * 24 * 7
            }
        )
        // Retornamos el token y el nombre completo del usuario logueado
        return res.status(200).json(token)
    },
    register: async (req, res) => {
        // validamos que no haya errore
        let errors = validationResult(req);
        // si hay errores los retornamos
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // traemos datos del body
        const { userName, firstName, lastName, email, password } = req.body
        // creamos el usuario
        await db.User.create({
            userName: userName.trim(),
            firstName: firstName.trim().toLowerCase(),
            lastName: lastName.trim().toLowerCase(),
            email: email.trim().toLowerCase(),
            number: null,
            password: bcrypt.hashSync(password.trim(), 10),
            rol: 2,
            avatar: req.file ? req.file.filename : 'avatar_default.png',
        })
            .then((user) => {
                const userLogin = {
                    id: user.id,
                }
                // creamos un token con los datos recibidos que dura 7 dias
                const token = jwt.sign(
                    userLogin,
                    process.env.SECRET,
                    {
                        expiresIn: 60 * 60 * 24 * 7
                    }
                )
                // retornamos datos de sesion
                return res.json(token)
            })
    },
    logout: (req, res) => {
        // Elimina el token JWT del lado del cliente
        res.clearCookie('token');

        // Envía una respuesta JSON indicando que el usuario se ha deslogueado
        res.json({
            status: "usuario deslogeado"
        });
    },
    profileUpdate: (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { firstName, lastName, number, password, newPassword, avatar } = req.body
        const { userId } = req
        db.User.update(
            {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                number: number ? number : null,
                password: newPassword != "" && password != "" ? bcrypt.hashSync(newPassword.trim(), 10) : password,
                avatar: req.file ? req.file.filename : avatar
            },
            {
                where: { id: userId }
            }
        )
            .then(() => {
                res.json({
                    status: "usuario actualizado"
                });
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: 'Error al actualizar el perfil del usuario' });
            });
    }
}
