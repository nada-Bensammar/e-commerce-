import Product from '../models/Product.js'

export const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;
    
    
    if (!name || !price || !category) {
      return res.status(400).json({ error: 'Name, price, and category are required' });
    }

    const product = new Product({
      name,
      price,
      description: description || '',
      category,
      stock: stock || 0
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ 
      error: 'Product creation failed',
      details: err.message 
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
   
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find()
      .skip(skip)
      .limit(limit)
      .populate('category', 'name');

    const total = await Product.countDocuments();

    res.status(200).json({
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    res.status(500).json({ 
      error: 'Failed to fetch products',
      details: err.message 
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name');
      
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ 
      error: 'Failed to fetch product',
      details: err.message 
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'price', 'description', 'category', 'stock'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ error: 'Invalid updates!' });
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ 
      error: 'Update failed',
      details: err.message 
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ 
      error: 'Deletion failed',
      details: err.message 
    });
  }
};