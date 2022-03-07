'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cartProductId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references : {
          model : {
            tableName : 'Products',
          },
          key : 'id'
        }
      },
      cartUserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references : {
          model : {
            tableName : 'Users',
          },
          key : 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Carts');
  }
};