# 🚀 UserManagerAPI

API feita em **Node.js + Express + MySQL** para **gerenciar usuários**, com **login, cadastro e autenticação JWT**.

---

## 💡 Funcionalidades

- Cadastrar novos usuários
- Fazer login e gerar token JWT
- Criptografar senhas com bcrypt
- Controlar acesso por nível (admin / usuário)
- Listar, atualizar e excluir usuários

---

## 🧱 Tecnologias usadas

- Node.js
- Express
- MySQL / MariaDB
- bcrypt
- jsonwebtoken (JWT)
- dotenv

---

## ⚙️ Instalação

1. **Clonar o repositório**

   ```bash
   git clone https://github.com/GabrielSantos-1/UserManagerAPI.git
   cd UserManagerAPI
   ```

2. **Instalar dependências**

   ```bash
   npm install
   ```

3. \*\*Criar o arquivo \*\***`.env`**

   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=users_db
   JWT_SECRET=meusegredoseguro
   JWT_EXPIRES_IN=1d
   ```

4. **Iniciar o servidor**

   ```bash
   npm run dev
   ```

---

## 🧠 Banco de Dados

Crie o banco com este comando no MySQL:

```sql
CREATE DATABASE users_db;

USE users_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role ENUM('user','admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔑 Rotas Principais

| Método | Rota              | Descrição                       |
| ------ | ----------------- | ------------------------------- |
| POST   | `/api/users`      | Cadastrar novo usuário          |
| POST   | `/api/auth/login` | Login e geração de token        |
| GET    | `/api/users/me`   | Perfil do usuário logado        |
| GET    | `/api/users`      | Lista todos os usuários (admin) |

---

## 💬 Exemplo de Login

**Requisição:**

```json
POST /api/auth/login
{
  "email": "admin@ADMIN.com",
  "password": "admin"
}
```

**Resposta:**

```json
{
  "message": "Login realizado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 15,
    "name": "ADMIN",
    "email": "admin@ADMIN.com",
    "role": "admin"
  }
}
```

---

## 👨‍💻 Autor

**Gabriel Santos**\
🔗 [GitHub - GabrielSantos-1](https://github.com/GabrielSantos-1)

