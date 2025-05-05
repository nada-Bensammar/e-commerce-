import Comment from '../models/comment.js';
import Product from '../models/Product.js';




export const createComment = async (req, res) => {
  const { content, product, user } = req.body;
  
  if (!content || !product || !user) {
    return res.status(400).json({ 
      error: "Content, product ID and user ID are required" 
    });
  }

  try {
    const comment = await Comment.create({ content, product, user });
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ product: req.params.productId });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { content: req.body.content },
      { new: true }
    );
    res.json(comment || { error: "Comment not found" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};