import User from '../models/User.js';
import { asyncHandler } from '../middlewares/async.js';
import { compare } from '../services/PasswordManager.js';

export const me = asyncHandler(async (req, res) => {
  if (!req.currentUser) throw new Error('Signin required.');
  const user = await User.findById(req.currentUser.id);
  if (!user) throw new Error('Not Authorized');
  res.send(user);
});

export const signup = asyncHandler(async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    throw new Error('User is already exsited.');
  }

  const user = await User.create(req.body);
  const token = user.getSignedToken();
  req.session = { jwt: token };
  res.status(200).send(user);
});

export const signin = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) throw new Error('Please register.');

  const passwordsMatch = await compare(user.password, req.body.password);
  if (!passwordsMatch) throw new Error('Password is not correct.');

  const token = user.getSignedToken();
  req.session = {
    jwt: token,
  };

  res.status(200).send(user);
});

export const signout = asyncHandler(async (req, res) => {
  req.session = null;
  res.send(null);
});