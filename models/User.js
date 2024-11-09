const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/database"); // Conexão com o banco de dados

// Função para registrar um novo usuário
exports.registerUser = (data, callback) => {
  const { nome, cpf, telefone, endereco, login, senha } = data;
  // Verificar se os dados obrigatórios estão presentes

  bcrypt.hash(senha, 10, (err, hashedPassword) => {
    if (err)
      return callback({
        status: 400,
        message: "Erro ao criptografar a senha",
      });

    // Salvar o usuário no banco de dados
    const query =
      "INSERT INTO Usuario (nome, cpf, telefone, endereco, login, senha) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(
      query,
      [nome, cpf, telefone, endereco, login, hashedPassword],
      (err) => {
        console.log(err);

        if (err)
          return callback({
            status: 400,
            message: "Erro ao registrar o usuário",
          });

        return callback(null);
      }
    );
  });
};

exports.loginUser = (data, callback) => {
  const { login, senha } = data;
  const query = "SELECT * FROM Usuario WHERE login = ?";
  db.query(query, [login], (err, results) => {
    if (err) return callback({ status: 400, message: err.message });

    if (results.length === 0)
      callback({ status: 400, message: "Usuario não encontrado!" });

    const user = results[0];
    bcrypt.compare(senha, user.senha, (err, isMatch) => {
      if (err) {
        return callback({ status: 400, message: "Erro ao comparar as senhas" });
      }

      if (!isMatch) {
        return callback({ status: 400, message: "Senha incorreta" });
      }

      // Gerar o token JWT
      const token = jwt.sign(
        { id: user.id, login: user.login },
        process.env.SECRETKEY,
        {
          expiresIn: "1h", // Token expira em 1 hora
        }
      );

      return callback(null, {
        user: user,
        message: "Login bem-sucedido!",
        token: token,
      });
    });
  });
};
