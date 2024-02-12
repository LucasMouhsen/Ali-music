'use strict';
let groupCategories = require("../../data/groupCategories")

function datos () {
  for (let i = 0; i < groupCategories.length; i++) {
    groupCategories[i]={
      groupCategories: groupCategories[i],
      createdAt: new Date,
      updatedAt: new Date
    }
  }
  return groupCategories
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('GroupCategories', datos() , {});
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('GroupCategories', null, {});
  }
};
