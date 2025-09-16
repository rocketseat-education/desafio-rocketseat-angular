import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { Product, ProductRequest } from '../types';

const PRODUCTS_FILE = path.join(__dirname, '../../products.json');

// Carregar produtos do arquivo JSON
const loadProducts = (): Product[] => {
  try {
    const productsData = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    return JSON.parse(productsData) as Product[];
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    return [];
  }
};

// Salvar produtos no arquivo JSON
const saveProducts = (products: Product[]): void => {
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8');
  } catch (error) {
    console.error('Erro ao salvar produtos:', error);
  }
};

export const getProducts = (req: Request, res: Response): void => {
  try {
    const products = loadProducts();
    res.status(200).json({
      message: 'Produtos listados com sucesso',
      data: products
    });
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: 'Não foi possível listar os produtos'
    });
  }
};

export const createProduct = (req: Request, res: Response): void => {
  try {
    const { title, price, description, category, imageBase64 }: ProductRequest = req.body;

    // Validar campos obrigatórios
    if (!title || !price || !description || !category || !imageBase64) {
      res.status(400).json({
        error: 'Campos obrigatórios',
        message: 'Título, preço, descrição, categoria e imagem são obrigatórios.'
      });
      return;
    }

    const products = loadProducts();

    // Gerar novo ID
    const newProductId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

    // Criar novo produto
    const newProduct: Product = {
      id: newProductId,
      title,
      price,
      description,
      category,
      status: "anunciado",
      imageBase64
    };

    // Adicionar novo produto à lista e salvar
    products.push(newProduct);
    saveProducts(products);

    res.status(201).json({
      message: 'Produto cadastrado com sucesso',
      data: newProduct
    });

  } catch (error) {
    console.error('Erro ao cadastrar produto:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: 'Não foi possível cadastrar o produto'
    });
  }
};

export const updateProduct = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const products = loadProducts();
    const productIndex = products.findIndex(p => p.id === parseInt(id));

    if (productIndex === -1) {
      res.status(404).json({
        error: 'Produto não encontrado',
        message: `Nenhum produto com o ID ${id} foi encontrado.`
      });
      return;
    }

    // Atualizar apenas os campos que foram enviados na requisição
    const updatedProduct = { ...products[productIndex], ...updateData };
    products[productIndex] = updatedProduct;

    saveProducts(products);

    res.status(200).json({
      message: `Produto com o ID ${id} atualizado com sucesso`,
      data: updatedProduct
    });

  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: 'Não foi possível atualizar o produto'
    });
  }
};
