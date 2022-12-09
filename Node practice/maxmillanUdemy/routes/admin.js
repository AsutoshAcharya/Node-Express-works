const express = require("express");
const path = require("path");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false })); //parser
router.get("/add-product", (req, res, next) => {
  // console.log("in users another middleware");
  res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));
});
router.post("/product", (req, res, next) => {
  // console.log("in  homepage middleware");
  console.log(req.body);
  res.redirect("/");
});
module.exports = router;
