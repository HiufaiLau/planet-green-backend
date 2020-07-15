import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export const toHash = async (password) => {
  const salt = randomBytes(8).toString('hex');
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString('hex')}.${salt}`;
};
export const compare = async (password, enteredPassword) => {
  const [hashedPassword, salt] = password.split('.');
  const buf = await scryptAsync(enteredPassword, salt, 64);
  return buf.toString('hex') === hashedPassword;
};
