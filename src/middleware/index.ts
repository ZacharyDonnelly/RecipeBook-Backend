export const requestLogger = (req: any, res: any, next: () => void) => {
  console.table([req.body.email, req.body.password]);
  next();
};
