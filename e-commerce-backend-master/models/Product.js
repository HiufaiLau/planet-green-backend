import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    default: 0,
    required: true,
  },
  image: [String],

  description: {
    type: String,
    trim: true,
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model('Product', productSchema);
export { Product };
