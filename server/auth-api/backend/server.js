require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const Database = require('better-sqlite3');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'rahasia_jwt_123';

// ─── Middleware ───────────────────────────────────────────────
app.use(express.json());

// CORS - izinkan request dari Vite dev server
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') return res.status(200).end();
  next();
});

// ─── Database Setup ───────────────────────────────────────────
const db = new Database('./users.db');

db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    user_id  TEXT PRIMARY KEY,
    email    TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`).run();

// ─── Helper: verifikasi JWT ───────────────────────────────────
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

  if (!token) return res.status(401).json({ message: 'Token tidak ada' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Token tidak valid' });
  }
}

// ─── Routes ───────────────────────────────────────────────────

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Auth API siap digunakan!' });
});

// SIGN UP
app.post('/api/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password wajib diisi' });
    }

    const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user_id = uuidv4();

    db.prepare('INSERT INTO users (user_id, email, password) VALUES (?, ?, ?)')
      .run(user_id, email, hashedPassword);

    const token = jwt.sign({ user_id }, JWT_SECRET, { expiresIn: '1h' });

    return res.status(201).json({
      message: 'Registrasi berhasil',
      user: { user_id, email },
      token,
    });

  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
});

// SIGN IN
app.post('/api/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password wajib diisi' });
    }

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }

    const token = jwt.sign({ user_id: user.user_id }, JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({
      message: 'Login berhasil',
      user: { user_id: user.user_id, email: user.email },
      token,
    });

  } catch (error) {
    console.error('Signin error:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
});

// GET PROFILE (contoh protected route)
app.get('/api/me', verifyToken, (req, res) => {
  const user = db.prepare('SELECT user_id, email FROM users WHERE user_id = ?').get(req.user.user_id);
  if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });
  return res.json({ user });
});

// ─── Start Server ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
});
