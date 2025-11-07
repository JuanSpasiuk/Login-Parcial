
import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { login, logout } from '../controllers/authController.js';
import { verificarLogin, soloAdmin } from '../middlewares/auth.js';

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, '..', '..', 'public');

// Páginas
router.get('/login', (_req, res) => res.sendFile('index.html', { root: PUBLIC_DIR }));

router.get('/home', verificarLogin, (_req, res) => {
  res.sendFile('home.html', { root: PUBLIC_DIR });
});

router.get('/admin', verificarLogin, soloAdmin, (_req, res) => {
  res.sendFile('admin.html', { root: PUBLIC_DIR });
});


// API auth
router.post('/api/auth/login', login);
router.post('/api/auth/logout', logout);

export default router;
