import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Comment content is required'],
    trim: true,
    maxlength: [500, 'Comment cannot exceed 500 characters']
  },
  product: {
    type: String,
    ref: 'Product',
    required: [true, 'Comment must belong to a product']
  },
  user: {
    type: String,
    ref: 'User',
    required: [true, 'Comment must belong to a user']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: false
  },
  isEdited: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});






const Comment = mongoose.model('Comment', commentSchema);
export default Comment;