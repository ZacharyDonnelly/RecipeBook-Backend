// @ts-ignore
const Sequelize = require('sequelize');

module.exports = sequelize => {
  class User extends Sequelize.Model {}

  User.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      hash: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    { sequelize },
  );
  return User;
};
