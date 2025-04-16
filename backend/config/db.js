import mongoose from 'mongoose';
 
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "electroworld" // ← Critical for Atlas
    });
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (err) {
    console.error("Connection failed:", err.message);
    process.exit(1);
  }
getDb :() =>connectDB
};

export default connectDB;