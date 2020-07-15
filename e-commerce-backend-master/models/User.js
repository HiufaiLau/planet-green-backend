import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { toHash } from '../services/PasswordManager.js';

import keys from '../config/keys.js';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user'],
      default: 'user',
    },
  },

  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.methods.getSignedToken = function () {
  return jwt.sign(
    {
      id: this.id,
      userName: this.userName,
      email: this.email,
      role: this.role,
    },
    keys.jwtSecret,
    {
      expiresIn: '30d',
    }
  );
};

const User = mongoose.model('User', userSchema);
export default User;
