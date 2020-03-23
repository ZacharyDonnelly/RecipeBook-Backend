import { requestLogger } from '../middleware';

module.exports = function(route: string, app: any) {
  app.get(
    route,
    requestLogger,
    async (req: any, res: { send: (arg0: { success: boolean }) => void }) => {
      try {
        res.send({ success: true });
      } catch (err) {
        console.error(err);
        res.send({ success: false });
      }
    },
  );
};
