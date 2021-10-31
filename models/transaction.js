"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.Trip, {
        as: "Trips",
        foreignKey: {
          name: "idtrip",
        },
      });

      Transaction.belongsTo(models.Users, {
        foreignKey: {
          name: "iduser",
        },
      });
    }
  }
  Transaction.init(
    {
      iduser: DataTypes.INTEGER,
      idtrip: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      payment: DataTypes.STRING,
      subtotal: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
