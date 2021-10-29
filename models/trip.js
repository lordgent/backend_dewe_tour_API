"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Trip.belongsTo(models.Country, {
        as: "Countries",
        foreignKey: {
          name: "idcountry",
        },
      });
    }
  }
  Trip.init(
    {
      title: DataTypes.STRING,
      idcountry: DataTypes.INTEGER,
      accomodation: DataTypes.STRING,
      transpotation: DataTypes.STRING,
      eat: DataTypes.STRING,
      day: DataTypes.INTEGER,
      night: DataTypes.INTEGER,
      datetrip: DataTypes.DATE,
      price: DataTypes.INTEGER,
      quota: DataTypes.INTEGER,
      desc: DataTypes.TEXT,
      imagestrip: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Trip",
    }
  );
  return Trip;
};
