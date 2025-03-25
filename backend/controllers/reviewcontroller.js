const Review = require('../models/Review');
const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');
const { validateId } = require('../utils/validators');



exports.getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({})
    .populate('user', 'name email')
    .populate('product', 'name');
  res.json(reviews);
});


exports.getReviewById = asyncHandler(async (req, res) => {
  if (!validateId(req.params.id)) {
    res.status(400);
    throw new Error('Invalid review ID');
  }

  const review = await Review.findById(req.params.id)
    .populate('user', 'name email')
    .populate('product', 'name');

  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  res.json(review);
});

exports.createReview = asyncHandler(async (req, res) => {
  const { rating, comment, product } = req.body;

  if (!rating || !product) {
    res.status(400);
    throw new Error('Please include rating and product');
  }

  // Check if product exists
  const productExists = await Product.findById(product);
  if (!productExists) {
    res.status(400);
    throw new Error('Product not found');
  }

  // Check if user already reviewed this product
  const alreadyReviewed = await Review.findOne({
    user: req.user._id,
    product
  });

  if (alreadyReviewed) {
    res.status(400);
    throw new Error('Product already reviewed');
  }

  const review = await Review.create({
    user: req.user._id,
    product,
    rating: Number(rating),
    comment
  });

  
  productExists.rating = await calculateAverageRating(product);
  await productExists.save();

  res.status(201).json(review);
});


exports.updateReview = asyncHandler(async (req, res) => {
  const review = await Review.findById
