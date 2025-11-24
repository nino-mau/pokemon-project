import mongoose from 'mongoose';

// MongoDB connection URL from environment or default
const MONGO_URL =
  process.env.MONGO_URL || 'mongodb://root:example@localhost:27017';
const DB_NAME = process.env.DB_NAME || 'pokemon_db';

// Build the full connection string with database name and auth source
const CONNECTION_STRING = `${MONGO_URL}/${DB_NAME}?authSource=admin`;

// Connect to MongoDB using Mongoose
export const connectDB = async (): Promise<typeof mongoose> => {
  if (mongoose.connection.readyState === 1) {
    console.log('MongoDB already connected');
    return mongoose;
  }

  try {
    await mongoose.connect(CONNECTION_STRING, {
      maxPoolSize: 10,
      minPoolSize: 5,
      serverSelectionTimeoutMS: 30000
    });

    console.log(`MongoDB connected successfully to database: ${DB_NAME}`);
    console.log('MongoDB ping successful');

    return mongoose;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

// Get Mongoose instance
export const getDB = (): typeof mongoose => {
  if (mongoose.connection.readyState !== 1) {
    throw new Error('Database not connected. Call connectDB() first.');
  }
  return mongoose;
};

// Close database connection
export const closeDB = async (): Promise<void> => {
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
};

// Handle application termination
process.on('SIGINT', async () => {
  await closeDB();
  process.exit(0);
});

export default { connectDB, getDB, closeDB };
