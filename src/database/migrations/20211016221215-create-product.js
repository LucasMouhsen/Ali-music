'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(10000),
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(8,2),
        allowNull: false,
      },
      discount: {
        type: Sequelize.INTEGER
      },
      fav: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sold: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cart: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references : {
          model : {
            tableName : 'Users',
          },
          key : 'id'
        }
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references : {
          model : {
            tableName : 'Categories',
          },
          key : 'id'
        }
      },
      statusId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references : {
          model : {
            tableName : 'ProductStates',
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
    await queryInterface.dropTable('Products');
  }
};