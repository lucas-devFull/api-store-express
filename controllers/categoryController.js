const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  const { nome } = req.body;
  Category.createCategory(nome, (err, result) => {
    if (err) return res.status(err.status).json({ message: err.message });

    return res
      .status(201)
      .json({ message: "Categoria criada com sucesso!", id: result.id });
  });
};
