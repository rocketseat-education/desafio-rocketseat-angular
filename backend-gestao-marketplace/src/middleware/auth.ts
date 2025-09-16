import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWTPayload } from '../types';

const SECRET_KEY = 'SECRET_KEY';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    res.status(401).json({ 
      error: 'Token de acesso requerido',
      message: 'Forneça um token no header Authorization como Bearer token' 
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as JWTPayload;
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ 
        error: 'Token expirado',
        message: 'O token fornecido está expirado' 
      });
      return;
    }
    
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(403).json({ 
        error: 'Token inválido',
        message: 'O token fornecido é inválido' 
      });
      return;
    }

    res.status(500).json({ 
      error: 'Erro interno do servidor',
      message: 'Erro ao validar token' 
    });
  }
};