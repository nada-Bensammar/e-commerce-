import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  first_name: { type: String },
  last_name: { type: String },
  address: { type: String },
  country: { type: String },
  phone_number: { type: String },
  created_at: { type: Date, default: Date.now }
});

const User= mongoose.model('User', userSchema);

export default User;