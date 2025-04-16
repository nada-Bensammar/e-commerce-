import mongoose  from "mongoose";


const category = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a category name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  featured: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    default: 'no-photo.jpg'
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});





category.pre('remove', async function(next) {
  await mongoose.model('Product').deleteMany({ category: this._id });
  next();
});


category.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'category',
  justOne: false
});


export default category;