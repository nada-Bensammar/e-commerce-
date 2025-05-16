import Admin from '../models/admin.js';
import Product from '../models/Product.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET ||'MYsecrectJWT12345' 



export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin._id, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        username: admin.username
      }
    });

  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};




export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};




export const addProduct = async (req, res) => {
  const { name, description, price, brand, category, images } = req.body;

  if (!name || !description || !price || !brand || !category) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      brand,
      category,
      images,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({
      message: 'Product added successfully',
      product: savedProduct
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
};
