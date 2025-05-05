import mongoose from "mongoose";


const reviewschema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    ref: 'User'
  },
  product: {
    type: String,
    required: true,
    ref: 'Product'
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});










const review= mongoose.model('review', reviewschema);

export default review;