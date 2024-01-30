import mongoose from 'mongoose';

export const initDb = async () => {
  mongoose.set('strictQuery', false)

  try {
    await mongoose.connect(config.MONGODB_URI)
  } catch (error) {
  }
}
