'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post,{
        as:"posts"
      })
      User.belongsToMany(models.Product,{
        as:"productsCart",
        through:"carts",
        foreignKey: "cartUserId",
        otherKey:"cartProductId"
      })
      User.hasMany(models.Product,{
        as:"products"
      })
    }
  };
  User.init({
    userName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    number: DataTypes.BIGINT,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
    rol: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};