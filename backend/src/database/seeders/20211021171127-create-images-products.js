'use strict';
let images = require("../../data/images.json")

function datos () {
  for(let i = 0; i < images.length; i++) {
   images[i]={
      image: images[i].image,
      productId: images[i].producto,
      createdAt: new Date,
      updatedAt: new Date
    }
  }
  return images
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('ImageProducts', datos() , {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('ImageProducts', null, {});
  }
};
