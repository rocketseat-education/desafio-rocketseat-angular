import { Router } from "express";

const router = Router();

// Rota de teste para verificar se o servidor está funcionando
router.get('/', (req, res) => {
  res.json({
    message: 'Servidor JWT Auth está funcionando!'
  });
});

export default router;