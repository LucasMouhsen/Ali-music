'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User,{
        as: 'user',
      }
        )
      Post.belongsTo(models.Type,{
        as : 'type'
      })
    }
  };
  Post.init({
    userId: DataTypes.INTEGER,
    postName: DataTypes.STRING,
    iframe: DataTypes.STRING,
    image: DataTypes.STRING,
    video: DataTypes.STRING,
    description: DataTypes.STRING(1000),
    typeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};