import { authValidation } from '../middleware/auth';
const sequelize = require('../models').sequelize;
const { Recipe, User } = sequelize.models;
module.exports = function (route, app) {
    app.post(route, authValidation, async (req, res) => {
        try {
            // locating user id
            await User.findOne({
                where: {
                    email: req.body.email,
                },
            }).then((result) => {
                const recipes = Recipe.findOne({
                    where: {
                        UserId: result.dataValues.id,
                        category: req.body.category,
                        id: req.body.id,
                    },
                }).then((result) => {
                    res.status(200).send(result);
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
