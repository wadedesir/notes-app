import mongoose from 'mongoose';

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to db...');
});

mongoose.connection.on('error', err => {
  console.log(err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection is disconnected...');
});

export const initDb = async () => {
  mongoose.set('strictQuery', false)

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });  
    console.log('mongoose connected');
  } catch (error) {
    console.error(error)
  }
}
