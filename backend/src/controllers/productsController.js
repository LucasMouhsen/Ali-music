/* const fs = require('fs'); */
/* const path = require('path'); */
/* const products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'),'utf-8')); */
const capitalizarPrimeraLetra = require("../utils/capitalizeOneLetter.js")
const db = require('../database/models');
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

module.exports = {
    products: async (req, res) => {
        res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        const { id, name } = req.query;

        // Inicializar options sin ninguna restricción específica
        let options = {
            include: ['images', 'productStates'],
        };
        // Construir dinámicamente la condición de búsqueda
        let whereCondition = {};
        if (id) {
            whereCondition.id = {
                [Op.eq]: id,
            };
        }
        if (name) {
            whereCondition.name = {
                [Op.like]: `%${name}%`,
            };
        }
        // Aplicar la condición de búsqueda solo si hay alguna condición definida
        if (Object.keys(whereCondition).length > 0) {
            options.where = whereCondition;
        }
        const rows = await db.Product.findAll(options);
        const data = {
            iTotalRecords: +rows.length,
            data: rows,
        };
        return res.json(data);
    },
    createProduct: (req, res) => {
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
                return res.json('Producto creado')
            })
                .catch(error => console.log(error))
        } else {
            return res.status(400).json({ errors: errors.array() });
        }
    },
    editProduct: (req, res) => {
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
    deleteProduct: (req, res) => {
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