import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';
import { User, LoginRequest, LoginResponse, JWTPayload, RegisterRequest, RegisterResponse } from '../types';

const SECRET_KEY = 'SECRET_KEY';
const USERS_FILE = path.join(__dirname, '../../users.json');

// Carregar usuários do arquivo JSON
const loadUsers = (): User[] => {
  try {
    const userData = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(userData) as User[];
  } catch (error) {
    console.error('Erro ao carregar usuários:', error);
    return [];
  }
};

// Salvar usuários no arquivo JSON
const saveUsers = (users: User[]): void => {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
  } catch (error) {
    console.error('Erro ao salvar usuários:', error);
  }
};

// Encontrar usuário por email
const findUserByEmail = (email: string): User | undefined => {
  const users = loadUsers();
  return users.find(user => user.email === email);
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password }: LoginRequest = req.body;

    // Validar campos obrigatórios
    if (!email || !password) {
      res.status(400).json({
        error: 'Campos obrigatórios',
        message: 'Email e senha são obrigatórios'
      });
      return;
    }

    // Validar formato de email básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        error: 'Email inválido',
        message: 'Forneça um email válido'
      });
      return;
    }

    // Buscar usuário
    const user = findUserByEmail(email);
    if (!user) {
      res.status(401).json({
        error: 'Credenciais inválidas',
        message: 'Email ou senha incorretos'
      });
      return;
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({
        error: 'Credenciais inválidas',
        message: 'Email ou senha incorretos'
      });
      return;
    }

    // Gerar token JWT
    const payload: JWTPayload = {
      userId: user.id,
      email: user.email
    };

    const token = jwt.sign(payload, SECRET_KEY, { 
      expiresIn: '24h' 
    });

    // Resposta de sucesso
    const response: LoginResponse = {
      token,
      user: {
        id: user.id,
        email: user.email
      }
    };

    res.status(200).json({
      message: 'Login realizado com sucesso',
      data: response
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: 'Erro ao processar login'
    });
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password }: RegisterRequest = req.body;

    // Validar campos obrigatórios
    if (!email || !password) {
      res.status(400).json({
        error: 'Campos obrigatórios',
        message: 'Email e senha são obrigatórios'
      });
      return;
    }
    
    // Validar formato de email básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        error: 'Email inválido',
        message: 'Forneça um email válido'
      });
      return;
    }

    const users = loadUsers();

    // Verificar se o email já existe
    if (findUserByEmail(email)) {
      res.status(409).json({
        error: 'Conflito',
        message: 'Este email já está cadastrado'
      });
      return;
    }

    // Gerar hash da senha
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Gerar novo ID
    const newUserId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

    // Criar novo usuário
    const newUser: User = {
      id: newUserId,
      email,
      password: hashedPassword
    };

    // Adicionar novo usuário à lista e salvar
    users.push(newUser);
    saveUsers(users);

    // Resposta de sucesso
    const response: RegisterResponse = {
      message: 'Usuário cadastrado com sucesso',
      user: {
        id: newUser.id,
        email: newUser.email
      }
    };

    res.status(201).json(response);

  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: 'Erro ao processar cadastro'
    });
  }
};
