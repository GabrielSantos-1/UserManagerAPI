import * as User from "../models/userModel.js";

export const getUsers = (req, res) => {
  User.getAllUsers((err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

export const getUser = (req, res) => {
  const { id } = req.params;
  User.getUserById(id, (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).json({ message: "Usuário não encontrado" });
    res.json(results[0]);
  });
};

export const createUser = (req, res) => {
  const newUser = req.body;
  User.createUser(newUser, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ message: "Usuário criado com sucesso", id: result.insertId });
  });
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  User.updateUser(id, userData, (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Usuário atualizado com sucesso" });
  });
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  User.deleteUser(id, (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Usuário excluído com sucesso" });
  });
};
