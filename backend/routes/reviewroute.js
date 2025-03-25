const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { protect, admin } = require('../middleware/authMiddleware');


router.get('/', reviewController.getReviews);


router.get('/:id', reviewController.getReviewById);


router.post('/', protect, reviewController.createReview);


router.put('/:id', protect, admin, reviewController.updateReview);


router.delete('/:id', protect, admin, reviewController.deleteReview);

module.exports = router;
