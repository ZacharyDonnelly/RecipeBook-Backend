import { requestLogger } from '../middleware';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = require('../models').sequelize;
const { Recipe } = sequelize.models;

module.exports = function(route: string, app: any) {
  app.post(
    route,
    requestLogger,
    async (req: any, res: { send: (arg0: { created: boolean }) => void }) => {
      try {
        const newRecipe = await Recipe.create({
          time: req.body.time,
          category: req.body.category,
          ingredients: req.body.ingredients,
        });

        console.table(newRecipe.toJSON());
        res.send({ created: true });
      } catch (err) {
        if (err.name === 'SequelizeValidationError') {
          const errors = err.errors.map((error: any) => error.message);
          console.error('Validation errors: ', errors);
          res.send({ created: false });
        } else {
          console.error('Validation errors: ', err);
        }
      }
    },
  );
};
