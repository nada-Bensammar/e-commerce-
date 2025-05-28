import express from 'express';

import { 
  createProduct,
  getProducts,
  getProductByID,
  updateProduct,
  deleteProduct,
 
} from '../controllers/productController.js';

const router = express.Router();


router.post('/', createProduct)
router.get('/',getProducts  )
router.get('/:id',getProductByID)
router.put('/:id', updateProduct)
router.delete('/:id',deleteProduct)

export default router