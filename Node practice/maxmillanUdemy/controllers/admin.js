const fs = require("fs");
const path = require("path");

const Product = require("../models/product");
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);
exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // const product = new Product(title, imageUrl, description, price);
  // product
  //   .save()
  //   .then(() => {
  //     res.redirect("/");
  //   })
  //   .catch((err) => console.log(err));
  Product.create({
    title,
    price,
    imageUrl,
    description,
  })
    .then((result) => console.log("Created product"))
    .catch((err) => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.delete(prodId);
  res.redirect("/admin/products");
};

exports.postEditProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const prodId = req.params.productId;
  // console.log(prodId);
  Product.fetchAll((products) => {
    const updatedProducts = products.map((p) => {
      if (p.id !== prodId) return p;
      return { id: p.id, title, imageUrl, price, description };
    });
    fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
      console.log(err);
    });
    res.redirect("/");
  });
  // const product = new Product(title, imageUrl, description, price);
  // product.save();
  // res.redirect("/");
};
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;

  if (!editMode) return res.redirect("/");
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};
