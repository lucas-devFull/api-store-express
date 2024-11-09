const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { validateCategory } = require("../middleware/categoryMiddleware");
const authMiddleware = require("../middleware/verifyJWTMiddleware");

/**
 * @swagger
 * tags:
 *   name: Categorias
 *   description: Gerenciamento de categorias
 */

/**
 * @swagger
 * /categoria:
 *   post:
 *     summary: Adiciona uma nova categoria
 *     tags: [Categorias]
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
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso.
 */

router.post(
  "/categoria",
  authMiddleware,
  validateCategory,
  categoryController.createCategory
);

module.exports = router;
