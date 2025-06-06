// src/models/review.model.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Review = sequelize.define('Review', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 },
    },
    comment: {
      type: DataTypes.TEXT,
    },
  }, {
    tableName: 'reviews',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'book_id'],
      },
    ],
  });

  return Review;
};
