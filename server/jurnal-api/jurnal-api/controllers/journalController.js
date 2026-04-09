const { Journal, Category, User, sequelize } = require('../models');

// POST /api/journals — Submit jurnal baru
const createJournal = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { activity, has_leftover, category_id, finished_at, waste_weight, weight_unit } = req.body;

    // Jika tidak ada sisa makanan, tidak perlu kategori & berat
    let categoryId = null;
    let wasteWeight = null;
    let weightUnit = null;
    let wasteWeightKg = null;

    if (has_leftover) {
      // Validasi kategori
      const category = await Category.findByPk(category_id);
      if (!category) {
        await t.rollback();
        return res.status(400).json({
          success: false,
          message: 'Kategori tidak ditemukan.',
        });
      }

      categoryId = category_id;
      wasteWeight = waste_weight;
      weightUnit = weight_unit;

      // Normalisasi berat ke kg
      wasteWeightKg = weight_unit === 'gr' ? waste_weight / 1000 : waste_weight;
    }

    // Poin per submit = 15
    const pointsEarned = 15;

    // Buat jurnal
    const journal = await Journal.create({
      user_id: req.user.id,
      category_id: categoryId,
      activity,
      has_leftover,
      waste_weight: wasteWeight,
      weight_unit: weightUnit,
      waste_weight_kg: wasteWeightKg,
      finished_at: finished_at || null,
      points_earned: pointsEarned,
    }, { transaction: t });

    // Update total poin user
    await User.increment('total_points', {
      by: pointsEarned,
      where: { id: req.user.id },
      transaction: t,
    });

    await t.commit();

    // Fetch jurnal lengkap dengan kategori
    const journalData = await Journal.findByPk(journal.id, {
      include: [{ model: Category, as: 'category', attributes: ['id', 'name'] }],
    });

    return res.status(201).json({
      success: true,
      message: `Jurnal berhasil disimpan! +${pointsEarned} poin`,
      data: journalData,
    });
  } catch (error) {
    await t.rollback();
    console.error('Create journal error:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server.',
    });
  }
};

// GET /api/journals — List jurnal user (paginated)
const getJournals = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows: journals } = await Journal.findAndCountAll({
      where: { user_id: req.user.id },
      include: [{ model: Category, as: 'category', attributes: ['id', 'name'] }],
      order: [['created_at', 'DESC']],
      limit,
      offset,
    });

    return res.status(200).json({
      success: true,
      data: {
        journals,
        pagination: {
          total: count,
          page,
          limit,
          total_pages: Math.ceil(count / limit),
        },
      },
    });
  } catch (error) {
    console.error('Get journals error:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server.',
    });
  }
};

// GET /api/journals/:id — Detail jurnal
const getJournalById = async (req, res) => {
  try {
    const journal = await Journal.findOne({
      where: { id: req.params.id, user_id: req.user.id },
      include: [{ model: Category, as: 'category', attributes: ['id', 'name'] }],
    });

    if (!journal) {
      return res.status(404).json({
        success: false,
        message: 'Jurnal tidak ditemukan.',
      });
    }

    return res.status(200).json({
      success: true,
      data: journal,
    });
  } catch (error) {
    console.error('Get journal by id error:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server.',
    });
  }
};

// PUT /api/journals/:id — Update jurnal
const updateJournal = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const journal = await Journal.findOne({
      where: { id: req.params.id, user_id: req.user.id },
    });

    if (!journal) {
      await t.rollback();
      return res.status(404).json({
        success: false,
        message: 'Jurnal tidak ditemukan.',
      });
    }

    const { activity, has_leftover, category_id, finished_at, waste_weight, weight_unit } = req.body;

    let categoryId = null;
    let wasteWeight = null;
    let weightUnit = null;
    let wasteWeightKg = null;

    if (has_leftover) {
      if (category_id) {
        const category = await Category.findByPk(category_id);
        if (!category) {
          await t.rollback();
          return res.status(400).json({
            success: false,
            message: 'Kategori tidak ditemukan.',
          });
        }
      }

      categoryId = category_id || journal.category_id;
      wasteWeight = waste_weight !== undefined ? waste_weight : journal.waste_weight;
      weightUnit = weight_unit || journal.weight_unit;
      wasteWeightKg = weightUnit === 'gr' ? wasteWeight / 1000 : wasteWeight;
    }

    await journal.update({
      activity: activity || journal.activity,
      has_leftover: has_leftover !== undefined ? has_leftover : journal.has_leftover,
      category_id: categoryId,
      waste_weight: wasteWeight,
      weight_unit: weightUnit,
      waste_weight_kg: wasteWeightKg,
      finished_at: finished_at !== undefined ? finished_at : journal.finished_at,
    }, { transaction: t });

    await t.commit();

    const updatedJournal = await Journal.findByPk(journal.id, {
      include: [{ model: Category, as: 'category', attributes: ['id', 'name'] }],
    });

    return res.status(200).json({
      success: true,
      message: 'Jurnal berhasil diupdate.',
      data: updatedJournal,
    });
  } catch (error) {
    await t.rollback();
    console.error('Update journal error:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server.',
    });
  }
};

// DELETE /api/journals/:id — Hapus jurnal
const deleteJournal = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const journal = await Journal.findOne({
      where: { id: req.params.id, user_id: req.user.id },
    });

    if (!journal) {
      await t.rollback();
      return res.status(404).json({
        success: false,
        message: 'Jurnal tidak ditemukan.',
      });
    }

    // Kurangi poin user
    await User.decrement('total_points', {
      by: journal.points_earned,
      where: { id: req.user.id },
      transaction: t,
    });

    await journal.destroy({ transaction: t });

    await t.commit();

    return res.status(200).json({
      success: true,
      message: `Jurnal berhasil dihapus. -${journal.points_earned} poin`,
    });
  } catch (error) {
    await t.rollback();
    console.error('Delete journal error:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server.',
    });
  }
};

module.exports = {
  createJournal,
  getJournals,
  getJournalById,
  updateJournal,
  deleteJournal,
};
