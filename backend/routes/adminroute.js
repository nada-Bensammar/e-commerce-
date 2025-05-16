import express from 'express';
import {
  loginAdmin,
  getProducts,
  addProduct,
} from '../controllers/admincontroller.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginAdmin); 
router.get('/products', protect, admin, getProducts);
router.post('/products', protect, admin, addProduct);

export default router;
