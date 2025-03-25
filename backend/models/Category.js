

const slugify = require('slugify');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a category name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  slug: {
    type: String,
    unique: true
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


categorySchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});


categorySchema.pre('remove', async function(next) {
  await mongoose.model('Product').deleteMany({ category: this._id });
  next();
});


categorySchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'category',
  justOne: false
});

module.exports = mongoose.model('Category', categorySchema);
