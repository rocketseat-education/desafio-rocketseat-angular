import { Router } from "express";
import { authenticateToken } from "../middleware/auth";

const router = Router();

// Rotas protegidas (requerem autenticação)
router.get('/protected', authenticateToken, (req, res) => {
  res.json({
    message: 'Acesso autorizado!',
    user: req.user
  });
});

export default router;