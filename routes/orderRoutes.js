const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { validateOrder } = require("../middleware/orderMiddleware");
const authMiddleware = require("../middleware/verifyJWTMiddleware");

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: Gerenciamento de pedidos
 */

/**
 * @swagger
 * /pedidos:
 *   get:
 *     summary: Retorna todos os pedidos
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []  # Requer token JWT
 *     responses:
 *       200:
 *         description: Lista de pedidos.
 */

/**
 * @swagger
 * /pedido:
 *   post:
 *     summary: Cria um novo pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []  # Requer token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               produtoId:
 *                 type: integer
 *               quantidade:
 *                 type: integer
 *               data:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso.
 */

router.get("/pedidos", authMiddleware, orderController.getAllOrders);
router.post(
  "/pedido",
  authMiddleware,
  validateOrder,
  orderController.createOrder
);

module.exports = router;
