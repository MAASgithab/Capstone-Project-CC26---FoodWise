const { Sequelize } = require('sequelize');

// Menggunakan SQLite agar bisa langsung jalan tanpa setup installasi MySQL Server (XAMPP/dsb)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Data akan otomatis tersimpan di file ini
  logging: false,
  define: {
    underscored: true,
    timestamps: true,
  },
});

module.exports = sequelize;
