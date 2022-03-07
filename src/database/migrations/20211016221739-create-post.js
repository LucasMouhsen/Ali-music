'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      postName: {
        type: Sequelize.STRING(250),
        allowNull: false,
      },
      iframe: {
        type: Sequelize.STRING(100)
      },
      image: {
        type: Sequelize.STRING(100)
      },
      video: {
        type: Sequelize.STRING(100)
      },
      description: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      typeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references : {
          model : {
            tableName : 'Types',
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
    await queryInterface.dropTable('Posts');
  }
};