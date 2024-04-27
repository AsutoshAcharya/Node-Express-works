const path = require("path");

const express = require("express");

const rootDir = require("../util/path");
const Products = require("../models/product.js");

const router = express.Router();

router.get("/", (req, res, next) => {
  Products.fetchAll((prods) => {
    res.render("shop", { prods: prods, docTitle: "Shop" });
  });
});

module.exports = router;
