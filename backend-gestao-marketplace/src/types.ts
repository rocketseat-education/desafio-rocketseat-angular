export interface User {
  id: number;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  user: {
    id: number;
    email: string;
  };
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
  };
}

export interface JWTPayload {
  userId: number;
  email: string;
  iat?: number;
  exp?: number;
}

export type ProductStatus = "vendido" | "desativado" | "anunciado";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  status: ProductStatus;
  imageBase64: string;
}

export interface ProductRequest {
  title: string;
  price: number;
  description: string;
  category: string;
  imageBase64: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}