import Review from '../models/review.js';
import Product from '../models/Product.js';

// Update product rating automatic
const updateRating = async (productId) => {
  const reviews = await Review.find({ product: productId });
  const avg = reviews.reduce((a, b) => a + b.rating, 0) / reviews.length;
  await Product.updateOne({ _id: productId }, { rating: avg || 0 });
};


export const getReviews = async (req, res) => {
  res.json(await Review.find());
};


export const getReviewById = async (req, res) => {
  res.json(await Review.findById(req.params.id));
};


export const createReview = async (req, res) => {
  const review = await Review.create(req.body);
  await updateRating(review.product);
  res.json(review);
};


export const updateReview = async (req, res) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
  await updateRating(review.product);
  res.json(review);
};


export const deleteReview = async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  await updateRating(review.product);
  res.json({ deleted: true });
};