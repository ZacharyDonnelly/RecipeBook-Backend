export const requestLogger = (req, res, next) => {
    console.table([req.body.email, req.body.password]);
    next();
};
