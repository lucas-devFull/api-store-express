const { validationResult } = require("express-validator");
const db = require("../config/database"); // Conexão com o banco de dados

// Função para verificar se o produtoId existe
const checkProductExistence = (produtoId, callback) => {
  const query = "SELECT * FROM Produto WHERE id = ?";
  db.query(query, [produtoId], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result.length > 0);
  });
};

// Validação de dados de pedido
exports.validateOrder = (req, res, next) => {
  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { produtoId, quantidade, data } = req.body;

  if (!produtoId || !quantidade || !data) {
    return res
      .status(400)
      .json({ message: "Produto, quantidade e data são obrigatórios!" });
  }

  console.log("qui");

  // Verificar se o produtoId existe no banco
  checkProductExistence(produtoId, (err, exists) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Erro ao verificar produto", error: err.message });
    }
    if (!exists) {
      return res.status(400).json({ message: "Produto não encontrado." });
    }

    next();
  });
};
