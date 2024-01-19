const {check} = require('express-validator');

module.exports=[
    check("name").notEmpty().withMessage("Debes indicar el nombre del producto").bail(),
    check("price").notEmpty().withMessage("Debes indicar el precio del producto").bail().isNumeric().withMessage("Solo se permiten números").bail(),

    check("discount").isInt({ max: 90 }).withMessage("Solo se permiten números hasta 90").bail(),

    check("category").notEmpty().withMessage("Por favor selecciona una categoria").bail(),
    check("description").notEmpty().withMessage("Debes dar una descripción del producto").isLength({min:10}).withMessage("La descripción debe tener minimo 10 caracteres").bail(),
]