import express from 'express';

import { createOrder, getOrders } from '../controllers/ordercontroller.js';

const router = express.Router();

router.post('/',  createOrder);
router.get('/', getOrders);

export default router;