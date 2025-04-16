import Review from '../models/review.js';
import Product from '../models/Product.js';
import asyncHandler from 'express-async-handler';
import  validateId from '../utils/validators.js';


const calculateAverageRating = async (productId) => {
  const result = await Review.aggregate([
    { $match: { product: productId } },
    { $group: { _id: null, averageRating: { $avg: '$rating' } } }
  ]);
  return result[0]?.averageRating || 0;
};

export const getReviews = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const reviews = await Review.find({})
    .populate('user', 'name email avatar')
    .populate('product', 'name price images')
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Review.countDocuments();

  res.json({
    reviews,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

export const getReviewById = asyncHandler(async (req, res) => {
  if (!validateId(req.params.id)) {
    res.status(400);
    throw new Error('Invalid review ID format');
  }

  const review = await Review.findById(req.params.id)
    .populate('user', 'name email avatar')
    .populate('product', 'name price');

  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  res.json(review);
});

export const createReview = asyncHandler(async (req, res) => {
  const { rating, comment, product } = req.body;

  if (!rating || !product) {
    res.status(400);
    throw new Error('Rating and product ID are required');
  }

  if (rating < 1 || rating > 5) {
    res.status(400);
    throw new Error('Rating must be between 1 and 5');
  }

  const productExists = await Product.findById(product);
  if (!productExists) {
    res.status(404);
    throw new Error('Product not found');
  }

  const alreadyReviewed = await Review.findOne({
    user: req.user._id,
    product
  });

  if (alreadyReviewed) {
    res.status(400);
    throw new Error('You have already reviewed this product');
  }

  const review = await Review.create({
    user: req.user._id,
    product,
    rating: Number(rating),
    comment
  });

  
  productExists.rating = await calculateAverageRating(product);
  await productExists.save();

  res.status(201).json({
    ...review._doc,
    user: req.user,
    product: productExists
  });
});

export const updateReview = asyncHandler(async (req, res) => {
  if (!validateId(req.params.id)) {
    res.status(400);
    throw new Error('Invalid review ID format');
  }

  const review = await Review.findById(req.params.id);
  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }


  if (review.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    res.status(403);
    throw new Error('Not authorized to update this review');
  }

  review.rating = req.body.rating || review.rating;
  review.comment = req.body.comment || review.comment;
  review.edited = true;

  const updatedReview = await review.save();

  
  if (req.body.rating) {
    const product = await Product.findById(review.product);
    product.rating = await calculateAverageRating(review.product);
    await product.save();
  }

  res.json(updatedReview);
});

export const deleteReview = asyncHandler(async (req, res) => {
  if (!validateId(req.params.id)) {
    res.status(400);
    throw new Error('Invalid review ID format');
  }

  const review = await Review.findById(req.params.id);
  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  
  if (review.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    res.status(403);
    throw new Error('Not authorized to delete this review');
  }

  const productId = review.product;
  await review.remove();

 
  const product = await Product.findById(productId);
  product.rating = await calculateAverageRating(productId);
  await product.save();

  res.json({ message: 'Review removed successfully' });
});