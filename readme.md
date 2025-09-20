# 🚀 Desafio de lançamento do curso de Angular na Rocketseat

### Descrição do Projeto

Este projeto é uma simulação de um sistema de gestão de produtos que inclui as seguintes funcionalidades:

* **Tela de Login**: Autenticação de usuários.
* **Listagem de Produtos**: Exibição de produtos com opções de filtro por título e status.
* **Tela de Criação de Produto**: Interface para adicionar novos produtos ao catálogo.

O desafio é dividido em dois projetos, um frontend em Angular e um backend em Express, que estão localizados no mesmo repositório.

---

### Como Executar os Projetos

Para rodar a aplicação, você deve iniciar tanto o servidor do backend quanto o frontend em terminais separados.

#### Backend (Express)

1.  Abra um terminal na pasta `backend-gestao-marketplace`.
2.  Instale as dependências do projeto:
    ```bash
    npm install
    ```
3.  Execute o comando para iniciar o servidor:
    ```bash
    npm run dev
    ```
4.  O servidor estará disponível em `http://localhost:3000`.

#### Frontend (Angular)

1.  Abra um terminal na pasta `frontend-gestao-marketplace`.
2.  Instale as dependências do projeto:
    ```bash
    npm install
    ```
3.  Execute o comando para iniciar a aplicação:
    ```bash
    ng serve
    ```
4.  A aplicação estará disponível em `http://localhost:4200/`.

---

### Instalações Necessárias

Certifique-se de que as seguintes ferramentas estão instaladas em seu ambiente para que os projetos funcionem corretamente:

* **Node.js**: Versão 22.19.0 (LTS).
* **Angular CLI**: Versão 20.
* **Insomnia**: Última versão para testar os endpoints do backend.

---

### Recursos Adicionais

* A pasta `imagens` na raiz do repositório contém imagens que podem ser usadas para teste ao criar um novo produto.
* O arquivo `insomnia-backend.yaml`, localizado na pasta `backend-gestao-marketplace`, contém a coleção de endpoints que pode ser importada no Insomnia para facilitar os testes da API.

---

### **Instruções Importantes**

Para começar, clone o repositório na branch `01-layout-completo`.