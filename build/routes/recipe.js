import { authValidation } from '../middleware/auth';
import dotenv from 'dotenv';
const sequelize = require('../models').sequelize;
const { User } = sequelize.models;
dotenv.config();
module.exports = function (route, app) {
    app.post(route, authValidation, async (req, res) => {
        try {
            User.findOne({
                where: {
                    email: req.body.email,
                },
            }).then((user) => {
                user.createRecipe({
                    title: req.body.title,
                    time: req.body.time,
                    category: req.body.category,
                    directions: req.body.directions,
                    ingredients: req.body.ingredients,
                });
            });
            res.status(200);
            res.send({ created: true });
        }
        catch (err) {
            res.status(403);
            res.send({ created: false });
        }
    });
};
