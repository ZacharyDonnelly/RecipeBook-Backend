import { requestLogger } from '../middleware';
import dotenv from 'dotenv';

const sequelize = require('../models').sequelize;
const { User } = sequelize.models;

dotenv.config();

module.exports = function(route: string, app: any) {
  app.post(
    route,
    requestLogger,
    async ({ body }: any, res: { send: (arg0: { created: boolean }) => void }) => {
      try {
        User.findOne({
          where: {
            email: body.email,
          },
        }).then((user: any) => {
          user
            .createRecipe({
              time: body.time,
              category: body.category,
              ingredients: body.ingredients,
            })
            .then(() => console.log('Success!'));
        });

        // console.table(newRecipe.toJSON());
        res.send({ created: true });
      } catch (err) {
        if (err.name === 'SequelizeValidationError') {
          const errors = err.errors.map((error: any) => error.message);
          return console.error('Validation errors: ', errors);
          res.send({ created: false });
        } else {
          return console.error('Validation errors: ', err);
        }
      }
    },
  );
};
