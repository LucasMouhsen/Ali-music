'use strict';
let productos= require("../../data/products.json")

function datos () {
  for(let i = 0; i < productos.length; i++) {
   productos[i]={
      name: productos[i].name,
      description: productos[i].description,
      price: productos[i].price,
      discount: productos[i].discount,
      fav: 0,
      sold: 0,
      cart: 0,
      userId: 1,
      categoryId: productos[i].category,
      statusId: productos[i].statusId,
      createdAt: new Date,
      updatedAt: new Date
    }
  }
  return productos
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
       await queryInterface.bulkInsert('Products', datos(), {});
  },

  down: async (queryInterface, Sequelize) => {
       await queryInterface.bulkDelete('Products', null, {});
  }
};
