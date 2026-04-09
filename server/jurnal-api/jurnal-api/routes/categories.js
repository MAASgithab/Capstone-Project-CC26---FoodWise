const express = require('express');
const auth = require('../middleware/auth');
const { getCategories } = require('../controllers/categoryController');

const router = express.Router();

// GET /api/categories
router.get('/', auth, getCategories);

module.exports = router;
