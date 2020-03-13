// @ts-ignore
const Sequelize = require('sequelize');

module.exports = sequelize => {
  class Recipe extends Sequelize.Model {}

  Recipe.init(
    {
      bar_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: 'id',
        },
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      time: {
        type: Sequelize.STRING,
      },
      ingredients: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    { sequelize },
  );
  return Recipe;
};
