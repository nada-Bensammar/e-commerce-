import Category from '../models/category.js';
import asyncHandler from 'express-async-handler';
import { validateId } from '../utils/validators.js';
import Product from '../models/Product.js'; 

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});

export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error('Please include category name');
  }

  const categoryExists = await Category.findOne({ name });
  if (categoryExists) {
    res.status(400);
    throw new Error('Category already exists');
  }

  const category = await Category.create({ name });
  res.status(201).json(category);
});

export const updateCategory = asyncHandler(async (req, res) => {
  if (!validateId(req.params.id)) {
    res.status(400);
    throw new Error('Invalid category ID');
  }

  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  category.name = req.body.name || category.name;
  const updatedCategory = await category.save();
  res.json(updatedCategory);
});

export const deleteCategory = asyncHandler(async (req, res) => {
  if (!validateId(req.params.id)) {
    res.status(400);
    throw new Error('Invalid category ID');
  }

  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  const productsWithCategory = await Product.countDocuments({ category: req.params.id });
  if (productsWithCategory > 0) {
    res.status(400);
    throw new Error('Cannot delete - category is in use by products');
  }

  await category.remove();
  res.json({ message: 'Category removed' });
});