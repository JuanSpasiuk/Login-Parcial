// src/middlewares/auth.js
import jwt from 'jsonwebtoken';

// ✅ Verifica si hay token válido
export function verificarLogin(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    // Si no hay token → al login
    return res.redirect('/login');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    // Token inválido o expirado
    res.redirect('/login');
  }
}

// ✅ Permite solo a usuarios con rol "admin"
export function soloAdmin(req, res, next) {
  if (!req.user || req.user.rol !== 'admin') {
    return res.status(403).send('Acceso denegado');
  }
  next();
}
