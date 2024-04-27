const path = require("path");
const fs = require("fs");
const dirpath = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);
const getProductsFromFile = (cb) => {
  fs.readFile(dirpath, (err, productContent) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(productContent));
  });
};
module.exports = class Product {
  constructor(t) {
    this.title = t;
  }
  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(dirpath, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }
  //   Static methods help organize code by
  //   associating a function with a class,
  //   rather than with individual objects
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
