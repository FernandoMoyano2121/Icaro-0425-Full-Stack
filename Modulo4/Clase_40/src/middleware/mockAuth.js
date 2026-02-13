export const mockAuth = (req, res, next) => {
  req.user = {
    role: "user",
  };
  next();
};
