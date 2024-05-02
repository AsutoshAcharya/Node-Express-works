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
  req.user.createProduct({ title,//auto create function by sequelize to associate product with user
    price,
    imageUrl,
    description}) 
    .then((result) => {
      console.log("Created product");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};


exports.deleteProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.destroy({ where: { id: prodId } })
    .then((result) => {
      console.log("Product deleted");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const prodId = req.params.productId;
  // console.log(prodId);
  Product.findByPk(prodId)
    .then((product) => {
      product.title = title;
      product.price = price;
      product.imageUrl = imageUrl;
      product.description = description;
      return product.save();
    })
    .then((result) => {
      console.log("Updated product!!");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
  // Product.update((products) => {
  //   const updatedProducts = products.map((p) => {
  //     if (p.id !== prodId) return p;
  //     return { id: p.id, title, imageUrl, price, description };
  //   });
  //   fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
  //     console.log(err);
  //   });
  //   res.redirect("/");
  // });
  // const product = new Product(title, imageUrl, description, price);
  // product.save();
  // res.redirect("/");
};
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;

  if (!editMode) return res.redirect("/");
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  // Product.findAll()
  //   .then((products) => {
  //     res.render("admin/products", {
  //       prods: products,
  //       pageTitle: "Admin Products",
  //       path: "/admin/products",
  //     });
  //   })
  //   .catch((err) => console.log(err));
  req.user.getProducts().then(products=>{ //using getProducts sequelize method to fetch products related to the user
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  }).catch(err=>console.log(err))
};
