const capitalizarPrimeraLetra = require("../utils/capitalizeOneLetter.js")
const db = require('../database/models');
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const queryInterface = db.sequelize.getQueryInterface();

module.exports = {
    products: async (req, res) => {
        const { id, name } = req.query;

        // Inicializar options sin ninguna restricción específica
        let options = {
            include: ['images', 'productStates'],
            order: [['id', 'DESC']]
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
            const { userId } = req
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
                    userId: userId,
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
    editProduct: async (req, res) => {
        try {
            // Validamos que no lleguen errores del middleware
            let errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(errors.array());
            }
            const { name, description, price, discount, category } = req.body;
            const { userId } = req;

            // Buscamos el producto en la base de datos
            const updatedProduct = await db.Product.findByPk(req.params.id);
            if (!updatedProduct) {
                return res.status(404).json('Producto no encontrado');
            }

            // Si el producto no es del usuario, devolvemos un error
            if (updatedProduct.userId !== userId) {
                return res.status(403).json('Usted no es el propietario de este producto');
            }

            // Editamos Product en base a los datos recibidos
            await db.Product.update(
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
            );


            // Buscamos las imágenes del producto
            const images = req.files.map(image => ({
                image: image.filename,
                productId: req.params.id
            }));

            if (req.files.length !== 0) {
                // Eliminamos las imágenes viejas y agregamos las nuevas
                await queryInterface.bulkDelete('imageproducts', {
                    productId: req.params.id
                });

                // Guardamos las imágenes asociadas al producto
                await db.ImageProduct.bulkCreate(images, { validate: true, updateOnDuplicate: ["productId"] });
                console.log('Imágenes guardadas satisfactoriamente');
            }

            return res.json('Producto actualizado');
        } catch (error) {
            console.error(error);
            return res.status(500).json('Error interno del servidor');
        }
    },
    deleteProduct: (req, res) => {
        // Buscamos el producto con sus imagenes
        const { userId } = req
        db.Product.findByPk(req.params.id, {
            include: ['images']
        })
            .then((product) => {
                // si no encontramos el producto devolvemos el error
                if (!product) {
                    return res.status(404).json('Producto no encontrado');
                }
                // si el producto no es del usuario devolvemos error
                if (product.userId !== userId) {
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