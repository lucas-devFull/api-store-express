const db = require("../config/database");

class Order {
  static create({ produtoId, quantidade, data }) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO Pedido (produtoId, quantidade, data) VALUES (?, ?, ?)",
        [produtoId, quantidade, data],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM Pedido", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = Order;
