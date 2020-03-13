import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

const sequelize = require('../models').sequelize;
const { User } = sequelize.models;
const SECRET = process.env.JWT_SECRET;
dotenv.config();

module.exports = function(route: string, app: any) {
  // login auth route
  app.post(
    route,
    async (
      // @ts-ignore
      { body },
      res: any,
    ) => {
      try {
        // querying db for specific user to extract hash
        const { hash } = await User.findOne({
          where: {
            email: body.email,
          },
        });
        const matching = await bcrypt.compare(body.password, hash);
        if (!matching) {
          res.status(403);
          res.send({ userFound: false });
        } else {
          const token = await jwt.sign(
            { email: body.email, issuer: 'dis', expiresIn: '120h' },
            // @ts-ignore
            SECRET,
          );
          res.send({ token });
        }
      } catch (err) {
        res.status(403);
        res.send({ userFound: false });
        console.error(err);
      }
    },
  );
};
