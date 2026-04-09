const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { register, login, getMe } = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

// POST /api/auth/register
router.post(
  '/register',
  [
    body('name')
      .notEmpty().withMessage('Nama harus diisi.')
      .isLength({ min: 2 }).withMessage('Nama minimal 2 karakter.'),
    body('email')
      .notEmpty().withMessage('Email harus diisi.')
      .isEmail().withMessage('Format email tidak valid.'),
    body('password')
      .notEmpty().withMessage('Password harus diisi.')
      .isLength({ min: 6 }).withMessage('Password minimal 6 karakter.'),
  ],
  validate,
  register
);

// POST /api/auth/login
router.post(
  '/login',
  [
    body('email')
      .notEmpty().withMessage('Email harus diisi.')
      .isEmail().withMessage('Format email tidak valid.'),
    body('password')
      .notEmpty().withMessage('Password harus diisi.'),
  ],
  validate,
  login
);

// GET /api/auth/me
router.get('/me', auth, getMe);

module.exports = router;
