const { validationResult } = require("express-validator");
const db = require("../config/database"); // Conexão com o banco de dados

// Função para verificar se o CPF já existe
const checkCpfExistence = (cpf, callback) => {
  if (cpf.toString().length > 11)
    return callback({ message: "CPF maior que 11 digitos" });
  const query = "SELECT * FROM Usuario WHERE cpf = ?";
  db.query(query, [cpf], (err, result) => {
    if (err) {
      return callback(err, null);
    }

    callback(null, result.length > 0);
  });
};

// Função para verificar se o login já existe
const checkLoginExistence = (login, callback) => {
  const query = "SELECT * FROM Usuario WHERE login = ?";
  db.query(query, [login], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result.length > 0);
  });
};

exports.validateLogin = (req, res, next) => {
  const errors = validationResult(req.body);
  if (!errors.isEmpty() || !req.body.login || !req.body.senha)
    return res.status(400).json("Dados Incorretos");

  next();
};

// Validação de dados de usuário
exports.validateUser = (req, res, next) => {
  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    return res.status(400).json("Dados Incorretos");
  }

  const { nome, cpf, telefone, endereco, login, senha } = req.body;

  if (!nome || !cpf || !telefone || !login || !senha) {
    return res.status(400).json({
      message: "Nome, CPF, telefone, login e senha são obrigatórios!",
    });
  }

  // Verificar se o CPF já existe no banco
  checkCpfExistence(cpf, (err, exists) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (exists) {
      return res.status(400).json({ message: "CPF já registrado." });
    }

    // Verificar se o login já existe no banco
    checkLoginExistence(login, (err, exists) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Erro ao verificar login", error: err.message });
      }
      if (exists) {
        return res.status(400).json({ message: "Login já registrado." });
      }

      next();
    });
  });
};
