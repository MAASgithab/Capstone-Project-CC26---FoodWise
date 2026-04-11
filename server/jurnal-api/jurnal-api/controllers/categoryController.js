const { Category } = require('../models');

const getCategories = async (req, res) => {
  try {
    // Ambil semua data dari tabel Category di database
    const categories = await Category.findAll({
      attributes: ['id', 'name', 'description'],
      order: [['name', 'ASC']],
    });

    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error('Get categories error:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat mengambil kategori.',
    });
  }
};

module.exports = { getCategories };