const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Book extends Model {}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    bookName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    yearPublish: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    isbn: {
      type: DataTypes.STRING(17),
      allowNull: false,
      unique: true,
    },
    rentalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    course: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookcoverURL: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: false,
    modelName: 'book',
  }
);

module.exports = Book;
