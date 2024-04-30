const Sequelize = require("sequelize");
const sequelize = require("../util/database.js");
const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(65),
    allowNull: false,
    unique: true,
  },
  name: {
    type: Sequelize.STRING(150),
    allowNull: false,
  },
});
module.exports = User;
