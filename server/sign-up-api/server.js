require('dotenv').config();
const express = require('express');
const cors = require('cors'); // <--- WAJIB ADA
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const app = express();

// PENTING: CORS harus paling atas sebelum route apapun
app.use(cors());
app.use(express.json());

const Database = require('better-sqlite3');
const db = new Database('./users.db');

// Buat tabel users jika belum ada
db.prepare(`CREATE TABLE IF NOT EXISTS users (
    user_id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
)`).run();

// Route pengetesan biar tidak "Cannot GET /"
app.get('/', (req, res) => {
    res.send('Server Auth FoodWise (Port 3002) sudah aktif dan mendukung CORS!');
});

// ROUTE SIGN UP
app.post('/api/signup', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email dan password wajib diisi' });
        }

        const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
        if (existingUser) {
            return res.status(400).json({ error: 'Email sudah terdaftar' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = {
            user_id: uuidv4(),
            email,
            password: hashedPassword
        };

        db.prepare('INSERT INTO users (user_id, email, password) VALUES (?, ?, ?)')
            .run(newUser.user_id, newUser.email, newUser.password);

        const token = jwt.sign(
            { user_id: newUser.user_id },
            process.env.JWT_SECRET || 'secret_key_foodwise',
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: 'Registrasi berhasil',
            user: {
                user_id: newUser.user_id,
                email: newUser.email
            },
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Terjadi kesalahan internal pada server' });
    }
});

// ROUTE SIGN IN
app.post('/api/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email dan password wajib diisi' });
        }

        const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
        if (!user) {
            return res.status(400).json({ error: 'Email atau password salah' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Email atau password salah' });
        }

        const token = jwt.sign(
            { user_id: user.user_id },
            process.env.JWT_SECRET || 'secret_key_foodwise',
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login berhasil',
            user: {
                user_id: user.user_id,
                email: user.email
            },
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Terjadi kesalahan internal pada server' });
    }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});