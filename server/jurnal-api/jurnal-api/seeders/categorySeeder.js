require('dotenv').config();
const { sequelize, Category } = require('../models');

const categories = [
  {
    name: 'Kompos',
    description: 'Pengolahan sisa makanan menjadi kompos melalui proses dekomposisi.',
  },
  {
    name: 'Bokashi',
    description: 'Fermentasi sisa makanan menggunakan mikroorganisme efektif (EM).',
  },
  {
    name: 'Eco-enzyme',
    description: 'Cairan serbaguna dari fermentasi sisa buah dan sayur.',
  },
];

const seedCategories = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');

    // Sync model
    await Category.sync();

    for (const cat of categories) {
      const [category, created] = await Category.findOrCreate({
        where: { name: cat.name },
        defaults: cat,
      });

      if (created) {
        console.log(`✅ Kategori "${cat.name}" berhasil ditambahkan.`);
      } else {
        console.log(`⏭️  Kategori "${cat.name}" sudah ada.`);
      }
    }

    console.log('\nSeeding selesai!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding gagal:', error);
    process.exit(1);
  }
};

seedCategories();
