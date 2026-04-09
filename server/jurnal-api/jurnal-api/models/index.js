const sequelize = require('../config/database');
const User = require('./User');
const Category = require('./Category');
const Journal = require('./Journal');

// Associations
User.hasMany(Journal, { foreignKey: 'user_id', as: 'journals' });
Journal.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Category.hasMany(Journal, { foreignKey: 'category_id', as: 'journals' });
Journal.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

module.exports = {
  sequelize,
  User,
  Category,
  Journal,
};
