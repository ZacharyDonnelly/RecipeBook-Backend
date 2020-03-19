import { authValidation } from '../middleware/auth';

const sequelize = require('../models').sequelize;
const { Recipe, User } = sequelize.models;

module.exports = function(route: string, app: any) {
  app.post(
    route,
    authValidation,
    async (
      req: { body: { email: string; category: string; id: number } },
      res: {
        status: (
          arg0: number,
        ) => {
          (): Promise<object>;
          new (): Promise<[]>;
          send: { (arg0: object[]): void; new (): Promise<[]> };
        };
        send: (arg0: { success: boolean }) => void;
      },
    ) => {
      try {
        // locating user id
        await User.findOne({
          where: {
            email: req.body.email,
          },
        }).then((result: { dataValues: { id: number } }) => {
          const recipes = Recipe.findOne({
            where: {
              UserId: result.dataValues.id,
              category: req.body.category,
              id: req.body.id,
            },
          }).then((result: object[]) => {
            res.status(200).send(result);
          });
        });
      } catch (err) {
        console.error(err);
        res.status(403);
        res.send({ success: false });
      }
    },
  );
};
