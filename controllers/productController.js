const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAll();
    return res.status(200).json(products);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao buscar produtos", error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  const { nome, preco, categoriaId } = req.body;

  if (!nome || !preco || !categoriaId) {
    return res
      .status(400)
      .json({ message: "Nome, preço e categoria são obrigatórios!" });
  }

  try {
    const result = await Product.create({ nome, preco, categoriaId });
    return res
      .status(201)
      .json({ message: "Produto criado com sucesso!", id: result.insertId });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao criar produto", error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { nome, preco, categoriaId } = req.body;

  if (!nome || !preco || !categoriaId) {
    return res
      .status(400)
      .json({ message: "Nome, preço e categoria são obrigatórios!" });
  }

  try {
    const result = await Product.update(id, { nome, preco, categoriaId });
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "Produto não encontrado" });
    }
    return res.status(200).json({ message: "Produto atualizado com sucesso!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao atualizar produto", error: error.message });
  }
};
