import expressValidator from 'express-validator';

const { body } = expressValidator;
export const signupValidation = [
  body('name')
    .isLength({ min: 2, max: 10 })
    .withMessage('Name must be between 2 and 30 characters.'),
  body('email').isEmail().withMessage('Please enter a valid email.'),
  body('password')
    .trim()
    .isLength({ min: 4 })
    .isAlphanumeric()
    .withMessage('Password must be at least 4 characters.'),
];

export const siginValidation = [
  body('email').isEmail().withMessage('Please enter a valid email.'),
  body('password').trim().notEmpty().withMessage('Please enter a password.'),
];
