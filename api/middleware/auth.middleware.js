import UnauthenticatedError from "../errors/unauthenticated.error.js";

export const authGard = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    throw new UnauthenticatedError("Unauthenticated!");
  }
};
