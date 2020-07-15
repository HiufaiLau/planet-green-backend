import jwt from 'jsonwebtoken';
import keys from '../config/keys.js';

export const currentUser = (req, res, next) => {
  if (!req.session.jwt) return next();
  try {
    const payload = jwt.verify(req.session.jwt, keys.jwtSecret, {
      expireIn: '1h',
    });
    req.currentUser = payload;
  } catch (err) {
    console.log(err.message);
  }
  next();
};
