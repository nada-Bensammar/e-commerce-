import Comment from '../models/comment.js';
import Product from '../models/Product.js';




export const createComment = async (req, res, next) => {
  try {
    const { content, productId, rating } = req.body;
    const userId = req.user.id;

    const product = await Product.findById(productId);
    if (!product) {
      return next(new AppError('Product not found', 404));
    }

    const newComment = await Comment.create({
      content,
      product: productId,
      user: userId,
      rating
    });

    res.status(201).json({
      status: 'success',
      data: {
        comment: newComment
      }
    });
  } catch (error) {
    next(error);
  }
};


export const getProductComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ product: req.params.productId });

    res.status(200).json({
      status: 'success',
      results: comments.length,
      data: { comments },
    });
  } catch (error) {
    next(error);
  }
};


export const updateComment = async (req, res, next) => {
  try {
    const comment = await Comment.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id, // the owner can update
      },
      { content: req.body.content },
      { new: true, runValidators: true }
    );

    if (!comment) {
      return next(new AppError('Comment not found or unauthorized', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { comment },
    });
  } catch (error) {
    next(error);
  }
};


  
  
  export const deleteComment = async (req, res, next) => {
    try {
      const comment = await Comment.findOneAndDelete({
        _id: req.params.id,
        user: req.user.id,
      });
  
      if (!comment) {
        return next(new AppError('Comment not found or unauthorized', 404));
      }
  
      res.status(204).json({
        status: 'success',
        data: null,
      });
    } catch (error) {
      next(error);
    }
  };
