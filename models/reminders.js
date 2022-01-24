'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reminders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Reminders.init({
    title: DataTypes.STRING,
    reminder: DataTypes.STRING,
    hourMinuteBegin: DataTypes.TIME,
    hourMinuteEnd: DataTypes.TIME,
    date: DataTypes.DATE,
    country: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    color: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Reminders',
  });
  return Reminders;
};