const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  const { produtoId, quantidade, data } = req.body;

  if (!produtoId || !quantidade || !data) {
    return res
      .status(400)
      .json({ message: "Produto, quantidade e data são obrigatórios!" });
  }

  try {
    const result = await Order.create({ produtoId, quantidade, data });
    return res
      .status(201)
      .json({ message: "Pedido criado com sucesso!", id: result.insertId });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao criar pedido", error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.getAll();
    return res.status(200).json(orders);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao buscar pedidos", error: error.message });
  }
};
