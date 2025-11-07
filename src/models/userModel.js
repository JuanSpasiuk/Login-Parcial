
import { pool } from '../config/db.js';

export async function getUserByEmail(email) {
  const [rows] = await pool.query(
    'SELECT id, nombre, email, password, rol FROM usuarios WHERE email = ? LIMIT 1',
    [email]
  );
  return rows[0] || null;
}
