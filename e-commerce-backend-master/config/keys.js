import devKeys from './dev.js';
import prodKeys from './prod.js';

let keys;
if (process.env.NODE_ENV === 'production') {
  keys = prodKeys;
} else {
  keys = devKeys;
}
export default keys;
