import mongoose from 'mongoose'
import {CONFIG} from '@helpers/constant'
const url = CONFIG.MONGODB_URI;
if (CONFIG.MONGO_CONFIG === 'aws') {
  mongoose.connect(url, {
    autoIndex: true,
    ssl: true,
  });
} else if (CONFIG.MONGO_CONFIG === 'atlas') {
  mongoose.connect(url, {
    autoIndex: true,
  });

} else {
  mongoose.connect(url, {
    autoIndex: true,
  });
}