import { authValidation } from '../middleware/auth';
import dotenv from 'dotenv';

const sequelize = require('../models').sequelize;
const { User } = sequelize.models;

dotenv.config();

module.exports = function(route: string, app: any) {
  app.post(
    route,
    authValidation,
    async (
      req: {
        body: {
          email: string;
          time: string;
          category: string;
          directions: string;
          ingredients: string;
          title: string;
        };
      },
      res: { status: (arg0: number) => void; send: (arg0: { created: boolean }) => void },
    ) => {
      try {
        User.findOne({
          where: {
            email: req.body.email,
          },
        }).then(
          (user: {
            createRecipe: (arg0: {
              title: string;
              time: string;
              category: string;
              ingredients: string;
              directions: string;
            }) => Promise<string>;
          }) => {
            user.createRecipe({
              title: req.body.title,
              time: req.body.time,
              category: req.body.category,
              directions: req.body.directions,
              ingredients: req.body.ingredients,
            });
          },
        );
        res.status(200);
        res.send({ created: true });
      } catch (err) {
        res.status(403);
        res.send({ created: false });
      }
    },
  );
};
