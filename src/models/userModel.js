const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define(
  'User',
  {
    fullname: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: { type: DataTypes.STRING, allowNull: false },
    verification_token: { type: DataTypes.STRING, allowNull: true },
    is_verified: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    tableName: 'users',
    timestamps: true,
  }
);

module.exports = User;
