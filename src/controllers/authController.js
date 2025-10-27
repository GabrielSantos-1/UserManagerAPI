// controllers/authController.js
import * as User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email e senha são obrigatórios" });

  User.getUserByEmail(email, async (err, results) => {
    if (err) return res.status(500).json({ message: "Erro no servidor" });
    if (!results || results.length === 0)
      return res.status(401).json({ message: "Credenciais inválidas" });

    const user = results[0];
    let passwordMatch = false;

    try {
      // tenta comparar com hash (senha já criptografada)
      passwordMatch = await bcrypt.compare(password, user.password);
    } catch (e) {
      passwordMatch = false;
    }

    // 🔁 Se não bater, verifica se é texto puro e atualiza automaticamente
    if (!passwordMatch && password === user.password) {
      const newHash = await bcrypt.hash(password, 10);
      User.updateUser(user.id, { password: newHash }, (err2) => {
        if (err2) console.error("Erro ao atualizar senha:", err2);
        else console.log(`Senha atualizada para usuário ${user.email}`);
      });
      passwordMatch = true;
    }

    if (!passwordMatch)
      return res.status(401).json({ message: "Senha incorreta" });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    delete user.password;
    return res.json({
      message: "Login realizado com sucesso",
      token,
      user,
    });
  });
};
