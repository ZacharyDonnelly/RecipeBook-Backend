import { authValidation } from '../middleware/auth';
const sequelize = require('../models').sequelize;
const { Recipe, User } = sequelize.models;
module.exports = function (route, app) {
    app.post(route, authValidation, async (req, res) => {
        try {
            // locating user id
            User.findOne({
                where: {
                    email: req.body.email,
                },
            }).then((result) => {
                return Recipe.findAll({
                    // finding all recipes associated with said user
                    where: {
                        UserId: result.dataValues.id,
                    },
                }).then((userRecipes) => {
                    // taking all found recipes and mapping them to a
                    // ^ new array in order to be returned with the post call
                    const allUserRecipes = [];
                    userRecipes.forEach(recipe => {
                        allUserRecipes.push(JSON.parse(JSON.stringify(recipe.dataValues)));
                    });
                    // sending the prettified array back
                    res.status(200).send(allUserRecipes);
                });
            });
        }
        catch (err) {
            console.error(err);
            res.status(403);
            res.send({ success: false });
        }
    });
};
