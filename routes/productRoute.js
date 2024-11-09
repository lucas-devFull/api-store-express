const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { validateProductCategory } = require("../middleware/categoryMiddleware");
const { validateProduct } = require("../middleware/productMiddleware");
const authMiddleware = require("../middleware/verifyJWTMiddleware");

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Gerenciamento de produtos
 */

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Retorna todos os produtos
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []  # Requer token JWT
 *     responses:
 *       200:
 *         description: Lista de produtos.
 */

/**
 * @swagger
 * /produto:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []  # Requer token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               preco:
 *                 type: number
 *               categoriaId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Lista de produtos.
 */

/**
 * @swagger
 * /produto/{id}:
 *   put:
 *     summary: Atualiza um produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []  # Requer token JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               preco:
 *                 type: number
 *               categoriaId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso.
 *       404:
 *         description: Produto não encontrado.
 */

router.get("/produtos", authMiddleware, productController.getAllProducts);

router.post(
  "/produto",
  authMiddleware,
  validateProduct,
  validateProductCategory,
  productController.createProduct
);

// Rota para atualizar um produto (precisa de autenticação)
router.put(
  "/produto/:id",
  authMiddleware,
  validateProduct,
  validateProductCategory,
  productController.updateProduct
);

module.exports = router;
