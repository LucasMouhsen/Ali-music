'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.ImageProduct,{
        as:"images"
      })
      Product.belongsTo(models.Category,{
        as:"category",
        foreignKey:"categoryId"
      })
      Product.belongsTo(models.ProductState,{
        as:"productStates",
        foreignKey:"statusId"
      })
      Product.belongsToMany(models.User,{
        as:"usersCart",
        through:"carts",
        foreignKey: "cartProductId",
        otherKey:"cartUserId"
      })
      Product.belongsTo(models.User,{
        as:"user"
      })
    }
  };
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    discount: DataTypes.INTEGER,
    fav: DataTypes.INTEGER,
    sold: DataTypes.INTEGER,
    cart: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    statusId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};