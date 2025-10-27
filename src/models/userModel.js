import db from "../config/db.js";

// Lista todos os usuários
export const getAllUsers = (cb) => {
  db.query("SELECT id, name, email, role FROM users", cb);
};

// Busca usuário por ID
export const getUserById = (id, cb) => {
  db.query("SELECT id, name, email, role FROM users WHERE id = ?", [id], cb);
};

// Busca usuário por e-mail (para login)

export const getUserByEmail = (email, cb) => {
  db.query(
    "SELECT id, name, email, password, role FROM users WHERE email = ?",
    [email],
    cb
  );
};

// Cria novo usuário
export const createUser = (user, cb) => {
  db.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [user.name, user.email, user.password, user.role || 'user'],
    cb
  );
};

// Atualiza usuário
export const updateUser = (id, user, cb) => {
  db.query("UPDATE users SET ? WHERE id = ?", [user, id], cb);
};

// Exclui usuário
export const deleteUser = (id, cb) => {
  db.query("DELETE FROM users WHERE id = ?", [id], cb);
};
