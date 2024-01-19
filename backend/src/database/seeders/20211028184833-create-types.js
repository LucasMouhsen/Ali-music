'use strict';
let types = ["text","iframe","image","video"]

function datos(){
  for(let i = 0; i < types.length; i++) {
   types[i]={
      type: types[i],
      createdAt: new Date,
      updatedAt: new Date
    }
  }
  return types
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
       await queryInterface.bulkInsert('Types', datos(), {});
 
  },

  down: async (queryInterface, Sequelize) => {
       await queryInterface.bulkDelete('Types', null, {});
  }
};
