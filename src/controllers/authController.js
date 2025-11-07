import jwt from 'jsonwebtoken';
import { getUserByEmail } from '../models/userModel.js';

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);

    // Validar credenciales
    if (!user || user.password !== password) {
      return res.status(401).json({ ok: false, message: 'Email o contraseña incorrectos' });
    }

    // Crear token con info básica del usuario
    const token = jwt.sign(
      { id: user.id, email: user.email, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    // Guardar token en cookie
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 2 * 60 * 60 * 1000 // 2 horas
    });

    res.json({ ok: true });
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message);
    res.status(500).json({ ok: false, message: 'Error del servidor' });
  }
}

export function logout(req, res) {
  res.clearCookie('token');
  res.json({ ok: true });
}
