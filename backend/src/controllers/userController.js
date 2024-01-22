const { validationResult } = require('express-validator');
const bcrypt = require("bcryptjs")
const db = require('../database/models');
const { Op } = require('sequelize');
const queryInterface = db.sequelize.getQueryInterface();

module.exports = {
    usersApiProfile: async (req, res) => {
        try {
            // Obtener el usuario por su clave primaria (id)
            const user = await db.User.findByPk(req.session.userLogin.id);

            // Obtener la lista de productos asociados al usuario
            const products = await db.Product.findAll({
                include: ['images', 'productStates'],
                where: {
                    userId: req.session.userLogin.id
                }
            });

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
                },
                products
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener el perfil del usuario' });
        }
    },
    usersApiLogin: async (req, res) => {
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
    usersApiRegister: async (req, res) => {
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
    fav: (req, res) => {
        res.render('users/fav', {
            title: 'fav'
        })
    },
    usersApiProfileUpdate: (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const pass = res.locals.userLogin.password
        const { firstName, lastName, number, password, newPassword, avatar } = req.body
        console.log(req.body)
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
                console.log(res.locals.userLogin);
            })
            .catch(error => console.log(error))
        res.json({
            status: "usuario actualizado"
        })
    },
    add: (req, res) => {
        db.Category.findAll({
            order: [
                ['category', 'ASC']
            ]
        })
            .then(categories => res.render('users/add', {
                title: 'add product',
                categories,
                capitalizarPrimeraLetra,
            }))
            .catch(error => console.log(error))

    },
    store: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            const { name, price, discount, category, description } = req.body
            const status = 1
            db.Product.create(
                {
                    name: name.trim(),
                    description: description.trim(),
                    price,
                    discount,
                    fav: 0,
                    sold: 0,
                    cart: 0,
                    userId: req.session.userLogin.id,
                    categoryId: category,
                    statusId: status
                }
            ).then(product => {
                console.log(product)
                if (req.files.length != 0) {
                    let images = req.files.map(image => {
                        let item = {
                            image: image.filename,
                            productId: product.id
                        }
                        return item
                    })
                    db.ImageProduct.bulkCreate(images, { validate: true })
                        .then(() => console.log('imagenes guardadas satisfactoriamente'))
                }
                return res.redirect('/users/profile/' + req.session.userLogin.id)
            })
                .catch(error => console.log(error))
        } else {
            db.Category.findAll({
                order: [
                    ['category', 'ASC']
                ]
            })
                .then(categories => res.render('admin/add', {
                    title: 'add product',
                    categories,
                    capitalizarPrimeraLetra,
                    old: req.body,
                    errors: errors.mapped()
                }))
                .catch(error => console.log(error))
        }
    },
    edit: (req, res) => {
        let product = db.Product.findByPk(req.params.id, {
            include: ['images', 'productStates', 'category']
        })

        let categories = db.Category.findAll({
            order: [["id", "ASC"]]
        })

        Promise.all([categories, product])

            .then(([categories, product]) => {
                res.render('users/edit', {
                    title: 'Edit product',
                    product,
                    categories
                })
            })
            .catch(err => { console.log(err) })
    },
    update: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            const { name, description, price, discount, category } = req.body;
            db.Product.update(
                {
                    name: name.trim(),
                    description: description.trim(),
                    price,
                    discount,
                    categoryId: category,
                },
                {
                    where: { id: req.params.id }
                }
            ).then(() => {
                db.ImageProduct.findByPk(req.params.id, {
                    include: ['product']
                })
                    .then(async () => {
                        if (req.files.length != 0) {
                            let images = req.files.map(image => {
                                let item = {
                                    image: image.filename,
                                    productId: req.params.id
                                }
                                return item
                            })
                            await queryInterface.bulkDelete('imageproducts', {
                                productId: req.params.id
                            });
                            db.ImageProduct.bulkCreate(images, { validate: true, updateOnDuplicate: ["productId"] })
                                .then(() => console.log('imagenes guardadas satisfactoriamente'))
                        }
                        return res.redirect('/users/profile/' + req.session.userLogin.id)
                    })
                    .catch(error => console.log(error))
            })
        } else {
            let product = db.Product.findByPk(req.params.id, {
                include: ['images', 'productStates', 'category']
            })

            let categories = db.Category.findAll({
                order: [["id", "ASC"]]
            })

            Promise.all([categories, product])

                .then(([categories, product]) => {
                    res.render('users/edit', {
                        title: 'Edit product',
                        product,
                        categories,
                        old: req.body,
                        errors: errors.mapped()
                    })
                })
                .catch(err => { console.log(err) })
        }
    },
    destroy: (req, res) => {
        db.Product.findByPk(req.params.id, {
            include: ['images']
        })
            .then(() => {
                db.ImageProduct.destroy({
                    where: {
                        productId: +req.params.id
                    }
                })
                db.Product.destroy({
                    where: {
                        id: +req.params.id
                    }
                })
                return res.redirect('/users/profile/' + req.session.userLogin.id)
            })
    },
}
