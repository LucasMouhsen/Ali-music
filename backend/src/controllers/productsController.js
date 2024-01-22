/* const fs = require('fs'); */
/* const path = require('path'); */
/* const products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'),'utf-8')); */
const capitalizarPrimeraLetra = require("../utils/capitalizeOneLetter.js")
const db = require('../database/models');
const { Op } = require("sequelize");

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
    cart: (req, res) => {

        /* db.Cart.findAll({
            where : {
                userid: req.session.userLogin.id
            },
            include: ['products','images', 'productStates']
        })
        .then(products =>{
            return res.render('products/cart',{
                title: 'Cart',
                products : products
            })
        }) */

        db.Product.findAll({
            include: ['images', 'productStates']
        })
            .then(products => {
                return res.render('products/cart', {
                    title: 'Cart',
                    products: products
                })
            })
            .catch(err => console.log(err))
    },
    addCart: (req, res) => {
        db.Product.update(
            {
                cart: 1
            },
            {
                where: { id: req.params.id }
            }
        ).then(product => {
            let producto = product
            producto.cart = 1
            db.Cart.create(
                {
                    cartProductId: 1,
                    cartUserId: req.session.userLogin.id
                }
            )
            return res.redirect('/products/cart')
        })
            .catch(err => console.log(err))

    },
    info: (req, res) => {
        db.Product.findAll({
            include: ['images', 'productStates']
        })
            .then(products => {
                return res.render('products/infoUser', {
                    title: 'informacion de usuario',
                    products: products
                })
            })
            .catch(err => console.log(err))
    },
}