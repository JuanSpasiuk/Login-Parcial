// src/app.js
import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';

import router from './routes/index.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Archivos estáticos (HTML/CSS/JS)
app.use(express.static(path.resolve('public')));

// Rutas
app.use('/', router);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ http://localhost:${PORT}`));

export default app;
