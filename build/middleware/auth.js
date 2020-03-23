import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const sequelize = require('../models').sequelize;
const { User } = sequelize.models;
//@ts-ignore
const SECRET = process.env.JWT_SECRET;
export const authValidation = (req, res, next) => {
    const authHeader = req.body.headers.Authorization;
    // @ts-ignore
    if (typeof authHeader === 'undefined' || !authHeader.includes('Bearer')) {
        res.status(403);
        res.send('Invalid credentials');
        return;
    }
    const bearer = authHeader.split('Bearer')[1];
    try {
        const decodedToken = jwt.verify(bearer.replace(' ', ''), SECRET, async (err, payload) => {
            await User.findOne({
                where: {
                    email: payload.email,
                },
            })
                .then(() => {
                if (typeof payload.email !== 'undefined' && payload.email === req.body.email) {
                    return next();
                }
            })
                .catch((err) => {
                res.status(405);
                console.error(err);
            });
        });
    }
    catch (err) {
        res.status(405);
        res.send('Invalid credentials');
        return;
    }
};
