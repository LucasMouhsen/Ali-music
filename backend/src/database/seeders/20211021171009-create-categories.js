'use strict';
let categories = require("../../data/categories")

function datos () {
  for (let i = 0; i < categories.length; i++) {
    categories[i]={
      category: categories[i],
      createdAt: new Date,
      updatedAt: new Date
    }
  }
  return categories
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Categories', datos() , {});
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Categories', null, {});
  }
};
