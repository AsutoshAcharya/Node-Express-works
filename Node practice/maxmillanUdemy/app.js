//require used to import something in js
//path to your module starts with "./yourModule"
// const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//middlewares
app.use(bodyParser.urlencoded({ extended: false })); //parser
app.use("/add-products", (req, res, next) => {
  // console.log("in users another middleware");
  res.send(
    `<form action="/product" method="POST"><input type="text" /><button type="submit">Add Product</button> </form>`
  );
});
app.use("/product", (req, res, next) => {
  // console.log("in  homepage middleware");
  console.log(req.body);
  res.redirect("/");
});
// const routes = require("./routes");
// const { text } = require("stream/consumers");
//called by node js every time a request is made to server

//createServer returns server

app.listen(3000, () => {
  console.log("server started at port 3000");
});
