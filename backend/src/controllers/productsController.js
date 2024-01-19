/* const fs = require('fs'); */
/* const path = require('path'); */
/* const products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'),'utf-8')); */
const capitalizarPrimeraLetra = require("../utils/capitalizeOneLetter.js")
const db = require('../database/models')

module.exports = {
    store: (req, res) => {
        db.Product.findAll({
            include : ['images','productStates']
        })
        .then(products =>{
            return res.render('products/store',{
                title: 'Store',
                products
            })
        })
        .catch(err=>console.log(err))
    },
    search: (req, res) => {
        return res.render('products/search',{
            title: 'Search',  /* Aca se muestra lo buscado */
            filtar,/* filtrar para encontrar lo que se busca */
        })
    },
    detail: (req, res) => {
            db.Product.findAll({
                include : ['images','productStates']
            })
            .then(products  =>{
                let product = products.find(product => product.id === +req.params.id)
                return res.render('products/detail',{
                    title: capitalizarPrimeraLetra(product.name),
                    products : products,
                    product
                })
            })
            .catch(err=>console.log(err))
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
            include : ['images','productStates']
        })
        .then(products  =>{
            return res.render('products/cart',{
                title: 'Cart',
                products : products
            })
        })
        .catch(err=>console.log(err))
    },
    addCart: (req, res) => {
        db.Product.update(
            {
                cart: 1
            },
            {
                where: {id: req.params.id}
            }
        ).then(product =>{
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
        .catch(err=>console.log(err))
            
    },
    info: (req, res) => {
        db.Product.findAll({
            include : ['images','productStates']
        })
        .then(products  =>{
            return res.render('products/infoUser',{
                title: 'informacion de usuario',
                products : products
            })
        })
        .catch(err=>console.log(err))
    },
}