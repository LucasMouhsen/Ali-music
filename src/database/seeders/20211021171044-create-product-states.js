'use strict';
let states = ["new","visited","discount"]

function datos(){
  for(let i = 0; i < states.length; i++) {
   states[i]={
      state: states[i],
      createdAt: new Date,
      updatedAt: new Date
    }
  }
  return states
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
       await queryInterface.bulkInsert('ProductStates', datos(), {});
 
  },

  down: async (queryInterface, Sequelize) => {
       await queryInterface.bulkDelete('ProductStates', null, {});
  }
};
