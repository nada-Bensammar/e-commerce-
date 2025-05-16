import express from 'express';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../controllers/categorycontroller.js';


const router = express.Router();

router.get('/', getCategories);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id',  deleteCategory);

export default router;