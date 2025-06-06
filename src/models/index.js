const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = require('./user.model')(sequelize);
const Book = require('./book.model')(sequelize);
const Review = require('./review.model')(sequelize);

// Associations
User.hasMany(Book, { foreignKey: 'created_by' });
Book.belongsTo(User, { foreignKey: 'created_by' });

User.hasMany(Review, { foreignKey: 'user_id' });
Review.belongsTo(User, { foreignKey: 'user_id' });

Book.hasMany(Review, { foreignKey: 'book_id' });
Review.belongsTo(Book, { foreignKey: 'book_id' });

module.exports = {
  sequelize,
  User,
  Book,
  Review,
};
