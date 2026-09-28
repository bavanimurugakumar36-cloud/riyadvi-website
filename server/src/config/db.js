import mongoose from 'mongoose';

const connectDB = async () => {
  const mongoUri =
    process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error(
      'MONGODB_URI is not configured.',
    );
  }

  try {
    mongoose.set(
      'strictQuery',
      true,
    );

    const connection =
      await mongoose.connect(
        mongoUri,
        {
          serverSelectionTimeoutMS: 10000,
          connectTimeoutMS: 10000,
          socketTimeoutMS: 45000,
        },
      );

    console.log(
      `MongoDB connected: ${connection.connection.host}`,
    );

    return connection;
  } catch (error) {
    console.error(
      'MongoDB connection failed:',
      error.message,
    );

    throw error;
  }
};

export default connectDB;