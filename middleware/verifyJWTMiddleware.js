const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Obtendo o token dos headers de autorização
  const authData = req.headers["authorization"];

  if (!authData) {
    return res.status(403).json({ message: "Token de acesso não enviado!" });
  }

  const token = authData.split(" ")[1];

  jwt.verify(token, process.env.SECRETKEY, (err, userDecoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Token inválido ou expirado", error: err.message });
    }

    // Salva o usuário decodificado na requisição para uso futuro
    req.user = userDecoded;

    // Passa o controle para o próximo middleware ou rota
    next();
  });
};
