import express from 'express';
import cookieSession from 'cookie-session';
import { connectDB } from './config/db.js';
import { authRouter } from './routes/auth.js';
import { productRouter } from './routes/products.js';
import { imagesRouter } from './routes/image.js';
import { errorHandler } from './middlewares/error-handler.js';
import path from 'path';
import 'colors';

const app = express();

app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use('/images', express.static(path.join(path.resolve(), 'images')));
app.use('/api/products', productRouter);
app.use('/api/auth', authRouter);
app.use('/api/images', imagesRouter);
app.use(errorHandler);

connectDB();
app.listen(5000, () => console.log('Listening on port 5000'.yellow));
