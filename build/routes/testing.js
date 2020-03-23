import { requestLogger } from '../middleware';
module.exports = function (route, app) {
    app.get(route, requestLogger, async (req, res) => {
        try {
            res.send({ success: true });
        }
        catch (err) {
            console.error(err);
            res.send({ success: false });
        }
    });
};
