import mongoose from "mongoose";

const review = new mongoose.Schema({
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


review.index({ user: 1, product: 1 }, { unique: true });


review.statics.calculateAverageRating = async function(productId) {
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


review.post('save', function() {
  this.constructor.calculateAverageRating(this.product);
});


review.post('remove', function() {
  this.constructor.calculateAverageRating(this.product);
});

export default review;