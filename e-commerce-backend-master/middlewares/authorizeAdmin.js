export const authorizeAdmin = (req, res, next) => {
  if (req.currentUser.role !== 'admin') {
    throw new Error('Not Authorized');
  }
  next();
};
