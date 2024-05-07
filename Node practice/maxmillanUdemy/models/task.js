const Sequelize = require("sequelize");
const sequelize = require("../util/database.js");

const Task = sequelize.define("task", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING(250),
    allowNull: false,
  },
  status: {
    type: Sequelize.DataTypes.ENUM("planned", "ongoing", "done"),
    allowNull: false,
  },
});
module.exports = Task;
