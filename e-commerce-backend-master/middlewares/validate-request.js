import expressValidator from 'express-validator';
const { validationResult } = expressValidator;

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMsg = errors.errors.map((e) => e.msg);
    throw new Error(errorMsg);
  }
  next();
};
