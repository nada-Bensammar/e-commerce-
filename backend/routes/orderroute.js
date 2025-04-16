import express from 'express';
import { createOrder, getOrderById } from '../controllers/ordercontroller.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/:id', getOrderById);

export default router;