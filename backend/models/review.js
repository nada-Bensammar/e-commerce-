const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
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


reviewSchema.index({ user: 1, product: 1 }, { unique: true });


reviewSchema.statics.calculateAverageRating = async function(productId) {
  const stats = await this.aggregate([
    { $match: { product: productId } },
    { 
      $group: {
        _id: '$product',
        averageRating: { $avg: '$rating' },
        numReviews: { $sum: 1 }
      }
    }
  ]);

  try {
    await mongoose.model('Product').findByIdAndUpdate(productId, {
      rating: stats[0]?.averageRating || 0,
      numReviews: stats[0]?.numReviews || 0
    });
  } catch (err) {
    console.error(err);
  }
};


reviewSchema.post('save', function() {
  this.constructor.calculateAverageRating(this.product);
});


reviewSchema.post('remove', function() {
  this.constructor.calculateAverageRating(this.product);
});

module.exports = mongoose.model('Review', reviewSchema);
