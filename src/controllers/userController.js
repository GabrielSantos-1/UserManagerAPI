// controllers/userController.js
import * as User from "../models/userModel.js";
import bcrypt from "bcrypt";

// ✅ Retorna o perfil do usuário logado
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    User.getUserById(userId, (err, results) => {
      if (err) return res.status(500).json({ error: "Erro ao buscar perfil" });
      if (results.length === 0) return res.status(404).json({ message: "Usuário não encontrado" });
      res.json(results[0]);
    });
  } catch {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};

// ✅ Lista todos os usuários (rota administrativa)
export const getAllUsers = async (req, res) => {
  try {
    User.getAllUsers((err, results) => {
      if (err) return res.status(500).json({ error: "Erro ao listar usuários" });
      res.json(results);
    });
  } catch {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};

// ✅ Retorna um usuário pelo ID
export const getUser = async (req, res) => {
  const { id } = req.params;
  User.getUserById(id, (err, results) => {
    if (err) return res.status(500).json({ error: "Erro ao buscar usuário" });
    if (results.length === 0)
      return res.status(404).json({ message: "Usuário não encontrado" });
    res.json(results[0]);
  });
};

// ✅ Cria um novo usuário com senha criptografada
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });

    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS || 10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = { name, email, password: hashedPassword };

    User.createUser(newUser, (err, result) => {
      if (err) {
        console.error("Erro ao criar usuário:", err);
        return res.status(500).json({ error: "Erro ao criar usuário" });
      }

      res.status(201).json({
        message: "Usuário criado com sucesso",
        id: result.insertId,
      });
    });
  } catch (error) {
    console.error("Erro inesperado:", error);
    res.status(500).json({ error: "Erro inesperado no servidor" });
  }
};

// ✅ Atualiza dados de um usuário
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  User.updateUser(id, userData, (err) => {
    if (err) return res.status(500).json({ error: "Erro ao atualizar usuário" });
    res.json({ message: "Usuário atualizado com sucesso" });
  });
};

// ✅ Exclui um usuário
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  User.deleteUser(id, (err) => {
    if (err) return res.status(500).json({ error: "Erro ao excluir usuário" });
    res.json({ message: "Usuário excluído com sucesso" });
  });
};
