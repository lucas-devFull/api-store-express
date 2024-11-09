const db = require("../config/database");

class Product {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM Produto", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static create({ nome, preco, categoriaId }) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO Produto (nome, preco, categoriaId) VALUES (?, ?, ?)",
        [nome, preco, categoriaId],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  }

  static update(id, { nome, preco, categoriaId }) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE Produto SET nome = ?, preco = ?, categoriaId = ? WHERE id = ?",
        [nome, preco, categoriaId, id],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  }
}

module.exports = Product;
