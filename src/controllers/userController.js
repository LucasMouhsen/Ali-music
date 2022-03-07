const { validationResult } = require('express-validator');
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs")

/* const users = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'users.json'),'utf-8'));
const saveUser = dato =>fs.writeFileSync(path.join(__dirname, '..', 'data', 'users.json'),JSON.stringify(users,null,2),'utf-8'); */
const db = require('../database/models')
const queryInterface = db.sequelize.getQueryInterface();

module.exports = {
    profile: (req, res) => {
        let user = db.User.findByPk(req.session.userLogin.id)
        let products = db.Product.findAll({
            include: ['images', 'productStates'],
            where: {
                userId: req.session.userLogin.id
            }
        })
        Promise.all([user, products])
            .then(([user, products]) => {
                res.render('users/user', {
                    title: req.session.userLogin.firstName,
                    user,
                    products
                })
            })


    },
    login: (req, res) => res.render('users/login', {
        title: 'login'
    }),
    processLogin: (req, res) => {
        let errors = validationResult(req);
        /* console.log(req.body);
        console.log(errors) */
        if (errors.isEmpty()) {
            const { email, recordar } = req.body
            db.User.findOne({
                where: {
                    email
                }
            })
                .then(user => {
                    req.session.userLogin = {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        avatar: user.avatar,
                        rol: user.rol
                    }
                    console.log(req.session.userLogin)
                    if (recordar) {
                        res.cookie("recordarme", req.session.userLogin, { maxAge: 1000 * 60 })
                    }
                    return res.redirect('/')
                })
                .catch(error => console.log(error))

        } else {
            return res.render('users/login', {
                title: 'Login',
                errors: errors.mapped()
            })
        }

    },
    register: (req, res) => {
        res.render('users/register', {
            title: 'register'
        })
    },
    proccesRegister: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {

            const { userName, firstName, lastName, email, password } = req.body
            db.User.create({
                userName: userName.trim(),
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim(),
                number: null,
                password: bcrypt.hashSync(password.trim(), 10),
                rol: 2,
                avatar: req.file ? req.file.filename : 'avatar_default.png',
            })
                .then(user => {
                    req.session.userLogin = {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        avatar: user.avatar,
                        rol: user.rol
                    }
                    return res.redirect('/')
                })
                .catch(error => console.log(error))
        } else {
            return res.render('users/register', {
                title: 'Register',
                errors: errors.mapped(),
                old: req.body
            })
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.cookie("recordarme", null, { MaxAge: -1 });
        res.redirect('/')
    },
    fav: (req, res) => {
        res.render('users/fav', {
            title: 'fav'
        })
    },
    profileEdit: (req, res) => {
        const pass = res.locals.userLogin.password
        const { firstName, lastName, number, password, newPassword, avatar } = req.body
        console.log(req.body)
        db.User.update(
            {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                number: number ? number : null,
                password: newPassword != "" && password != "" ? bcrypt.hashSync(newPassword.trim(), 10) : pass,
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
        return res.redirect('/users/profile/' + req.session.userLogin.id)
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
