import express from 'express';
import { createPaymentIntent } from '../controllers/paymentcontroller.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create-payment-intent', protect, createPaymentIntent);

export default router;