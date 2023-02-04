const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (onComplete) => {
  fs.readFile(p, (error, fileContent) => {
    if (error) {
      onComplete([]);
    } else {
      onComplete(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }
  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (error) => {
        console.log(error);
      });
    });
  }
  static fetchAll(onComplete) {
    getProductsFromFile(onComplete);
  }
};
