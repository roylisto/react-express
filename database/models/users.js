'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,    
  }, {
    timestamps: true
  });
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};