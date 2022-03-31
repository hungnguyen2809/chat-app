import { config } from 'dotenv';
import mongoose from 'mongoose';
import { logger } from '../services';

config();
const MONGO_URI = process.env.MONGODB_URI;

export const connectMongoDB = () => {
  if (!MONGO_URI) return;

  mongoose.connect(MONGO_URI, (error) => {
    if (error) {
      logger.error(`Connect MongoDB: ${error.message}`);
      return;
    }
    logger.success('Connect MongoDB');
  });
};
