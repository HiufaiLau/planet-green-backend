import expressValidator from 'express-validator';

const { body } = expressValidator;
export const productValidation = [
  body('name')
    .isLength({ min: 2, max: 30 })
    .withMessage('Name must be between 2 and 30 characters.'),
  body('price').isNumeric().withMessage('Please enter a valid price.'),
  body('image').isLength({ min: 1 }).withMessage('Please choose 1 image.'),
  body('countInStock')
    .isNumeric()
    .withMessage('Please enter a valid quantity of product.'),
];
