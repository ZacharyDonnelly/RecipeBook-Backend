import { requestLogger } from '../middleware';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = require('../models').sequelize;
const { Recipe } = sequelize.models;

module.exports = function(route: string, app: any) {
  app.post(
    route,
    requestLogger,
    async (req: any, res: { send: (arg0: { created: boolean }) => void }) => {
      try {
        res.send({ created: true });
      } catch (err) {
        console.error(err);
        res.send({ created: false });
      }
    },
  );
};
