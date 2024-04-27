const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

const Product = require("../models/product.js");

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
  res.render("add-product", { pageTitle: "Add Product" });
});

// /admin/add-product => POST
router.post("/add-product", (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
});

exports.routes = router;
