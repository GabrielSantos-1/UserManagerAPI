import db from "../config/db.js";

export const getAllUsers = (callback) => {
  db.query("SELECT * FROM users", callback);
};

export const getUserById = (id, callback) => {
  db.query("SELECT * FROM users WHERE id = ?", [id], callback);
};

export const createUser = (user, callback) => {
  const { name, email, password } = user;
  db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password], callback);
};

export const updateUser = (id, user, callback) => {
  const { name, email, password } = user;
  db.query("UPDATE users SET name=?, email=?, password=? WHERE id=?", [name, email, password, id], callback);
};

export const deleteUser = (id, callback) => {
  db.query("DELETE FROM users WHERE id=?", [id], callback);
};
