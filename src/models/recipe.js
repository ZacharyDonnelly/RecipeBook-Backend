import * as Sequelize from 'sequelize';

export default sequelize => {
  const Recipe = sequelize.define('Recipe', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
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
    tableName: 'Recipes',
  });
  Recipe.associate = models => {
    models.Recipe.belongsTo(models.User, {
      onDelete: 'CASCADE',
    });
  };
  return Recipe;
};
