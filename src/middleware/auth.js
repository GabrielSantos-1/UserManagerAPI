// middleware/auth.js
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const [type, token] = authHeader.split(" ");
  if (type !== "Bearer" || !token)
    return res.status(401).json({ message: "Token não fornecido" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, role }
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
};

export const requireRole = (role) => (req, res, next) => {
  if (!req.user?.role) return res.status(403).json({ message: "Permissão insuficiente" });
  if (req.user.role !== role) return res.status(403).json({ message: "Acesso negado (somente admin)" });
  next();
};
