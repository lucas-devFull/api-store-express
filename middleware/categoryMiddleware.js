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

const checkCreatedCategoryByName = (name, callback) => {
  const query = "SELECT * FROM Categoria WHERE nome = ?";
  db.query(query, [name], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result.length > 0);
  });
};

exports.validateCategory = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nome } = req.body;
  if (!nome || !(nome.length > 0))
    return res
      .status(400)
      .json({ message: "Nome da categoria é obrigatório!" });

  checkCreatedCategoryByName(nome, (err, exists) => {
    if (err) return res.status(400).json({ message: err.message });
    if (exists)
      return res.status(400).json({ message: "Categoria já cadastrada" });

    next();
  });
};

// Validação de categoria ao criar um produto
exports.validateProductCategory = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { categoriaId } = req.body;
  if (!categoriaId)
    return res.status(400).json({ message: "CategoriaId é obrigatório!" });

  // Verificar se a categoriaId existe no banco
  checkCategoryExistence(categoriaId, (err, exists) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Erro ao verificar categoria", error: err.message });
    }
    if (!exists) {
      return res.status(400).json({ message: "Categoria não encontrada." });
    }

    next();
  });
};
