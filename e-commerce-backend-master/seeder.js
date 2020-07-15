import 'colors';
import fs from 'fs';
import path from 'path';

import { connectDB } from './config/db.js';
import { Product } from './models/Product.js';

const __dirname = path.resolve();
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/data/products.json`, 'utf-8')
);

connectDB();

const importData = async () => {
  try {
    await Product.create(products);
    await console.log('Data imported.'.green);
  } catch (err) {
    console.error(err.message);
  }
};
const destroyData = async () => {
  try {
    await Product.deleteMany({});
    console.log('Data destroyed.'.red);
  } catch (err) {
    console.error(err.message);
  }
};
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  destroyData();
}
