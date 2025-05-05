import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createOrder, getOrders } from '../controllers/ordercontroller.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/',protect, getOrders);

export default router;