import express from 'express';
import {
  loginAdmin,
  getProducts,
  addProduct,
} from '../controllers/admincontroller.js';

import verifyAdmin from '../middleware/verifyAdmin.js'

const router = express.Router();

router.post('/login', loginAdmin); 
router.get('/products', verifyAdmin, getProducts);
router.post('/products',verifyAdmin, addProduct);

export default router;
