const { validationResult } = require("express-validator");
const db = require("../config/database");

const checkCategoryExistence = (categoriaId, callback) => {
  const query = "SELECT * FROM Categoria WHERE id = ?";
  db.query(query, [categoriaId], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result.length > 0);
  });
};

exports.validateProduct = (req, res, next) => {
  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nome, preco, categoriaId } = req.body;

  if (!nome || !preco || !categoriaId) {
    return res
      .status(400)
      .json({ message: "Nome, preço e categoriaId são obrigatórios!" });
  }

  checkCategoryExistence(categoriaId, (err, exists) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Erro ao verificar categoria", error: err.message });
    }
    if (!exists) {
      return res.status(400).json({ message: "Categoria não encontrada." });
    }

    next();
  });
};
