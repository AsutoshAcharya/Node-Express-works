//require used to import something in js
//path to your module starts with "./yourModule"
// const http = require("http");
const express = require("express");

const adminRouter = require("./routes/admin.js");
const shopRouter = require("./routes/shop");
const userRouter = require("./routes/index");
const app = express();

//middlewares

app.use("/admin", adminRouter);
app.post("/admin", adminRouter);
app.use(userRouter);
app.use(shopRouter);

//404 Error page
app.use((req, res, next) => {
  res.status(404).send("<h1>page not found</h1>");
});

// const routes = require("./routes");
// const { text } = require("stream/consumers");
//called by node js every time a request is made to server

//createServer returns server

app.listen(3000, () => {
  console.log("server started at port 3000");
});
