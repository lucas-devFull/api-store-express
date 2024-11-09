const db = require("../config/database");

exports.createCategory = (nome, callback) => {
  const query = "INSERT INTO Categoria (nome) VALUES (?)";
  db.query(query, [nome], (err, result) => {
    if (err) {
      return callback({
        message: "Erro ao criar categoria",
        status: 400,
      });
    }

    return callback(null, { id: result.insertId });
  });
};
