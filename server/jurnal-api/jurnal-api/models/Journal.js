const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Journal = sequelize.define('Journal', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'categories',
      key: 'id',
    },
  },
  activity: {
    type: DataTypes.ENUM('masak', 'makan'),
    allowNull: false,
  },
  has_leftover: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  waste_weight: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  weight_unit: {
    type: DataTypes.ENUM('gr', 'kg'),
    allowNull: true,
  },
  waste_weight_kg: {
    type: DataTypes.FLOAT,
    allowNull: true,
    comment: 'Berat yang sudah dinormalisasi ke kg',
  },
  finished_at: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  points_earned: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 15,
  },
}, {
  tableName: 'journals',
});

module.exports = Journal;
