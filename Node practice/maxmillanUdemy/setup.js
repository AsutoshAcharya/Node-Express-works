const { Client } = require("pg");
const config = {
  user: "postgres",
  host: "localhost",
  database: "test",
  password: "1234",
  port: 5432,
};
console.log(config);
const postgresClient = new Client(config);

async function postgresSetup() {
  try {
    await postgresClient.connect();
    console.log("Connected to PostgresSQL database");
    postgresClient.query(
      "SELECT * FROM mock_data WHERE id<20 AND email IS NOT null",
      (err, res) => {
        if (!err) {
          console.log(res.rows);
        } else {
          console.log(err.message, "here");
        }
      }
    );
  } catch (error) {
    console.log("Error connecting db", error);
  }
}

module.exports = {
  postgresSetup,
};
