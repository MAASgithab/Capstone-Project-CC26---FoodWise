const { Journal, Category, User, sequelize } = require('../models');
const { fn, col, literal } = sequelize;

// GET /api/dashboard/summary
const getSummary = async (req, res) => {
  try {
    // Ambil data user terbaru
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'total_points'],
    });

    // Total sampah terkumpul (kg)
    const totalWaste = await Journal.findOne({
      where: { user_id: req.user.id, has_leftover: true },
      attributes: [
        [fn('COALESCE', fn('SUM', col('waste_weight_kg')), 0), 'total_weight_kg'],
      ],
      raw: true,
    });

    // Sampah per kategori
    const categoryStats = await Journal.findAll({
      where: { user_id: req.user.id, has_leftover: true },
      attributes: [
        'category_id',
        [fn('SUM', col('waste_weight_kg')), 'total_weight_kg'],
        [fn('COUNT', col('Journal.id')), 'journal_count'],
      ],
      include: [{
        model: Category,
        as: 'category',
        attributes: ['id', 'name'],
      }],
      group: ['category_id', 'category.id', 'category.name'],
      raw: true,
      nest: true,
    });

    // Format response
    const categories = categoryStats.map((stat) => ({
      id: stat.category.id,
      name: stat.category.name,
      total_weight_kg: parseFloat(stat.total_weight_kg) || 0,
      journal_count: parseInt(stat.journal_count) || 0,
    }));

    return res.status(200).json({
      success: true,
      data: {
        total_points: user.total_points,
        total_waste_kg: parseFloat(totalWaste.total_weight_kg) || 0,
        categories,
      },
    });
  } catch (error) {
    console.error('Dashboard summary error:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server.',
    });
  }
};

module.exports = { getSummary };
