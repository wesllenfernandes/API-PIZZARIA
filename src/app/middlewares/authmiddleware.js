import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, "seu_segredo_jwt");

    // Verifica a role no payload
    if (decoded.role === 'admin') {
      req.adminId = decoded.id;
      req.userRole = 'admin';
    } else {
      req.userId = decoded.id;
      req.userRole = 'client';
    }

    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
}
