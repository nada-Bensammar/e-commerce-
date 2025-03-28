const Comment = require('../models/Comment');
const Product = require('../models/Product');

exports.createComment = async (req, res) => {
  try {
    const { productId, text, rating } = req.body;
    
    if (!productId || !text || !rating) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const comment = new Comment({
      productId,
      userId: req.user._id,
      text,
      rating
    });

    await comment.save();
    
    // Update product rating
    const product = await Product.findById(productId);
    if (product) {
      await product.updateRating();
    }

    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProductComments = async (req, res) => {
  try {
    const comments = await Comment.find({ productId: req.params.productId })
      .populate('userId', 'name avatar')
      .sort({ createdAt: -1 });
      
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    
    if (!req.user.isAdmin && !comment.userId.equals(req.user._id)) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    const productId = comment.productId;
    await comment.remove();
    
  
    const product = await Product.findById(productId);
    if (product) {
      await product.updateRating();
    }
    
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { text, rating } = req.body;
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    
    if (!req.user.isAdmin && !comment.userId.equals(req.user._id)) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    comment.text = text || comment.text;
    comment.rating = rating || comment.rating;
    await comment.save();
    
  
    const product = await Product.findById(comment.productId);
    if (product) {
      await product.updateRating();
    }
    
    res.json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
