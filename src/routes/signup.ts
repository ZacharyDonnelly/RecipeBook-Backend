import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

const sequelize = require('../models').sequelize;
const { User } = sequelize.models;
dotenv.config();

module.exports = function(route: string, app: any) {
  app.post(
    route,
    async (
      req: { body: { password: string; email: string } },
      res: { status: (arg0: number) => void; send: (arg0: string) => void },
    ) => {
      try {
        // checking if email already exists in database
        const emailTaken = await User.findOne({
          where: {
            email: req.body.email,
          },
        });
        if (emailTaken === null) {
          // salting and hashing password
          await bcrypt.hash(req.body.password, 10, async function(err, hash) {
            // storing hash
            await User.create({ email: req.body.email, hash });
          });
          res.send('User Created');
        } else {
          res.send('Email already taken!');
        }
      } catch (err) {
        console.error(err);
        res.send('Email taken');
      }
    },
  );
};
