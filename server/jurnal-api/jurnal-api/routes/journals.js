const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const {
  createJournal,
  getJournals,
  getJournalById,
  updateJournal,
  deleteJournal,
} = require('../controllers/journalController');

const router = express.Router();

// Semua route membutuhkan authentication
router.use(auth);

// POST /api/journals
router.post(
  '/',
  [
    body('activity')
      .notEmpty().withMessage('Aktivitas harus diisi.')
      .isIn(['masak', 'makan']).withMessage('Aktivitas harus masak atau makan.'),
    body('has_leftover')
      .isBoolean().withMessage('has_leftover harus boolean (true/false).'),
    body('category_id')
      .if(body('has_leftover').equals('true'))
      .notEmpty().withMessage('Kategori harus diisi jika ada sisa makanan.')
      .isInt().withMessage('category_id harus berupa angka.'),
    body('waste_weight')
      .if(body('has_leftover').equals('true'))
      .notEmpty().withMessage('Berat sampah harus diisi jika ada sisa makanan.')
      .isFloat({ min: 0.01 }).withMessage('Berat sampah harus lebih dari 0.'),
    body('weight_unit')
      .if(body('has_leftover').equals('true'))
      .notEmpty().withMessage('Satuan berat harus diisi.')
      .isIn(['gr', 'kg']).withMessage('Satuan berat harus gr atau kg.'),
    body('finished_at')
      .optional()
      .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Format waktu harus HH:MM.'),
  ],
  validate,
  createJournal
);

// GET /api/journals
router.get('/', getJournals);

// GET /api/journals/:id
router.get('/:id', getJournalById);

// PUT /api/journals/:id
router.put(
  '/:id',
  [
    body('activity')
      .optional()
      .isIn(['masak', 'makan']).withMessage('Aktivitas harus masak atau makan.'),
    body('has_leftover')
      .optional()
      .isBoolean().withMessage('has_leftover harus boolean.'),
    body('waste_weight')
      .optional()
      .isFloat({ min: 0.01 }).withMessage('Berat sampah harus lebih dari 0.'),
    body('weight_unit')
      .optional()
      .isIn(['gr', 'kg']).withMessage('Satuan berat harus gr atau kg.'),
  ],
  validate,
  updateJournal
);

// DELETE /api/journals/:id
router.delete('/:id', deleteJournal);

module.exports = router;
