// @ts-ignore
const Sequelize = require('sequelize');

// Start up new db
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'recipe.db',
  logging: false, // disable extra logging
});

// configure db object to be spread across application
const db = {
  sequelize,
  Sequelize,
  models: {},
};
db.models.User = require('../models/user')(sequelize);

module.exports = db;
