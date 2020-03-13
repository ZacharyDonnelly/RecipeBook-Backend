import * as Sequelize from 'sequelize';

export default sequelize => {
  const User = sequelize.define('User', {
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
    tableName: 'Users',
  });
  User.associate = models => {
    models.User.hasMany(models.Recipe);
  };

  return User;
};
