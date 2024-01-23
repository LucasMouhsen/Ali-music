/* const fs = require('fs'); */
/* const path = require('path'); */
/* const products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'),'utf-8')); */
const capitalizarPrimeraLetra = require("../utils/capitalizeOneLetter.js")
const db = require('../database/models');
const { Op } = require("sequelize");
const { validationResult, body } = require("express-validator");
const queryInterface = db.sequelize.getQueryInterface();

module.exports = {
    products: async (req, res) => {
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
        // Buscaqueda por base
        const rows = await db.Product.findAll(options);
        // Retorno json con cantidad de filas y la informacion
        const data = {
            iTotalRecords: +rows.length,
            data: rows,
        };
        return res.json(data);
    },
    createProduct: (req, res) => {
        // Validamos que no lleguen errores del middleware
        let errors = validationResult(req);
        // Si no hay errores que cree el producto
        if (errors.isEmpty()) {
            const { name, price, discount, category, description } = req.body
            const status = 1
            // Creamos un nuevo objeto Product en base a los datos recibidos
            db.Product.create(
                {
                    name: name.trim(),
                    description: description.trim(),
                    price: +price,
                    discount: +discount,
                    fav: 0,
                    sold: 0,
                    cart: 0,
                    userId: req.session.userLogin.id,
                    categoryId: category,
                    statusId: status
                }
            ).then(product => {
                // Verificamos si hay imagenes, en el caso que no haya debolbemos error
                if (req.files.length == 0) {
                    return res.json('Debes enviar una imagen')
                }
                // Recorremos las imágenes para guardarlas en la BD
                let images = req.files.map(image => {
                    let item = {
                        image: image.filename,
                        productId: product.id
                    }
                    return item
                })
                // Guardamos las imágenes asociadas al producto
                db.ImageProduct.bulkCreate(images, { validate: true })
                    .then(() => console.log('imagenes guardadas satisfactoriamente'))
                return res.json('Producto creado')
            })
                .catch(error => console.error(error))
        } else {
            return res.status(400).json({ errors: errors.array() });
        }
    },
    editProduct: (req, res) => {
        // Validamos que no lleguen errores del middleware
        let errors = validationResult(req);
        // Si no hay errores que edite el producto
        if (errors.isEmpty()) {
            const { name, description, price, discount, category } = req.body;
            // editamos Product en base a los datos recibidos
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
            ).then(async () => {
                // buscamos el producto por base
                const updatedProduct = await db.Product.findByPk(req.params.id);
                // Si no encontramos producto devolvemos error
                if (!updatedProduct) {
                    return res.status(404).json('Producto no encontrado');
                }
                // Si el producto no es del usuario devolvemos error
                if (updatedProduct.userId !== req.session.userLogin.id) {
                    return res.status(403).json('Usted no es el propietario de este producto');
                }
                // buscamos las imagenes del producto
                db.ImageProduct.findByPk(req.params.id, {
                    include: ['product']
                })
                    .then(async () => {
                        if (req.files.length !== 0) {
                            let images = req.files.map(image => {
                                let item = {
                                    image: image.filename,
                                    productId: req.params.id
                                }
                                return item
                            });
                            // eliminamos las imagenes viejas y agregamos las nuevas
                            await queryInterface.bulkDelete('imageproducts', {
                                productId: req.params.id
                            });
                            // Guardamos las imágenes asociadas al producto
                            db.ImageProduct.bulkCreate(images, { validate: true, updateOnDuplicate: ["productId"] })
                                .then(() => console.log('Imágenes guardadas satisfactoriamente'))
                                .catch(error => console.error(error));
                        }
                        return res.json('Producto actualizado');
                    })
                    .catch(error => console.error(error));
            });
        } else {
            return res.status(400).json(errors.array());
        }
    },
    deleteProduct: (req, res) => {
        // Buscamos el producto con sus imagenes
        db.Product.findByPk(req.params.id, {
            include: ['images']
        })
            .then((product) => {
                // si no encontramos el producto devolvemos el error
                if (!product) {
                    return res.status(404).json('Producto no encontrado');
                }
                // si el producto no es del usuario devolvemos error
                if (product.userId !== req.session.userLogin.id) {
                    return res.status(403).json('Usted no es el propietario de este producto');
                }
                // Destruimos primero las imagenes
                db.ImageProduct.destroy({
                    where: {
                        productId: +req.params.id
                    }
                })
                // Luego el producto
                db.Product.destroy({
                    where: {
                        id: +req.params.id
                    }
                })
                return res.json('Producto eliminado');
            })


    },
}