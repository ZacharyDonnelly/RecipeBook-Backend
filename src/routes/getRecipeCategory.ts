import { authValidation } from '../middleware/auth';

const sequelize = require('../models').sequelize;
const { Recipe, User } = sequelize.models;

module.exports = function(route: string, app: any) {
  app.post(
    route,
    authValidation,
    async (
      req: { body: { email: string; category: string } },
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
          // finding all recipes associated with said user AND specific category
          // ! PAGINATE THESE DURING PRODUCTION
          return Recipe.findAll({
            where: {
              UserId: result.dataValues.id,
              category: req.body.category,
            },
          }).then((categoryRecipes: { dataValues: object }[]) => {
            // taking all found recipes and mapping them to a
            // ^ new array in order to be returned with the post call
            const allCategoryRecipes: object[] = [];
            categoryRecipes.forEach(recipe => {
              allCategoryRecipes.push(JSON.parse(JSON.stringify(recipe.dataValues)));
            });
            res.status(200).send(allCategoryRecipes);
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
