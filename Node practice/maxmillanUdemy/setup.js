const { Client } = require("pg");
const config = {
  user: process.env.USER,
  host: process.env.HOST,
  databse: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
};
console.log(config);
const postgresClient = new Client(config);

async function postgresSetup() {
  try {
    await postgresClient.connect();
    console.log("Connected to PostgresSQL database");
  } catch (error) {
    console.log("Error connecting db", error);
  }
}
module.exports = {
  postgresSetup,
};
