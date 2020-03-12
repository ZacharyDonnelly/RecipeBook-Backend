// @ts-ignore
const Sequelize = require('sequelize');

module.exports = sequelize => {
  class Article extends Sequelize.Model {}
  Article.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
      },
      author: {
        type: Sequelize.STRING,
      },
      body: {
        type: Sequelize.TEXT,
      },
    },
    { sequelize },
  );

  return Article;
};
