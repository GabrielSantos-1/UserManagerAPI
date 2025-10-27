// routes/userRoutes.js
import express from "express";
import {
  getProfile,
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { verifyToken, requireRole } from "../middleware/auth.js";

const router = express.Router();

// Pública
router.post("/", createUser);

// Protegidas — ⚠️ ordem importa: /me vem antes de /:id
router.get("/me", verifyToken, getProfile);                   // perfil do logado
router.get("/", verifyToken, requireRole("admin"), getAllUsers); // lista todos (admin)
router.get("/:id", verifyToken, getUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

export default router;
