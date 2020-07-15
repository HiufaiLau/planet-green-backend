import { Product } from '../models/Product.js';
import { asyncHandler } from '../middlewares/async.js';
import fs from 'fs';
import config from '../config/dev.js';

const unlinkImage = (path) => {
  return new Promise((resolve, reject) => {
    fs.unlink(path, (err, data) => {
      console.log(data);
      if (err) reject(err);
      else resolve(data);
    });
  });
};

const deleteImagesAtProduct = async (id) => {
  try {
    const { image } = await Product.findById({ _id: id });
    await image.forEach((oneImg) => {
      unlinkImage(`${config.imageDirectory}/${oneImg}`);
    });
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create({
    price: req.body.price,
    countInStock: req.body.countInStock,
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    image: req.body.image,
  });
  res.status(200).send(product);
});

export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new Error('Product not found.');
  res.status(200).json({ product: product });
});

export const getProducts = asyncHandler(async (req, res) => {
  res.status(200).json(res.advancedResults);
});

export const updateProduct = asyncHandler(async (req, res) => {
  let updateProduct = req.body;
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateProduct,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).send(product);
  } catch (err) {
    console.log(err);
  }
});

export const deleteProduct = asyncHandler(async (req, res) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    throw new Error('Product not found.');
  } else {
    await deleteImagesAtProduct(req.params.id);
    product = await Product.findByIdAndDelete(req.params.id);
    res.status(204).send({ message: 'Product Deleted' });
  }
});

export const uploadImages = asyncHandler(async (req, res) => {
  const files = await req.files;
  console.log(files);
  const fileName = files.map((file) => file.filename);
  console.log(fileName);
  res.send(fileName);
});

export const deleteSingleImage = asyncHandler(async (req, res) => {
  try {
    await unlinkImage(`${config.imageDirectory}/${req.params.filename}`);
    res.json({
      image: req.params.filename,
    });
  } catch (error) {
    res.send(error);
  }
});
