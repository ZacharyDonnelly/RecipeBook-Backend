import { requestLogger } from '../middleware';
import dotenv from 'dotenv';

const sequelize = require('../models').sequelize;
const { User } = sequelize.models;

dotenv.config();

module.exports = function(route: string, app: any) {
  app.post(
    route,
    async (
      req: { body: { email: string; time: string; category: string; ingredients: string } },
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
              time: string;
              category: string;
              ingredients: string;
            }) => Promise<string>;
          }) => {
            user
              .createRecipe({
                time: req.body.time,
                category: req.body.category,
                ingredients: req.body.ingredients,
              })
              // ! DELETE AT PRODUCTION TIME
              .then(() => console.log('Success!'));
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
