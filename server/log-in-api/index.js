const express = require('express');
const app = express();
const PORT = 3000;

// Middleware biar API bisa baca JSON
app.use(express.json());

// Dummy User buat tes Sign-In
const userIhsan = {
    email: "ihsan@developer.com",
    password: "password123"
};

// Route Home (Cuma buat cek API nyala/gak)
app.get('/', (req, res) => {
    res.send('API Backend Camp Ready, Bro!');
});

// ROUTE SIGN-IN
app.post('/api/signin', (req, res) => {
    const { email, password } = req.body;

    if (email === userIhsan.email && password === userIhsan.password) {
        return res.status(200).json({
            message: "Gas! Login Berhasil",
            user: { name: "Ihsan", role: "Backend King" }
        });
    }

    return res.status(401).json({ message: "Email/Password salah!" });
});

app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
});