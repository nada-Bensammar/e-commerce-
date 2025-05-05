import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import { 
  createProduct,
  getProducts,
  getProductByID,
  updateProduct,
  deleteProduct,
 
} from '../controllers/productController.js';

const router = express.Router();


router.post('/', protect, admin,createProduct)
router.get('/',getProducts  )
router.get('/',getProductByID)
router.put('/:id', protect, admin,updateProduct)
router.delete('/:id', protect, admin,deleteProduct)

export default router