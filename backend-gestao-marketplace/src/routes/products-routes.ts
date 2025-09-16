import { Router } from 'express';
import { createProduct, getProducts, updateProduct } from '../controllers/products-controller';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Rota para obter todos os produtos
router.get('/', authenticateToken, getProducts);

// Rota para cadastrar um novo produto
router.post('/', authenticateToken, createProduct);

// Rota para editar um produto por ID
router.put('/:id', authenticateToken, updateProduct);

export default router;