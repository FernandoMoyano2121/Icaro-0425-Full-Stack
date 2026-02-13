export const logger = (req, res, next) => {
  console.log(`Metodo Petición : ${req.method} - URL:  ${req.url}`);
  next();
};
