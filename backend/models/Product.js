const db = require('../config/db');

class Product {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM Products');
    return rows;
  }

  static async getById(productId) {
    const [rows] = await db.query('SELECT * FROM Products WHERE product_id = ?', [productId]);
    return rows[0];
  }
}

module.exports = Product;