import express from 'express';
import { 
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview 
} from '../controllers/reviewcontroler.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getReviews);
router.get('/:id', getReviewById);
router.post('/', protect, createReview);
router.put('/:id', protect, admin, updateReview);
router.delete('/:id', protect, admin, deleteReview);

export default router;