import express from 'express';
import { currentUser } from '../middlewares/current-user.js';
import { requireAuth } from '../middlewares/require-auth.js';
import { authorizeAdmin } from '../middlewares/authorizeAdmin.js';

import {
  deleteSingleImage,
  uploadImages,
} from '../controllers/products.js';
import { uploadImageMiddleware } from '../middlewares/imageUpload.js';


const router = express.Router();
router
  .route('/uploadImage')
  .post(
    currentUser,
    requireAuth,
    authorizeAdmin,
    uploadImageMiddleware,
    uploadImages
  );
router
  .route('/deleteImage/:filename')
  .put(
    currentUser,
    requireAuth,
    authorizeAdmin,
    uploadImageMiddleware,
    deleteSingleImage
  );

export { router as imagesRouter };
