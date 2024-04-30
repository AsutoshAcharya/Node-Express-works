const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database.js");
const errorController = require("./controllers/error");
const Product = require("./models/product.js");
const User = require("./models/user.js");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");
// postgresSetup();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// db.query("SELECT * FROM products")
//   .then((res) => {
//     console.log(res.rows);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
//User.hasMany(Product)

sequelize
  .sync({ force: true }) // it automatically creates the table if the table is not available on database and syncs the table data on the server
  .then((result) => {
    // console.log("result:", result);
    app.listen(3000);
  })
  .catch((err) => {
    // console.log("err:", err);
  });
