
import 'dotenv/config';
import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'enanoverde15',
  database: process.env.DB_NAME || 'app_roles',
  waitForConnections: true,
  connectionLimit: 10,
});
