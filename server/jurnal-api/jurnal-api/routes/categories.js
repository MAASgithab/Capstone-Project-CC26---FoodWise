const express = require('express');
const auth = require('../middleware/auth');
const { getCategories } = require('../controllers/categoryController');

const router = express.Router();

// Sekarang route ini aman, cuma bisa dibuka kalau bawa Token (auth)
router.get('/', auth, getCategories);

module.exports = router;