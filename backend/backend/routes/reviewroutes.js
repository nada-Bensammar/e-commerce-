import express from 'express';
import { 
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview 
} from '../controllers/reviewcontroler.js';


const router = express.Router();

router.get('/', getReviews);
router.get('/:id', getReviewById);
router.post('/',  createReview);
router.put('/:id', updateReview);
router.delete('/:id',  deleteReview);

export default router;