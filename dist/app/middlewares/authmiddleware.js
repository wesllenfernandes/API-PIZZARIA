"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

 function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = _jsonwebtoken2.default.verify(token, "seu_segredo_jwt");

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
} exports.default = authMiddleware;
