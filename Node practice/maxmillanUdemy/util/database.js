// const { Pool } = require("pg");
const Sequelize = require("sequelize");
const config = {
  user: "postgres",
  host: "localhost",
  database: "test",
  password: "1234",
  port: 5432,
};
const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: "postgres",
  port: config.port,
});

// const pool = new Pool(config);

// module.exports = pool;

module.exports = sequelize;
