const Product = require("../models/product");
const Cart = require("../models/cart.js");
exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      // console.log("products", products);
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
  // Product.fetchAll()
  //   .then(({ rows }) => {
  //     res.render("shop/product-list", {
  //       prods: rows,
  //       pageTitle: "All Products",
  //       path: "/products",
  //     });
  //   })
  //   .catch((err) => console.log(err));
};
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId; //same as route
  Product.findAll({ where: { id: prodId } })
    .then((products) => {
      // console.log(products);
      res.render("shop/product-detail", {
        product: products[0],
        pageTitle: products[0].title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
  // Product.findByPk(prodId)
  //   .then((product) => {
  //     // console.log(products);
  //     res.render("shop/product-detail", {
  //       product: product,
  //       pageTitle: product.title,
  //       path: "/products",
  //     });
  //   })
  //   .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      // console.log("products", products);
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
  // Product.fetchAll()
  //   .then(({ rows }) => {
  //     res.render("shop/index", {
  //       prods: rows,
  //       pageTitle: "Shop",
  //       path: "/",
  //     });
  //   })
  //   .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart() //auto created method by sequelize
    .then((cart) => cart.getProducts())
    .then((products) =>
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
      })
    )
    .catch((err) => console.log(err));

  // Cart.getCart((cart) => {
  //   Product.fetchAll((products) => {
  //     const cartproducts = [];
  //     for (product of products) {
  //       const cartProductData = cart?.products.find(
  //         (prod) => prod.id === product.id
  //       );
  //       if (cartProductData) {
  //         cartproducts.push({ productData: product, qty: cartProductData.qty });
  //       }
  //     }
  //     res.render("shop/cart", {
  //       path: "/cart",
  //       pageTitle: "Your Cart",
  //       products: cartproducts,
  //     });
  //   });
  // });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let newQty = 1;
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQty = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId)
        .then((product) => {
          return fetchedCart.addProduct(product, {
            through: { quantity: newQty },
          });
        })
        .then(() => res.redirect("/cart"))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
  //same as view input name
  // console.log(prodId);
  // Product.findById(prodId, (product) => {
  //   Cart.addproduct(prodId, product.price);
  // });
  // res.redirect("/cart");
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  req.user
    .getCart()
    .then((cart) => {
      return cart
        .getProducts({ where: { id: prodId } })
        .then((products) => {
          const product = products[0];
          return product.cartItem.destroy();
        })
        .then((result) => {
          res.redirect("/Cart");
        });
    })
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
