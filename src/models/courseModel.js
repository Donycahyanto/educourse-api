const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Course = sequelize.define(
  'Course',
  {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    topic: { type: DataTypes.STRING, allowNull: false },
    image_url: { type: DataTypes.STRING, allowNull: true },
  },
  {
    tableName: 'courses',
    timestamps: true,
  }
);

module.exports = Course;
