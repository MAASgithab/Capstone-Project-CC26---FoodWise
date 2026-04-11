const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware biar API bisa baca JSON
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  // Set CORS headers untuk semua requests
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '3600');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    console.log('OPTIONS request ke', req.path);
    return res.status(200).end();
  }
  
  next();
});

// Import database dari sign-up-api
const Database = require('better-sqlite3');
const db = new Database('../sign-up-api/users.db');

// Route Home (Cuma buat cek API nyala/gak)
app.get('/', (req, res) => {
    res.send('API Backend Camp Ready, Bro!');
});

// ROUTE SIGN-IN
app.post('/api/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email dan password wajib diisi" });
        }

        // Query user dari database sign-up-api
        const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

        if (!user) {
            return res.status(401).json({ message: "Email/Password salah!" });
        }

        // Compare password dengan bcrypt
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch) {
            return res.status(401).json({ message: "Email/Password salah!" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { user_id: user.user_id },
            process.env.JWT_SECRET || 'rahasia123',
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            message: "Login Berhasil",
            user: { 
                user_id: user.user_id,
                email: user.email 
            },
            token
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: "Terjadi kesalahan server" });
    }
});

app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
});