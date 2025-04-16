import express from 'express';

import {
  createComment,
  getProductComments,
  updateComment,
  deleteComment
} from '../controllers/commentcontroller.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router({ mergeParams: true });


router.route('/products/:productId/comments')
  .get(getProductComments);


router.use(protect);

router.route('/')
  .post(createComment);

router.route('/:id')
  .patch(updateComment)
  .delete(deleteComment);

export default router;