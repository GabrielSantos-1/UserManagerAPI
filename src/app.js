import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/users", userRoutes);

// Rota inicial para testar
app.get("/", (req, res) => {
  res.send("🚀 API funcionando com Node.js + MySQL!");
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
