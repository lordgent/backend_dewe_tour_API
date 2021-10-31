"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasMany(models.Transaction, {
        as: "Transactions",
        foreignKey: {
          name: "iduser",
        },
      });
    }
  }

  Users.init(
    {
      fullname: DataTypes.STRING,
      nophone: DataTypes.STRING,
      imgprofile: DataTypes.STRING,
      gender: DataTypes.STRING,
      address: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
