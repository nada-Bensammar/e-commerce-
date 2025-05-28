import Wishlist from "../models/wishlist.js";


export const addToWishlist = async (req, res) => {
  const { userId, productId } = req.body;


  let wishlist = await Wishlist.findOne({ userId });

  if (!wishlist) {
    wishlist = new Wishlist({ userId, products: [] });
  }

 
  if (!wishlist.products.includes(productId)) {
    wishlist.products.push(productId);
  }


  await wishlist.save();

 
  res.json({ success: true, wishlist });
};


export const getWishlist = async (req, res) => {
  const wishlist = await Wishlist.findOne({ userId: req.params.userId }).populate("products");
  

  res.json(wishlist || { products: [] });
};


export const removeFromWishlist = async (req, res) => {
  const { userId, productId } = req.body;

 
  const wishlist = await Wishlist.findOneAndUpdate(
    { userId },
    { $pull: { products: productId } }, 
    { new: true } 
  );

 
  res.json(wishlist);
};
