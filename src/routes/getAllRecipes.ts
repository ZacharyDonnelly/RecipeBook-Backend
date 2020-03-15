import { authValidation } from '../middleware/auth';
const sequelize = require('../models').sequelize;
const { Recipe, User } = sequelize.models;

module.exports = function(route: string, app: any) {
  app.post(
    route,
    authValidation,
    async (
      req: { body: { email: string } },
      res: {
        status: (
          arg0: number, // all types for this promise mess
        ) => {
          (): Promise<object>;
          new (): Promise<[]>;
          send: { (arg0: object[]): void; new (): object[] };
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
          return Recipe.findAll({
            // finding all recipes associated with said user
            where: {
              UserId: result.dataValues.id,
            },
          }).then((userRecipes: { dataValues: object }[]) => {
            // taking all found recipes and mapping them to a
            // ^ new array in order to be returned with the post call
            const allUserRecipes: object[] = [];
            userRecipes.forEach(recipe => {
              allUserRecipes.push(JSON.parse(JSON.stringify(recipe.dataValues)));
            });
            // sending the prettified array back
            res.status(200).send(allUserRecipes);
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
