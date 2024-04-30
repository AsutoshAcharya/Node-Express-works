// const fs = require("fs");
// const path = require("path");
// const Cart = require("./cart.js");
// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   "data",
//   "products.json"
// );

// const getProductsFromFile = (cb) => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     } else {
//       cb(JSON.parse(fileContent));
//     }
//   });
// };

const db = require("../util/database.js");
const { products } = require("../util/tableNames.js");
module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    //to file
    // this.id = Math.random().toString();
    // getProductsFromFile((products) => {
    //   products.push(this);
    //   fs.writeFile(p, JSON.stringify(products), (err) => {
    //     console.log(err);
    //   });
    // });
    //to db

    return db.query(
      `INSERT INTO ${products} (id,title,price,description,"imageUrl") VALUES ($1,$2,$3,$4,$5)`,
      [
        Math.floor(Math.random() * 10000),
        this.title,
        this.price,
        this.description,
        this.imageUrl,
      ]
    );
  }
  static delete(prodId) {
    // getProductsFromFile((products) => {
    //   const product = products.find((prod) => prod.id === prodId);
    //   const updatedProducts = products.filter((p) => p.id !== prodId);
    //   fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
    //     if (!err) {
    //       Cart.deleteProduct(prodId, product.price);
    //     }
    //   });
    // });
  }

  static fetchAll() {
    // getProductsFromFile(cb);
    return db.query(`SELECT * FROM ${products}`);
  }

  static findById(prodId) {
    // getProductsFromFile((products) => {
    //   return cb(products.find((product) => product.id === prodId) || []);
    // });
    return db.query(`SELECT * FROM ${products} WHERE products.id= $1`, [
      prodId,
    ]);
  }
};
