const { validationResult } = require('express-validator');
const bcrypt = require("bcryptjs")
const db = require('../database/models');
module.exports = {
    profile: async (req, res) => {
        try {
            // Obtener el usuario por su clave primaria (id)
            const user = await db.User.findByPk(req.session.userLogin.id);

            // Enviar la respuesta con el perfil del usuario y la lista de productos
            res.json({
                title: req.session.userLogin.firstName + ' ' + req.session.userLogin.lastName,
                user: {
                    userName: user.userName,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    number: user.number,
                    avatar: user.avatar
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener el perfil del usuario' });
        }
    },
    login: async (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email } = req.body
        const options = {
            where: {
                email: email,
            }
        };
        const user = await db.User.findOne(options);
        return res.json(
            req.session.userLogin = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                avatar: user.avatar,
                rol: user.rol
            }
        )
    },
    register: async (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { userName, firstName, lastName, email, password } = req.body
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
                return res.json(
                    req.session.userLogin = {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        avatar: user.avatar,
                        rol: user.rol
                    }
                )
            })
    },
    logout: (req, res) => {
        req.session.destroy();
        res.cookie("recordarme", null, { MaxAge: -1 });
        res.json({
            status: "usuario deslogeado"
        })
    },
    profileUpdate: (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { firstName, lastName, number, password, newPassword, avatar } = req.body
        db.User.update(
            {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                number: number ? number : null,
                password: newPassword != "" && password != "" ? bcrypt.hashSync(newPassword.trim(), 10) : password,
                avatar: req.file ? req.file.filename : avatar
            },
            {
                where: { id: req.session.userLogin.id }
            }
        )
        db.User.findOne({
            where: { id: req.params.id }
        })
            .then(() => {
                res.locals.userLogin = {
                    firstName: firstName,
                    lastName: lastName,
                    avatar: req.file ? req.file.filename : avatar,
                }
            })
            .catch(error => console.log(error))
        res.json({
            status: "usuario actualizado"
        })
    }
}
