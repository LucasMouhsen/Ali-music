'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupCategories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GroupCategories.hasMany(models.Category,{
        as: 'category',
        foreignKey:'groupId'
      })
      
    }
  };
  GroupCategories.init({
    GroupCategories: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'GroupCategories',
  });
  return GroupCategories;
};